import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

// Only these types are accepted, so a crafted `type` cannot reach verifyOtp.
const OTP_TYPES = ['signup', 'invite', 'magiclink', 'recovery', 'email_change', 'email'] as const
type OtpType = (typeof OTP_TYPES)[number]

function isOtpType(value: string | null): value is OtpType {
  return value !== null && (OTP_TYPES as readonly string[]).includes(value)
}

// Only a same-origin relative path is accepted. Backslashes and control
// characters are rejected too, because some parsers normalise `\` to `/` and
// would turn `/\evil.com` into a protocol-relative URL.
function safeNextPath(value: string): string {
  if (!value.startsWith('/') || value.startsWith('//')) return '/'
  if (value.includes('\\') || /[\u0000-\u001f]/.test(value)) return '/'
  return value
}

/**
 * Single entry point for every auth round-trip:
 * - OAuth (Google) and e-mail links arrive as `code`
 * - custom e-mail templates arrive as `token_hash` + `type`
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const nextParam = searchParams.get('next') ?? '/'

  const next = safeNextPath(nextParam)

  // A provider or linking error comes back on the same redirect, so surface it
  // where the user started instead of sending them to the login screen.
  const providerError = searchParams.get('error')

  if (providerError) {
    const separator = next.includes('?') ? '&' : '?'
    const target = next.startsWith('/?tab=')
      ? `${next}${separator}link=error`
      : `${next}${separator}error=oauth`

    return NextResponse.redirect(`${origin}${target}`)
  }

  const supabase = createClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(`${origin}/login?error=oauth`)
    }

    return NextResponse.redirect(`${origin}${next}`)
  }

  if (tokenHash && isOtpType(type)) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })

    if (error) {
      return NextResponse.redirect(`${origin}/login?error=link`)
    }

    // Recovery and e-mail change sessions must set a password before continuing.
    const target = type === 'recovery' || type === 'email_change' ? '/reset-password' : next

    return NextResponse.redirect(`${origin}${target}`)
  }

  return NextResponse.redirect(`${origin}/login?error=link`)
}

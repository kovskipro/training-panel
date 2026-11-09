import { NextResponse, type NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '../../../lib/supabase/server'
import { createAdminClient } from '../../../lib/supabase/admin'
import { clearPendingLink, readPendingLink } from '../../../lib/account/pendingLink'

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
 * Links the Google account the visitor just authenticated with to the account
 * that started the flow, moving the identity off whatever account held it.
 * Returns a redirect target, or null when it already handles the response.
 */
async function completeLink(
  supabase: ReturnType<typeof createClient>,
  origin: string,
): Promise<NextResponse> {
  const pending = readPendingLink()

  if (!pending) {
    return NextResponse.redirect(`${origin}/?tab=konto&link=error`)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    clearPendingLink()
    return NextResponse.redirect(`${origin}/?tab=konto&link=error`)
  }

  // The Google account was already attached to this very account.
  if (user.id === pending.userId) {
    clearPendingLink()
    return NextResponse.redirect(`${origin}/?tab=konto&link=ok`)
  }

  const { data: identityData } = await supabase.auth.getUserIdentities()
  const google = identityData?.identities.find(identity => identity.provider === 'google')

  if (!google) {
    clearPendingLink()
    return NextResponse.redirect(`${origin}/?tab=konto&link=error`)
  }

  const admin = createAdminClient()

  if (!admin) {
    clearPendingLink()
    return NextResponse.redirect(`${origin}/?tab=konto&link=error`)
  }

  const { error: moveError } = await admin.rpc('move_login_identity', {
    p_identity_id: google.identity_id,
    p_target_user_id: pending.userId,
  })

  if (moveError) {
    clearPendingLink()
    return NextResponse.redirect(`${origin}/?tab=konto&link=error`)
  }

  // If signing in with Google created a brand-new account just now, it exists
  // only because of this flow and would be left without any identity.
  const createdDuringFlow = new Date(user.created_at).getTime() >= pending.issuedAt - 5000

  if (createdDuringFlow) {
    await admin.auth.admin.deleteUser(user.id)
  }

  const { error: restoreError } = await supabase.auth.refreshSession({
    refresh_token: pending.refreshToken,
  })

  clearPendingLink()
  revalidatePath('/', 'layout')

  if (restoreError) {
    return NextResponse.redirect(`${origin}/login?error=link`)
  }

  return NextResponse.redirect(`${origin}/?tab=konto&link=ok`)
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
  const intent = searchParams.get('intent')
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

    if (intent === 'link') {
      return completeLink(supabase, origin)
    }

    // Google sign-in creates an account with a single `google` identity. Ask for
    // a password right away so every account also has an e-mail login and is
    // never left without a way in. Supabase does not add an `email` identity for
    // that, so the flag set by updatePassword is what tells us it already happened.
    const {
      data: { user: signedIn },
    } = await supabase.auth.getUser()

    const providers = (signedIn?.identities ?? []).map(identity => identity.provider)
    const hasPassword = signedIn?.user_metadata?.password_set === true

    if (signedIn && !providers.includes('email') && !hasPassword) {
      return NextResponse.redirect(`${origin}/set-password`)
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

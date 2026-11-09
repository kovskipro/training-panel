import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE = 'tp-pending-link'
const MAX_AGE_SECONDS = 600

export type PendingLink = {
  userId: string
  refreshToken: string
  issuedAt: number
}

function signingKey(): string {
  const secret = process.env.SUPABASE_SECRET_KEY

  if (!secret) {
    throw new Error('Missing SUPABASE_SECRET_KEY')
  }

  return secret
}

function sign(payload: string): string {
  return createHmac('sha256', signingKey()).update(payload).digest('base64url')
}

/**
 * Remembers which account started the Google link before the OAuth round-trip.
 * The id and the refresh token are signed, so the callback can trust them: an
 * unsigned value would let someone point the move at another account.
 */
export function setPendingLink(userId: string, refreshToken: string): void {
  const payload = Buffer.from(
    JSON.stringify({ userId, refreshToken, issuedAt: Date.now() }),
  ).toString('base64url')

  cookies().set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  })
}

export function readPendingLink(): PendingLink | null {
  const raw = cookies().get(COOKIE)?.value

  if (!raw) return null

  const [payload, mac] = raw.split('.')

  if (!payload || !mac) return null

  const expected = sign(payload)

  if (mac.length !== expected.length) return null
  if (!timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())

    if (typeof data.userId !== 'string' || typeof data.refreshToken !== 'string') return null
    if (typeof data.issuedAt !== 'number') return null
    if (Date.now() - data.issuedAt > MAX_AGE_SECONDS * 1000) return null

    return { userId: data.userId, refreshToken: data.refreshToken, issuedAt: data.issuedAt }
  } catch {
    return null
  }
}

export function clearPendingLink(): void {
  cookies().delete(COOKIE)
}

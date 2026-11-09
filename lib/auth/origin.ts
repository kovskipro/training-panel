import { headers } from 'next/headers'

/**
 * Absolute origin of the current request, needed for OAuth `redirectTo`, which
 * Supabase requires to be absolute and to match the project's allowed URLs.
 */
export function getOrigin(): string {
  const store = headers()
  const host = store.get('x-forwarded-host') ?? store.get('host')
  const proto = store.get('x-forwarded-proto') ?? 'https'

  return host ? `${proto}://${host}` : 'http://localhost:3000'
}

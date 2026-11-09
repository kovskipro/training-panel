import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

/**
 * Privileged server-only client. The secret key bypasses RLS, so this must never
 * be imported into a client component and never be exposed to the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const secret = process.env.SUPABASE_SECRET_KEY

  if (!url || !secret) {
    return null
  }

  return createClient<Database>(url, secret, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

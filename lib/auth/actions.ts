'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '../supabase/server'
import { getOrigin } from './origin'

export type LoginState = {
  error?: string
}

export type SignupState = {
  error?: string
  sent?: boolean
}

export type ResetState = {
  error?: string
  sent?: boolean
}

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()
  const password = String(formData.get('password') ?? '')
  const captchaToken = String(formData.get('captchaToken') ?? '') || undefined

  if (!email || !password) {
    return { error: 'Podaj adres e-mail i hasło.' }
  }

  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password, options: { captchaToken } })

  if (error) {
    if (error.message.toLowerCase().includes('captcha')) {
      return { error: 'Potwierdź, że nie jesteś robotem, i spróbuj ponownie.' }
    }

    // Supabase returns invalid_credentials both for a wrong password and for an
    // address without an account, so this does not reveal whether one exists.
    return {
      error:
        error.code === 'invalid_credentials'
          ? 'Nieprawidłowy e-mail lub hasło.'
          : 'Nie udało się zalogować. Spróbuj ponownie.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

/** Creates an e-mail + password account. Requires a confirmation e-mail. */
export async function signUp(_prev: SignupState, formData: FormData): Promise<SignupState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()
  const password = String(formData.get('password') ?? '')
  const passwordConfirm = String(formData.get('passwordConfirm') ?? '')
  const captchaToken = String(formData.get('captchaToken') ?? '') || undefined

  if (!email || !password) {
    return { error: 'Podaj adres e-mail i hasło.' }
  }

  if (password.length < 8) {
    return { error: 'Hasło musi mieć co najmniej 8 znaków.' }
  }

  if (password !== passwordConfirm) {
    return { error: 'Hasła nie są identyczne.' }
  }

  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getOrigin()}/auth/callback?next=${encodeURIComponent('/')}`,
      captchaToken,
    },
  })

  if (error) {
    if (error.message.toLowerCase().includes('captcha')) {
      return { error: 'Potwierdź, że nie jesteś robotem, i spróbuj ponownie.' }
    }

    return { error: 'Nie udało się utworzyć konta. Spróbuj ponownie.' }
  }

  // When e-mail confirmation is on, no session is returned yet. An address that
  // already has an account returns an obfuscated user, so both cases look alike
  // and the form cannot be used to enumerate accounts.
  if (!data.session) {
    return { sent: true }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

/** Sends a recovery link, which lands on /reset-password with a session. */
export async function requestPasswordReset(_prev: ResetState, formData: FormData): Promise<ResetState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()

  if (!email) {
    return { error: 'Podaj adres e-mail.' }
  }

  const captchaToken = String(formData.get('captchaToken') ?? '') || undefined

  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getOrigin()}/auth/callback?next=${encodeURIComponent('/reset-password')}`,
    captchaToken,
  })

  if (error) {
    if (error.message.toLowerCase().includes('captcha')) {
      return { error: 'Potwierdź, że nie jesteś robotem, i spróbuj ponownie.' }
    }

    return { error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' }
  }

  // Always the same answer, whether or not the address has an account.
  return { sent: true }
}

/** Sets the password of the user who arrived through a recovery link. */
export async function updatePassword(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get('password') ?? '')
  const passwordConfirm = String(formData.get('passwordConfirm') ?? '')

  if (password.length < 8) {
    return { error: 'Hasło musi mieć co najmniej 8 znaków.' }
  }

  if (password !== passwordConfirm) {
    return { error: 'Hasła nie są identyczne.' }
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Link wygasł. Poproś o nowy.' }
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: 'Nie udało się ustawić hasła. Spróbuj ponownie.' }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

/** Starts the Google OAuth flow. The provider must be enabled in Supabase. */
export async function signInWithGoogle(): Promise<void> {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${getOrigin()}/auth/callback?next=${encodeURIComponent('/')}`,
      skipBrowserRedirect: true,
    },
  })

  if (error || !data.url) {
    redirect('/login?error=oauth')
  }

  redirect(data.url)
}

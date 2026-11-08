'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '../supabase/server'
import { isValidEmail } from './email'

export type LoginState = {
  error?: string
}

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'Podaj adres e-mail i hasło.' }
  }

  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
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

/**
 * First step of the two-step login: checks the address format and whether an
 * account exists, so the password step is only shown for real accounts.
 *
 * `email_has_account` is a SECURITY DEFINER function (the anon role cannot read
 * auth.users). It only answers true/false, so the login form reveals no data.
 */
export async function checkEmail(email: string): Promise<LoginState> {
  const normalized = email.trim().toLowerCase()

  if (!isValidEmail(normalized)) {
    return { error: 'To nie wygląda na poprawny adres e-mail. Sprawdź, czy zawiera „@” i domenę.' }
  }

  const supabase = createClient()
  const { data, error } = await supabase.rpc('email_has_account', { check_email: normalized })

  if (error) {
    return { error: 'Nie udało się sprawdzić adresu e-mail. Spróbuj ponownie.' }
  }

  return data ? {} : { error: 'Nie mamy konta z tym adresem e-mail.' }
}

export async function signOut(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

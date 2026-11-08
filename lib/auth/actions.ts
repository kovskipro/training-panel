'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '../supabase/server'

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

export async function signOut(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

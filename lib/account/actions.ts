'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../supabase/server'
import { getOrigin } from '../auth/origin'

export type ProfileState = {
  error?: string
  saved?: boolean
}

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const fullName = String(formData.get('fullName') ?? '').trim()
  const weightRaw = String(formData.get('weightKg') ?? '')
    .trim()
    .replace(',', '.')
  const heightRaw = String(formData.get('heightCm') ?? '').trim()

  if (fullName.length < 2 || fullName.length > 80) {
    return { error: 'Imię musi mieć od 2 do 80 znaków.' }
  }

  const weightKg = Number(weightRaw)

  if (!Number.isFinite(weightKg) || weightKg <= 0 || weightKg >= 400) {
    return { error: 'Waga musi być liczbą z zakresu 1–399 kg.' }
  }

  const heightCm = Number(heightRaw)

  if (!Number.isInteger(heightCm) || heightCm < 50 || heightCm > 260) {
    return { error: 'Wzrost musi być liczbą całkowitą z zakresu 50–260 cm.' }
  }

  const { error } = await supabase
    .from('profiles')
    .upsert({ id: user.id, full_name: fullName, weight_kg: weightKg, height_cm: heightCm })

  if (error) {
    return { error: 'Nie udało się zapisać zmian. Spróbuj ponownie.' }
  }

  revalidatePath('/', 'layout')
  return { saved: true }
}

/**
 * Links a Google identity to the signed-in account. Requires "Manual linking"
 * to be enabled in the Supabase auth settings.
 */
export async function linkGoogle(): Promise<void> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data, error } = await supabase.auth.linkIdentity({
    provider: 'google',
    options: {
      redirectTo: `${getOrigin()}/auth/callback?next=${encodeURIComponent('/?tab=konto')}`,
      skipBrowserRedirect: true,
    },
  })

  if (error || !data.url) {
    redirect('/?tab=konto&link=error')
  }

  redirect(data.url)
}

/**
 * Removes the Google identity. Refused when it is the only way to sign in, so an
 * account can never be left without a usable method.
 */
export async function unlinkGoogle(): Promise<void> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data, error } = await supabase.auth.getUserIdentities()

  if (error) {
    redirect('/?tab=konto&unlink=error')
  }

  const google = data.identities.find(identity => identity.provider === 'google')

  if (!google || data.identities.length < 2) {
    redirect('/?tab=konto&unlink=blocked')
  }

  const { error: unlinkError } = await supabase.auth.unlinkIdentity(google)

  if (unlinkError) {
    redirect('/?tab=konto&unlink=error')
  }

  revalidatePath('/', 'layout')
  redirect('/?tab=konto&unlink=ok')
}

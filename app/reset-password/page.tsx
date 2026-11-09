'use client'

import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import AuthShell from '../components/AuthShell'
import { Button } from '../components/ui/Button'
import { Callout } from '../components/ui/Callout'
import { alertClass, inputClass, labelClass, submitButtonClass } from '../components/ui/form'
import { updatePassword, type LoginState } from '../../lib/auth/actions'

const initialState: LoginState = {}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="primary" disabled={pending} className={submitButtonClass}>
      {pending ? 'Ustawiam…' : 'Ustaw hasło'}
    </Button>
  )
}

export default function ResetPasswordPage() {
  const [state, formAction] = useFormState(updatePassword, initialState)

  return (
    <AuthShell
      title="Ustaw hasło"
      subtitle="Wybierz hasło do swojego konta. Od teraz zalogujesz się nim lub przez Google."
    >
      <div className="flex flex-col gap-4">
        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label htmlFor="password" className={labelClass}>
              Nowe hasło
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              autoFocus
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-neutral-400">Minimum 8 znaków.</p>
          </div>

          <div>
            <label htmlFor="passwordConfirm" className={labelClass}>
              Powtórz hasło
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className={inputClass}
            />
          </div>

          {state.error && (
            <div role="alert" aria-live="polite" className={alertClass}>
              <Callout kind="danger">{state.error}</Callout>
            </div>
          )}

          <SubmitButton />
        </form>

        <p className="text-center text-sm text-neutral-500">
          Link wygasł?{' '}
          <Link href="/forgot-password" className="underline underline-offset-2 hover:text-neutral-900">
            Wyślij nowy
          </Link>
        </p>
      </div>
    </AuthShell>
  )
}

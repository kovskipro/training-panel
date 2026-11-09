'use client'

import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import AuthShell from '../components/AuthShell'
import { Button } from '../components/ui/Button'
import { Callout } from '../components/ui/Callout'
import { inputClass, labelClass, submitButtonClass } from '../components/ui/form'
import { updatePassword, type LoginState } from '../../lib/auth/actions'

const initialState: LoginState = {}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="primary" disabled={pending} className={submitButtonClass}>
      {pending ? 'Ustawiam…' : 'Ustaw hasło i kontynuuj'}
    </Button>
  )
}

export default function SetPasswordPage() {
  const [state, formAction] = useFormState(updatePassword, initialState)

  return (
    <AuthShell
      title="Ustaw hasło"
      subtitle="Konto masz już założone. Ustaw hasło, żeby móc logować się także e-mailem — nie tylko Googlem."
    >
      <div className="flex flex-col gap-4">
        <Callout kind="info" flush>
          To jednorazowy krok. Bez hasła konto działa tylko przez Google — a po odłączeniu Google
          nie byłoby jak wejść.
        </Callout>

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
            <div role="alert" aria-live="polite">
              <Callout kind="danger" flush>{state.error}</Callout>
            </div>
          )}

          <SubmitButton />
        </form>

        <p className="text-center text-sm text-neutral-500">
          Ustawię to później?{' '}
          <Link href="/" className="underline underline-offset-2 hover:text-neutral-900">
            Pomiń
          </Link>
        </p>
      </div>
    </AuthShell>
  )
}

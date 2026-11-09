'use client'

import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import AuthShell from '../components/AuthShell'
import { Button } from '../components/ui/Button'
import { Callout } from '../components/ui/Callout'
import { alertClass, inputClass, labelClass, submitButtonClass } from '../components/ui/form'
import { requestPasswordReset, type ResetState } from '../../lib/auth/actions'

const initialState: ResetState = {}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="primary" disabled={pending} className={submitButtonClass}>
      {pending ? 'Wysyłam…' : 'Wyślij link'}
    </Button>
  )
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(requestPasswordReset, initialState)

  return (
    <AuthShell
      title="Reset hasła"
      subtitle="Podaj adres e-mail — wyślemy link do ustawienia nowego hasła."
    >
      <div className="flex flex-col gap-4">
        {state.sent ? (
          <Callout kind="safe">
            Jeśli konto istnieje, wysłaliśmy wiadomość z linkiem. Otwórz go, aby ustawić hasło.
            Tym sposobem ustawisz też hasło na koncie, które dotąd logowało się tylko przez Google.
          </Callout>
        ) : (
          <form action={formAction} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className={labelClass}>
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                autoFocus
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
        )}

        <Link
          href="/login"
          className="text-center text-sm text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-900"
        >
          Wróć do logowania
        </Link>
      </div>
    </AuthShell>
  )
}

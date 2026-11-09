'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import AuthShell from '../components/AuthShell'
import TurnstileWidget, { CAPTCHA_ENABLED } from '../components/TurnstileWidget'
import { Button } from '../components/ui/Button'
import { Callout } from '../components/ui/Callout'
import { inputClass, labelClass, submitButtonClass } from '../components/ui/form'
import { requestPasswordReset, type ResetState } from '../../lib/auth/actions'

const initialState: ResetState = {}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={pending || disabled}
      className={submitButtonClass}
    >
      {pending ? 'Wysyłam…' : 'Wyślij link'}
    </Button>
  )
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(requestPasswordReset, initialState)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)

  return (
    <AuthShell
      title="Reset hasła"
      subtitle="Podaj adres e-mail — wyślemy link do ustawienia nowego hasła."
    >
      <div className="flex flex-col gap-4">
        {state.sent ? (
          <Callout kind="safe" flush>
            Jeśli konto istnieje, wysłaliśmy wiadomość z linkiem. Otwórz go, aby ustawić hasło.
            Tym sposobem ustawisz też hasło na koncie, które dotąd logowało się tylko przez Google.
          </Callout>
        ) : (
          <form action={formAction} onSubmit={() => setResetKey(key => key + 1)} className="flex flex-col gap-4">
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
              <div role="alert" aria-live="polite">
                <Callout kind="danger" flush>{state.error}</Callout>
              </div>
            )}

            <input type="hidden" name="captchaToken" value={captchaToken ?? ''} />
            <TurnstileWidget onToken={setCaptchaToken} resetKey={resetKey} />

            <SubmitButton disabled={CAPTCHA_ENABLED && !captchaToken} />
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

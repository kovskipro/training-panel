'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import AuthShell from '../components/AuthShell'
import GoogleAuthButton from '../components/GoogleAuthButton'
import TurnstileWidget, { CAPTCHA_ENABLED } from '../components/TurnstileWidget'
import { Button } from '../components/ui/Button'
import { Callout } from '../components/ui/Callout'
import { alertClass, inputClass, labelClass, submitButtonClass } from '../components/ui/form'
import { signUp, type SignupState } from '../../lib/auth/actions'

const initialState: SignupState = {}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={pending || disabled}
      className={submitButtonClass}
    >
      {pending ? 'Tworzę konto…' : 'Utwórz konto'}
    </Button>
  )
}

export default function SignupPage() {
  const [state, formAction] = useFormState(signUp, initialState)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)

  if (state.sent) {
    return (
      <AuthShell title="Sprawdź pocztę" subtitle="Wysłaliśmy wiadomość z linkiem potwierdzającym.">
        <div className="flex flex-col gap-4">
          <Callout kind="safe">
            Kliknij link w wiadomości, aby dokończyć zakładanie konta. Jeśli nic nie przyszło,
            sprawdź folder spam. Wiadomość może dotyczyć też adresu, który już ma u nas konto —
            wtedy po prostu zaloguj się lub zresetuj hasło.
          </Callout>
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

  return (
    <AuthShell title="Utwórz konto" subtitle="Konto zakładasz na adres e-mail. Google możesz dodać później.">
      <div className="flex flex-col gap-4">
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

          <div>
            <label htmlFor="password" className={labelClass}>
              Hasło
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
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

          <input type="hidden" name="captchaToken" value={captchaToken ?? ''} />
          <TurnstileWidget onToken={setCaptchaToken} resetKey={resetKey} />

          <SubmitButton disabled={CAPTCHA_ENABLED && !captchaToken} />
        </form>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs uppercase tracking-widest text-neutral-400">lub</span>
          <span className="h-px flex-1 bg-neutral-200" />
        </div>

        <GoogleAuthButton label="Kontynuuj z Google" />

        <p className="text-center text-sm text-neutral-500">
          Masz już konto?{' '}
          <Link href="/login" className="underline underline-offset-2 hover:text-neutral-900">
            Zaloguj się
          </Link>
        </p>
      </div>
    </AuthShell>
  )
}

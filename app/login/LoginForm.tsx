'use client'

import { useState, type FormEvent } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '../components/ui/Button'
import { Callout } from '../components/ui/Callout'
import { signIn, type LoginState } from '../../lib/auth/actions'

const initialState: LoginState = {}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass =
  'w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 transition-colors focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300/70'

const submitButtonClass =
  'w-full justify-center py-2.5 disabled:cursor-not-allowed disabled:opacity-60'

// Callout renders its own margin-top, which the form's gap already provides.
const alertClass = '-mt-4'

function PasswordSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="primary" disabled={pending} className={submitButtonClass}>
      {pending ? 'Logowanie…' : 'Zaloguj się'}
    </Button>
  )
}

/**
 * Second step. It owns its own form state so that going back to the e-mail step
 * and returning starts clean instead of showing the previous attempt's error.
 */
function PasswordStep({ email, onBack }: { email: string; onBack: () => void }) {
  const [state, formAction] = useFormState(signIn, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="email" value={email} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-neutral-500">E-mail</span>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-3 py-2.5">
          <span className="truncate text-sm text-neutral-900">{email}</span>
          <button
            type="button"
            onClick={onBack}
            className="shrink-0 text-xs font-medium text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-900"
          >
            Zmień
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-neutral-500">
          Hasło
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={state.error ? true : undefined}
          className={inputClass}
        />
      </div>

      {state.error && (
        <div role="alert" aria-live="polite" className={alertClass}>
          <Callout kind="danger">{state.error}</Callout>
        </div>
      )}

      <PasswordSubmitButton />
    </form>
  )
}

export default function LoginForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  /**
   * Only the address format is checked here. Whether an account exists is never
   * revealed before the password step — otherwise the form could be used to
   * enumerate accounts. Supabase answers the same generic error for a wrong
   * password and for an unknown address, so both cases look identical.
   */
  function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const value = email.trim().toLowerCase()

    if (!EMAIL_PATTERN.test(value)) {
      setError('Nieprawidłowy adres e-mail. Sprawdź, czy zawiera „@” i domenę.')
      return
    }

    setEmail(value)
    setStep(2)
  }

  function handleEmailChange(value: string) {
    setEmail(value)

    if (error) {
      setError(null)
    }
  }

  function handleBackToEmail() {
    setError(null)
    setStep(1)
  }

  if (step === 2) {
    return <PasswordStep email={email} onBack={handleBackToEmail} />
  }

  return (
    <form onSubmit={handleEmailSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-neutral-500">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          autoFocus
          value={email}
          onChange={event => handleEmailChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          className={inputClass}
        />
      </div>

      {error && (
        <div role="alert" aria-live="polite" className={alertClass}>
          <Callout kind="danger">{error}</Callout>
        </div>
      )}

      <Button type="submit" variant="primary" className={submitButtonClass}>
        Kontynuuj z e-mailem
      </Button>
    </form>
  )
}

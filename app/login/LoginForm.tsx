'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '../components/ui/Button'
import { Callout } from '../components/ui/Callout'
import { signIn, type LoginState } from '../../lib/auth/actions'

const initialState: LoginState = {}

const inputClass =
  'w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 transition-colors focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300/70'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={pending}
      className="w-full justify-center py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Logowanie…' : 'Zaloguj się'}
    </Button>
  )
}

export default function LoginForm() {
  const [state, formAction] = useFormState(signIn, initialState)

  return (
    <form action={formAction} className="space-y-4">
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
          className={inputClass}
        />
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
          className={inputClass}
        />
      </div>

      {state.error && (
        <div role="alert" aria-live="polite">
          <Callout kind="danger">{state.error}</Callout>
        </div>
      )}

      <SubmitButton />
    </form>
  )
}

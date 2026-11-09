'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Callout } from './ui/Callout'
import { Card } from './ui/Card'
import { CardHeader } from './ui/CardHeader'
import { alertClass, inputClass, labelClass } from './ui/form'
import { linkGoogle, unlinkGoogle, updateProfile, type ProfileState } from '../../lib/account/actions'
import { signOut } from '../../lib/auth/actions'

export type AccountData = {
  fullName: string
  weightKg: number | null
  heightCm: number | null
  email: string
  hasGoogle: boolean
  canUnlinkGoogle: boolean
  notice?: string
  noticeKind?: 'safe' | 'danger'
}

const initialState: ProfileState = {}

function SaveButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={pending}
      className="justify-center px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Zapisuję…' : 'Zapisz zmiany'}
    </Button>
  )
}

function MethodRow({
  title,
  detail,
  connected,
  action,
}: {
  title: string
  detail: string
  connected: boolean
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-3">
      <div className="min-w-0">
        <div className="mb-0.5 flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-900">{title}</span>
          <Badge v={connected ? 'b-green' : 'b-gray'}>{connected ? 'Połączony' : 'Niepołączony'}</Badge>
        </div>
        <div className="truncate text-xs text-neutral-500">{detail}</div>
      </div>
      {action}
    </div>
  )
}

export default function AccountPanel({ account }: { account: AccountData }) {
  const [state, formAction] = useFormState(updateProfile, initialState)
  const bmi =
    account.weightKg !== null && account.heightCm !== null
      ? (account.weightKg / (account.heightCm / 100) ** 2).toFixed(1).replace('.', ',')
      : '—'

  return (
    <div className="panel-in space-y-4">
      {account.notice && (
        <div role="status" aria-live="polite">
          <Callout kind={account.noticeKind ?? 'safe'}>{account.notice}</Callout>
        </div>
      )}

      <Card>
        <CardHeader>
          <h3 className="font-serif text-2xl text-neutral-900">Dane profilu</h3>
        </CardHeader>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label htmlFor="fullName" className={labelClass}>
                Imię i nazwisko
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                maxLength={80}
                defaultValue={account.fullName}
                className={inputClass}
              />            </div>
            <div>
              <label htmlFor="weightKg" className={labelClass}>
                Waga (kg)
              </label>
              <input
                id="weightKg"
                name="weightKg"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="1"
                max="399"
                required
                defaultValue={account.weightKg ?? ''}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="heightCm" className={labelClass}>
                Wzrost (cm)
              </label>
              <input
                id="heightCm"
                name="heightCm"
                type="number"
                inputMode="numeric"
                step="1"
                min="50"
                max="260"
                required
                defaultValue={account.heightCm ?? ''}
                className={inputClass}
              />
            </div>
            <div>
              <span className={labelClass}>BMI</span>
              <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900">
                {bmi}
              </div>
            </div>
          </div>

          {state.error && (
            <div role="alert" aria-live="polite" className={alertClass}>
              <Callout kind="danger">{state.error}</Callout>
            </div>
          )}

          {state.saved && (
            <div role="status" aria-live="polite" className={alertClass}>
              <Callout kind="safe">
                Zapisano zmiany. Statystyki na stronie głównej są już zaktualizowane.
              </Callout>
            </div>
          )}

          <div>
            <SaveButton />
          </div>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-serif text-2xl text-neutral-900">Sesja</h3>
        </CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-neutral-500">Wylogowanie kończy sesję na tym urządzeniu.</p>
          <form action={signOut}>
            <Button type="submit" variant="secondary" className="px-4 py-2.5">
              Wyloguj się
            </Button>
          </form>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-serif text-2xl text-neutral-900">Sposoby logowania</h3>
        </CardHeader>

        <div className="flex flex-col gap-3">
          <MethodRow title="E-mail i hasło" detail={account.email} connected />

          {account.hasGoogle ? (
            <MethodRow
              title="Google"
              detail={account.canUnlinkGoogle ? 'Połączony z tym kontem' : 'Jedyny sposób logowania'}
              connected
              action={
                <form action={unlinkGoogle}>
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={!account.canUnlinkGoogle}
                    className={`px-3 py-2 text-xs ${account.canUnlinkGoogle ? '' : 'cursor-not-allowed opacity-60'}`}
                  >
                    Odłącz
                  </Button>
                </form>
              }
            />
          ) : (
            <MethodRow
              title="Google"
              detail="Nie jest jeszcze połączony"
              connected={false}
              action={
                <form action={linkGoogle}>
                  <Button type="submit" variant="secondary" className="px-3 py-2 text-xs">
                    Połącz
                  </Button>
                </form>
              }
            />
          )}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-neutral-400">
          Konto Google można połączyć tylko z jednym kontem — jeśli jest już przypisany gdzie
          indziej, połączenie zostanie odrzucone. Hasło do konta ustawisz przez „Nie pamiętasz
          hasła?” na ekranie logowania, także gdy konto dotąd logowało się tylko przez Google.
        </p>
      </Card>
    </div>
  )
}

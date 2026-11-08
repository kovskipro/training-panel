'use client'

import { Card } from './components/ui/Card'
import { Button } from './components/ui/Button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">Plan treningowy · Błąd</p>
        <h1 className="mb-2 font-serif text-4xl leading-tight text-neutral-900">Coś poszło nie tak</h1>
        <p className="mb-6 text-sm text-neutral-400">
          Nie udało się wczytać tej strony. Spróbuj ponownie za chwilę.
        </p>
        <Card>
          <Button type="button" variant="primary" onClick={reset} className="w-full justify-center py-2.5">
            Spróbuj ponownie
          </Button>
          {error.digest && (
            <p className="mt-3 font-mono text-xs text-neutral-400">Kod błędu: {error.digest}</p>
          )}
        </Card>
      </div>
    </main>
  )
}

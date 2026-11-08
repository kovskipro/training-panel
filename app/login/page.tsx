import type { Metadata } from 'next'
import { Card } from '../components/ui/Card'
import { ThemeLogo } from '../components/ui/ThemeLogo'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Logowanie – Plan treningowy',
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
            Plan treningowy · Dostęp
          </p>
          <h1 className="mb-2 flex items-center justify-center gap-3 font-serif text-4xl leading-tight text-neutral-900">
            <ThemeLogo />
            Zaloguj się
          </h1>
          <p className="text-sm text-neutral-400">
            Zaloguj się, aby zobaczyć swój plan treningowy.
          </p>
        </div>
        <Card>
          <LoginForm />
        </Card>
      </div>
    </main>
  )
}

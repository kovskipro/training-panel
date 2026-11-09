import type { Metadata } from 'next'
import AuthShell from '../components/AuthShell'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Logowanie – Plan treningowy',
}

const messages: Record<string, string> = {
  oauth: 'Nie udało się zalogować przez Google. Spróbuj ponownie.',
  link: 'Link jest nieprawidłowy lub wygasł. Poproś o nowy.',
}

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const initialError = searchParams.error ? messages[searchParams.error] : undefined

  return (
    <AuthShell title="Zaloguj się" subtitle="Zaloguj się, aby zobaczyć swój plan treningowy.">
      <LoginForm initialError={initialError} />
    </AuthShell>
  )
}

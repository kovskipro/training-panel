import type { ReactNode } from 'react'
import { Card } from './ui/Card'
import { ThemeLogo } from './ui/ThemeLogo'

export default function AuthShell({
  eyebrow = 'Plan treningowy · Dostęp',
  title,
  subtitle,
  children,
}: {
  eyebrow?: string
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">{eyebrow}</p>
          <h1 className="mb-2 flex items-center justify-center gap-3 font-serif text-4xl leading-tight text-neutral-900">
            <ThemeLogo />
            {title}
          </h1>
          <p className="text-sm text-neutral-400">{subtitle}</p>
        </div>
        <Card>{children}</Card>
      </div>
    </main>
  )
}

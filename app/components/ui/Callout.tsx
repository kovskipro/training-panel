'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useTheme } from '../ThemeProvider'

export type CalloutKind = 'info' | 'safe' | 'warn' | 'danger'

const calloutPalette: Record<'light' | 'dark', Record<CalloutKind, CSSProperties>> = {
  light: {
    info: { backgroundColor: 'hsl(217, 91%, 97%)', color: 'hsl(222, 47%, 11%)', borderColor: 'hsla(217, 91%, 60%, 0.25)' },
    safe: { backgroundColor: 'hsl(140, 60%, 96%)', color: 'hsl(140, 60%, 12%)', borderColor: 'hsla(140, 60%, 35%, 0.25)' },
    warn: { backgroundColor: 'hsl(35, 100%, 97%)', color: 'hsl(35, 100%, 20%)', borderColor: 'hsla(35, 90%, 65%, 0.25)' },
    danger: { backgroundColor: 'hsl(0, 100%, 97%)', color: 'hsl(0, 60%, 15%)', borderColor: 'hsla(0, 70%, 50%, 0.25)' },
  },
  dark: {
    info: { backgroundColor: 'hsla(217, 91%, 60%, 0.14)', color: 'hsl(210, 100%, 88%)', borderColor: 'hsla(217, 91%, 60%, 0.25)' },
    safe: { backgroundColor: 'hsla(142, 76%, 36%, 0.14)', color: 'hsl(142, 70%, 85%)', borderColor: 'hsla(140, 70%, 65%, 0.25)' },
    warn: { backgroundColor: 'hsla(35, 92%, 58%, 0.14)', color: 'hsl(35, 90%, 88%)', borderColor: 'hsla(35, 90%, 65%, 0.25)' },
    danger: { backgroundColor: 'hsla(0, 84%, 60%, 0.14)', color: 'hsl(0, 90%, 88%)', borderColor: 'hsla(0, 70%, 50%, 0.25)' },
  },
}

export function Callout({
  kind,
  children,
  flush = false,
}: {
  kind: CalloutKind
  children: ReactNode
  /** Drop the built-in top margin when the parent already spaces its children. */
  flush?: boolean
}) {
  const { resolvedTheme } = useTheme()

  return (
    <div
      className={`co co-${kind}`}
      style={{
        display: 'block',
        marginTop: flush ? 0 : '1rem',
        padding: '0.75rem 1rem',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        borderRadius: '0.75rem',
        background: `linear-gradient(to right, ${calloutPalette[resolvedTheme][kind].backgroundColor}, ${calloutPalette[resolvedTheme][kind].borderColor})`,
        color: calloutPalette[resolvedTheme][kind].color,
      }}
    >
      {children}
    </div>
  )
}

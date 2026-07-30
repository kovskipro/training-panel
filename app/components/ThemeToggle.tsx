'use client'

import { useEffect, useState } from 'react'
import { ThemeMode, useTheme } from './ThemeProvider'

const options: Array<{ value: ThemeMode; label: string; short: string }> = [
  { value: 'system', label: 'Systemowy', short: 'System' },
  { value: 'light', label: 'Jasny', short: 'Jasny' },
  { value: 'dark', label: 'Ciemny', short: 'Ciemny' },
]

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="theme-toggle-skeleton" aria-hidden="true" />
  }

  return (
    <div className="theme-toggle">
      <div className="theme-toggle-header">
        <span className="theme-toggle-label">Motyw</span>
        <span className="theme-toggle-state">{theme === 'system' ? `System · ${resolvedTheme === 'dark' ? 'ciemny' : 'jasny'}` : options.find(option => option.value === theme)?.label}</span>
      </div>
      <div className="theme-toggle-group" role="group" aria-label="Zmień motyw strony">
        {options.map(option => (
          <button
            key={option.value}
            type="button"
            className="theme-toggle-btn"
            data-active={theme === option.value}
            onClick={() => setTheme(option.value)}
            aria-pressed={theme === option.value}
          >
            <span className="theme-toggle-btn-short">{option.short}</span>
            <span className="sr-only">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
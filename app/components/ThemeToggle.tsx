'use client'

import { useEffect, useState } from 'react'
import { Monitor, Sun, Moon } from 'lucide-react'
import { ThemeMode, useTheme } from './ThemeProvider'

const options: Array<{ value: ThemeMode; Icon: typeof Monitor; aria: string }> = [
  { value: 'system', Icon: Monitor, aria: 'Systemowy' },
  { value: 'light', Icon: Sun, aria: 'Jasny' },
  { value: 'dark', Icon: Moon, aria: 'Ciemny' },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return <div className="h-8 rounded-xl border border-stone-200 bg-white w-[7.5rem]" aria-hidden="true" />
  }

  return (
    <div
      className="inline-flex h-8 rounded-xl border border-stone-200 bg-white overflow-hidden"
      role="group"
      aria-label="Zmień motyw strony"
    >
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          className="h-8 px-3 flex items-center justify-center text-xs font-medium transition-colors border-r border-stone-200 last:border-r-0 text-stone-500 hover:text-stone-800 hover:bg-stone-50 data-[active=true]:bg-stone-900 data-[active=true]:text-white data-[active=true]:hover:bg-stone-800"
          data-active={theme === option.value}
          onClick={() => setTheme(option.value)}
          aria-pressed={theme === option.value}
          aria-label={option.aria}
        >
          <option.Icon size={16} />
        </button>
      ))}
    </div>
  )
}

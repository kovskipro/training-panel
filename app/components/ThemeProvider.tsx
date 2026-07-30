'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

type ThemeContextValue = {
  theme: ThemeMode
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: ThemeMode) => void
}

const STORAGE_KEY = 'training-plan-theme'

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function readStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch (error) {}

  return null
}

function getInitialTheme(): ThemeMode {
  return readStoredTheme() ?? 'system'
}

function getInitialResolvedTheme(theme: ThemeMode): 'light' | 'dark' {
  if (typeof document !== 'undefined') {
    const themeAttribute = document.documentElement.dataset.theme
    if (themeAttribute === 'light' || themeAttribute === 'dark') {
      return themeAttribute
    }
  }

  if (typeof window === 'undefined') {
    return 'light'
  }

  return theme === 'system' ? getSystemTheme() : theme
}

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(theme: ThemeMode): 'light' | 'dark' {
  return theme === 'system' ? getSystemTheme() : theme
}

function applyTheme(theme: ThemeMode): 'light' | 'dark' {
  const resolved = resolveTheme(theme)
  const root = document.documentElement

  root.dataset.theme = resolved
  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved

  return resolved
}

function persistTheme(theme: ThemeMode) {
  try {
    document.cookie = `training-plan-theme=${theme}; path=/; max-age=31536000; samesite=lax`
  } catch (error) {}
}

export function ThemeProvider({ children, initialTheme }: { children: React.ReactNode; initialTheme: 'light' | 'dark' }) {
  const [theme, setThemeState] = useState<ThemeMode>(initialTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(initialTheme)

  useEffect(() => {
    const storedTheme = readStoredTheme() ?? 'system'
    setThemeState(storedTheme)
    setResolvedTheme(applyTheme(storedTheme))
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch (error) {}

    persistTheme(theme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const syncTheme = () => setResolvedTheme(applyTheme(theme))

    syncTheme()

    if (theme !== 'system') {
      return
    }

    mediaQuery.addEventListener('change', syncTheme)
    return () => mediaQuery.removeEventListener('change', syncTheme)
  }, [theme])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme: setThemeState }),
    [theme, resolvedTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
'use client'

import { useTheme } from '../ThemeProvider'

export function ThemeLogo() {
  const { resolvedTheme } = useTheme()
  const logoSrc = resolvedTheme === 'dark' ? '/logo.svg' : '/logo-dark.svg'
  return <img src={logoSrc} alt="Logo" className="h-9" />
}
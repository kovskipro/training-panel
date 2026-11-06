'use client'

import { useTheme } from '../ThemeProvider'

export function ThemeLogo() {
  const { resolvedTheme } = useTheme()
  const logoColor = resolvedTheme === 'dark' ? '#fff' : '#1a1a1a'

  return (
    <span
      role="img"
      aria-label="Logo"
      className="block h-9 w-9"
      style={{
        backgroundColor: logoColor,
        mask: "url('/logo.svg') center / contain no-repeat",
        WebkitMask: "url('/logo.svg') center / contain no-repeat",
      }}
    />
  )
}

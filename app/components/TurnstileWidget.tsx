'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from './ThemeProvider'

// Public by design; the secret half stays in the Supabase dashboard.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

/** Lets forms disable their submit button until the challenge is solved. */
export const CAPTCHA_ENABLED = Boolean(SITE_KEY)

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string
  reset: (widgetId?: string) => void
  remove: (widgetId?: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

/**
 * Cloudflare Turnstile. Renders nothing unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is
 * set, so the app keeps working before the project configures CAPTCHA.
 */
export default function TurnstileWidget({
  onToken,
  resetKey = 0,
}: {
  onToken: (token: string | null) => void
  resetKey?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  const [scriptReady, setScriptReady] = useState(false)
  const { resolvedTheme } = useTheme()

  onTokenRef.current = onToken

  useEffect(() => {
    if (!scriptReady || !SITE_KEY || !window.turnstile) return
    if (widgetIdRef.current || !containerRef.current) return

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      theme: resolvedTheme,
      language: 'pl',
      callback: (token: string) => onTokenRef.current(token),
      'expired-callback': () => onTokenRef.current(null),
      'error-callback': () => onTokenRef.current(null),
    })
  }, [scriptReady, resolvedTheme])

  // Tokens are single use, so each submit attempt starts a fresh challenge.
  useEffect(() => {
    if (resetKey === 0 || !window.turnstile || !widgetIdRef.current) return
    window.turnstile.reset(widgetIdRef.current)
    onTokenRef.current(null)
  }, [resetKey])

  useEffect(() => {
    return () => {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [])

  if (!SITE_KEY) return null

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="flex justify-center" />
    </>
  )
}

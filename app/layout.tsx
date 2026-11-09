import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import './fonts.css'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://workout.kovski.pro'),
  title: 'Plan treningowy – 15 lat · 6 dni',
  description: 'Kompleksowy 6-dniowy plan treningowy – brzuch, biceps, triceps, przedramię i całe ciało. Redukcja + budowa mięśni.',
  openGraph: {
    title: 'Plan treningowy – 15 lat · 6 dni',
    description: 'Kompleksowy 6-dniowy plan treningowy. Redukcja + budowa mięśni.',
    type: 'website',
    images: [{ url: '/screenshot.png', width: 1200, height: 630, alt: 'Plan treningowy' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@plan_treningowy',
    title: 'Plan treningowy – 15 lat · 6 dni',
    description: 'Kompleksowy 6-dniowy plan treningowy. Redukcja + budowa mięśni.',
    images: ['/screenshot.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const savedTheme = cookies().get('training-plan-theme')?.value
  const initialTheme = savedTheme === 'dark' ? 'dark' : 'light'
  const themeScript = `
(function() {
  try {
    const storageKey = 'training-plan-theme';
    const root = document.documentElement;
    const stored = window.localStorage.getItem(storageKey);
    const theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    const resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    root.dataset.theme = resolved;
    root.classList.toggle('dark', resolved === 'dark');
    root.style.colorScheme = resolved;
  } catch (error) {}
})();
`

  return (
    <html lang="pl" data-theme={initialTheme} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#f5f5f5" />
        <meta name="msapplication-TileColor" content="#f5f5f5" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider initialTheme={initialTheme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

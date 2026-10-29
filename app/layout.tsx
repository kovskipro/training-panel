import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Instrument_Serif, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

const serif = Instrument_Serif({ weight:['400'], subsets:['latin'], variable:'--font-serif' })
const sans  = DM_Sans({ subsets:['latin'], variable:'--font-sans', weight:['300','400','500','600'] })
const mono  = DM_Mono({ subsets:['latin'], variable:'--font-mono', weight:['400','500'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://training-plan.vercel.app'),
  title: 'Plan treningowy – 15 lat · 6 dni',
  description: 'Kompleksowy 6-dniowy plan treningowy – brzuch, biceps, triceps, przedramię i całe ciało. Redukcja + budowa mięśni.',
  openGraph: {
    title: 'Plan treningowy – 15 lat · 6 dni',
    description: 'Kompleksowy 6-dniowy plan treningowy. Redukcja + budowa mięśni.',
    images: [{ url: '/screenshot.png' }],
  },
  twitter: {
    card: 'summary_large_image',
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
    <html lang="pl" className={`${serif.variable} ${sans.variable} ${mono.variable}`} data-theme={initialTheme} suppressHydrationWarning>
      <head>
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

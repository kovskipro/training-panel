'use client'
import type { BadgeVariant, Exercise } from '../data'
import { useTheme } from './ThemeProvider'

type CalloutKind = 'info'|'safe'|'warn'|'danger'

const calloutPalette: Record<'light' | 'dark', Record<CalloutKind, React.CSSProperties>> = {
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

export { useTheme } from './ThemeProvider'

export function ThemeLogo() {
  const { resolvedTheme } = useTheme()
  const logoSrc = resolvedTheme === 'dark' ? '/logo.svg' : '/logo-dark.svg'
  return <img src={logoSrc} alt="Logo" className="h-9" />
}

export function Badge({ v, children }: { v: BadgeVariant; children: React.ReactNode }) {
  return <span className={`badge ${v}`}>{children}</span>
}

export function Callout({ kind, children }: { kind: CalloutKind; children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()

  return (
    <div
      className={`co co-${kind}`}
      style={{
        display: 'block',
        marginTop: '1rem',
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

export function ExTable({ rows }: { rows: Exercise[] }) {
  return (
    <>
      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-neutral-100">
        {rows.map(ex => (
          <div key={ex.id} className="py-4 px-1">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="exn mr-2">#{ex.id}</span>
                <span className="font-medium text-neutral-900 text-sm">{ex.name}</span>
                {ex.sub && <span className="block text-xs text-neutral-500 mt-0.5 ml-6">{ex.sub}</span>}
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-medium text-green-700">{ex.sets}</div>
                <div className="text-xs text-neutral-500">pauza: {ex.rest}</div>
              </div>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed mb-2 ml-6">{ex.tips}</p>
            <div className="ml-6 flex flex-col gap-1">
              <a href={ex.yt1} target="_blank" rel="noopener noreferrer" className="yt">▶ {ex.yt1label}</a>
              {ex.yt2 && <a href={ex.yt2} target="_blank" rel="noopener noreferrer" className="yt">▶ {ex.yt2label}</a>}
            </div>
          </div>
        ))}
      </div>
      {/* Desktop table */}
      <div className="tw hidden md:block">
        <table className="dt">
          <thead><tr><th>#</th><th>Ćwiczenie</th><th>Serie × Pow.</th><th>Przerwa</th><th>Wskazówki techniczne</th><th>YouTube</th></tr></thead>
          <tbody>
            {rows.map(ex => (
              <tr key={ex.id}>
                <td><span className="exn">{ex.id}</span></td>
                <td>
                  <div className="font-medium text-neutral-900">{ex.name}</div>
                  {ex.sub && <div className="text-xs text-neutral-500 mt-0.5">{ex.sub}</div>}
                </td>
                <td className="text-green-700 font-medium whitespace-nowrap">{ex.sets}</td>
                <td className="text-neutral-500">{ex.rest}</td>
                <td className="text-xs leading-relaxed text-neutral-600">{ex.tips}</td>
                <td>
                  <a href={ex.yt1} target="_blank" rel="noopener noreferrer" className="yt">▶ {ex.yt1label}</a>
                  {ex.yt2 && <a href={ex.yt2} target="_blank" rel="noopener noreferrer" className="yt">▶ {ex.yt2label}</a>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

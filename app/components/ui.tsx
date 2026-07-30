'use client'
import type { BadgeVariant, Exercise } from '../data'
import { useTheme } from './ThemeProvider'

type CalloutKind = 'info'|'safe'|'warn'|'danger'

const calloutPalette: Record<'light' | 'dark', Record<CalloutKind, React.CSSProperties>> = {
  light: {
    info: { backgroundColor: '#eff6ff', color: '#1e3a8a', borderLeft: '4px solid #60a5fa' },
    safe: { backgroundColor: '#f0fdf4', color: '#166534', borderLeft: '4px solid #16a34a' },
    warn: { backgroundColor: '#fffbeb', color: '#92400e', borderLeft: '4px solid #f59e0b' },
    danger: { backgroundColor: '#fef2f2', color: '#991b1b', borderLeft: '4px solid #ef4444' },
  },
  dark: {
    info: { backgroundColor: 'rgba(59, 130, 246, 0.14)', color: '#bfdbfe', borderLeft: '4px solid #60a5fa' },
    safe: { backgroundColor: 'rgba(34, 197, 94, 0.14)', color: '#bbf7d0', borderLeft: '4px solid #34d399' },
    warn: { backgroundColor: 'rgba(245, 158, 11, 0.14)', color: '#fde68a', borderLeft: '4px solid #f59e0b' },
    danger: { backgroundColor: 'rgba(239, 68, 68, 0.14)', color: '#fecaca', borderLeft: '4px solid #f87171' },
  },
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
        borderRadius: '0 0.75rem 0.75rem 0',
        ...calloutPalette[resolvedTheme][kind],
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
      <div className="md:hidden divide-y divide-stone-100">
        {rows.map(ex => (
          <div key={ex.id} className="py-4 px-1">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="exn mr-2">#{ex.id}</span>
                <span className="font-medium text-stone-900 text-sm">{ex.name}</span>
                {ex.sub && <span className="block text-xs text-stone-500 mt-0.5 ml-6">{ex.sub}</span>}
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-medium text-green-700">{ex.sets}</div>
                <div className="text-xs text-stone-500">pauza: {ex.rest}</div>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed mb-2 ml-6">{ex.tips}</p>
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
          <thead>
            <tr>
              <th className="w-8">#</th>
              <th className="w-48">Ćwiczenie</th>
              <th className="w-32">Serie × Pow.</th>
              <th className="w-20">Przerwa</th>
              <th>Wskazówki techniczne</th>
              <th className="w-52">YouTube</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(ex => (
              <tr key={ex.id}>
                <td><span className="exn">{ex.id}</span></td>
                <td>
                  <div className="font-medium text-stone-900">{ex.name}</div>
                  {ex.sub && <div className="text-xs text-stone-500 mt-0.5">{ex.sub}</div>}
                </td>
                <td className="text-green-700 font-medium whitespace-nowrap">{ex.sets}</td>
                <td className="text-stone-500">{ex.rest}</td>
                <td className="text-xs leading-relaxed text-stone-600">{ex.tips}</td>
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

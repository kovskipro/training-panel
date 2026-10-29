'use client'
import { progression, progressChecks } from '../data'
import FooterAnimation from './FooterAnimation'
import { Callout } from './ui'
import { useTheme } from './ThemeProvider'

export default function ProgresjaPanel() {
  const { resolvedTheme } = useTheme()
  const infoBg = resolvedTheme === 'dark' ? 'hsla(217, 91%, 60%, 0.14)' : 'hsl(217, 91%, 97%)'
  const infoColor = resolvedTheme === 'dark' ? 'hsl(210, 100%, 88%)' : 'hsl(222, 47%, 11%)'
  return (
    <div className="panel-in space-y-4">
      <div className="card">
        <div className="card-hdr">
          <h3 className="font-serif text-2xl text-neutral-900">Progresja 8-tygodniowa</h3>
        </div>
        <div className="space-y-4 mb-4">
          {progression.map(p => (
            <div key={p.weeks} className="flex gap-4">
              <div className="shrink-0 mt-0.5">
                <div className="w-10 h-10 rounded-full text-xs font-medium flex items-center justify-center" style={{ backgroundColor: infoBg, color: infoColor }}>{p.weeks}</div>
              </div>
              <div>
                <div className="font-medium text-neutral-900 mb-1">{p.title}</div>
                <p className="text-sm text-neutral-500 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <Callout kind="info">Nie zwiększaj jednocześnie obciążenia I liczby powtórzeń – wybierz jedno. Bezpieczna progresja: +1–2 kg co 1–2 tygodnie przy dużych ćwiczeniach, +0,5 kg co 2 tygodnie przy izolacji.</Callout>
          <Callout kind="warn">Unikaj ćwiczeń z maksymalnym ciężarem (1RM). W wieku 15 lat płytki wzrostowe są aktywne. Każde ćwiczenie musi pozwalać na min. 6–8 powtórzeń z pełną kontrolą techniczną.</Callout>
          <Callout kind="info">Brzuch widać przez niski % tkanki tłuszczowej, nie tylko przez liczbę ćwiczeń. Core w każdym schemacie + 6 dni treningu + dieta = efekty widoczne po 6–10 tygodniach.</Callout>
        </div>
      </div>

      <div className="card">
        <div className="card-hdr">
          <h3 className="font-serif text-2xl text-neutral-900">Kontrola postępów</h3>
        </div>
        <div className="md:hidden space-y-3">
          {progressChecks.map((c,i) => (
            <div key={i} className="py-2 border-b border-neutral-100 last:border-0">
              <div className="font-medium text-sm text-neutral-900">{c.what}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{c.freq}</div>
              <div className="text-xs text-neutral-400 mt-0.5">{c.how}</div>
            </div>
          ))}
        </div>
        <div className="hidden md:block tw mb-0">
          <table className="dt">
            <thead><tr><th>Co mierzyć</th><th className="w-44">Jak często</th><th>Jak mierzyć</th></tr></thead>
            <tbody>
              {progressChecks.map((c,i) => (
                <tr key={i}>
                  <td className="font-medium text-neutral-800">{c.what}</td>
                  <td className="text-neutral-500">{c.freq}</td>
                  <td className="text-neutral-500">{c.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <FooterAnimation>
        <footer className="max-w-6xl mx-auto px-4 py-8 mt-6">
          <p className="text-xs text-neutral-300 text-center">Plan treningowy · oparty na wytycznych AAP, NSCA, WHO · Przed zmianą suplementacji skonsultuj się z lekarzem</p>
        </footer>
      </FooterAnimation>
    </div>
  )
}

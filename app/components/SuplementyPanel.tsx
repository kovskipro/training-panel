'use client'
import { supplements, suppTimeline, creatineFaq } from '../data'
import FooterAnimation from './FooterAnimation'
import { Badge, Callout } from './ui'

const statusBadge = { ok:'b-green', caution:'b-amber', no:'b-red' } as const
const statusLabel = { ok:'Zalecane', caution:'Ostrożnie', no:'Nie' } as const

export default function SuplementyPanel() {
  const mainSupps = supplements.filter(s => s.dose !== '–')
  return (
    <div className="panel-in space-y-4">
      <Callout kind="danger"><strong>Zastrzeżenie wiekowe:</strong> Większość suplementów pre-workoutowych nie ma badań bezpieczeństwa dla osób poniżej 18 lat. Poniższe zalecenia opierają się na dostępnych danych naukowych. Warto porozmawiać z lekarzem lub dietetykiem sportowym.</Callout>

      {/* Overview grid */}
      <div className="card">
        <div className="card-hdr"><h3 className="font-serif text-2xl text-neutral-900">Przegląd suplementów</h3></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {supplements.map(s => (
            <div key={s.name} className="bg-white rounded-2xl border border-neutral-200 p-4">
              <div className="font-medium text-sm text-neutral-900 mb-1.5">{s.name}</div>
              <div className="mb-2"><Badge v={statusBadge[s.status]}>{s.verdict}</Badge></div>
              <p className="text-xs text-neutral-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="card">
        <div className="card-hdr"><h3 className="font-serif text-2xl text-neutral-900">Harmonogram dzienny</h3></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          {suppTimeline.map((t,i) => (
            <div key={i} className="border border-neutral-200 rounded-xl p-3 bg-white">
              <div className="text-xs text-neutral-400 mb-1.5 leading-snug">{t.time}</div>
              <div className="font-medium text-sm text-neutral-900 mb-1">{t.name}</div>
              <div className="text-xs text-neutral-500 whitespace-pre-line leading-relaxed">{t.detail}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-neutral-400 mb-3">W dni bez treningu: cytrulina odpada, reszta bez zmian. Kreatyna działa kumulacyjnie – bierz codziennie.</div>
        <div className="space-y-3">
          <Callout kind="safe"><strong>Priorytet:</strong> 1. Witamina D3+K2 → 2. Magnez → 3. Omega-3 → 4. Białko (jeśli brakuje) → 5. Kreatyna (opcja) → 6. Cytrulina (opcja, ostatnia)</Callout>
          <Callout kind="warn"><strong>Twoje zapasy przy 6 treningach/tydz.:</strong> 105 porcji kreatyny (1/dzień) = ~3,5 miesiąca. 60 porcji cytruliniy (6 treningów/tydz.) = ~10 tygodni. Cytrulina skończy się pierwsza – ok. 6 tygodni przed kreatyną.</Callout>
          <Callout kind="info">Wybieraj suplementy z certyfikatem <strong>Informed Sport</strong> lub <strong>NSF Certified for Sport</strong>.</Callout>
        </div>
      </div>

      {/* Protocol table */}
      <div className="card">
        <div className="card-hdr"><h3 className="font-serif text-2xl text-neutral-900">Dawki i protokół</h3></div>
        <div className="md:hidden space-y-3">
          {mainSupps.map(s => (
            <div key={s.name} className="py-3 border-b border-neutral-100 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-neutral-900">{s.name}</span>
                <Badge v={statusBadge[s.status]}>{s.verdict}</Badge>
              </div>
              <div className="text-xs text-neutral-500 mb-0.5"><span className="font-medium">Dawka:</span> {s.dose}</div>
              <div className="text-xs text-neutral-500 mb-1"><span className="font-medium">Kiedy:</span> {s.when}</div>
              <p className="text-xs text-neutral-400">{s.details}</p>
            </div>
          ))}
        </div>
        <div className="hidden md:block tw mb-0">
          <table className="dt">
            <thead><tr><th className="w-40">Suplement</th><th className="w-24">Ocena</th><th className="w-48">Dawka</th><th className="w-52">Kiedy brać</th><th>Szczegóły</th></tr></thead>
            <tbody>
              {mainSupps.map(s => (
                <tr key={s.name}>
                  <td className="font-medium text-neutral-800">{s.name}</td>
                  <td><Badge v={statusBadge[s.status]}>{s.verdict}</Badge></td>
                  <td className="text-neutral-500">{s.dose}</td>
                  <td className="text-neutral-500">{s.when}</td>
                  <td className="text-xs text-neutral-500 leading-relaxed">{s.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="card">
        <div className="card-hdr"><h3 className="font-serif text-2xl text-neutral-900">FAQ – Kreatyna u nastolatków</h3></div>
        <div className="space-y-0">
          {creatineFaq.map((f,i) => (
            <div key={i} className="py-3 border-b border-neutral-100 last:border-0">
              <div className="font-medium text-sm text-neutral-900">{f.q}</div>
              <p className="text-sm text-neutral-500 leading-relaxed">{f.a}</p>
            </div>
          ))}
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

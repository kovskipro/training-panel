'use client'
import { weeklyPlan } from '../data'
import { Badge, Callout } from './ui'

export default function PlanPanel() {
  return (
    <div className="panel-in space-y-4">
      <div className="card">
        <div className="card-hdr">
          <div>
            <h3 className="font-serif text-2xl text-stone-900">6-dniowy plan tygodniowy</h3>
            <p className="text-sm text-stone-500 mt-0.5">Każda partia mięśniowa ma min. 48 h regeneracji zanim pojawi się ponownie</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
          {weeklyPlan.map(row => (
            <div
              key={row.day}
              className="rounded-2xl border border-stone-200 bg-white p-4 min-h-[140px]"
            >
              <div className="text-xs font-medium text-stone-400 mb-2 uppercase tracking-wide">{row.day}</div>
              <div className="mb-2">
                <Badge v={row.badge}>{row.label}</Badge>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed">{row.focus}</div>
            </div>
          ))}
        </div>

        <Callout kind="safe">
          <strong>Dlaczego 6 dni działa bez przetrenowania:</strong> Klatka + triceps w poniedziałek → odpoczywają wt/śr/czw → brak bezpośredniego obciążenia do piątku. Biceps ćwiczony wt i pt – 3 dni przerwy. Core codziennie, ale inny rejon (górny, boczny, dolny, plank) – mała objętość per sesja = pełna regeneracja.
        </Callout>
      </div>

      <div className="card">
        <div className="card-hdr">
          <h3 className="font-serif text-2xl text-stone-900">Czas trwania treningów</h3>
        </div>
        <div className="tw">
          <table className="dt">
            <thead><tr><th>Schemat</th><th>Partia główna</th><th className="w-20">Ćwiczeń</th><th className="w-28">Czas</th></tr></thead>
            <tbody>
              {[
                { s:'A', badge:'b-blue',   label:'Schemat A', focus:'Klatka · Triceps · Barki · Core',         n:7, t:'60–75 min' },
                { s:'B', badge:'b-teal',   label:'Schemat B', focus:'Plecy · Biceps · Przedramię · Core boczny', n:7, t:'65–80 min' },
                { s:'C', badge:'b-purple', label:'Schemat C', focus:'Nogi (quad/pośladki) · Core dolny',        n:6, t:'60–70 min' },
                { s:'D', badge:'b-amber',  label:'Schemat D', focus:'Barki (3 głowy) · Triceps · Plank',        n:7, t:'60–75 min' },
                { s:'E', badge:'b-red',    label:'Schemat E', focus:'Biceps · Przedramię · HIIT',               n:7, t:'65–80 min' },
                { s:'F', badge:'b-green',  label:'Schemat F', focus:'Nogi (dwugłowe/łydki) · Core · Cardio',    n:7, t:'70–90 min' },
              ].map(r => (
                <tr key={r.s}>
                  <td><Badge v={r.badge as any}>{r.label}</Badge></td>
                  <td className="text-stone-600">{r.focus}</td>
                  <td className="text-stone-500">{r.n}</td>
                  <td className="font-medium text-green-700">{r.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout kind="info">Łącznie z rozgrzewką (8 min) i schłodzeniem (8 min) każdy trening mieści się w 75–100 min. Przy sprawnym tempie przerw – bliżej 60–75 min.</Callout>
      </div>
    </div>
  )
}

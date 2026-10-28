'use client'
import { Callout } from './ui'

const recovery = [
  { topic:'Sen', rec:'8–10 godzin dziennie', why:'W nocy wydzielany jest hormon wzrostu – kluczowy dla budowy mięśni i regeneracji po 6 treningach tygodniowo.' },
  { topic:'Przerwa między partiami', rec:'Min. 48 h dla tej samej grupy mięśni', why:'Plan jest tak ułożony, że każda partia dostaje min. 2 dni przerwy. Respektuj to i nie dorzucaj dodatkowych sesji.' },
  { topic:'Nawodnienie', rec:'2,5–3,5 l wody dziennie', why:'6 treningów tygodniowo = więcej potu = większe zapotrzebowanie. Zmęczenie = często odwodnienie.' },
  { topic:'Mobilność', rec:'10–15 min dziennie (opcjonalnie)', why:'Foam roller, rozciąganie, joga w niedzielę – poprawia zakresy ruchu i redukuje zakwasy po intensywnym tygodniu.' },
]

const nutrition = [
  { el:'Białko', rec:'1,4–1,8 g/kg = 95–122 g/dzień', ex:'Kurczak, jajka, twaróg, ryby, jogurt grecki, strączkowe. Rozłóż na 4–5 posiłków.' },
  { el:'Węglowodany', rec:'Nie eliminuj – główne paliwo', ex:'Owsianka, ryż, ziemniaki, pełnoziarniste pieczywo, owoce. Więcej w dni treningowe.' },
  { el:'Tłuszcze', rec:'Min. 20% kalorii', ex:'Orzechy, awokado, oliwa, jajka. Kluczowe dla hormonów wzrostu.' },
  { el:'Przed treningiem', rec:'Posiłek 60–90 min przed', ex:'Owsianka z jogurtem, kanapka z jajkiem, banan z twarożkiem.' },
  { el:'Po treningu', rec:'Posiłek do 60 min po', ex:'Kurczak z ryżem, jogurt z granolą, koktajl z mlekiem i bananem.' },
  { el:'Czego unikać', rec:'Ultraprzetworzone, fast food, słodzone napoje', ex:'Główne źródło pustych kalorii – spowalniają redukcję tkanki tłuszczowej.' },
]

export default function RegeneracjaPanel() {
  return (
    <div className="panel-in space-y-4">
      <div className="card">
        <div className="card-hdr">
          <h3 className="font-serif text-2xl text-neutral-900">Sen i regeneracja</h3>
        </div>
        <div className="space-y-0">
          {recovery.map((r,i) => (
            <div key={i} className="grid md:grid-cols-3 gap-1 md:gap-4 py-3 border-b border-neutral-100 last:border-0">
              <div className="font-medium text-sm text-neutral-900">{r.topic}</div>
              <div className="text-sm text-green-700 font-medium">{r.rec}</div>
              <div className="text-sm text-neutral-500">{r.why}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-hdr">
          <h3 className="font-serif text-2xl text-neutral-900">Odżywianie – praktyczne wskazówki</h3>
        </div>
        <div className="mb-4">
          <Callout kind="warn">Nie stosuj restrykcyjnych diet kalorycznych – organizm jest w fazie wzrostu i trenuje 6 dni w tygodniu. BMI 20,5 to norma. Zadbaj o jakość jedzenia i odpowiednie białko.</Callout>
        </div>
        <div className="md:hidden space-y-3">
          {nutrition.map((n,i) => (
            <div key={i} className="py-2 border-b border-neutral-100 last:border-0">
              <div className="font-medium text-sm text-neutral-900">{n.el}</div>
              <div className="text-sm text-green-700 mt-0.5">{n.rec}</div>
              <div className="text-xs text-neutral-500 mt-1">{n.ex}</div>
            </div>
          ))}
        </div>
        <div className="hidden md:block tw">
          <table className="dt">
            <thead><tr><th className="w-36">Element</th><th className="w-52">Zalecenie</th><th>Przykłady</th></tr></thead>
            <tbody>
              {nutrition.map((n,i) => (
                <tr key={i}>
                  <td className="font-medium text-neutral-800">{n.el}</td>
                  <td className="text-neutral-600">{n.rec}</td>
                  <td className="text-neutral-500">{n.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

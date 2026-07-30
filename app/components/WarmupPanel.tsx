'use client'
import { warmup, cooldown } from '../data'
import { Callout } from './ui'

export default function WarmupPanel() {
  return (
    <div className="panel-in space-y-4">
      <div className="card">
        <div className="card-hdr">
          <div>
            <h3 className="font-serif text-2xl text-stone-900">Rozgrzewka ogólna</h3>
            <p className="text-sm text-stone-500 mt-0.5">8 minut · przed każdym z 6 treningów</p>
          </div>
        </div>

        <div className="md:hidden divide-y divide-stone-100 mb-4">
          {warmup.map((e,i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-2.5">
              <div>
                <div className="text-sm text-stone-800">{e.name}</div>
                <a href={e.yt} target="_blank" rel="noopener noreferrer" className="yt">▶ {e.ytl}</a>
              </div>
              <span className="text-xs text-stone-400 shrink-0">{e.time}</span>
            </div>
          ))}
        </div>

        <div className="hidden md:block tw mb-4">
          <table className="dt">
            <thead><tr><th>Ćwiczenie</th><th className="w-36">Czas / Powtórzenia</th><th className="w-44">YouTube</th></tr></thead>
            <tbody>
              {warmup.map((e,i) => (
                <tr key={i}>
                  <td>{e.name}</td>
                  <td className="text-stone-500">{e.time}</td>
                  <td><a href={e.yt} target="_blank" rel="noopener noreferrer" className="yt">▶ {e.ytl}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout kind="warn">Rozgrzewka = podniesienie temperatury i uruchomienie stawów – bez rozciągania statycznego przed treningiem. Rozciąganie statyczne zostaw wyłącznie na koniec.</Callout>
      </div>

      <div className="card">
        <div className="card-hdr">
          <div>
            <h3 className="font-serif text-2xl text-stone-900">Schłodzenie i rozciąganie</h3>
            <p className="text-sm text-stone-500 mt-0.5">8 minut · po każdym treningu</p>
          </div>
        </div>

        <div className="md:hidden divide-y divide-stone-100 mb-4">
          {cooldown.map((e,i) => (
            <div key={i} className="py-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium text-stone-400">{e.area}</span>
                <span className="text-xs text-stone-400 shrink-0">{e.time}</span>
              </div>
              <div className="text-sm text-stone-800 mt-0.5">{e.name}</div>
              <a href={e.yt} target="_blank" rel="noopener noreferrer" className="yt">▶ {e.ytl}</a>
            </div>
          ))}
        </div>

        <div className="hidden md:block tw mb-4">
          <table className="dt">
            <thead><tr><th className="w-40">Obszar</th><th>Ćwiczenie</th><th className="w-28">Czas</th><th className="w-44">YouTube</th></tr></thead>
            <tbody>
              {cooldown.map((e,i) => (
                <tr key={i}>
                  <td className="font-medium text-stone-600">{e.area}</td>
                  <td className="text-stone-600">{e.name}</td>
                  <td className="text-stone-500">{e.time}</td>
                  <td><a href={e.yt} target="_blank" rel="noopener noreferrer" className="yt">▶ {e.ytl}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout kind="safe">Każde rozciąganie statyczne utrzymuj 25–40 sekund. Oddychaj spokojnie. Dodałem rozciąganie bicepsa i przedramienia – ważne przy intensywnym treningu rąk 2× w tygodniu.</Callout>
      </div>
    </div>
  )
}

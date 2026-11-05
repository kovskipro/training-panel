import type { Exercise } from '../../data'

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
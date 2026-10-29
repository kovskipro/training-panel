'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { schemaA, schemaB, schemaC, schemaD, schemaE, schemaF } from '../data'
import { ExTable, Callout } from './ui'

const schemas = [
  { id:'A', label:'Schemat A', sub:'Klatka · Triceps · Core', badge:'b-blue',   day:'Poniedziałek', time:'60–75 min' },
  { id:'B', label:'Schemat B', sub:'Plecy · Biceps · Przedramię', badge:'b-teal',   day:'Wtorek',       time:'65–80 min' },
  { id:'C', label:'Schemat C', sub:'Nogi (quad) · Core dolny',   badge:'b-purple', day:'Środa',         time:'60–70 min' },
  { id:'D', label:'Schemat D', sub:'Barki · Triceps · Plank',    badge:'b-amber',  day:'Czwartek',      time:'60–75 min' },
  { id:'E', label:'Schemat E', sub:'Biceps · Przedramię · HIIT', badge:'b-red',    day:'Piątek',        time:'65–80 min' },
  { id:'F', label:'Schemat F', sub:'Nogi (dwugłowe) · Core · Cardio', badge:'b-green', day:'Sobota',   time:'70–90 min' },
]

const data: Record<string, ReturnType<typeof schemaA[0]['id']['valueOf']>[]> = {
  A: schemaA as any, B: schemaB as any, C: schemaC as any,
  D: schemaD as any, E: schemaE as any, F: schemaF as any,
}

const callouts: Record<string, {kind:'info'|'safe'|'warn'|'danger'; text: string}> = {
  A: { kind:'info',  text:'Zacznij od hantli 6–10 kg przy wyciskaniu. Pompki i dips – masa własna. Przerwa 60 s między seriami tego samego ćwiczenia.' },
  B: { kind:'warn',  text:'Wrist curl i reverse wrist curl – zacznij od 2–3 kg. To małe mięśnie, łatwo przeciążyć. Progresja: +0,5–1 kg co 2 tygodnie.' },
  C: { kind:'warn',  text:'Bulgarian split squat: pierwsze 2 tygodnie bez obciążenia. Opanuj technikę i równowagę zanim dodasz ciężar. Ból kolana = sprawdź technikę.' },
  D: { kind:'info',  text:'Lateral raise – zawsze z małym ciężarem i dużą kontrolą. 3–5 kg i 3 s opuszczanie. Za duży ciężar = szarpanie = efekt zerowy + ryzyko urazu barku.' },
  E: { kind:'safe',  text:'Trio na biceps: uginanie z supinacją (wt) + Concentration curl (pt) + Incline curl (pt) = 3 różne kąty. Tak buduje się pełny biceps. Farmer\'s walk + wrist curle = pełne przedramię.' },
  F: { kind:'info',  text:'Sobota to najdłuższy trening. Nordic curl + RDL to duże ćwiczenia – daj 90 s po nordic curl. Cardio finisher na samym końcu.' },
}

export default function SchemataPanel() {
  const [active, setActive] = useState('A')
  const s = schemas.find(x => x.id === active)!
  const rows = data[active] as any[]
  const co = callouts[active]

  return (
    <div>
      {/* schema picker */}
      <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar pb-1">
        {schemas.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            data-active={active === s.id}
            className="schema-picker-btn"
          >
            {s.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          <div className="panel-in">
            <div className="card">
              <div className="card-hdr">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge ${s.badge}`}>{s.label}</span>
                    <span className="text-xs text-neutral-400">{s.day} · {s.time}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-neutral-900">{s.sub}</h3>
                </div>
              </div>
              <ExTable rows={rows} />
              <Callout kind={co.kind}>{co.text}</Callout>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

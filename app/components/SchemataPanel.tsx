'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { schemaA, schemaB, schemaC, schemaD, schemaE, schemaF } from '../data'
import type { BadgeVariant, Exercise } from '../data'
import type { SchemaViewModel } from '../types'
import PanelFooter from './PanelFooter'
import { Button } from './ui/Button'
import { Callout, type CalloutKind } from './ui/Callout'
import { Card } from './ui/Card'
import { CardHeader } from './ui/CardHeader'
import { ExTable } from './ui/ExTable'
import { Badge } from './ui/Badge'

type SchemaId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

const schemaMeta = [
  { id:'A', label:'Schemat A', sub:'Klatka · Triceps · Core', badge:'b-blue',   day:'Poniedziałek', time:'60–75 min' },
  { id:'B', label:'Schemat B', sub:'Plecy · Biceps · Przedramię', badge:'b-teal',   day:'Wtorek',       time:'65–80 min' },
  { id:'C', label:'Schemat C', sub:'Nogi (quad) · Core dolny',   badge:'b-purple', day:'Środa',         time:'60–70 min' },
  { id:'D', label:'Schemat D', sub:'Barki · Triceps · Plank',    badge:'b-amber',  day:'Czwartek',      time:'60–75 min' },
  { id:'E', label:'Schemat E', sub:'Biceps · Przedramię · HIIT', badge:'b-red',    day:'Piątek',        time:'65–80 min' },
  { id:'F', label:'Schemat F', sub:'Nogi (dwugłowe) · Core · Cardio', badge:'b-green', day:'Sobota',   time:'70–90 min' },
] satisfies { id: SchemaId; label: string; sub: string; badge: BadgeVariant; day: string; time: string }[]

const data: Record<SchemaId, Exercise[]> = {
  A: schemaA, B: schemaB, C: schemaC,
  D: schemaD, E: schemaE, F: schemaF,
}

const callouts: Record<SchemaId, {kind: CalloutKind; text: string}> = {
  A: { kind:'info',  text:'Zacznij od hantli 6–10 kg przy wyciskaniu. Pompki i dips – masa własna. Przerwa 60 s między seriami tego samego ćwiczenia.' },
  B: { kind:'warn',  text:'Wrist curl i reverse wrist curl – zacznij od 2–3 kg. To małe mięśnie, łatwo przeciążyć. Progresja: +0,5–1 kg co 2 tygodnie.' },
  C: { kind:'warn',  text:'Bulgarian split squat: pierwsze 2 tygodnie bez obciążenia. Opanuj technikę i równowagę zanim dodasz ciężar. Ból kolana = sprawdź technikę.' },
  D: { kind:'info',  text:'Lateral raise – zawsze z małym ciężarem i dużą kontrolą. 3–5 kg i 3 s opuszczanie. Za duży ciężar = szarpanie = efekt zerowy + ryzyko urazu barku.' },
  E: { kind:'safe',  text:'Trio na biceps: uginanie z supinacją (wt) + Concentration curl (pt) + Incline curl (pt) = 3 różne kąty. Tak buduje się pełny biceps. Farmer\'s walk + wrist curle = pełne przedramię.' },
  F: { kind:'info',  text:'Sobota to najdłuższy trening. Nordic curl + RDL to duże ćwiczenia – daj 90 s po nordic curl. Cardio finisher na samym końcu.' },
}

const fallbackSchemas: SchemaViewModel[] = schemaMeta.map(s => ({
  code: s.id,
  dayLabel: s.day,
  subtitle: s.sub,
  badge: s.badge,
  duration: s.time,
  calloutKind: callouts[s.id].kind,
  calloutText: callouts[s.id].text,
  exercises: data[s.id],
}))

export default function SchemataPanel({ schemas }: { schemas?: SchemaViewModel[] }) {
  const items = schemas && schemas.length > 0 ? schemas : fallbackSchemas
  const [active, setActive] = useState(items[0].code)
  const s = items.find(item => item.code === active) ?? items[0]

  return (
    <div>
      {/* schema picker */}
      <div className="flex gap-2 mb-5 overflow-x-auto overflow-y-visible no-scrollbar pb-1">
        {items.map(item => (
          <Button
            key={item.code}
            variant={s.code === item.code ? 'primary' : 'secondary'}
            onClick={() => setActive(item.code)}
          >
            Schemat {item.code}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={s.code} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          <div className="panel-in">
            <Card>
              <CardHeader>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge v={s.badge}>Schemat {s.code}</Badge>
                    <span className="text-xs text-neutral-400">{s.dayLabel} · {s.duration}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-neutral-900">{s.subtitle}</h3>
                </div>
              </CardHeader>
              <ExTable rows={s.exercises} />
              <Callout kind={s.calloutKind}>{s.calloutText}</Callout>
            </Card>
          </div>
        </motion.div>
      </AnimatePresence>
      <PanelFooter />
    </div>
  )
}

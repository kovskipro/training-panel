'use client'
import { useState } from 'react'
import SchemataPanel from './SchemataPanel'
import PlanPanel from './PlanPanel'
import WarmupPanel from './WarmupPanel'
import ProgresjaPanel from './ProgresjaPanel'
import RegeneracjaPanel from './RegeneracjaPanel'
import SuplementyPanel from './SuplementyPanel'

const tabs = [
  { id:'schematy',    label:'Schematy',        icon:'⚡' },
  { id:'plan',        label:'Plan tygodniowy', icon:'📅' },
  { id:'rozgrzewka',  label:'Rozgrzewka',      icon:'🔥' },
  { id:'progresja',   label:'Progresja',       icon:'📈' },
  { id:'regeneracja', label:'Regeneracja',     icon:'😴' },
  { id:'suplementy',  label:'Suplementy',      icon:'💊' },
]

export default function TabNav() {
  const [active, setActive] = useState('schematy')
  return (
    <>
      <div className="theme-sticky sticky top-0 z-10 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActive(tab.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 md:px-4 py-3.5 text-sm border-b-2 transition-all whitespace-nowrap ${
                  active === tab.id
                    ? 'border-stone-900 text-stone-900 font-medium'
                    : 'border-transparent text-stone-400 hover:text-stone-800 hover:border-stone-300'
                }`}>
                <span className="text-base leading-none">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {active === 'schematy'    && <SchemataPanel />}
        {active === 'plan'        && <PlanPanel />}
        {active === 'rozgrzewka'  && <WarmupPanel />}
        {active === 'progresja'   && <ProgresjaPanel />}
        {active === 'regeneracja' && <RegeneracjaPanel />}
        {active === 'suplementy'  && <SuplementyPanel />}
      </div>
    </>
  )
}

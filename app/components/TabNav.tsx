'use client'
import { useState } from 'react'
import { Zap, Calendar, Flame, TrendingUp, Moon, Pill, Monitor, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import SchemataPanel from './SchemataPanel'
import PlanPanel from './PlanPanel'
import WarmupPanel from './WarmupPanel'
import ProgresjaPanel from './ProgresjaPanel'
import RegeneracjaPanel from './RegeneracjaPanel'
import SuplementyPanel from './SuplementyPanel'

const tabs = [
  { id:'schematy',    label:'Schematy',        Icon: Zap },
  { id:'plan',        label:'Plan tygodniowy', Icon: Calendar },
  { id:'rozgrzewka',  label:'Rozgrzewka',      Icon: Flame },
  { id:'progresja',   label:'Progresja',       Icon: TrendingUp },
  { id:'regeneracja', label:'Regeneracja',     Icon: Moon },
  { id:'suplementy',  label:'Suplementy',      Icon: Pill },
]

export default function TabNav() {
  const [active, setActive] = useState('schematy')
  const { theme, setTheme } = useTheme()
  return (
    <>
      <div className="theme-sticky sticky top-0 z-10 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActive(tab.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 md:px-4 py-3.5 text-sm border-b-2 transition-all whitespace-nowrap ${
                  active === tab.id
                    ? 'border-neutral-900 text-neutral-900 font-medium'
                    : 'border-transparent text-neutral-400 hover:text-neutral-800 hover:border-neutral-300'
                }`}>
                <tab.Icon size={16} strokeWidth={2} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-0 shrink-0">
            {[
              { value: 'system' as const, Icon: Monitor, label: 'System' },
              { value: 'light' as const, Icon: Sun, label: 'Light' },
              { value: 'dark' as const, Icon: Moon, label: 'Dark' },
            ].map(({ value, Icon, label }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                aria-label={label}
                title={label}
                className={`shrink-0 flex items-center gap-1.5 px-3 md:px-4 py-3.5 text-sm border-b-2 transition-all whitespace-nowrap ${theme === value ? 'border-neutral-900 text-neutral-900 font-medium' : 'border-transparent text-neutral-400 hover:text-neutral-800 hover:border-neutral-300'}`}
              >
                <Icon size={16} strokeWidth={2} />
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

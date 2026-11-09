'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Calendar, Flame, TrendingUp, Moon, Pill, User, Monitor, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import type { SchemaViewModel } from '../types'
import SchemataPanel from './SchemataPanel'
import PlanPanel from './PlanPanel'
import AccountPanel, { type AccountData } from './AccountPanel'
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
  { id:'konto',       label:'Konto',           Icon: User },
]

export default function TabNav({
  schemas,
  account,
  initialTab,
}: {
  schemas?: SchemaViewModel[]
  account: AccountData
  initialTab?: string
}) {
  const [active, setActive] = useState(
    initialTab && tabs.some(tab => tab.id === initialTab) ? initialTab : 'schematy',
  )
  const { theme, setTheme } = useTheme()
  return (
    <>
      <div className="theme-sticky sticky top-0 z-10 backdrop-blur-sm border-b border-neutral-200 w-full">
        <div className="max-w-6xl mx-auto flex justify-between px-4">
          <div className="flex gap-0 overflow-x-auto no-scrollbar relative">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActive(tab.id)}
                className={`shrink-0 relative flex items-center gap-1.5 px-3 md:px-4 py-3.5 text-sm transition-all whitespace-nowrap ${
                  active === tab.id
                    ? 'text-neutral-900 font-normal'
                    : 'text-neutral-400 hover:text-neutral-800 hover:border-neutral-300'
                }`}>
                <tab.Icon size={16} strokeWidth={2} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
                {active === tab.id && (
                  <motion.div layoutId="tab-underline" className="tab-underline absolute bottom-0 left-0 right-0 h-0.5 rounded-full z-10" />
                )}
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
                className={`shrink-0 relative flex items-center gap-1.5 px-3 md:px-4 py-3.5 text-sm transition-all whitespace-nowrap ${theme === value ? 'text-neutral-900 font-normal' : 'text-neutral-400 hover:text-neutral-800 hover:border-neutral-300'}`}
              >
                <Icon size={16} strokeWidth={2} />
                {theme === value && (
                  <motion.div layoutId="theme-underline" className="tab-underline absolute bottom-0 left-0 right-0 h-0.5 rounded-full z-10" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {active === 'schematy'    && <SchemataPanel schemas={schemas} />}
            {active === 'plan'        && <PlanPanel schemas={schemas} />}
            {active === 'rozgrzewka'  && <WarmupPanel />}
            {active === 'progresja'   && <ProgresjaPanel />}
            {active === 'regeneracja' && <RegeneracjaPanel />}
            {active === 'suplementy'  && <SuplementyPanel />}
            {active === 'konto'       && <AccountPanel account={account} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

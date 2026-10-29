'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Calendar, Flame, TrendingUp, Moon, Pill, Monitor, Sun, Menu } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import SchemataPanel from './SchemataPanel'
import PlanPanel from './PlanPanel'
import WarmupPanel from './WarmupPanel'
import ProgresjaPanel from './ProgresjaPanel'
import RegeneracjaPanel from './RegeneracjaPanel'
import SuplementyPanel from './SuplementyPanel'

const initialTabs = [
  { id:'schematy',    label:'Schematy',        Icon: Zap },
  { id:'plan',        label:'Plan tygodniowy', Icon: Calendar },
  { id:'rozgrzewka',  label:'Rozgrzewka',      Icon: Flame },
  { id:'progresja',   label:'Progresja',       Icon: TrendingUp },
  { id:'regeneracja', label:'Regeneracja',     Icon: Moon },
  { id:'suplementy',  label:'Suplementy',      Icon: Pill },
]

export default function TabNav() {
  const [tabs, setTabs] = useState(initialTabs)
  const [active, setActive] = useState('schematy')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [showDrag, setShowDrag] = useState<string | null>(null)
  const timers = useRef<Record<string, NodeJS.Timeout>>({})
  const { theme, setTheme } = useTheme()

  const startHover = useCallback((id: string) => {
    setHoveredId(id)
    if (timers.current[id]) clearTimeout(timers.current[id])
    timers.current[id] = setTimeout(() => setShowDrag(id), 3000)
  }, [])

  const endHover = useCallback((id: string) => {
    setHoveredId(null)
    if (timers.current[id]) {
      clearTimeout(timers.current[id])
      delete timers.current[id]
    }
    setShowDrag(prev => (prev === id ? null : prev))
  }, [])

  return (
    <>
      <div className="theme-sticky sticky top-0 z-10 backdrop-blur-sm border-b border-neutral-200 w-full">
        <div className="max-w-6xl mx-auto flex justify-between">
          <div className="flex gap-0 overflow-x-auto no-scrollbar relative">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                onMouseEnter={() => startHover(tab.id)}
                onMouseLeave={() => endHover(tab.id)}
                className={`shrink-0 relative flex items-center gap-1.5 px-3 md:px-4 py-3.5 text-sm transition-all whitespace-nowrap ${
                  active === tab.id ? 'text-neutral-900 font-normal' : 'text-neutral-400 hover:text-neutral-800 hover:border-neutral-300'
                } ${showDrag === tab.id ? 'md:px-6' : ''}`}
              >
                <tab.Icon size={16} strokeWidth={2} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
                {showDrag === tab.id && (
                  <span className="ml-1 text-neutral-500" title="Przeciągnij">
                    <Menu size={14} strokeWidth={2.5} />
                  </span>
                )}
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
      <div className="max-w-6xl mx-auto py-6">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {active === 'schematy'    && <SchemataPanel />}
            {active === 'plan'        && <PlanPanel />}
            {active === 'rozgrzewka'  && <WarmupPanel />}
            {active === 'progresja'   && <ProgresjaPanel />}
            {active === 'regeneracja' && <RegeneracjaPanel />}
            {active === 'suplementy'  && <SuplementyPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

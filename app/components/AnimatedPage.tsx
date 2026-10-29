'use client'
import { motion } from 'framer-motion'

export default function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="min-h-screen">
      {children}
    </motion.main>
  )
}

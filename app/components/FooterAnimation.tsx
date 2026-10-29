'use client'
import { motion } from 'framer-motion'

export default function FooterAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
      {children}
    </motion.div>
  )
}

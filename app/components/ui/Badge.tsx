'use client'

import type { ReactNode } from 'react'
import type { BadgeVariant } from '../../data'

export function Badge({ v, children }: { v: BadgeVariant; children: ReactNode }) {
  return <span className={`badge ${v}`}>{children}</span>
}

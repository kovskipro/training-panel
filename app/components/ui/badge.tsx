import type { BadgeVariant } from '../../data'

export function Badge({ v, children }: { v: BadgeVariant; children: React.ReactNode }) {
  return <span className={`badge ${v}`}>{children}</span>
}
import type { ReactNode } from 'react'

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="card-hdr">{children}</div>
}

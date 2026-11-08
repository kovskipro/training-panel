import type { BadgeVariant, Exercise } from './data'

export type SchemaViewModel = {
  code: string
  dayLabel: string
  subtitle: string
  badge: BadgeVariant
  duration: string
  calloutKind: 'info' | 'safe' | 'warn' | 'danger'
  calloutText: string
  exercises: Exercise[]
}

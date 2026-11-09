import { redirect } from 'next/navigation'
import { stats } from './data'
import type { BadgeVariant, Exercise } from './data'
import type { Json } from '../lib/supabase/types'
import { createClient } from '../lib/supabase/server'
import type { SchemaViewModel } from './types'
import TabNav from './components/TabNav'
import { Callout } from './components/ui/Callout'
import { ThemeLogo } from './components/ui/ThemeLogo'
import AnimatedPage from './components/AnimatedPage'

function toBadgeVariant(value: string): BadgeVariant {
  switch (value) {
    case 'b-blue':
    case 'b-green':
    case 'b-amber':
    case 'b-red':
    case 'b-purple':
    case 'b-gray':
    case 'b-teal':
      return value
    default:
      return 'b-gray'
  }
}

function toCalloutKind(value: string): SchemaViewModel['calloutKind'] {
  switch (value) {
    case 'info':
    case 'safe':
    case 'warn':
    case 'danger':
      return value
    default:
      return 'info'
  }
}

function isExercise(value: Json): value is Exercise {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  return (
    typeof value.id === 'number' &&
    typeof value.name === 'string' &&
    typeof value.sets === 'string' &&
    typeof value.rest === 'string' &&
    typeof value.tips === 'string' &&
    typeof value.yt1label === 'string' &&
    typeof value.yt1 === 'string'
  )
}

function toExercises(value: Json): Exercise[] {
  return Array.isArray(value) ? value.filter(isExercise) : []
}

export default async function Home({
  searchParams,
}: {
  searchParams: { tab?: string; link?: string; unlink?: string }
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const [{ data: profile }, { data: schemaRows }] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, weight_kg, height_cm')
      .eq('id', user.id)
      .maybeSingle(),
    supabase
      .from('workout_schemas')
      .select('code, day_label, subtitle, badge, duration, callout_kind, callout_text, exercises')
      .order('sort_order'),
  ])

  const fullName = profile?.full_name?.trim()
  const firstName = fullName ? fullName.split(/\s+/)[0] : null
  const weight = profile?.weight_kg ?? 68
  const height = profile?.height_cm ?? 182
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1).replace('.', ',')

  const heroStats = stats.map(stat => {
    switch (stat.label) {
      case 'Waga':
        return { ...stat, value: `${String(weight).replace('.', ',')} kg` }
      case 'Wzrost':
        return { ...stat, value: `${height} cm` }
      case 'BMI':
        return { ...stat, value: bmi }
      default:
        return stat
    }
  })

  const schemas: SchemaViewModel[] = (schemaRows ?? []).map(row => ({
    code: row.code,
    dayLabel: row.day_label,
    subtitle: row.subtitle,
    badge: toBadgeVariant(row.badge),
    duration: row.duration,
    calloutKind: toCalloutKind(row.callout_kind),
    calloutText: row.callout_text,
    exercises: toExercises(row.exercises),
  }))

  const identities = user.identities ?? []
  const notice =
    searchParams.link === 'error'
      ? 'Nie udało się połączyć konta Google. Ten adres Google jest już przypisany do innego konta.'
      : searchParams.unlink === 'ok'
        ? 'Konto Google zostało odłączone.'
        : searchParams.unlink === 'blocked'
          ? 'To jedyny sposób logowania na tym koncie — najpierw ustaw hasło.'
          : searchParams.unlink === 'error'
            ? 'Nie udało się odłączyć konta Google. Spróbuj ponownie.'
            : undefined

  return (
    <AnimatedPage>
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-mono text-neutral-400 tracking-widest uppercase mb-2">Plan treningowy domowy · 6 dni / tydzień</p>
            <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 leading-tight mb-1 flex items-center gap-3">
              <ThemeLogo />
              Cześć {firstName ? `${firstName}!` : '!'}
            </h1>
            <p className="text-neutral-400 text-sm">Brzuch · Biceps · Triceps · Przedramię · Całe ciało · 8-tygodniowa progresja</p>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
          {heroStats.map(s => (
            <div key={s.label} className="bg-white rounded-xl p-3">
              <div className="text-xs text-neutral-400 mb-1 leading-tight">{s.label}</div>
              <div className="font-medium text-neutral-900 leading-tight">{s.value}</div>
            </div>
          ))}
        </div>
        <Callout kind="safe">
          <strong>Podejście rekompozycji:</strong> Przy BMI {bmi} i 15 latach organizm doskonale toleruje jednoczesną redukcję tłuszczu i budowę mięśni. 6 treningów z rotacją partii mięśniowych zapewnia max efektywność bez ryzyka przetrenowania. Każda partia ma min. 48 h regeneracji.
        </Callout>
      </div>
      <TabNav
        schemas={schemas}
        initialTab={searchParams.tab}
        account={{
          fullName: profile?.full_name?.trim() || 'Brak nazwy',
          weightKg: weight,
          heightCm: height,
          email: user.email ?? '—',
          hasGoogle: identities.some(identity => identity.provider === 'google'),
          canUnlinkGoogle: identities.length > 1,
          notice,
          noticeKind: searchParams.unlink === 'ok' ? 'safe' : 'danger',
        }}
      />

    </AnimatedPage>
  )
}

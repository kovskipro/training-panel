import { stats } from './data'
import TabNav from './components/TabNav'
import { Callout } from './components/ui'
import AnimatedPage from './components/AnimatedPage'
import FooterAnimation from './components/FooterAnimation'

export default function Home() {
  return (
    <AnimatedPage>
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-mono text-neutral-400 tracking-widest uppercase mb-2">Plan treningowy domowy · 6 dni / tydzień</p>
            <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 leading-tight mb-1">
            Redukcja + Budowa
            </h1>
            <p className="text-neutral-400 text-sm">Brzuch · Biceps · Triceps · Przedramię · Całe ciało · 8-tygodniowa progresja</p>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-xl p-3">
              <div className="text-xs text-neutral-400 mb-1 leading-tight">{s.label}</div>
              <div className="font-medium text-neutral-900 leading-tight">{s.value}</div>
            </div>
          ))}
        </div>
        <Callout kind="safe">
          <strong>Podejście rekompozycji:</strong> Przy BMI 20,5 i 15 latach organizm doskonale toleruje jednoczesną redukcję tłuszczu i budowę mięśni. 6 treningów z rotacją partii mięśniowych zapewnia max efektywność bez ryzyka przetrenowania. Każda partia ma min. 48 h regeneracji.
        </Callout>
      </div>
      <TabNav />
      <FooterAnimation>
        <footer className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-xs text-neutral-300 text-center">Plan treningowy · oparty na wytycznych AAP, NSCA, WHO · Przed zmianą suplementacji skonsultuj się z lekarzem</p>
        </footer>
      </FooterAnimation>
    </AnimatedPage>
  )
}

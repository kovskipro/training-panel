# Plan Treningowy 6 dni – Next.js App

6-dniowy responsywny plan treningowy dla 15-latka (68 kg / 182 cm).
Akcent: brzuch · biceps · triceps · przedramię · całe ciało.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```
Otwórz http://localhost:3000

## Deploy na Vercel

### GitHub (zalecane)
1. Wrzuć folder na GitHub jako nowe repo
2. vercel.com → Add New Project → Import z GitHub
3. Vercel wykryje Next.js automatycznie → Deploy

### Vercel CLI
```bash
npm i -g vercel
vercel
```

## Struktura

```
app/
├── layout.tsx          # Root layout + Google Fonts
├── page.tsx            # Strona główna z headerem i statystykami
├── globals.css         # Tailwind + custom klasy (badge, callout, dt)
├── data.ts             # Wszystkie dane: 6 schematów, suplementy, progresja
└── components/
    ├── TabNav.tsx       # Nawigacja 6 zakładkami (client)
    ├── ui.tsx           # Badge, Callout, ExTable (shared)
    ├── SchemataPanel.tsx # Schematy A–F z przełącznikiem
    ├── PlanPanel.tsx    # Plan tygodniowy + czasy treningów
    ├── WarmupPanel.tsx  # Rozgrzewka i schłodzenie
    ├── ProgresjaPanel.tsx # Progresja 8-tygodniowa
    ├── RegeneracjaPanel.tsx # Regeneracja i dieta
    └── SuplementyPanel.tsx  # Suplementy z harmonogramem
```

## Stack
- Next.js 14 App Router · TypeScript · Tailwind CSS
- Google Fonts: Instrument Serif + DM Sans + DM Mono
- W pełni responsywna (mobile-first)

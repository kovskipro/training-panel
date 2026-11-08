# Plan Treningowy 6 dni – Next.js App

6-dniowy responsywny plan treningowy dla 15-latka (68 kg / 182 cm).
Akcent: brzuch · biceps · triceps · przedramię · całe ciało.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```
Otwórz http://localhost:3000

Wymagane zmienne w `.env.local` (projekt Supabase):

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

## Konta użytkowników

- Logowanie e-mail + hasło (Supabase Auth), bez rejestracji: `/login` jest domyślnym ekranem dla niezalogowanych, `/` wymaga sesji.
- Ekran logowania działa w dwóch krokach: najpierw e-mail (`Kontynuuj z e-mailem`), potem hasło.
- Krok e-mail sprawdza **tylko format** adresu. Czy konto istnieje, nie jest ujawniane przed podaniem hasła — inaczej formularz pozwalałby ustalać, które adresy mają tu konto. Zły format i błędne dane dają ten sam typ czerwonego calloutu.
- Sesja trzymana w cookies i odświeżana w `middleware.ts`.
- Dane konta w Postgresie (RLS – każdy widzi tylko swoje wiersze): `profiles` (imię, waga, wzrost) i `workout_schemas` (schematy A–F). E-mail i hasło są wyłącznie w `auth.users`.
- Nowe konto dodaje się w panelu Supabase (Authentication → Users); profil tworzy trigger `on_auth_user_created`.

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
middleware.ts           # Odświeżanie sesji Supabase + brama /login
lib/
├── supabase/           # serwerowy klient Supabase + typy bazy
└── auth/               # server actions: signIn / signOut
app/
├── layout.tsx          # Root layout + Google Fonts
├── login/              # ekran logowania (default dla niezalogowanych)
├── page.tsx            # Strona główna z headerem i statystykami
├── globals.css         # Tailwind + custom klasy (badge, callout, dt)
├── data.ts             # Wszystkie dane: 6 schematów, suplementy, progresja
└── components/
    ├── ui/              # Badge, Callout, ExTable, Card i inne współdzielone komponenty
    ├── PanelFooter.tsx  # Wspólna stopka paneli
    ├── TabNav.tsx       # Nawigacja 6 zakładkami (client)
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

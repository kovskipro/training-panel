// ── types ──────────────────────────────────────────────────────────────────
export type BadgeVariant = 'b-blue'|'b-green'|'b-amber'|'b-red'|'b-purple'|'b-gray'|'b-teal'

export type Exercise = {
  id: number
  name: string
  sub?: string
  sets: string
  rest: string
  tips: string
  yt1label: string
  yt1: string
  yt2label?: string
  yt2?: string
}

// ── hero stats ─────────────────────────────────────────────────────────────
export const stats = [
  { label: 'Wiek',            value: '15 lat' },
  { label: 'Waga',            value: '68 kg'  },
  { label: 'Wzrost',          value: '182 cm' },
  { label: 'BMI',             value: '20,5'   },
  { label: 'Treningi / tydz.', value: '6'     },
  { label: 'Podejście',       value: 'Rekomp' },
]

// ── weekly schedule ────────────────────────────────────────────────────────
export const weeklyPlan = [
  { day:'Poniedziałek', badge:'b-blue'   as BadgeVariant, label:'Schemat A', focus:'Klatka · Triceps · Barki · Core górny' },
  { day:'Wtorek',       badge:'b-teal'   as BadgeVariant, label:'Schemat B', focus:'Plecy · Biceps · Przedramię · Core boczny' },
  { day:'Środa',        badge:'b-purple' as BadgeVariant, label:'Schemat C', focus:'Nogi (quad + pośladki) · Core dolny' },
  { day:'Czwartek',     badge:'b-amber'  as BadgeVariant, label:'Schemat D', focus:'Barki (3 głowy) · Triceps · Plank' },
  { day:'Piątek',       badge:'b-red'    as BadgeVariant, label:'Schemat E', focus:'Biceps · Przedramię · Plecy dolne · HIIT' },
  { day:'Sobota',       badge:'b-green'  as BadgeVariant, label:'Schemat F', focus:'Nogi (dwugłowe + łydki) · Core full · Cardio' },
  { day:'Niedziela',    badge:'b-gray'   as BadgeVariant, label:'Odpoczynek', focus:'Rozciąganie 15 min opcjonalnie' },
]

// ── schema A ───────────────────────────────────────────────────────────────
export const schemaA: Exercise[] = [
  { id:1, name:'Pompki klasyczne', sub:'szeroki rozstaw rąk – klatka', sets:'4 × 12–15', rest:'60 s',
    tips:'Łokcie 45° do tułowia (nie 90°!), ciało w linii prostej, kontrolowane opuszczanie 2 s. Klatka dotyka podłogi.',
    yt1label:'push-up technika', yt1:'https://www.youtube.com/results?search_query=push+up+proper+form+chest+focus' },
  { id:2, name:'Pompki z uniesieniem nóg', sub:'nogi na łóżku/kanapie – górna klatka + barki', sets:'4 × 10–12', rest:'60 s',
    tips:'Wysoka pozycja angażuje górną klatkę i barki. Ciało w linii prostej, łokcie 45°.',
    yt1label:'decline push-up', yt1:'https://www.youtube.com/results?search_query=decline+push+up+proper+form+tutorial' },
  { id:3, name:'Wyciskanie hantli leżąc', sub:'na podłodze lub łóżku', sets:'4 × 10–12', rest:'60 s',
    tips:'Łokcie pod kątem 45–75° do tułowia. Na podłodze: ograniczony zakres = mniejsze ryzyko i w pełni bezpieczne.',
    yt1label:'dumbbell floor press', yt1:'https://www.youtube.com/results?search_query=dumbbell+floor+press+proper+form' },
  { id:4, name:'Pompki diamentowe', sub:'triceps – głowa środkowa i boczna', sets:'3 × 8–12', rest:'60 s',
    tips:'Dłonie w kształcie rombu pod klatką, łokcie wzdłuż tułowia do tyłu. Powolne opuszczanie 3 s.',
    yt1label:'diamond push-up', yt1:'https://www.youtube.com/results?search_query=diamond+push+up+triceps+correct+form' },
  { id:5, name:'Triceps dips na krześle', sub:'krawędź krzesła lub łóżka', sets:'3 × 10–15', rest:'60 s',
    tips:'Ręce na krawędzi, nogi proste lub ugięte. Opuszczaj powoli – łokcie do tyłu, nie na boki. Głęboko do dołu.',
    yt1label:'chair dips technika', yt1:'https://www.youtube.com/results?search_query=tricep+dips+chair+proper+form' },
  { id:6, name:'Crunch klasyczny', sub:'górny brzuch', sets:'3 × 20–25', rest:'45 s',
    tips:'Dłonie za głową, nie ciągnij szyi. Unosisz tylko łopatki od podłogi, nie cały tułów. Napięty brzuch na górze.',
    yt1label:'crunch technika', yt1:'https://www.youtube.com/results?search_query=crunch+proper+form+abs+tutorial' },
  { id:7, name:'Leg raises leżąc', sub:'dolny brzuch', sets:'3 × 12–15', rest:'45 s',
    tips:'Leżąc na plecach, nogi proste, unosisz do 90°. Lędźwie CAŁY CZAS przy podłodze. Powolne opuszczanie 3 s.',
    yt1label:'leg raises forma', yt1:'https://www.youtube.com/results?search_query=lying+leg+raise+proper+form+lower+abs' },
]

// ── schema B ───────────────────────────────────────────────────────────────
export const schemaB: Exercise[] = [
  { id:1, name:'Wiosłowanie hantlą', sub:'oparcie o krzesło lub łóżko', sets:'4 × 10–12 / stronę', rest:'60 s',
    tips:'Plecy równoległe do podłogi, łokieć ciągnie do tyłu i w górę, łopatka ściska w górnym punkcie. Nie skręcaj tułowia.',
    yt1label:'single arm row', yt1:'https://www.youtube.com/results?search_query=dumbbell+single+arm+row+proper+form' },
  { id:2, name:'Odwrócone pompki (inverted row)', sub:'pod stołem – plecy jak podciąganie', sets:'4 × 10–12', rest:'60 s',
    tips:'Leżysz pod stołem, chwytasz blat obiema rękami, ciągniesz klatkę do blatu. Ciało w linii prostej przez cały ruch.',
    yt1label:'inverted row pod stołem', yt1:'https://www.youtube.com/results?search_query=table+inverted+row+bodyweight+back+exercise' },
  { id:3, name:'Uginanie bicepsa z supinacją', sub:'naprzemiennie – biceps główna głowa', sets:'4 × 10–12', rest:'60 s',
    tips:'Łokcie przy tułowiu, obracaj nadgarstek w górę (supinacja) podczas unoszenia. Powolne opuszczanie 3 s – tu rośnie biceps.',
    yt1label:'bicep curl supinacja', yt1:'https://www.youtube.com/results?search_query=alternating+dumbbell+curl+supination+bicep+form' },
  { id:4, name:'Hammer curl', sub:'brachialis + przedramię – grubość ramienia', sets:'3 × 10–12', rest:'60 s',
    tips:'Chwyt neutralny (kciuk do góry przez cały ruch), łokcie przy tułowiu. Buduje brachialis i daje grubość ramienia z boku.',
    yt1label:'hammer curl technika', yt1:'https://www.youtube.com/results?search_query=hammer+curl+proper+form+forearm+bicep' },
  { id:5, name:'Zginanie nadgarstka z hantlą', sub:'zginacze przedramienia', sets:'3 × 15 / rękę', rest:'45 s',
    tips:'Przedramię oparte na kolanie lub łóżku, tylko nadgarstek się rusza. Mała waga (2–4 kg) i pełny zakres ruchu.',
    yt1label:'wrist curl forma', yt1:'https://www.youtube.com/results?search_query=wrist+curl+forearm+exercise+proper+form' },
  { id:6, name:'Reverse wrist curl', sub:'prostowniki przedramienia', sets:'3 × 12–15 / rękę', rest:'45 s',
    tips:'Jak wrist curl, ale dłoń skierowana w dół. Buduje prostowniki – widoczna boczna część przedramienia i siła chwytu.',
    yt1label:'reverse wrist curl', yt1:'https://www.youtube.com/results?search_query=reverse+wrist+curl+forearm+extensor' },
  { id:7, name:'Side plank', sub:'skośne mięśnie brzucha', sets:'3 × 25–35 s / stronę', rest:'45 s',
    tips:'Ciało w linii bocznej, biodra nie opadają. Opcja trudniejsza: unoś biodra rytmicznie lub unieś górną nogę.',
    yt1label:'side plank technika', yt1:'https://www.youtube.com/results?search_query=side+plank+proper+form+obliques' },
]

// ── schema C ───────────────────────────────────────────────────────────────
export const schemaC: Exercise[] = [
  { id:1, name:'Goblet squat', sub:'hantla lub plecak z obciążeniem', sets:'4 × 12–15', rest:'60 s',
    tips:'Stopy nieco szerzej niż biodra, kolana nad palcami, biodra poniżej linii kolan. Klatka wyprostowana przez cały ruch.',
    yt1label:'goblet squat forma', yt1:'https://www.youtube.com/results?search_query=goblet+squat+dumbbell+form+tutorial' },
  { id:2, name:'Bulgarian split squat', sub:'tylna noga na krześle', sets:'4 × 8–10 / noga', rest:'75 s',
    tips:'Przednia stopa ~70 cm przed krzesłem. Kolano przednio pionowo w dół, nie wyprzedza palców. Tors wyprostowany. Pierwsze 2 tyg. bez obciążenia!',
    yt1label:'bulgarian split squat', yt1:'https://www.youtube.com/results?search_query=bulgarian+split+squat+correct+form+tutorial',
    yt2label:'błędy do uniknięcia', yt2:'https://www.youtube.com/results?search_query=bulgarian+split+squat+mistakes+to+avoid' },
  { id:3, name:'Hip thrust', sub:'plecak z książkami/hantlami na biodrach', sets:'4 × 12–15', rest:'60 s',
    tips:'Ramiona oparte o kanapę, pięty w ziemi, kolana ~90°. Na górze ściśnij pośladki 1–2 s i utrzymaj. Nie przeginaj lędźwi.',
    yt1label:'hip thrust technika', yt1:'https://www.youtube.com/results?search_query=hip+thrust+at+home+glute+form' },
  { id:4, name:'Reverse lunge z hantlami', sub:'krok w tył – bezpieczniejszy dla kolan', sets:'3 × 10 / noga', rest:'60 s',
    tips:'Krok do tyłu (nie do przodu), kolano tylne tuż nad podłogą, tors wyprostowany. Bezpieczniejszy wariant niż forward lunge.',
    yt1label:'reverse lunge forma', yt1:'https://www.youtube.com/results?search_query=reverse+lunge+dumbbell+proper+form' },
  { id:5, name:'Hollow body hold', sub:'dolny brzuch + głęboka stabilizacja', sets:'4 × 20–30 s', rest:'45 s',
    tips:'Leżąc, lędźwie przyklejone do podłogi, ramiona i nogi uniesione ~15 cm. Najtrudniejsze ćwiczenie na dolny brzuch. Nie odrywaj lędźwi!',
    yt1label:'hollow body hold tutorial', yt1:'https://www.youtube.com/results?search_query=hollow+body+hold+tutorial+lower+abs' },
  { id:6, name:'Bicycle crunch', sub:'skośny brzuch + górny', sets:'3 × 20 pow. (10/stronę)', rest:'45 s',
    tips:'Leżąc, łokieć do przeciwległego kolana, druga noga wyprostowana. Powoli – bez szarpania szyją. Angażuje wszystkie warstwy brzucha.',
    yt1label:'bicycle crunch forma', yt1:'https://www.youtube.com/results?search_query=bicycle+crunch+abs+proper+form' },
]

// ── schema D ───────────────────────────────────────────────────────────────
export const schemaD: Exercise[] = [
  { id:1, name:'Pike push-up', sub:'barki – głowa przednia', sets:'4 × 10–12', rest:'60 s',
    tips:'Biodra wysoko (odwrócone V), głowa między ramionami, nos zmierza ku podłodze. Głęboki zakres – kluczowy dla efektu.',
    yt1label:'pike push-up technika', yt1:'https://www.youtube.com/results?search_query=pike+push+up+shoulder+press+form' },
  { id:2, name:'Wyciskanie hantli nad głową', sub:'stojąc lub siedząc – wszystkie głowy barku', sets:'4 × 10–12', rest:'60 s',
    tips:'Łokcie w linii z barkami, wycisk pionowo w górę. Napięty brzuch, nie wyginaj lędźwi do tyłu. Pełny zakres.',
    yt1label:'overhead press technika', yt1:'https://www.youtube.com/results?search_query=dumbbell+overhead+press+standing+form+tutorial' },
  { id:3, name:'Lateral raise z hantlami', sub:'głowa boczna barku – wizualna szerokość', sets:'3 × 12–15', rest:'60 s',
    tips:'Małe hantle (3–5 kg), łokcie lekko ugięte, unosisz do linii ramion. Powolne opuszczanie 3 s. Błąd: za duży ciężar i szarpanie.',
    yt1label:'lateral raise forma', yt1:'https://www.youtube.com/results?search_query=lateral+raise+dumbbell+proper+form+side+delt' },
  { id:4, name:'Bent-over rear delt fly', sub:'tylna głowa barku – zdrowe ramiona', sets:'3 × 12–15', rest:'60 s',
    tips:'Pochyl tułów ~45°, hantle w dół, unosisz ramiona na boki z lekko ugiętymi łokciami. Ściskaj łopatki w górnym punkcie.',
    yt1label:'rear delt fly forma', yt1:'https://www.youtube.com/results?search_query=bent+over+rear+delt+fly+dumbbell+form' },
  { id:5, name:'Skull crusher z hantlami', sub:'triceps – głowa długa', sets:'3 × 10–12', rest:'60 s',
    tips:'Leżąc, hantle nad głową, zginasz tylko łokcie opuszczając hantle ku czołu. Łokcie nieruchome – nie rozsuwają się na boki.',
    yt1label:'skull crusher technika', yt1:'https://www.youtube.com/results?search_query=dumbbell+skull+crusher+tricep+proper+form' },
  { id:6, name:'Overhead triceps extension', sub:'obie ręce – jedna hantel', sets:'3 × 12', rest:'60 s',
    tips:'Hantel nad głową, łokcie blisko uszu, opuszczasz hantlę za głowę. Rozciąga i wzmacnia głowę długą tricepsa.',
    yt1label:'overhead extension', yt1:'https://www.youtube.com/results?search_query=overhead+tricep+extension+dumbbell+form' },
  { id:7, name:'Plank shoulder tap', sub:'core dynamiczny + stabilizacja', sets:'3 × 30–40 s', rest:'45 s',
    tips:'W pozycji pompki dotykasz na przemian przeciwległego barku. Biodra poziomo – nie kiwają się na boki. Napięty brzuch.',
    yt1label:'shoulder tap plank', yt1:'https://www.youtube.com/results?search_query=plank+shoulder+tap+core+exercise+form' },
]

// ── schema E ───────────────────────────────────────────────────────────────
export const schemaE: Exercise[] = [
  { id:1, name:'Concentration curl', sub:'izolowany biceps – szczyt mięśnia', sets:'4 × 10–12 / rękę', rest:'60 s',
    tips:'Siedzisz, łokieć oparty o wewnętrzną stronę uda, pełny zakres ruchu. Najlepsze ćwiczenie izolujące biceps.',
    yt1label:'concentration curl forma', yt1:'https://www.youtube.com/results?search_query=concentration+curl+bicep+isolation+form' },
  { id:2, name:'Incline curl', sub:'oparcie krzesła pochylone do tyłu – stretch bicepsa', sets:'3 × 10–12', rest:'60 s',
    tips:'Opierasz się plecami o pochylone krzesło, ramiona opuszczone swobodnie. Rozciągnięta pozycja startowa = większy zakres i efekt.',
    yt1label:'incline curl technika', yt1:'https://www.youtube.com/results?search_query=incline+dumbbell+curl+bicep+stretch+form' },
  { id:3, name:'Reverse curl', sub:'brachioradialis – boczna część przedramienia', sets:'3 × 12', rest:'60 s',
    tips:'Chwyt z wierzchu (pronacja przez cały ruch). Buduje brachioradialis – mięsień widoczny z boku ramienia i dodający grubość.',
    yt1label:'reverse curl forma', yt1:'https://www.youtube.com/results?search_query=reverse+curl+brachioradialis+forearm+form' },
  { id:4, name:"Farmer's walk", sub:'siła chwytu + całe przedramię', sets:"4 × 20–30 s chodu", rest:'45 s',
    tips:'Trzymasz maksymalnie ciężkie hantle i chodzisz. Najprostsze i najefektywniejsze ćwiczenie na siłę chwytu i przedramię.',
    yt1label:"farmer's walk", yt1:'https://www.youtube.com/results?search_query=farmers+walk+grip+strength+forearm+exercise' },
  { id:5, name:'Good morning z hantlami', sub:'plecy dolne + dwugłowe uda', sets:'3 × 12', rest:'60 s',
    tips:'Hantle na barkach lub wzdłuż tułowia. Skłon do przodu z prostymi plecami, biodra do tyłu. Nie garbisz się. Poczuj rozciąganie dwugłowych.',
    yt1label:'good morning forma', yt1:'https://www.youtube.com/results?search_query=good+morning+exercise+dumbbell+lower+back+form' },
  { id:6, name:'Superman hold', sub:'plecy dolne izometryczny', sets:'3 × 10–12 pow.', rest:'45 s',
    tips:'Leżąc na brzuchu, unosisz ramiona i nogi jednocześnie. Utrzymaj 2 s na górze i kontrolowanie opuść. Chroni lędźwie.',
    yt1label:'superman exercise', yt1:'https://www.youtube.com/results?search_query=superman+exercise+lower+back+proper+form' },
  { id:7, name:'HIIT finisher – Tabata', sub:'4 minuty · burpees lub squat jumps', sets:'8 × (20 s praca / 10 s pauza)', rest:'–',
    tips:'Ostatnie 4 minuty treningu – pełna intensywność. Wybierz jedno ćwiczenie i rób je przez wszystkie 8 rund. Kontroluj lądowanie.',
    yt1label:'tabata burpees HIIT', yt1:'https://www.youtube.com/results?search_query=tabata+burpees+hiit+workout' },
]

// ── schema F ───────────────────────────────────────────────────────────────
export const schemaF: Exercise[] = [
  { id:1, name:'Nordic curl (asystowany)', sub:'nogi pod kanapą lub łóżkiem', sets:'4 × 5–8', rest:'90 s',
    tips:'Najpotężniejsze ćwiczenie na dwugłowe uda. Bardzo powolne opuszczanie (4–5 sek.). Złap podłogę na powrót. Zacznij od małej liczby pow.',
    yt1label:'nordic curl tutorial', yt1:'https://www.youtube.com/results?search_query=nordic+curl+at+home+hamstrings+tutorial+beginners' },
  { id:2, name:'Romanian deadlift (RDL) z hantlami', sub:'dwugłowe uda + pośladki', sets:'4 × 10–12', rest:'60 s',
    tips:'Hantle wzdłuż nóg, pochyl z prostymi plecami (biodra do tyłu), poczuj rozciąganie dwugłowych. Wróć przez napięcie pośladków.',
    yt1label:'RDL z hantlami forma', yt1:'https://www.youtube.com/results?search_query=romanian+deadlift+dumbbell+hamstring+proper+form' },
  { id:3, name:'Single-leg hip thrust', sub:'jednostronny – więcej pracy pośladka i dwugłowego', sets:'3 × 12 / noga', rest:'60 s',
    tips:'Jedna noga uniesiona, druga pracuje. Trudniejsza wersja hip thrusta. Upewnij się, że pięta jest mocno w ziemi.',
    yt1label:'single-leg hip thrust', yt1:'https://www.youtube.com/results?search_query=single+leg+hip+thrust+glute+bridge+form' },
  { id:4, name:'Calf raise jednostronny', sub:'łydki – na schodku lub podłodze', sets:'4 × 15–20 / noga', rest:'45 s',
    tips:'Stoisz na jednej nodze, wznosisz się na palcach. Na schodku: pełny zakres (opuszczaj piętę poniżej). Powolne opuszczanie 3 s.',
    yt1label:'calf raise forma', yt1:'https://www.youtube.com/results?search_query=single+leg+calf+raise+proper+form+gastrocnemius' },
  { id:5, name:'Ab wheel rollout', sub:'klęcząc – najcięższe ćwiczenie core', sets:'3 × 8–10', rest:'60 s',
    tips:'Mały zakres ruchu na start. Napięty brzuch przez cały ruch. Nie wyginaj lędźwi. Zatrzymaj się zanim stracisz kontrolę.',
    yt1label:'ab wheel rollout', yt1:'https://www.youtube.com/results?search_query=ab+wheel+rollout+beginners+core+form' },
  { id:6, name:'Dead bug', sub:'głęboka stabilizacja kręgosłupa', sets:'3 × 10 pow. (5/stronę)', rest:'45 s',
    tips:'Leżąc, ręce i nogi w górze pod kątem 90°. Opuszczasz naprzemiennie rękę i przeciwległą nogę. Lędźwie przy podłodze CAŁY CZAS.',
    yt1label:'dead bug tutorial', yt1:'https://www.youtube.com/results?search_query=dead+bug+exercise+core+stability+form' },
  { id:7, name:'Cardio finisher', sub:'10 min ciągłe · high knees / skakanka / bieg', sets:'10 min ciągłe', rest:'–',
    tips:'Średnie tętno – możesz rozmawiać ale z wysiłkiem. Podtrzymuje redukcję tkanki tłuszczowej. Można zamiast tego pobiec 2–3 km.',
    yt1label:'10 min cardio at home', yt1:'https://www.youtube.com/results?search_query=10+minute+cardio+workout+at+home+no+equipment' },
]

// ── warmup ─────────────────────────────────────────────────────────────────
export const warmup = [
  { name:'Marsz w miejscu z ruchami ramion', time:'90 s', yt:'https://www.youtube.com/results?search_query=marching+in+place+warmup', ytl:'Marsz w miejscu' },
  { name:'Krążenia ramion (do przodu i do tyłu)', time:'20 × strona', yt:'https://www.youtube.com/results?search_query=arm+circles+shoulder+warmup', ytl:'Arm circles' },
  { name:'Leg swings – wahadło nogi w przód/tył', time:'10 × noga', yt:'https://www.youtube.com/results?search_query=leg+swings+dynamic+warmup', ytl:'Leg swings' },
  { name:'Hip circles – krążenia bioder', time:'10 × stronę', yt:'https://www.youtube.com/results?search_query=hip+circles+mobility+warmup', ytl:'Hip circles' },
  { name:'Inchworm walk', time:'5 pow.', yt:'https://www.youtube.com/results?search_query=inchworm+warmup+exercise+how+to', ytl:'Inchworm' },
  { name:'Squat to stand', time:'8 pow.', yt:'https://www.youtube.com/results?search_query=squat+to+stand+warmup', ytl:'Squat to stand' },
  { name:'Bieg w miejscu / high knees', time:'60 s', yt:'https://www.youtube.com/results?search_query=high+knees+warmup+cardio', ytl:'High knees warmup' },
]

export const cooldown = [
  { area:'Czworogłowy uda', name:'Standing quad stretch', time:'30 s / noga', yt:'https://www.youtube.com/results?search_query=standing+quad+stretch+cool+down', ytl:'Quad stretch' },
  { area:'Dwugłowe uda', name:'Seated hamstring stretch', time:'30 s / noga', yt:'https://www.youtube.com/results?search_query=seated+hamstring+stretch+cooldown', ytl:'Hamstring stretch' },
  { area:'Pośladki', name:"Figure 4 leżąc (pigeon pose)", time:'40 s / stronę', yt:'https://www.youtube.com/results?search_query=figure+four+stretch+piriformis+glute', ytl:'Figure 4 stretch' },
  { area:'Klatka / Barki', name:'Doorway chest stretch', time:'30 s', yt:'https://www.youtube.com/results?search_query=doorway+chest+stretch+pec+cooldown', ytl:'Chest stretch' },
  { area:'Biceps / Przedramię', name:'Wrist + biceps stretch (ręka prosta, palce w dół)', time:'30 s / rękę', yt:'https://www.youtube.com/results?search_query=bicep+forearm+stretch+wrist+extension', ytl:'Bicep + wrist stretch' },
  { area:'Plecy', name:"Child's pose z wyciąganiem rąk", time:'40 s', yt:'https://www.youtube.com/results?search_query=childs+pose+back+stretch+cooldown', ytl:"Child's pose" },
  { area:'Lędźwie / Hip flexor', name:'Kneeling hip flexor stretch', time:'30 s / stronę', yt:'https://www.youtube.com/results?search_query=kneeling+hip+flexor+stretch+cooldown', ytl:'Hip flexor stretch' },
]

// ── progression ────────────────────────────────────────────────────────────
export const progression = [
  { weeks:'1–2', title:'Faza adaptacji', body:'Naucz się techniki każdego ćwiczenia. Hantle 4–8 kg przy ćwiczeniach klatki i pleców, 2–4 kg przy izolacji (lateral raise, wrist curl). Nordic curl: 3–4 powolne opuszczania. Bez Bulgarian split squat z obciążeniem. Schemat F: pomiń cardio finisher w pierwszym tygodniu.' },
  { weeks:'3–4', title:'Faza główna I', body:'Zwiększ ciężar o 1–2 kg tam gdzie ostatnie 2 powtórzenia były za łatwe. Dodaj Bulgarian split squat z hantlami 2–4 kg. Nordic curl: 6–8 powolnych powtórzeń. Pełne cardio finishery i HIIT. Wrist curl +0,5–1 kg.' },
  { weeks:'5–6', title:'Faza główna II', body:'Dodaj 1 serię do ćwiczeń priorytetowych (biceps, triceps, core). Wprowadź cięższy plecak przy hip thrust i goblet squat. Lateral raise: +1 kg przy zachowaniu techniki. Farmer\'s walk z największą dostępną wagą.' },
  { weeks:'7–8', title:'Faza zaawansowana', body:'Testuj trudniejsze warianty: pompki z klaśnięciem, pistol squat asystowany, nordic curl bez asysty, ab wheel stojąc (jeśli klęcząca wersja jest opanowana). Zmierz obwody bicepsa, talii i brzucha. Zaplanuj kolejny blok.' },
]

export const progressChecks = [
  { what:'Obwody ciała (talia, klatka, ramię, udo)', freq:'Co 2–3 tygodnie', how:'Miarką krawiecką rano, na czczo, w tym samym miejscu' },
  { what:'Biceps – obwód w napiętej pozycji', freq:'Co 2 tygodnie', how:'Zgnij ramię do 90°, zmierz w najgrubszym miejscu' },
  { what:'Waga ciała', freq:'Co tydzień (rano, po toalecie)', how:'Nie codziennie – wahania dobowe mylą obraz' },
  { what:'Wydajność treningowa', freq:'Na bieżąco', how:'Notuj ciężary i powtórzenia – czy idą w górę?' },
  { what:'Samopoczucie i energia', freq:'Subiektywnie', how:'Zmęczenie, nastrój, jakość snu – ważne sygnały' },
]

// ── supplements ────────────────────────────────────────────────────────────
export type SuppStatus = 'ok'|'caution'|'no'
export const supplements = [
  { name:'Witamina D3 + K2', status:'ok' as SuppStatus, verdict:'Zdecydowanie tak',
    desc:'Polska + jesień/zima + rosnący nastolatek = niemal pewny niedobór. Wpływa na siłę mięśni, kości i odporność.',
    dose:'2000–4000 IU D3 + 100–200 mcg K2', when:'Do posiłku z tłuszczem (śniadanie lub kolacja)',
    details:'W Polsce od października do marca synteza skórna praktycznie nie zachodzi. Sprawdź poziom 25-OH-D (norma 30–50 ng/ml).' },
  { name:'Magnez (glicynian)', status:'ok' as SuppStatus, verdict:'Zalecany',
    desc:'Często niedoborowy u aktywnych nastolatków. Poprawia regenerację, jakość snu, redukuje skurcze.',
    dose:'200–400 mg magnezu elementarnego', when:'Wieczorem ~1 godz. przed snem',
    details:'Glicynian – najlepsza tolerancja żołądkowa. Cytrynian – tańszy, też dobry. Unikaj tlenku magnezu.' },
  { name:'Omega-3 (EPA/DHA)', status:'ok' as SuppStatus, verdict:'Zalecane',
    desc:'Przeciwzapalne, wspierają regenerację po intensywnych sesjach i zdrowie mózgu. Ważne przy 6 treningach tygodniowo.',
    dose:'1–2 g EPA+DHA (2–3 kapsułki oleju rybiego)', when:'Do posiłku z tłuszczem, dowolna pora',
    details:'Przy 2× rybach/tydz. suplement mniej potrzebny. Szukaj certyfikatu IFOS – czystość od rtęci.' },
  { name:'Białko serwatkowe WPC', status:'ok' as SuppStatus, verdict:'Zalecane (jeśli brakuje)',
    desc:'Bezpieczne – to skoncentrowane jedzenie. Potrzebne tylko gdy trudno osiągnąć normę białka z diety.',
    dose:'1 porcja = 25–30 g białka', when:'Po treningu (do 60 min) lub uzupełnienie posiłku',
    details:'Norma: 95–122 g/dzień (68 kg × 1,4–1,8 g). Jeśli osiągasz to z jedzenia – odżywka zbędna.' },
  { name:'Kreatyna monohydrat', status:'caution' as SuppStatus, verdict:'Ostrożnie / można',
    desc:'Najlepiej zbadany suplement sportowy. Krótkoterminowe dane u nastolatków dobre, brak długoterminowych.',
    dose:'3–5 g dziennie, bez fazy ładowania', when:'Codziennie (nawet bez treningu), po treningu lub wieczorem',
    details:'Tylko monohydrat. 105 porcji ÷ 1/dzień = ~3,5 miesiąca. Po konsultacji z rodzicem/lekarzem.' },
  { name:'Cytrulina malat', status:'caution' as SuppStatus, verdict:'Ewentualnie',
    desc:'Poprawia pompę i wydolność. Brak danych bezpieczeństwa u nastolatków. Nie priorytet.',
    dose:'6–8 g cytruline malate', when:'30–45 min przed treningiem (tylko w dni treningowe)',
    details:'60 porcji ÷ 6 treningów/tydz. = 10 tyg. Nie łącz z pre-workoutem z kofeiną.' },
  { name:'Pre-workout z kofeiną', status:'no' as SuppStatus, verdict:'Nie',
    desc:'150–400 mg kofeiny + stymulanty. Ryzyko wzrostu ciśnienia, arytmii, zaburzeń snu. Brak badań u nastolatków.',
    dose:'–', when:'–', details:'Bezwzględnie nie zalecane w tym wieku.' },
  { name:'Spalacze tłuszczu', status:'no' as SuppStatus, verdict:'Bezwzględnie nie',
    desc:'Słabo regulowany rynek. Poważne działania niepożądane. Jedyna bezpieczna redukcja: deficyt + trening.',
    dose:'–', when:'–', details:'Termogeniki, CLA, synefryna – nie.' },
]

export const suppTimeline = [
  { time:'Rano – przy śniadaniu',        name:'Witamina D3 + K2',  detail:'2000–4000 IU D3\n100–200 mcg K2' },
  { time:'30–45 min przed treningiem',   name:'Cytrulina (opcja)', detail:'6–8 g cytruline malate\ntylko w dni treningowe' },
  { time:'Do 60 min po treningu',        name:'Białko + Kreatyna', detail:'25–30 g białka\n3–5 g kreatyny' },
  { time:'Do obiadu lub kolacji',        name:'Omega-3',           detail:'1–2 g EPA+DHA\ndo tłustego posiłku' },
  { time:'1 godz. przed snem',           name:'Magnez',            detail:'200–400 mg\nglicynian lub cytrynian' },
]

export const creatineFaq = [
  { q:'Czy kreatyna jest bezpieczna dla 15-latka?', a:'Krótkoterminowe badania (do 12 mies.) nie wykazują działań niepożądanych u nastolatków. Brak długoterminowych danych poniżej 18 r.ż. – stąd zalecenie ostrożności i konsultacji z lekarzem.' },
  { q:'Czy kreatyna niszczy nerki?', a:'Mit. Kreatyna nie uszkadza nerek u zdrowych osób. Wieloletnie badania u sportowców tego nie potwierdziły. Przy 2+ l wody/dzień – bezpieczna.' },
  { q:'Czy kreatyna to steryd?', a:'Nie. Kreatyna to naturalny związek produkowany przez organizm i obecny w mięsie. Nic wspólnego ze steroidami anabolicznymi.' },
  { q:'Czy potrzebna faza ładowania?', a:'Nie. 3–5 g/dzień przez 3–4 tygodnie daje ten sam efekt co ładowanie. Faza ładowania powoduje tylko więcej wzdęć.' },
  { q:'Jaka forma kreatyny?', a:'Tylko monohydrat. Kre-alkalyn, buforowana, HCL – brak dowodów przewagi przy wyższej cenie. Monohydrat ma 100+ lat badań.' },
]

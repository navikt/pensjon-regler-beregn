# pensjon-regler-beregn

## Beskrivelse

Dette er et React-prosjekt skrevet i TypeScript. For å starte lokalt kreves node.js.

Kan installeres på Mac med Homebrew: `brew install node` (for andre muligheter, se [nodejs.org](https://nodejs.org/en/download/package-manager/#macos) eller [nodejs.org/download](https://nodejs.org/en/download/current/)).

## Kjøre lokalt

For å kjøre appen lokalt må man først installere pakker med kommandoen:

`npm i`

i Node-kommando vindu etter å ha navigert til `(repo-location)/pensjon-regler-beregn`.

Deretter kan man starte appen lokalt med kommandoen:

`npm run dev`

Appen vil da åpnes i standard nettleseren på adressen [http://localhost:5173/](http://localhost:5173/) med mindre denne porten er opptatt (Node vil da finne en annen ledig port) eller noe annet er spesifisert.

## Struktur
Applikasjonen starter i filen `App.tsx`, dette er 'roten' for alle komponenter og underkomponenter i prosjektet. Her initialiseres og vises de mest grunnleggende komponentene: `Navbar` og `Wrapper`. Disse ligger direkte under `/src/components`.

Underkomponentene som rendres inne i `Navbar` ligger i mappen `/src/components/navigation`.

Konsollfunksjonen som skriver til `ConsoleLog`-komponenten ligger under `/src/components/ui-elements/ConsoleLog.tsx`.

Innholdet i `RequestPane`- og `ResponsePane`-komponentene genereres av en rekursiv algoritme slik at endringer i modellen ikke trenger å kodes i frontend. Denne rekursive algoritmen er todelt: først brukes `JsonParser.tsx` til å identifisere rot-element i JSON-objektet. Deretter delegeres rendering av rot-elementet til den samsvarende komponentfunksjonen. Inne i komponentfunksjonen kalles `JsonParser.tsx` igjen på alle under-elementer.

`JsonParser.tsx` og alle underkomponentene som bygger opp GUI-modellen ligger i mappen `src/components/guimodelelement`.

## Intern Informasjonsflyt

Når en request åpnes via pensjon-regler-logviewer kommer den med en ID i URL'en. Denne ID'en brukes i et API-kall som kjøres med en gang applikasjonen åpnes og har som hensikt å hente selve responsen i JSON-format samt informasjon om hvilket miljø responsen er fra og hvilken tjeneste som er brukt.

`RequestPane`- og `ResponsePane`-komponentene rendrer responsen og viser den i et trestrukturformat. Hver node i treet er en `TabComponent`-komponent som kan være en `TableComponent`, `TreeComponent`, `ArcNodeTreeComponent`, `FormelTreeComponent` eller `CellComponent`. 

## Viktige filer og mapper

- `src/components/navigation`: Inneholder navigasjonskomponenter som `Navbar`, `SatserDropdown` og `EnvironmentDropdown`.
- `src/components/ui-elements`: Inneholder UI-komponenter som `Wrapper`, `DetailView`, `Main`, `ConsoleLog`, `DebugLogModal`, `RequestPane` og `ResponsePane`.
- `src/components/guimodelelement`: Inneholder komponenter som bygger opp GUI-modellen, inkludert `JsonParser`, `TabListComponent`, `TabComponent`, `TableComponent`, `TreeComponent`, `ArcNodeTreeComponent`, `FormelTreeComponent` og `CellComponent`.
- `src/store`: Inneholder global state management med Hookstate.
- `src/api/service`: Inneholder API-kall og queries.
- `src/api/domain/types`: Inneholder TypeScript-typer og enums brukt i prosjektet.
- `src/components/error`: Inneholder feilhåndteringskomponenter som `ErrorBoundary` og `ErrorFallback`.

## Feilhåndtering

Prosjektet bruker en `ErrorBoundary`-komponent for å fange opp og vise feil som oppstår under rendering av komponenter. Feilmeldinger vises i en modal med detaljer om feilen.

## Avhengigheter

Prosjektet bruker flere eksterne biblioteker, inkludert:
- `react`
- `react-dom`
- `react-router-dom`
- `@tanstack/react-query`
- `@navikt/ds-react`
- `axios`
- `@hookstate/core`

For en fullstendig liste over avhengigheter, se `package.json`.
# pensjon-regler-beregn
## Beskrivelse

Dette er et React prosjekt, for å starte lokalt kreves node.js.

Kan installeres på Mac med homebrev `brew install node` (for andre muligheter https://nodejs.org/en/download/package-manager/#macos, evt. https://nodejs.org/en/download/current/)

## Kjøre lokalt

For å kjøre appen lokalt må man først installere pakker med kommandoen

`npm i`

i Node kommando vindu etter å ha navigert til
(repo-location)/pensjon-regler-beregn.

Deretter kan man starte appen lokalt med kommandoen:

`npm run dev`

Appen vil da åpnes i standard nettleseren på adressen *http://localhost:5173/*  
med mindre denne porten er opptatt (Node vil da finne en annen ledig port)
eller noe annet er spesifisert.

## Struktur
Applikasjonen starter i filen `App.tsx`, dette er 'roten' for alle komponenter og
underkomponenter i prosjektet.  
Her initialiseres og vises de mest grunnleggende komponentene:  
*Header*,*Footer*,*Request Pane* og *Response pane* disse ligger direkte under `/src/components`

Underkomponentene som rendres inne i *Header* ligger i mappen `/src/components/navigation`

Konsollfunksjonen som skriver til *Footer* komponenter ligger under `/src/components/ConsoleLog.tsx`

Innholdet i *Request- og ResponsePane* komponentene genereres av en rekursiv algoritme
slik at endringer i modellen ikke trenger å kodes i frontend.  
Denne rekursive algoritmen er todelt, først brukes `JsonParser.ts` til å identifisere rot-element i
JSON-objektet. Deretter delegeres rendering av rot-elementet til den samsvarende komponent funksjonen.
Inne i komponent funksjonen kalles`JsonParser.js` igjen på alle under-elementer.

`JsonParser.js` og alle underkomponentene som bygger opp GUI-modellen ligger i mappen
`src/components/guielements`

## Intern Informasjonsflyt

Når en request åpnes via pensjon-regler-logviewer kommer den med en ID i URL'en  
Denne ID'en brukes i et api-kall som kjøres med en gang applikasjonen åpnes  
og har som hensikt å hente selve responsen i JSON format samt informasjon om  
hvilket miljø responsen er fra og hvilken tjeneste som er brukt.

*Request- og ResponsePane* rendres ikke før enten **RUN** eller **ÅPNE** knappene er blitt   
trykket da det er disse som gjør api-kallet til pensjon-regler for å konvertere requesten
og den tilhørende responsen til en gui-model.
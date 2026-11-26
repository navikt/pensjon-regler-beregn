# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

pensjon-regler-beregn is a React/TypeScript calculation viewer UI for NAV's pension rules system. It renders recursive tree structures of calculation requests/responses received from the pensjon-regler-logger backend. Users navigate here from pensjon-regler-logviewer via a log entry ID in the URL.

## Build & Dev Commands

All commands run from `app/`:

```bash
pnpm install                         # Install all workspace dependencies
pnpm dev                             # Run BFF + frontend concurrently (BFF :8080, frontend :5173)
pnpm build                           # Build shared domain → BFF → frontend
pnpm --filter pensjon-regler-beregn-frontend dev  # Frontend only (Vite dev server)
pnpm --filter bff dev                # BFF only (ts-node-dev with hot reload)
pnpm --filter pensjon-regler-beregn-frontend lint # ESLint with --max-warnings=0
pnpm dev:mock                        # Frontend only with mock data (no BFF/backend). Try /1234 and /feil
```

## Architecture

**pnpm workspaces monorepo** with three packages:
- `frontend/` — React 18 + Vite + SWC, served on port 5173 in dev
- `bff/` — Express 5 (CommonJS), serves as API proxy on port 8080
- `shared/domain/` — `@pensjon/domain` shared TypeScript types/enums

**Data flow:**
```
Frontend (:5173) → /api/* proxied to → BFF (:8080) → pensjon-regler-logger / pensjon-regler engines
```

**BFF responsibilities:** Azure AD OBO token exchange via `@navikt/oasis`, environment-based config loading (`.env.dev-gcp` / `.env.prod-gcp`), Zod-validated config, health endpoints at `/internal/isAlive` and `/internal/isReady`. Auth is disabled in dev-gcp, enforced in prod-gcp.

**Frontend stack:** React 19, React Router 7, TanStack Query (server state), Hookstate (global UI state for selected environment/sats/debugLog), @navikt/ds-react (NAV Aksel design system, v8), react-resizable-panels for the split view. Styling is plain CSS in `frontend/src/styles/` (`app.css`, `guimodel.css`) using only Aksel tokens (`--ax-*`), so light and dark themes work automatically — no Tailwind.

## Layout

- `App.tsx` — `AppHeader` + routes: `/` → `beregn/Landing.tsx` (enter a log ID), `/:id` → `beregn/BeregnPage.tsx`
- `layout/AppHeader.tsx` — Aksel `InternalHeader` with Miljø and Sats menus (ActionMenu), Regel-logg button (`RegelLoggModal`, searchable, copy/download), user guide link and theme menu
- `beregn/BeregnPage.tsx` — fetches the log entry and GuiModel; renders `ContextBar` (status, environment, class name, Sak ID/PEN person ID/Virk, «Kjør på nytt», view toggle Delt/Grunnlag/Resultat stored in localStorage `beregn-view`) and `SplitView` (Grunnlag/Resultat panes)

## Theme

`frontend/src/theme/` has `ThemeProvider` with «Følg system»/«Lyst»/«Mørkt», stored in localStorage `beregn-theme`. `index.html` has an inline script that sets the theme class before React loads to avoid a flash. Components rendered inside `InternalHeader` inherit its dark theme, so modals are rendered outside it.

## Mock Mode

`VITE_MOCK_BEREGN=true` (`pnpm dev:mock`) makes `api/service/Queries.ts` return data from `api/service/mockData.ts` instead of calling the BFF. The mock covers every element type (tabs, side tabs, tables with popover cells, calculation tree, ArcNode flow, formulas). Log ID `trygdetid` serves a real FastsettTrygdetid GuiModel from `api/service/mock/fastsettTrygdetid.json` and `revurdering` a real RevurderingAlderspensjon2011 GuiModel from `api/service/mock/revurderingAlderspensjon2011.json` (both loaded with dynamic import). Log ID `feil` simulates a failed calculation.

Tables: `orientation` VERTICAL means key/value rows (first cell is the key); HORIZONTAL means the first row is column headers. Tables with no cells (typically named «Ingen …») render as a single muted line. In HORIZONTAL tables, a last row with an empty first cell is styled as a sum row. FORMEL cells expand inline as a full-width row under their row (several can be open); DESCRIPTION/FAKTUM cells use a popover. Dates are shown in ISO format (YYYY-MM-DD).

## Recursive Rendering Architecture

This is the core pattern of the codebase. The UI renders arbitrary nested calculation structures from JSON:

1. `BeregnPage.tsx` fetches the GuiModel and `SplitView.tsx` splits it into Grunnlag (request) and Resultat (response) panes
2. Each pane passes `DataElement[]` to `JsonParser.tsx`
3. **`JsonParser.tsx`** dispatches each element by its `ElementType` to the matching component (unknown types render an inline warning):
   - `TABLIST` → `TabListComponent` (Aksel Tabs for TOP, vertical side tabs for SIDE)
   - `TAB` → `TabComponent`
   - `TABLE` → `TableComponent`
   - `NODE` / `BEREGNINGNODE` → `TreeComponent` (tree navigation on the left, selected node's data on the right; unused nodes marked «ikke brukt»)
   - `ARCNODE` → `ArcNodeTreeComponent`
   - `FORMELNODE` → `FormelTreeComponent`
4. Each component renders its structure, then calls `JsonParser` again on its children — forming the recursion

All recursive rendering components live in `frontend/src/components/guimodelelement/`.

To add a new element type: add the enum value to `ElementType` in `shared/domain`, create a component, and add a case in `JsonParser.tsx`.

## Global State (Hookstate)

`frontend/src/store/index.ts` manages: selected `sats` (rate table), `environment` (which pensjon-regler instance), and `debugLog`. Components access via `useGlobalState()` hook. Changing environment/sats changes the TanStack Query key in `Queries.ts` (`useGuiModel`), which refetches.

## BFF API Routes

- `GET /api/log/:id` — Fetch log entry from logger backend (with OBO auth)
- `POST /api/:env/beregn` — Call calculation endpoint on selected environment
- `POST /api/:env/convertResponse` — Convert response to GUI model
- `GET /api/:env/alleSatstabeller` — Get available rate tables

## Environment Configuration

- `APP_ENV` determines which `.env.*` file loads (`dev-gcp` or `prod-gcp`)
- Dev environments: Q1, Q2, Q5 (test instances)
- Prod environments: pensjon-regler, pensjon-regler-q0
- Frontend uses `VITE_PENSJON_ACCESS` to determine available environments

## Deployment

GitHub Actions builds Docker images (multi-stage: `DockerfileDEV` / `DockerfilePROD`) and deploys to NAIS (NAV's Kubernetes platform on GCP). NAIS manifests in `app/nais/`. Both dev and prod deploy on push to main with changes in `app/`.

## No Tests

There is currently no test framework configured in this project.

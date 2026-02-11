# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

pensjon-regler-beregn is a React/TypeScript calculation viewer UI for NAV's pension rules system. It renders recursive tree structures of calculation requests/responses received from the pensjon-regler-logger backend. Users navigate here from pensjon-regler-logviewer via a log entry ID in the URL.

## Build & Dev Commands

All commands run from `app/`:

```bash
npm install                  # Install all workspace dependencies
npm run dev                  # Run BFF + frontend concurrently (BFF :8080, frontend :5173)
npm run build                # Build shared domain → BFF → frontend
npm run dev -w frontend      # Frontend only (Vite dev server)
npm run dev -w bff           # BFF only (ts-node-dev with hot reload)
npm run lint -w frontend     # ESLint with --max-warnings=0
```

## Architecture

**npm workspaces monorepo** with three packages:
- `frontend/` — React 18 + Vite + SWC, served on port 5173 in dev
- `bff/` — Express 5 (CommonJS), serves as API proxy on port 8080
- `shared/domain/` — `@pensjon/domain` shared TypeScript types/enums

**Data flow:**
```
Frontend (:5173) → /api/* proxied to → BFF (:8080) → pensjon-regler-logger / pensjon-regler engines
```

**BFF responsibilities:** Azure AD OBO token exchange via `@navikt/oasis`, environment-based config loading (`.env.dev-gcp` / `.env.prod-gcp`), Zod-validated config, health endpoints at `/internal/isAlive` and `/internal/isReady`. Auth is disabled in dev-gcp, enforced in prod-gcp.

**Frontend stack:** React Router 7, TanStack Query (server state), Hookstate (global UI state for selected environment/sats), @navikt/ds-react (NAV Aksel design system), Tailwind CSS, react-resizable-panels for split-pane layout.

## Recursive Rendering Architecture

This is the core pattern of the codebase. The UI renders arbitrary nested calculation structures from JSON:

1. `DetailView.tsx` fetches the GuiModel and splits it into request/response panes
2. `RequestPane` and `ResponsePane` pass `DataElement[]` to `JsonParser.tsx`
3. **`JsonParser.tsx`** dispatches each element by its `ElementType` to the matching component:
   - `TABLIST` → `TabListComponent` (horizontal or vertical tabs based on Position)
   - `TAB` → `TabComponent`
   - `TABLE` → `TableComponent`
   - `NODE` / `BEREGNINGNODE` → `TreeComponent` (collapsible calculation tree)
   - `ARCNODE` → `ArcNodeTreeComponent`
   - `FORMELNODE` → `FormelTreeComponent`
4. Each component renders its structure, then calls `JsonParser` again on its children — forming the recursion

All recursive rendering components live in `frontend/src/components/guimodelelement/`.

To add a new element type: add the enum value to `ElementType` in `shared/domain`, create a component, and add a case in `JsonParser.tsx`.

## Global State (Hookstate)

`frontend/src/store/index.ts` manages: selected `sats` (rate table), `environment` (which pensjon-regler instance), `consoleLog`, and `debugLog`. Components access via `useGlobalState()` hook. Changing environment/sats triggers TanStack Query invalidation in `DetailView.tsx`.

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

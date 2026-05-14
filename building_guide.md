# Zoef Fullstack Build Guide

This document is now the single execution guide for the app as a whole:

- what has been built so far
- what remains for visual/functional parity
- the step-by-step fullstack plan to ship from prototype to production

## 1) Source Of Truth

- Product requirements: `PRD.md`
- Visual references: `UI guide/*/DESIGN.md`, `UI guide/*/code.html`, `UI guide/*/screen.png`
- Current frontend runtime: `index.html`, `styles.css`, `src/app.js`
- Current data seam (mock API): `src/mockApi.js`
- Seed dataset: `data/*.json`

## 2) Current Implementation Snapshot

### 2.1 What is implemented

- Core shell rebuilt with tokenized styling in `styles.css`.
- Mobile-first tabs and contextual screens in `src/app.js`.
- Screen implementations present:
  - `home` (reconstructed from screenshot patterns)
  - `search`
  - `detail`
  - `compare`
  - `rank`
  - `profile`
- Functional actions wired:
  - Save (wishlist)
  - Compare tray add/remove/clear/review
  - Rank add
  - Search query + subtabs
  - Item detail + shop offer open
- Compare tray now supports thumbnail visuals and remove actions.
- Rank feed has social cards and desktop right-rail variant.

### 2.2 What is partially complete

- Final visual 1:1 parity is close but not fully complete for all icon fill weights, border softness, and exact typographic micro-hierarchy.
- `home/screen.png` could not be reliably fetched in tooling for final visual QA.
- Several advanced interactions remain stub-like:
  - Compare accordion expand/collapse behavior
  - Ask Friends behavior
  - Create New List flow
  - Profile edit form flow

### 2.3 What is not started (fullstack)

- Real backend/API service (currently mock-only)
- Authentication/session management
- Persistent database
- Background jobs / ingestion / normalization pipeline
- Observability, CI checks, deployment setup
- Automated tests (unit/integration/e2e)

## 3) Frontend Architecture (Current and Near-Term)

### 3.1 Current runtime model

- Single-page vanilla JS app.
- View state in `src/app.js`.
- Delegated actions with `data-action`.
- All reads/writes routed through `src/mockApi.js`.

### 3.2 State contract to preserve

- `activeTab`, `previousPrimaryTab`
- `searchText`, `activeSearchSubtab`
- `activeRankSubtab`
- `selectedProductId`
- `compareTray`
- `wishlistIds`

### 3.3 API seam to keep stable

Do not break these frontend call signatures while migrating backend:

- `getFeed`
- `searchCatalog`
- `getProductById`
- `getOffersByProductId`
- `listWishlistProductIds`
- `addWishlistItem`
- `upsertCompareGroup`
- `addRankingEntry`
- `getBootstrapData`

## 4) Visual Parity Checklist (Current Target)

### 4.1 Global

- [x] Warm editorial token palette in CSS variables
- [x] Bottom nav active-dot treatment
- [x] Contextual hide/show chrome for compare/detail
- [ ] Final pass on icon fill weight consistency
- [ ] Final pass on border opacity consistency
- [ ] Final pass on label/body typographic contrast

### 4.2 Screen parity

- Home
  - [x] Implemented with feed modules + actions
  - [ ] Final parity pass blocked by screenshot fetch reliability
- Search
  - [x] Subtabs + filters + rankings rail + result cards
  - [x] CTA icons (Compare/Rank)
  - [ ] Final icon stroke/fill matching
- Item detail
  - [x] Floating top actions, action row, availability, alternatives
  - [x] Stock pills
  - [ ] Carousel/pagination exact behavior polish
- Compare
  - [x] Header, ZOE pick, item stack, section rows, footer CTAs
  - [x] Compare tray thumbnails
  - [ ] Fully interactive accordion controls
- Rank feed
  - [x] Influencer cards, social feed, trending rail, my rankings
  - [x] Social thumbnails and avatar stack treatment
  - [ ] Minor icon fill parity pass
- Profile
  - [x] Hero, stats, style preferences, list cards, preview grid, recently compared
  - [ ] Real profile avatar/source data instead of placeholder-first visuals

## 5) Fullstack Build Plan (Step-by-Step)

This is the production roadmap from current prototype to complete phone app.

### Phase 0: Stabilize Current Frontend

1. Lock visual parity:
   - Resolve remaining icon/border/typography deltas.
   - Capture reference screenshots for each screen state.
2. Extract component helpers in `src/app.js` to reduce duplication.
3. Add user-visible error surfaces for failed async actions.

Exit criteria:

- All parity items in section 4 checked or explicitly accepted.

### Phase 1: API and Backend Foundation

1. Choose backend stack (Node/TypeScript recommended for contract continuity).
2. Scaffold API service with routes matching `PRD.md`:
   - `GET /api/feed`
   - `GET /api/search`
   - `GET /api/products`
   - `GET /api/products/:id`
   - `GET /api/products/:id/offers`
   - `POST /api/wishlist`
   - `POST /api/compare-groups`
   - `GET /api/compare-groups/:id`
   - `POST /api/rankings`
   - `PATCH /api/rankings/:id`
3. Implement schema validation at API boundary.
4. Add environment config + local dev start scripts.

Exit criteria:

- Frontend can toggle between `mockApi` and backend API client with no UI contract breaks.

### Phase 2: Database and Data Modeling

1. Add DB (Postgres recommended).
2. Create tables for:
   - users
   - brands
   - products
   - offers
   - ranking_lists
   - ranking_entries
   - ranking_events
   - compare_groups
   - wishlist_entries
3. Add migrations and seed scripts from `data/*.json`.
4. Replace localStorage persistence with DB persistence.

Exit criteria:

- App state persists across sessions/devices through backend DB.

### Phase 3: Auth and User Context

1. Implement auth (email magic link or OAuth).
2. Add session/token middleware.
3. Replace hardcoded `USER_ID` in frontend with authenticated user context.
4. Add protected writes for wishlist/compare/ranking endpoints.

Exit criteria:

- Multi-user safe writes and reads.

### Phase 4: Catalog Normalization and Ingestion

1. Build ingestion adapters (manual seed first, then approved external feeds).
2. Normalize to canonical product shape used by frontend.
3. Add dedupe logic and source confidence metadata.
4. Create ingestion scheduler and failure handling.

Exit criteria:

- Product and offer data refreshes on schedule with no frontend changes needed.

### Phase 5: Product Features to Production Quality

1. Compare:
   - True accordion behavior
   - Saved comparison groups list in profile
2. Rank:
   - Rank reordering
   - Ranking visibility settings
   - Ranking event generation consistency
3. Search:
   - Real filter execution (category/brand/price)
   - Better ranking/creator grouping logic
4. Profile:
   - Editable preferences and brand selections
   - Better compare history surfacing

Exit criteria:

- PRD MVP behavior fully implemented, not just mocked.

### Phase 6: Testing, Quality, and Tooling

1. Unit tests:
   - API handlers
   - data normalization
   - utility/state transitions
2. Integration tests:
   - API + DB workflows for wishlist/compare/ranking
3. E2E tests:
   - home -> search -> detail -> compare -> profile loops
4. Visual regression snapshots for key screens.

Exit criteria:

- CI gates on test pass and lint pass.

### Phase 7: Observability and Ops

1. Add request logging + error tracking.
2. Add metrics dashboards:
   - API latency
   - search performance
   - write failure rates
3. Add alerting for:
   - 5xx spikes
   - ingestion failures
   - DB connectivity issues

Exit criteria:

- On-call can detect and triage production issues quickly.

### Phase 8: Deployment and Release

1. Set up environments: dev/staging/prod.
2. Configure DB migrations in deploy pipeline.
3. Add feature flags for risky UI/behavior changes.
4. Perform staged rollout and smoke tests.
5. Define rollback process.

Exit criteria:

- Stable production deployment with documented runbook.

## 6) Recommended Repo Evolution

### 6.1 Frontend

- Keep current static app for now.
- Optionally migrate to React/Next once backend is stable to reduce manual DOM rendering complexity.

### 6.2 Backend (proposed)

- `backend/src/routes/*`
- `backend/src/services/*`
- `backend/src/db/*`
- `backend/src/jobs/*`
- `backend/src/schemas/*`

### 6.3 Shared contracts

- Add shared types for product/search/ranking/compare payloads.
- Use those types in frontend API client and backend route responses.

## 7) Immediate Next 10 Tasks

Execution order below is dependency-first. Effort scale: `S` (0.5-1 day), `M` (1-3 days), `L` (3-5+ days).

| Seq | Task | Effort | Depends On | Deliverable |
|---|---|---|---|---|
| 1 | Final non-spacing parity polish (icons/borders/typography). | S | None | Visual polish PR accepted against all guide screens. |
| 2 | Add empty/error/loading states per screen. | M | 1 | UI resilience states for home/search/detail/compare/rank/profile. |
| 3 | Create `src/apiClient.js` adapter with same function names as `mockApi`. | S | 2 | Swappable client layer with no UI call-site changes. |
| 4 | Scaffold backend service with `GET /api/feed` and `GET /api/search`. | M | 3 | Running backend with first two read endpoints and validation. |
| 5 | Add Postgres schema + migration baseline. | M | 4 | Versioned DB migrations and core tables created. |
| 6 | Seed DB from current `data/*.json`. | S | 5 | Deterministic seed script populating products/brands/offers/rankings. |
| 7 | Implement wishlist write/read endpoints. | M | 6 | `POST/GET` wishlist APIs with persistence and user scoping. |
| 8 | Switch frontend save flow to backend behind feature flag. | M | 7 | Save action reads/writes via backend with fallback toggle. |
| 9 | Add compare-groups backend persistence and frontend toggle. | M | 8 | Compare tray/group persistence via backend, controlled by flag. |
| 10 | Add first e2e flow test (`search -> detail -> compare -> save comparison`). | M | 9 | Green end-to-end test in CI for critical shopping-decision loop. |

### Dependency Notes

- Tasks 1-3 are frontend-enabling and reduce rework before backend integration.
- Tasks 4-6 establish backend and data foundations; do not skip ordering.
- Tasks 7-9 migrate highest-value user state from mock/localStorage to real persistence.
- Task 10 should run only after real backend compare/save flows are wired.

### Parallelization Opportunities

- While Task 4 runs, another stream can start test harness setup (without final flow assertions yet).
- Visual QA documentation can run in parallel with Tasks 2-3.
- API docs and response contract tests can run in parallel with Tasks 5-7.

## 8) Definition Of Done (Full App)

The app is considered complete when all are true:

- Visual parity accepted for all target screens at mobile and desktop breakpoints.
- All PRD MVP behaviors are implemented against real backend APIs.
- No critical flow depends on localStorage mock persistence.
- Authentication and multi-user data isolation are working.
- Automated tests cover critical user flows and API invariants.
- Production monitoring and rollback runbooks are in place.

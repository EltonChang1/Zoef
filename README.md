# Zoe Fashion - Sprint 0 Scaffold

This repository is currently scaffolded as a lightweight static web prototype using:
- HTML
- CSS
- Vanilla JavaScript modules
- JSON seed data files

## Structure
- `index.html` - app shell entrypoint
- `styles.css` - mobile-first styling
- `src/app.js` - primary tab shell + contextual comparison workflow rendering
- `src/mockApi.js` - source-agnostic mock API/provider layer
- `src/types.js` - canonical type/interface typedefs
- `data/*.json` - seed data files from the PRD Sprint 0 checklist
- `preview.html` - visual product intent artifact
- `PRD.md` - implementation source of truth

## Run locally
Because modules and JSON fetches are used, run with a local static server.

Examples:
- `python3 -m http.server 4173`
- then open [http://localhost:4173/index.html](http://localhost:4173/index.html)

## Implemented Sprint 0 checklist
- Seed data directory and required files
- Canonical data interface definitions
- Four-tab mobile navigation shell (Home, Search, Rank, Profile)
- Compare as an in-app function (tray + comparison workspace)
- Mock API/provider layer mapped to PRD API intent

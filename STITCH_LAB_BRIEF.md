# Zoe Fashion - Google Stitch Lab UI Brief

Use this file together with:
- `index.html` (current Sprint 0 shell and interaction baseline)
- `PRD.md` (product requirements and scope source of truth)

## 1) What to design
Design a **mobile-first social fashion app UI** for Zoe Fashion with five main tabs:
1. Home
2. Search
3. Compare
4. Rank
5. Profile

The product should feel like:
- modern, minimal, premium
- soft and warm (not loud ecommerce)
- highly visual and clean
- addictive for browsing, but practical for purchase decisions

## 2) Core UX goals
1. Help users discover fashion quickly.
2. Make side-by-side comparison frictionless.
3. Make ranking and social proof feel native and trustworthy.
4. Keep UI simple enough for daily repeat use.

## 3) Visual direction

### Tone
- Warm neutrals
- Editorial but approachable
- Confident typography
- Soft shadows and rounded surfaces

### Suggested palette (starting point)
- Background: `#FBF9F6`
- Surface: `#FFFFFF`
- Soft background: `#F7F3EE`
- Border: `#E7DED4`
- Text primary: `#2A211D`
- Text muted: `#6A584C`
- Accent: `#6F4B52`

### Typography
- Sans-serif system stack or clean modern sans
- Strong hierarchy:
  - Display/title
  - Section headers
  - Card title
  - Metadata / utility text

### Components should feel
- Rounded cards (12-24 radius)
- Clear spacing rhythm
- Minimal iconography
- Strong image-first product presentation

## 4) Required screens to generate in Stitch

### A) Home (primary feed)
Include:
- sticky top bar with search
- module sections (For You, New Drops, Best Alternatives, Rank Updates)
- product cards with actions: Save, Compare, Rank
- feed cards for updates and trend movement
- fixed bottom tab bar

### B) Search / Explore
Include:
- global search input
- segmented tabs: Top, Items, Rankings, Brands, Creators, Alternatives
- filter row (category, brand, price)
- visual result cards + empty state

### C) Compare
Include:
- active compare tray state (2-4 items)
- side-by-side comparison table/card layout
- key fields: price, brand, fit, material, availability, ranking signal
- primary actions: Save Comparison, Ask Friends, Rank Winner

### D) Rank
Include:
- ranking list view (ordered entries with movement indicators)
- rank update feed (up/down/new)
- add-to-list flow entry point

### E) Profile
Include:
- style identity header
- style tags, budget, favorite brands
- tabs/sections for Rankings, Wishlist, Comparisons, Saved

### F) Item Detail (core decision screen)
Include:
- image carousel
- product title, brand, price range
- actions: Save, Compare, Rank, Shop
- fit/material notes
- offers/availability
- alternatives and ranking context

## 5) Key interaction rules
1. Every product card must expose Save, Compare, Rank.
2. Compare should never be buried; keep it high-visibility.
3. Search should always be one tap away.
4. Prefer one clear primary action per area.
5. Keep dense technical data out of cards; surface details on detail/compare screens.

## 6) Deliverables format from Stitch
Please generate:
1. Mobile UI kit (colors, text styles, spacing, component patterns)
2. High-fidelity screens for all required views
3. Interactive prototype flow:
   - Home -> Item Detail -> Compare
   - Search -> Item Detail
   - Rank -> Ranking list
   - Profile -> Wishlist/Comparisons
4. Component variants for:
   - Product card
   - Feed update card
   - Compare row
   - Ranking row
   - Bottom tab item (active/inactive)

## 7) Handoff constraints for implementation
Design should map cleanly to:
- `index.html` app shell structure
- `styles.css` token style direction
- `src/app.js` five-tab navigation model
- `PRD.md` acceptance criteria and MVP scope

Avoid requiring:
- desktop-first layouts
- checkout flow complexity
- marketplace cart systems in MVP

## 8) Prompt block for Stitch (copy/paste)
Design a mobile-first app called Zoe Fashion. It is a minimal social fashion discovery and purchase-decision app with five tabs: Home, Search, Compare, Rank, Profile. The visual style is warm neutral, premium, and clean. Build high-fidelity screens for Home feed, Search results, Compare side-by-side screen, Rank updates/list screen, Profile screen, and Item Detail screen. Every product card includes Save, Compare, Rank actions. Compare is a core feature and must be prominent and frictionless. Use large visuals, restrained typography, subtle borders, and rounded cards. Include a bottom tab bar and sticky top search patterns. Create a reusable component system and interactive prototype for the main flows.

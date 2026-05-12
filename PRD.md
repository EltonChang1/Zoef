# Zoe Fashion - Product Requirements Document (PRD)

## 1) Document Purpose
This PRD translates the product direction in `preview.html` into an execution-ready plan for building the first usable version of Zoe Fashion.

It is optimized for implementation order, acceptance criteria, and technical readiness so development can begin immediately.

## 2) Product Vision
Zoe Fashion is a mobile-first app for fashion discovery and decision-making that combines:
- A unified catalog across brands/retailers
- Side-by-side comparison for purchase decisions
- Personal + social ranking as the core differentiation
- A clean, addictive feed that users open before shopping elsewhere

### North Star Behavior
"When I want to browse or buy fashion, I open Zoe first."

## 3) Problem Statement
Users currently bounce across many brand and retailer sites, then rely on memory, screenshots, and social apps to decide what to buy. Existing tools are fragmented and weak at direct comparisons and trustable ranking signals.

## 4) Product Goals and Non-Goals

### Goals (MVP)
1. Centralize products from multiple sources into one normalized catalog.
2. Make comparison effortless for 2-4 items.
3. Let users save and rank items into lists.
4. Deliver a personalized home + rank updates feed.
5. Provide enough product detail to make buying decisions quickly.

### Non-Goals (MVP)
1. Full checkout marketplace.
2. Closet digitization as a primary workflow.
3. Heavy creator monetization tools.
4. Advanced AI styling generation.
5. Unauthorized scraping-based catalog acquisition.

## 5) Target Users

### Primary
- Style-conscious users comparing options before buying
- Price-aware users seeking alternatives to higher-end items
- Trend-aware users who value ranking/social proof

### Secondary
- Creators publishing ranked recommendations
- Brand-conscious shoppers tracking drops and restocks

## 6) UX and Design Principles
1. Mobile-first, thumb-friendly navigation.
2. Visual-first cards with minimal text noise.
3. One clear primary action per surface.
4. Product-card quick actions always include: Save, Compare, Rank.
5. Search and Compare are always one tap away.
6. Ranking changes are legible and subtle, not noisy.

## 7) Information Architecture
Bottom tab navigation:
1. Home
2. Search
3. Compare
4. Rank
5. Profile

## 8) Functional Requirements

### 8.1 Home Feed
**Purpose:** habitual daily discovery and re-entry point.

**Required feed modules:**
- For You
- New Drops
- Restocks
- Best Alternatives
- Trending Now
- Creator Picks
- Friend Activity
- Continue Comparing

**Acceptance Criteria:**
- User can scroll and open item cards and feed cards.
- User can Save, Compare, Rank from cards.
- Feed can render from mock data first.

### 8.2 Search / Explore
**Purpose:** fast discovery across all catalog data.

**Capabilities:**
- Query products, brands, rankings, creators, alternatives.
- Filter by category, brand, price range.
- Return grouped tabs: Top, Items, Rankings, Brands, Creators, Alternatives.

**Acceptance Criteria:**
- User can search and see result sets by tab.
- Product results open detail pages.
- Empty states and no-result states are handled.

### 8.3 Compare
**Purpose:** help users pick between options.

**Capabilities:**
- Add item to compare tray from any item card/detail.
- Compare 2-4 products side by side.
- View normalized fields: price, brand, fit, material, availability, ranking, saves.
- Save compare groups and reopen them.

**Acceptance Criteria:**
- Compare tray persists across tabs during session.
- Side-by-side table renders all selected items.
- User can save a comparison group.

### 8.4 Rank
**Purpose:** social + personal taste graph updates.

**Capabilities:**
- Rank item into a list.
- Reorder list entries.
- Display ranking movement events in feed format.
- Support list visibility (public/followers/private).

**Acceptance Criteria:**
- User can add item to rank list and set position.
- Rank updates view shows movement events.
- Rank state persists for user across sessions.

### 8.5 Item Detail
**Purpose:** complete purchase decision context.

**Required modules:**
- Media carousel
- Brand/item title and price range
- Offers and availability
- Tags and fit/material notes
- Alternatives
- Ranking appearance and save counts
- Primary actions: Save, Compare, Rank, Shop

**Acceptance Criteria:**
- User can execute all primary actions from detail.
- Offer links and pricing load for each product.
- Comparison action routes to compare flow with item preselected.

### 8.6 Profile
**Purpose:** user taste identity and saved intent.

**Required profile sections:**
- Posts (optional stub in MVP)
- Rankings
- Wishlist
- Comparisons
- Saved
- Style tags, favorite brands, budget and privacy settings

**Acceptance Criteria:**
- User can view and edit style preferences.
- Rankings/wishlist/comparisons are accessible in one place.

## 9) Data and Platform Requirements

### 9.1 Core Data Entities
- User
- UserTasteProfile
- Brand
- CanonicalProduct
- RetailerOffer
- RankingList
- RankingEvent
- CompareGroup
- WishlistEntry
- FeedEvent

### 9.2 Catalog Source Strategy
Priority order:
1. Official APIs
2. Affiliate feeds
3. Partner retailer feeds
4. Public pages where explicitly permitted
5. Manual/editorial seed data

Compliance requirement: no architecture dependency on unauthorized scraping.

### 9.3 Adapter Contract (Required)
Every source integration must normalize to the same canonical product model. Frontend must only consume normalized catalog APIs.

### 9.4 API Surface (MVP Minimum)
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/:id/offers`
- `GET /api/search`
- `POST /api/compare-groups`
- `GET /api/compare-groups/:id`
- `POST /api/rankings`
- `PATCH /api/rankings/:id`
- `POST /api/wishlist`
- `GET /api/feed`
- `GET /api/rank-updates`

## 10) Non-Functional Requirements
1. Mobile performance: first meaningful feed paint should feel instant on modern phones.
2. API p95 targets (initial): under 500ms for feed/search on seeded dataset.
3. Reliability: ingestion failures should isolate per source adapter.
4. Observability: log source ingest status, product normalization, dedupe actions.
5. Extensibility: source adapter model must support adding brands without frontend changes.

## 11) MVP Scope and Phase Plan

### Phase 1 - Frontend Prototype with Seed Data
- Build Home, Search, Compare, Rank, Profile tabs
- Build item detail and compare tray
- Use static JSON seed files

### Phase 2 - Backend Foundation
- Implement catalog service and normalized entities
- Add auth stub, wishlist, compare groups, ranking events

### Phase 3 - Source Adapters + Ingestion
- Add first live adapters
- Normalize and dedupe products
- Publish to catalog/search indexes

### Phase 4 - Personalization + Alerts
- Personal feed tuning
- Rank update relevance
- Restock/price notifications

## 12) Metrics and Success Criteria

### Product KPIs
- D1, D7 retention
- Weekly active users opening app before purchase session
- Compare actions per active user
- Rank actions per active user
- Save-to-open-detail conversion rate
- Open-detail to outbound-shop click rate

### Quality KPIs
- Duplicate product rate in top search/feed results
- Missing critical fields rate (image, price, URL, brand)
- Compare completion rate (start to viewed decision screen)

## 13) Risks and Mitigations
1. **Catalog quality variance** -> enforce normalization + source confidence fields.
2. **Data freshness drift** -> schedule source-level refresh frequencies.
3. **Weak early social proof** -> seed editorial rankings and creator starter lists.
4. **Scope creep** -> lock MVP to must-have flows and defer advanced social/monetization.

## 14) Build-Ready Execution Checklist

### Sprint 0 (must be complete before feature sprinting)
- [ ] Confirm tech stack and repo structure.
- [ ] Create seed data directory:
  - `data/brands.json`
  - `data/products.json`
  - `data/offers.json`
  - `data/users.json`
  - `data/rankings.json`
  - `data/ranking_updates.json`
  - `data/compare_groups.json`
  - `data/wishlist.json`
- [ ] Define canonical data types/interfaces.
- [ ] Scaffold mobile navigation with five tabs.
- [ ] Wire mock API/provider layer.

### Feature Sprint Order
1. Home + product cards + detail page
2. Save/Wishlist
3. Compare tray + compare page
4. Rank flows + rank updates feed
5. Search/Explore tabs and filters
6. Profile and preference editing

### Definition of Done (MVP)
- [ ] User can browse feed and open details.
- [ ] User can save items.
- [ ] User can compare 2-4 items side by side.
- [ ] User can rank items into personal lists.
- [ ] User can see rank updates feed.
- [ ] Source-agnostic catalog API contract exists and is consumed by UI.

## 15) Source of Truth Relationship
- `preview.html` remains the visual and narrative concept artifact.
- `PRD.md` is the implementation source of truth for scope, requirements, and build order.

When they conflict, use this precedence for execution:
1. `PRD.md` acceptance criteria and scope
2. `preview.html` UX intent and product language


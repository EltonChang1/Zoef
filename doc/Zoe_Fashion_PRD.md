# Zoe Fashion PRD

**Document name:** `PRD.md`  
**Product:** Zoe  
**Version:** 1.0  
**Platform:** Mobile-first, iOS and Android  
**Primary product type:** All-in-one fashion discovery and browsing app  
**Audience for this document:** Coding agent, product builder, designer, founder  
**Last updated:** 2026-06-18

---

# 1. Product Summary

Zoe is a mobile app where users can browse, discover, save, and compare fashion items from many brands in one place.

The main product promise is:

> **Zoe gives users one app to discover and browse fashion items across all brands.**

The product should solve two core user needs:

1. **Discovery**  
   Users should be able to scroll through a RedNote-like personalized discovery feed of fashion items recommended based on their searches, interests, saves, clicks, followed brands, and style preferences.

2. **Specific browsing and filtering**  
   Users should be able to intentionally browse for exactly what they want by filtering by item type, brand, category, price, size, color, material, gender, sale status, availability, and other fashion-specific attributes.

Zoe is not primarily a checkout platform in v1. Zoe should route users to brand or retailer product pages through outbound links, affiliate links, or direct brand links. The app's core value is aggregation, discovery, filtering, taste personalization, and social fashion utility.

---

# 2. Core Product Thesis

Fashion shopping is fragmented. Users currently have to open many brand websites, retailer apps, Instagram pages, TikTok videos, Pinterest boards, and Google searches to find what they want.

Zoe should become the single place where users can:

- browse products across brands
- discover random recommended items like RedNote
- search for specific fashion items
- filter deeply by category, brand, size, price, color, material, and availability
- save items into collections
- compare similar items
- follow brands and creators
- view product details without opening many brand websites
- route to the original brand or retailer to buy

The app wins if users think:

> “Instead of checking ten different brand websites, I can just open Zoe.”

---

# 3. Non-Negotiable Product Focus

The app must be built around **all-brand fashion discovery and browsing**.

Do not let the product become mainly:

- a generic social media app
- a creator-only marketplace
- a checkout-first e-commerce store
- a Pinterest clone without structured filters
- a ranking app where product browsing is secondary
- a simple link directory

The two most important product surfaces are:

1. **Discover Feed**  
   Personalized, scrollable, RedNote-like feed of recommended fashion items.

2. **Browse/Search Surface**  
   Structured browsing and filtering system where users can find exact items or exact brands.

Everything else supports these two surfaces.

---

# 4. MVP Goal

Build a mobile MVP that lets users:

1. onboard with fashion interests
2. browse a personalized Discover feed
3. search for fashion items
4. filter by category and brand
5. open product detail pages
6. save items to collections
7. view brand pages
8. route to the brand or retailer to buy
9. track basic user behavior for personalization
10. support product data ingestion from seed data or product feeds

---

# 5. Target Users

## 5.1 Primary users

Fashion-conscious Gen Z and millennial users who:

- browse many fashion brands
- use Instagram, TikTok, Pinterest, RedNote, LTK, SSENSE, Farfetch, Zara, Aritzia, COS, Uniqlo, Nike, Adidas, Skims, and similar apps/sites
- want one place to discover items
- want better filtering than social media
- want more inspiration than a normal e-commerce site
- save products before buying
- compare similar items across brands

## 5.2 Secondary users

Creators, stylists, and tastemakers who:

- curate items
- share product finds
- create outfit boards
- influence user purchases
- want their taste to be discoverable

## 5.3 Tertiary users

Brands and retailers that may later:

- provide product feeds
- sponsor placements
- monitor clicks and saves
- work with creators
- use Zoe as a discovery channel

---

# 6. Product Positioning

## One-line description

**Zoe is the all-in-one mobile app for discovering and browsing fashion items across every brand.**

## Short description

Zoe helps users discover fashion items through a personalized RedNote-like feed and find exact products through powerful brand, category, and attribute filters.

## Long description

Zoe is a fashion discovery app that aggregates products from many brands and retailers into one searchable, personalized mobile experience. Users can scroll through recommended fashion items, search for exact pieces, filter deeply, save items into collections, and route to the original brand or retailer to purchase.

---

# 7. Product Principles

## 7.1 Browse-first

The app should prioritize product discovery and browsing across brands.

## 7.2 RedNote-like discovery

The Discover feed should feel useful, visual, personalized, and scrollable. It should recommend items based on interest, behavior, and trend signals.

## 7.3 Precise filtering

The Browse/Search system must let users narrow down products exactly. Filtering is not a secondary feature. It is one of the main reasons the app exists.

## 7.4 Brand coverage matters

The long-term goal is broad brand coverage. The MVP can start with seed brands and categories, but the system must be designed to scale to many brands.

## 7.5 Product data quality matters

Bad images, wrong prices, stale availability, and messy categories will ruin trust. The product catalog must be normalized and validated.

## 7.6 Route out for purchase

In v1, Zoe should not own checkout. Users should open the brand or retailer page to buy.

## 7.7 Personalization should improve with use

Every search, save, click, filter, brand follow, and product view should improve future recommendations.

## 7.8 Mobile-first polish

Zoe should feel like a premium fashion app, not a database UI.

---

# 8. Core User Stories

## Discovery stories

- As a user, I want to open Zoe and scroll through recommended fashion items so I can discover things I might like.
- As a user, I want the Discover feed to improve based on what I search, save, view, and click.
- As a user, I want to see fashion items from many brands in one feed so I do not need to open many brand websites.
- As a user, I want to save interesting items into collections so I can come back later.

## Search and browse stories

- As a user, I want to search for a specific item like “black leather jacket” and see options across brands.
- As a user, I want to filter by brand so I can browse only one brand.
- As a user, I want to filter by item type, size, price, color, and availability so I can find exactly what I want.
- As a user, I want to browse a category like “sneakers” or “mini dresses” across all brands.
- As a user, I want to open a brand page and browse all products from that brand.

## Product detail stories

- As a user, I want to see product images, price, brand, available sizes, colors, product description, and outbound buy link.
- As a user, I want to see similar items across brands.
- As a user, I want to route to the original brand or retailer page when I decide to buy.

## Save and personalization stories

- As a user, I want to save products to collections like Wishlist, Summer, Workwear, Shoes, or Bags.
- As a user, I want my saved items to influence my Discover feed.
- As a user, I want my searches and filters to influence future recommendations.

---

# 9. MVP Scope

## 9.1 Must-have MVP features

### Mobile app

- Splash screen
- Auth or guest mode
- Interest onboarding
- Main app shell
- Discover feed
- Search/Browse tab
- Product results grid/list
- Product detail page
- Brand page
- Saved items and collections
- Basic profile
- Outbound product routing

### Product catalog

- Product data model
- Brand data model
- Category taxonomy
- Product variants
- Product offers
- Product media
- Product seed import script
- Product feed ingestion foundation

### Search and filtering

- Text search
- Category filter
- Brand filter
- Price filter
- Size filter
- Color filter
- Gender/audience filter
- Availability filter
- Sort by relevance, newest, price low-high, price high-low

### Personalization v1

- Track product views
- Track searches
- Track filter usage
- Track saves
- Track outbound clicks
- Store user interest profile
- Recommend Discover feed based on saved/viewed/searched categories and brands

### Routing

- Product outbound link
- Click tracking before redirect
- Support affiliate URL field, direct URL field, and source URL field

### Admin/dev tooling

- Seed products script
- Admin product import command
- Catalog validation checks
- Duplicate detection placeholder
- Basic product source metadata

## 9.2 Nice-to-have after MVP

- Reels/short video fashion content
- Creator profiles
- Ranking lists
- Rank Updates feed
- Chat/share-to-friend
- Price drop alerts
- Back-in-stock alerts
- Visual search
- AI styling assistant
- Outfit builder
- Brand partner dashboard
- Affiliate reporting dashboard
- In-app checkout

## 9.3 Explicit non-goals for MVP

Do not build these first:

- full checkout
- returns handling
- payment processing
- seller dashboard
- warehouse/inventory ownership
- advanced creator monetization
- full social graph
- complex ranking engine
- AI stylist chat as the main product
- desktop app

---

# 10. Navigation Model

Zoe should use a mobile bottom navigation shell.

## Recommended MVP tabs

1. **Discover**
2. **Browse**
3. **Saved**
4. **Profile**

If the team wants to preserve the original five-tab Zoe identity, use:

1. **Home / Discover**
2. **Search / Browse**
3. **Trends / Rankings**
4. **Reels / Looks**
5. **Profile**

For the first coding MVP, use the simpler four-tab model unless already implementing the previous five-tab shell.

## Primary surfaces

- Discover Feed
- Browse/Search
- Product Results
- Product Detail
- Brand Detail
- Saved Collections
- User Profile
- Onboarding

---

# 11. Screen Requirements

---

## Screen 01 — Splash / App Boot

### Purpose

Load app, check auth state, load cached catalog/feed if available.

### Components

- Zoe logo
- loading indicator
- error fallback if app cannot start

### Behavior

- If authenticated, route to main app.
- If unauthenticated and guest mode is allowed, route to Discover.
- If unauthenticated and guest mode is not allowed, route to Welcome/Auth.

---

## Screen 02 — Welcome / Auth

### Purpose

Allow the user to sign up, log in, or continue as guest if supported.

### Components

- Hero image/collage
- Value proposition: “Discover fashion across every brand.”
- Continue with Apple
- Continue with Google
- Continue with Email
- Continue as Guest, optional

### Acceptance criteria

- User can enter the app.
- Auth state persists after restart.
- Guest users can browse but must sign in to save.

---

## Screen 03 — Interest Onboarding

### Purpose

Collect initial style signals for personalization.

### Components

- Category chips
- Brand chips
- Style vibe chips
- Price preference
- Size profile, optional for MVP

### Required interest chips

Categories:

- Tops
- Dresses
- Pants
- Denim
- Outerwear
- Sneakers
- Boots
- Bags
- Jewelry
- Accessories
- Fragrance
- Workwear
- Streetwear
- Minimal
- Luxury
- Affordable basics

Brands example:

- Zara
- Uniqlo
- COS
- Aritzia
- Skims
- Nike
- Adidas
- New Balance
- SSENSE
- H&M
- Everlane
- The Row
- Miu Miu

Style vibes:

- minimal
- streetwear
- quiet luxury
- vintage
- office
- date night
- casual
- feminine
- masculine
- sporty
- elevated basics

### Behavior

- User selects at least 3 interests.
- Selected interests seed Discover feed.
- User can skip, but feed should default to trending items.

---

## Screen 04 — Discover Feed

### Purpose

This is the RedNote-like main discovery surface where users scroll through recommended fashion items.

### Core idea

The Discover feed should show random but relevant fashion items personalized to the user.

### Content types

MVP content types:

- Product card
- Product grid card
- Brand recommendation card
- Collection card
- Trending item card

Future content types:

- Creator post
- Outfit post
- Ranking card
- Short video/reel
- Sponsored item

### Product card anatomy

Each product card must show:

- product image
- brand name
- product name
- price or price range
- sale price if available
- available colors preview
- save button
- quick brand/category label
- optional “recommended because” line

Example:

```text
[Image]
COS
Relaxed Wool Coat
$250
Recommended because you saved minimal outerwear
[Save]
```

### Feed behavior

- Infinite vertical scroll
- Pull to refresh
- Tapping product opens Product Detail
- Save button saves item
- Long press can show quick actions later
- Feed should avoid repeating same brand too often

### Recommendation inputs

Use the following signals:

- onboarding interests
- viewed products
- saved products
- searched queries
- selected filters
- followed brands
- clicked outbound products
- trending products
- new arrivals
- price range preference
- category preference

### Feed ranking v1 formula

For MVP, implement a simple score:

```text
score =
  category_match_score * 0.25
+ brand_match_score * 0.20
+ style_tag_match_score * 0.20
+ popularity_score * 0.15
+ freshness_score * 0.10
+ price_match_score * 0.05
+ availability_score * 0.05
```

### Empty state

If there is not enough data:

> Start saving and searching items to make your Discover feed better.

### Acceptance criteria

- Feed loads in under 2 seconds with cached data.
- Feed supports pagination.
- Feed includes products across multiple brands.
- Feed personalization changes after user saves/searches/views items.
- Feed never shows only one brand unless user explicitly filters by brand elsewhere.

---

## Screen 05 — Browse/Search Landing

### Purpose

This is the specific browsing surface where users intentionally filter exactly what they want.

This is one of the two most important screens in the entire app.

### Components

- Search bar
- Category shortcuts
- Brand shortcuts
- Trending searches
- Recently searched queries
- Filter-first browse modules

### Required modules

1. **Search bar**
   - placeholder: “Search brands, items, categories…”

2. **Shop by category**
   - Dresses
   - Tops
   - Jeans
   - Sneakers
   - Bags
   - Outerwear
   - Jewelry
   - Accessories

3. **Shop by brand**
   - Show followed brands first
   - Then popular brands
   - Then A-Z brand directory

4. **Trending searches**
   - black boots
   - white sneakers
   - work bags
   - linen pants
   - summer dresses
   - oversized blazer

5. **Recent searches**
   - stored locally and server-side for signed-in users

### Acceptance criteria

- User can search text.
- User can open category browse.
- User can open brand browse.
- User can access filters before or after searching.
- Browse/Search feels different from Discover: it is intentional, precise, and controlled.

---

## Screen 06 — Product Results

### Purpose

Show the products matching a search, category, brand, or filter combination.

### Entry points

- Search query
- Category tap
- Brand tap
- Filter selection
- Discover card “see more like this”

### Layout

Use a 2-column product grid by default.

Each item shows:

- image
- brand
- product name
- price
- sale marker if applicable
- save button

### Top controls

- Search query/category/brand title
- Result count
- Filter button
- Sort button
- Active filter chips

### Filters

Required filters:

- Category
- Subcategory
- Brand
- Price min/max
- Size
- Color
- Gender/audience
- Availability
- Sale only

Recommended filters:

- Material
- Fit
- Occasion
- Retailer
- New arrivals
- Sustainable/ethical tag if available

### Sort options

- Recommended
- Newest
- Price: low to high
- Price: high to low
- Most saved
- Sale percentage

### Acceptance criteria

- Filters can be combined.
- Active filters are visible as chips.
- User can clear one filter or all filters.
- Results update after filter changes.
- If no results, show useful empty state and suggest removing filters.

---

## Screen 07 — Filter Sheet

### Purpose

Let users narrow results exactly.

### Components

- Category selector
- Brand selector with search
- Price range slider/input
- Size multi-select
- Color selector
- Gender/audience selector
- Availability toggle
- Sale toggle
- Apply button
- Reset button

### Behavior

- Filter sheet opens as bottom sheet/modal.
- Filter changes are previewed or applied after pressing Apply.
- Selected filters persist for the current search session.

### Acceptance criteria

- User can filter by exact brand.
- User can filter by exact item type/category.
- User can combine brand + category + price + size.
- User can reset filters.

---

## Screen 08 — Product Detail

### Purpose

Show complete product information and route user to the original brand/retailer.

### Components

- Image carousel
- Brand name
- Product name
- Price
- Sale price
- Color variants
- Size availability
- Product description
- Material/care if available
- Retailer/brand source
- Save button
- Share button
- View at Brand / View at Retailer CTA
- Similar items
- More from this brand

### Required product fields

- product id
- brand
- title
- category
- subcategory
- image URLs
- price
- currency
- product URL
- availability

### Optional fields

- sale price
- size list
- color list
- material
- description
- fit
- model info
- rating/reviews if source provides it
- shipping/returns summary

### CTA behavior

Primary CTA:

> View at Brand

or if sold by retailer:

> View at Retailer

When tapped:

1. log outbound click
2. use affiliate URL if available
3. otherwise use direct product URL
4. open browser or in-app webview based on implementation choice

### Acceptance criteria

- Product detail page loads from product id.
- Save button works.
- View at Brand/Retailer logs event before redirect.
- Similar items appear below product detail.
- Stale/out-of-stock products show availability clearly.

---

## Screen 09 — Brand Page

### Purpose

Let users browse all items from a specific brand.

### Components

- Brand logo/name
- Brand description, optional
- Follow brand button
- Brand website link
- Category tabs for brand products
- Product grid
- Sort/filter controls

### Brand page sections

- New arrivals
- Popular on Zoe
- On sale
- All products
- Similar brands, optional

### Acceptance criteria

- User can open brand page from product detail or search.
- User can browse all products from the brand.
- User can filter within that brand.
- User can follow brand.
- Followed brands influence Discover feed.

---

## Screen 10 — Saved / Collections

### Purpose

Let users store items for later.

### Components

- Saved items grid
- Collections list
- Create collection
- Edit collection
- Remove saved item

### Default collections

- Wishlist
- Closet Ideas
- Workwear
- Going Out
- Shoes
- Bags
- Sale Watch

### Behavior

- Tapping save defaults to Wishlist.
- User can move item into another collection.
- Saved items influence recommendations.

### Acceptance criteria

- Signed-in users can save products.
- Guest users are prompted to sign in when saving.
- Saved products persist.
- Collections support create/read/update/delete.

---

## Screen 11 — Profile

### Purpose

Show user identity and preferences.

### MVP components

- Avatar
- Username
- Display name
- Bio
- Saved collections shortcut
- Followed brands
- Style interests
- Settings

### Future components

- Public collections
- Ranked lists
- Creator posts
- Outfit boards
- Followers/following

---

# 12. Product Catalog Requirements

The catalog is the backbone of the app.

## 12.1 Catalog source strategy

MVP can begin with:

1. manually seeded products
2. CSV import
3. JSON import
4. affiliate product feeds later
5. direct brand product feeds later
6. Shopify/commerce API integrations later

## 12.2 Catalog ingestion pipeline

Implement this flow:

```text
Raw source file/API
→ Parse
→ Validate
→ Normalize
→ Save raw import record
→ Upsert brand
→ Upsert product group
→ Upsert variants
→ Upsert offers
→ Index into search
```

## 12.3 Required catalog quality checks

Reject or flag products missing:

- title
- brand
- image
- price
- product URL
- category

Flag products with:

- invalid image URL
- invalid product URL
- missing currency
- out-of-stock status
- duplicate source id
- impossible price

---

# 13. Data Model

Use this as the initial database schema guide.

---

## 13.1 users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 13.2 user_style_profiles

```sql
CREATE TABLE user_style_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  preferred_categories TEXT[] DEFAULT '{}',
  preferred_brands TEXT[] DEFAULT '{}',
  preferred_styles TEXT[] DEFAULT '{}',
  preferred_colors TEXT[] DEFAULT '{}',
  price_min NUMERIC,
  price_max NUMERIC,
  sizes JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 13.3 brands

```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  country TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 13.4 categories

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES categories(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  level INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 13.5 product_groups

A product group is the canonical product users see.

```sql
CREATE TABLE product_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id),
  category_id UUID REFERENCES categories(id),
  title TEXT NOT NULL,
  slug TEXT,
  description TEXT,
  gender TEXT,
  style_tags TEXT[] DEFAULT '{}',
  color_family TEXT,
  material_summary TEXT,
  primary_image_url TEXT,
  min_price NUMERIC,
  max_price NUMERIC,
  currency TEXT DEFAULT 'USD',
  availability_status TEXT DEFAULT 'unknown',
  source_count INT DEFAULT 1,
  first_seen_at TIMESTAMPTZ DEFAULT now(),
  last_seen_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 13.6 product_variants

A variant is a specific size/color/SKU version.

```sql
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_group_id UUID REFERENCES product_groups(id) ON DELETE CASCADE,
  source_variant_id TEXT,
  sku TEXT,
  gtin TEXT,
  color_name TEXT,
  color_family TEXT,
  size_label TEXT,
  size_system TEXT,
  image_url TEXT,
  availability_status TEXT DEFAULT 'unknown',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 13.7 retailers

```sql
CREATE TABLE retailers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  website_url TEXT,
  logo_url TEXT,
  affiliate_network TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 13.8 offers

An offer is where the product can be bought.

```sql
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_group_id UUID REFERENCES product_groups(id) ON DELETE CASCADE,
  product_variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  retailer_id UUID REFERENCES retailers(id),
  price NUMERIC,
  sale_price NUMERIC,
  currency TEXT DEFAULT 'USD',
  availability_status TEXT DEFAULT 'unknown',
  product_url TEXT NOT NULL,
  affiliate_url TEXT,
  source_name TEXT,
  source_product_id TEXT,
  last_seen_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 13.9 product_media

```sql
CREATE TABLE product_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_group_id UUID REFERENCES product_groups(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  media_type TEXT DEFAULT 'image',
  sort_order INT DEFAULT 0,
  width INT,
  height INT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 13.10 saved_collections

```sql
CREATE TABLE saved_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 13.11 saved_items

```sql
CREATE TABLE saved_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES saved_collections(id) ON DELETE SET NULL,
  product_group_id UUID REFERENCES product_groups(id) ON DELETE CASCADE,
  product_variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_group_id)
);
```

---

## 13.12 user_events

Track behavior for personalization.

```sql
CREATE TABLE user_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  anonymous_id TEXT,
  event_type TEXT NOT NULL,
  product_group_id UUID REFERENCES product_groups(id) ON DELETE SET NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  query TEXT,
  filters JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

Event types:

- `product_viewed`
- `product_saved`
- `product_unsaved`
- `product_clicked_out`
- `search_performed`
- `filter_applied`
- `brand_viewed`
- `brand_followed`
- `discover_impression`
- `discover_click`

---

## 13.13 brand_follows

```sql
CREATE TABLE brand_follows (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY(user_id, brand_id)
);
```

---

## 13.14 outbound_clicks

```sql
CREATE TABLE outbound_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  anonymous_id TEXT,
  product_group_id UUID REFERENCES product_groups(id) ON DELETE SET NULL,
  offer_id UUID REFERENCES offers(id) ON DELETE SET NULL,
  retailer_id UUID REFERENCES retailers(id) ON DELETE SET NULL,
  source_surface TEXT,
  outbound_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

# 14. API Requirements

The coding agent should implement these endpoints or equivalent GraphQL operations.

---

## 14.1 Auth/User

```http
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/me
PATCH /api/me
GET  /api/me/style-profile
PATCH /api/me/style-profile
```

---

## 14.2 Discover

```http
GET /api/discover/feed?cursor=&limit=20
```

Response should include:

```json
{
  "items": [
    {
      "type": "product",
      "product": {},
      "reason": "Because you saved minimal outerwear"
    }
  ],
  "nextCursor": "string"
}
```

---

## 14.3 Search/Browse

```http
GET /api/search?q=&category=&brand=&priceMin=&priceMax=&size=&color=&availability=&sort=&cursor=&limit=40
GET /api/search/autocomplete?q=
GET /api/search/filters
```

Search response:

```json
{
  "query": "black boots",
  "total": 128,
  "items": [],
  "facets": {
    "brands": [],
    "categories": [],
    "colors": [],
    "sizes": [],
    "prices": {}
  },
  "nextCursor": "string"
}
```

---

## 14.4 Products

```http
GET /api/products/:productId
GET /api/products/:productId/similar
GET /api/products/:productId/offers
```

---

## 14.5 Brands

```http
GET /api/brands
GET /api/brands/:slug
GET /api/brands/:slug/products
POST /api/brands/:brandId/follow
DELETE /api/brands/:brandId/follow
```

---

## 14.6 Saved

```http
GET /api/saved
POST /api/saved
DELETE /api/saved/:savedItemId
GET /api/collections
POST /api/collections
PATCH /api/collections/:collectionId
DELETE /api/collections/:collectionId
```

---

## 14.7 Outbound routing

```http
GET /api/r/:offerId
POST /api/outbound-clicks
```

Behavior:

1. Get offer by id.
2. Choose `affiliate_url` if present.
3. Otherwise use `product_url`.
4. Create outbound click record.
5. Redirect to selected URL.

---

## 14.8 Catalog admin/import

```http
POST /api/admin/catalog/import
GET  /api/admin/catalog/import-runs
GET  /api/admin/products/flagged
PATCH /api/admin/products/:productId
POST /api/admin/products/:productId/merge
```

These can be protected admin endpoints or local scripts for MVP.

---

# 15. Search Implementation Requirements

## 15.1 Search engine

Use one of:

- Postgres full-text search for very early MVP
- Typesense for fast faceted search
- Meilisearch for simple search
- OpenSearch/Elasticsearch for scalable advanced search

Recommended MVP:

> Use Typesense or Meilisearch for speed of implementation. Use OpenSearch later if needed.

## 15.2 Indexed product fields

Index:

- product id
- title
- brand name
- category
- subcategory
- description
- style tags
- color
- material
- gender
- price
- sale price
- availability
- created/updated time
- popularity metrics

## 15.3 Search behavior

Search should support:

- typo tolerance
- prefix search
- brand matching
- category matching
- filter facets
- sort
- pagination

## 15.4 Search ranking v1

```text
search_score =
  text_relevance * 0.45
+ brand_match * 0.15
+ category_match * 0.15
+ popularity * 0.10
+ availability * 0.10
+ freshness * 0.05
```

---

# 16. Discover Feed Implementation Requirements

## 16.1 Feed generation v1

For MVP, generate Discover feed server-side using a weighted query.

Inputs:

- user preferred categories
- user preferred brands
- user style tags
- products user viewed
- products user saved
- recent searches
- trending products

Output:

- paginated list of product cards

## 16.2 Feed diversity rules

Apply these constraints:

- Do not show more than 3 products from same brand in a row.
- Mix categories if user selected multiple categories.
- Prefer in-stock products.
- Prefer products with valid images.
- Downrank products the user already clicked out unless similar recommendations are needed.
- Downrank products already seen many times.

## 16.3 Feed reason labels

Optional but useful:

- “Because you searched black boots”
- “Because you saved COS”
- “Trending in outerwear”
- “More from brands you like”
- “Similar to your saved items”

---

# 17. Product Taxonomy

Initial taxonomy should support these categories.

```text
Fashion
├── Clothing
│   ├── Tops
│   ├── T-shirts
│   ├── Shirts
│   ├── Knitwear
│   ├── Hoodies
│   ├── Dresses
│   ├── Skirts
│   ├── Pants
│   ├── Jeans
│   ├── Shorts
│   └── Outerwear
├── Shoes
│   ├── Sneakers
│   ├── Boots
│   ├── Loafers
│   ├── Heels
│   ├── Sandals
│   └── Flats
├── Bags
│   ├── Shoulder Bags
│   ├── Crossbody Bags
│   ├── Tote Bags
│   ├── Clutches
│   └── Backpacks
├── Accessories
│   ├── Belts
│   ├── Hats
│   ├── Scarves
│   ├── Sunglasses
│   └── Watches
├── Jewelry
│   ├── Rings
│   ├── Necklaces
│   ├── Earrings
│   └── Bracelets
└── Beauty Adjacent
    ├── Fragrance
    ├── Makeup
    └── Skincare
```

---

# 18. Product Attributes

Every product should attempt to normalize these attributes.

## Required

- brand
- title
- category
- image
- price
- currency
- product URL
- availability

## Strongly recommended

- subcategory
- gender/audience
- color
- size
- sale price
- source retailer
- description
- material

## Future

- fit
- occasion
- season
- sustainability tag
- model measurements
- return policy
- shipping region
- review rating
- review count

---

# 19. Seed Data Requirements

For MVP, seed enough data to make browsing feel real.

## Minimum seed size

- 20 brands
- 500 products
- 10 categories
- 5 top-level style tags

## Better seed size

- 50 brands
- 2,000 products
- 30 categories/subcategories
- 20 style tags

## Seed product JSON shape

```json
{
  "brand": "COS",
  "title": "Relaxed Wool Coat",
  "category": "Outerwear",
  "subcategory": "Coats",
  "description": "Relaxed wool-blend coat with clean minimal silhouette.",
  "gender": "women",
  "style_tags": ["minimal", "quiet luxury", "workwear"],
  "color_family": "black",
  "material_summary": "wool blend",
  "price": 250,
  "currency": "USD",
  "availability_status": "in_stock",
  "image_urls": ["https://example.com/image.jpg"],
  "product_url": "https://brand.com/product",
  "source_name": "manual_seed"
}
```

---

# 20. Analytics Requirements

Track every action needed for personalization and product decisions.

## Required events

- `app_opened`
- `onboarding_completed`
- `discover_feed_loaded`
- `discover_product_impressed`
- `discover_product_clicked`
- `product_viewed`
- `product_saved`
- `product_unsaved`
- `product_clicked_out`
- `search_performed`
- `search_result_clicked`
- `filter_applied`
- `brand_viewed`
- `brand_followed`
- `collection_created`

## Event properties

Each event should include when available:

- user id
- anonymous id
- session id
- product id
- brand id
- category id
- query
- filters
- source surface
- timestamp

---

# 21. Success Metrics

## North Star Metric

Weekly active users who either:

- save a product
- search and click a product
- click out to a brand/retailer
- return to Discover feed after previous activity

## Core metrics

- D1 retention
- D7 retention
- weekly active users
- searches per active user
- saves per active user
- product detail views per active user
- outbound click-through rate
- Discover feed click-through rate
- filter usage rate
- brand page views
- saved collection creation rate

## Catalog quality metrics

- percent of products with valid image
- percent of products with valid price
- percent of products in stock
- broken outbound link rate
- duplicate product rate
- search zero-result rate

---

# 22. Recommended Tech Stack

## Mobile

- React Native
- Expo
- TypeScript
- Expo Router or React Navigation
- TanStack Query
- Zustand or Redux Toolkit
- NativeWind or custom styling system

## Backend

- Node.js with NestJS or Express
- or Python FastAPI
- PostgreSQL
- Prisma or SQLAlchemy
- Redis for caching later
- Typesense/Meilisearch for search MVP
- S3-compatible object storage for imported feeds/media

## Auth

- Supabase Auth, Clerk, Firebase Auth, or custom JWT auth

## MVP recommendation

For fastest build:

- Expo React Native app
- Supabase Postgres/Auth/Storage
- Edge functions or FastAPI backend
- Typesense or Meilisearch for search
- Seed import script from JSON/CSV

---

# 23. Build Order for Coding Agent

## Phase 1 — Project setup

- Create mobile app shell
- Set up backend
- Set up database
- Set up auth
- Define environment variables
- Add seed data loader

## Phase 2 — Catalog foundation

- Create brand/category/product/offer tables
- Create seed product import
- Create product API
- Create brand API
- Create product detail API

## Phase 3 — Browse/Search

- Build Browse tab
- Build search endpoint
- Build product results grid
- Build filter sheet
- Implement brand filter
- Implement category filter
- Implement price/color/size filters

## Phase 4 — Discover feed

- Build Discover tab
- Build feed endpoint
- Add product card UI
- Track impressions and clicks
- Add simple personalization from onboarding interests

## Phase 5 — Product detail and routing

- Build product detail page
- Add image carousel
- Add size/color/price/availability display
- Add similar items placeholder
- Add outbound routing endpoint
- Track outbound clicks

## Phase 6 — Saved collections

- Add save product API
- Add saved items tab
- Add collections
- Make save button work from Discover, Results, and Product Detail

## Phase 7 — Personalization v1

- Track searches
- Track filters
- Track saves
- Update user style profile
- Adjust Discover feed recommendations using behavior

## Phase 8 — Polish and QA

- Loading states
- Empty states
- Error states
- Pagination
- Pull to refresh
- Image fallback
- Broken product handling
- Mobile UI polish

---

# 24. Acceptance Criteria for MVP Completion

The MVP is complete when:

1. User can open the app and complete onboarding.
2. User can scroll a Discover feed of fashion products.
3. User can search for fashion items.
4. User can browse by category.
5. User can browse by brand.
6. User can filter by brand, category, price, color, size, and availability.
7. User can open a product detail page.
8. User can save products.
9. User can view saved products.
10. User can open a brand page.
11. User can tap View at Brand/Retailer and be routed out.
12. Outbound clicks are logged.
13. Product views, searches, filters, and saves are tracked.
14. Discover feed changes based on user interests or actions.
15. Catalog can be loaded from seed data.
16. App handles loading, empty, and error states.

---

# 25. Important Implementation Notes

## 25.1 Do not hardcode product cards only in frontend

Products must come from backend data or seed data through an API.

## 25.2 Build product catalog as source of truth

Do not treat products as posts. Posts/creator content can come later. The core object is the fashion product.

## 25.3 Filtering must be real

Filters should query the backend/search index, not only filter a small local array.

## 25.4 Save behavior must work everywhere

Save should work from:

- Discover feed
- Product results
- Product detail
- Similar items
- Brand page

## 25.5 Search and Discover are different

Discover is passive and personalized.  
Browse/Search is active and precise.

## 25.6 Product detail must always include outbound route

Every product needs a clear path to the original brand/retailer.

## 25.7 Use normalized categories

Do not rely only on raw category strings from brands. Normalize categories into Zoe's taxonomy.

---

# 26. Future Roadmap

## V1.1

- Better product feed ingestion
- Affiliate feed support
- More brands
- Similar products
- Price drop alerts
- Back-in-stock alerts

## V1.2

- Creator profiles
- Public collections
- Product sharing
- Social saves
- Follow friends/creators

## V1.3

- Ranking lists
- Rank Updates feed
- Top products by category
- Creator-ranked lists

## V1.4

- Reels/Looks
- Outfit posts
- Style boards
- Comments
- Share to chat

## V2

- Visual search
- AI stylist
- Dupe finder
- Outfit builder
- Brand dashboard
- Sponsored placements
- In-app checkout exploration

---

# 27. Final Product Definition

Zoe is a mobile-first fashion discovery app that brings products from many brands into one place.

The app has two core modes:

1. **Discover mode** — a RedNote-like personalized feed where users scroll through recommended fashion items based on their interests and behavior.
2. **Browse mode** — a precise search and filter system where users can find exact items, categories, or brands across the full catalog.

The MVP should prove that users want to use Zoe as their first stop before opening individual fashion brand websites.

---

# 28. Coding Agent Instruction Summary

Build the app in this order:

1. Set up mobile app and backend.
2. Create fashion catalog schema.
3. Seed brands/products/categories.
4. Build Discover feed.
5. Build Browse/Search with filters.
6. Build Product Detail.
7. Build Brand Page.
8. Build Saved Collections.
9. Build outbound routing.
10. Track user events.
11. Add personalization to Discover.
12. Polish loading/empty/error states.

The most important thing to get right is not social features or checkout. The most important thing is:

> **Users can discover random recommended fashion items and precisely browse/filter products across many brands in one app.**

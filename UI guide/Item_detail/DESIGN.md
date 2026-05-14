---
name: Warm Editorial Minimalism
colors:
  surface: '#fbf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#fbf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e4e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#4e4541'
  inverse-surface: '#30312f'
  inverse-on-surface: '#f2f0ed'
  outline: '#807570'
  outline-variant: '#d1c4be'
  surface-tint: '#685c57'
  primary: '#130b08'
  on-primary: '#ffffff'
  primary-container: '#2a211d'
  on-primary-container: '#958782'
  inverse-primary: '#d3c3bd'
  secondary: '#79545b'
  on-secondary: '#ffffff'
  secondary-container: '#ffced6'
  on-secondary-container: '#7a555c'
  tertiary: '#0d0e04'
  on-tertiary: '#ffffff'
  tertiary-container: '#232416'
  on-tertiary-container: '#8c8b78'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f0dfd8'
  primary-fixed-dim: '#d3c3bd'
  on-primary-fixed: '#221a16'
  on-primary-fixed-variant: '#4f4440'
  secondary-fixed: '#ffd9df'
  secondary-fixed-dim: '#eabac2'
  on-secondary-fixed: '#2e1319'
  on-secondary-fixed-variant: '#5f3d44'
  tertiary-fixed: '#e5e4ce'
  tertiary-fixed-dim: '#c9c8b2'
  on-tertiary-fixed: '#1c1c0f'
  on-tertiary-fixed-variant: '#474838'
  background: '#fbf9f6'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2df'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container_margin_mobile: 16px
  container_margin_desktop: 40px
  gutter: 16px
---

## Brand & Style

This design system is built for a high-end social discovery experience that prioritizes visual storytelling and fashion curation. The brand personality is sophisticated yet approachable, blending the authority of a print fashion magazine with the interactivity of a modern social platform.

The design style is **Modern Editorial**. It leverages heavy whitespace, a warm "paper-like" color palette, and restrained typography to create a premium atmosphere. The UI remains quiet to allow photography to be the focal point, utilizing soft shadows and subtle borders instead of heavy structural elements. The emotional goal is to evoke a sense of calm, curated luxury and effortless discovery.

## Colors

The palette is anchored in a "Warm Neutral" base that moves away from sterile whites toward organic, paper-inspired tones. 

- **Background & Surfaces:** Use `#FBF9F6` for the global canvas. Use pure `#FFFFFF` for cards and interactive surfaces to create a subtle lift. Secondary surfaces like `#F7F3EE` provide depth for inset areas like search bars or metadata tags.
- **Typography:** Primary text uses a deep "Dark Chocolate" (`#2A211D`) instead of black to maintain the warmth. Muted text scales down to earthy browns to preserve the editorial softness.
- **Accents:** Muted Burgundy and Olive are used sparingly for active states, CTA highlights, and special category markers.
- **Ranking Indicators:** Functional colors for ranking trends are desaturated to ensure they don't clash with diverse fashion photography.

## Typography

This design system utilizes a high-contrast typographic hierarchy to achieve an editorial look while maintaining the functional efficiency of a mobile app.

- **Display & Headlines:** Use `Display LG` for hero sections and trend titles. The tight letter-spacing and substantial weight provide a modern, "masthead" feel.
- **Labels:** Small utility text (metadata, ranking counts) uses `Label MD` with increased letter spacing and uppercase styling to distinguish it from narrative body text.
- **Readability:** Body text is set with generous line-height to ensure comfort during long scrolling sessions. All type is set in `Inter` to provide a clean, neutral balance to the organic colors and shapes.

## Layout & Spacing

The layout philosophy follows a **Fluid Mobile-First Grid** with a focus on immersive visuals.

- **Margins:** A consistent 16px margin is maintained on mobile devices to prevent content from feeling cramped while maximizing the real estate for fashion photography.
- **The 8px Rhythm:** All spacing (padding, gaps, margins) should be multiples of 4px, with 8px and 16px being the primary increments.
- **Editorial Breathing Room:** Use `xl` (32px) spacing between major sections (e.g., between a featured trend and the following grid) to reinforce the premium, "un-cluttered" aesthetic.
- **Grid:** For discovery feeds, use a 2-column staggered or uniform grid with 16px gutters. For ranking lists, use a single-column layout with 12px vertical spacing between cards.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Soft Ambient Shadows** rather than stark borders or heavy elevations.

- **Surface Tiers:** 
  - **Level 0 (Background):** `#FBF9F6` — The base app canvas.
  - **Level 1 (Cards/Primary):** `#FFFFFF` — Elevated with a very soft, diffused shadow (0px 4px 20px, 4% opacity of `#2A211D`).
  - **Level 2 (Modals/Overlays):** `#FFFFFF` — Elevated with a more pronounced shadow (0px 10px 30px, 8% opacity).

- **Outlines:** Use a 1px border of `#E7DED4` on all Level 1 elements to provide definition against the warm background without adding visual weight. 
- **Comparison Tray:** The compare tray should use a Backdrop Blur (20px) with a semi-transparent white tint to feel integrated yet focused.

## Shapes

The shape language is defined by **large, soft radii** that mimic the organic curves of fashion and textiles.

- **Cards:** The standard radius is 16px. For large hero cards or immersive visuals, this can scale up to 24px.
- **Interactive Elements:** Buttons utilize a pill-shape (24px+) to create a friendly, "tap-ready" target that contrasts with the more structured rectangular grids.
- **Images:** All fashion imagery must inherit the radius of its parent container. Never use sharp corners for photography.

## Components

- **Rounded Cards:** Primary container for discovery. Use a 16px radius, white background, and the 1px `#E7DED4` border. Content should have 16px internal padding.
- **Persistent Bottom Nav:** A fixed bar at the bottom with a white background and a subtle top border. Use minimal line-art icons (2pt stroke). The active state is indicated by the `Accent` color (`#6F4B52`) and a small dot indicator.
- **Sticky Top Search:** A rounded input (`12px`) using the `Surface Soft` (`#F7F3EE`) background. The search bar should shrink slightly on scroll to maximize screen space.
- **Compare Tray:** A slide-up module from the bottom. It features a horizontal scroll of 2-4 items for side-by-side ranking comparison. Use the `Surface Muted` background for the tray base.
- **Ranking Chips:** Small, pill-shaped badges for "Up," "Down," and "New." Use the status colors defined in the palette with a 10% opacity background of the same hue and 100% opacity text for high legibility.
- **Buttons:** Primary buttons use the `Primary Text` color (`#2A211D`) with white text. Secondary buttons use a transparent background with the `Border` color and `Primary Text`.
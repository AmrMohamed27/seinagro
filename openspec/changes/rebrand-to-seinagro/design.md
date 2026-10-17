# Design

## Context

See proposal.md for motivation. Observed current state (from the audit):

- Next.js 15 App Router, `next-intl` (`ar` default RTL, `en`, `fr`), Tailwind v4 (tokens in `app/globals.css`), shadcn/Radix UI primitives, framer-motion, react-hook-form + zod, Resend.
- Home page = Hero(video) / About / Departments / Products carousel / Clients marquee / Contact, all driven by `useMessages()` iterating legacy key lists with index-based icon arrays.
- Brand assets provided in `public/assets/images/`: `logo-mark.png` (1148x1217), `logo-name.png`, `logo-stack.png` (1600x1600 RGBA), `name-stack2.png` / `-english` / `-arabic`, `hero-1.jpg` and `hero-3.jpg` (2752x1536), `hero-2.jpg` (1024x572, low-res).
- Logo dominant colors: forest `#01522E`, growth `#197B17`/`#1F7F17`, orange `#F27509`; wordmark spruce `#245136`; hero golden-hour wheat `#EAA546` and sky `#99B5CB`.
- Live Domain & Official Contact details:
  - Canonical URL: `https://www.seinagro.com/`
  - Email: `info@seinagro.com`
  - Phone: `+20 11 2222 8970`
  - HQ Address: Nubaria City, Arab Republic of Egypt (جمهورية مصر العربية – مدينة النوبارية)

Must stay: `i18n/*`, `middleware.ts`, direction logic in `app/[locale]/layout.tsx`, theme provider, language switcher, `lib/env.ts`, form stack.

## Goals / Non-Goals

**Goals:**
- A distinctive scientific-agri-tech-meets-fertile-earth look, structurally unlike the old site (single narrative page, bento, split panels; no carousel, hover-cards, collapsibles, marquee).
- Full RTL/LTR parity using logical properties; ar/en/fr key parity.
- Accessible (WCAG AA), fast (hero LCP optimized), SEO-ready per locale.
- Modern enterprise bilingual typography using Google Fonts `IBM Plex Sans` + `IBM Plex Sans Arabic`.

**Non-Goals:**
- No individual founder names or placeholder/stock founder portraits (explicit constraint: focus exclusively on executive institutional multinational leadership).
- No CMS, blog, e-commerce, product catalog pages, or analytics.
- No new framework, i18n library overhaul.
- No video hero (no source asset provided).

## Decisions

### D1. Color palette ("Forest, Field & Harvest")

| Token | Light | Dark | Role |
| :-- | :-- | :-- | :-- |
| `--brand-forest` | `#01522E` | `#3FA66A` | Primary: headings, header, primary buttons |
| `--brand-growth` | `#197B17` | `#5CC45A` | Secondary green: icons, highlights, links |
| `--brand-harvest` | `#F27509` | `#FF9A3D` | Accent: CTA buttons, key stats (never small text on white) |
| `--brand-harvest-ink` | `#B34F00` | `#FFB066` | Accessible orange for text on light backgrounds |
| `--brand-wheat` | `#EAA546` | `#EAA546` | Warm highlight, dividers, decorative |
| `--earth-soil` | `#3B2A1E` | `#E8DCCB` | Fertile-earth deep neutral (fertilizer panel, footer) |
| `--earth-clay` | `#8A5A3B` | `#C79B7A` | Secondary neutral, borders on warm surfaces |
| `--surface-cream` | `#F7F2E8` | `#0B1A12` | Page background (light: warm cream; dark: deep forest-black) |
| `--surface-card` | `#FFFFFF` | `#12281C` | Cards/bento tiles |
| `--ink` | `#10231A` | `#EEF3EC` | Body text |
| `--sky-mist` | `#99B5CB` | `#99B5CB` | Cool data/science accent drawn from hero sky |

Semantic mapping: green = growth/science, orange = action, earth = fertilizer/soil, mist-blue = research/climate. The legacy olive `primary-green` and brown `secondary-brown` tokens are deleted, not aliased. Contrast: `--ink` on cream ≈ 14:1; white on forest ≈ 9:1; white on harvest orange ≈ 2.9:1 so orange buttons use `--ink`-colored label (≈ 6:1); orange text on light uses `--brand-harvest-ink` (≈ 4.8:1). Alternatives considered: single-green monochrome (rejected: reads as legacy), blue-led agri-tech (rejected: clashes with logo).

Tokens are exposed through Tailwind v4 `@theme inline` as `--color-forest`, `--color-growth`, `--color-harvest`, `--color-wheat`, `--color-soil`, `--color-clay`, `--color-cream`, `--color-mist`. shadcn base tokens (`--primary`, `--accent`, `--ring`, `--border`…) are remapped to these so `Button`/`Form` inherit the palette; the `green` button variant is replaced by `primary` (forest) and `accent` (harvest).

### D2. Typography (IBM Plex Sans + IBM Plex Sans Arabic)
Replace legacy local fonts (`Foda.otf`, `gumela-arabic`) and Raleway with official companions from `next/font/google`:
- **Latin (EN / FR):** `IBM Plex Sans` (weights: 300, 400, 500, 600, 700)
- **Arabic (AR):** `IBM Plex Sans Arabic` (weights: 300, 400, 500, 600, 700)

*Rationale:* IBM Plex was engineered for technical enterprise clarity, scientific precision, and global legibility. The Arabic variant was built specifically as the direct visual counterpart to the Latin cut, maintaining matched baseline metrics, stroke contrast, and x-height proportions. This prevents jarring vertical layout shifts when users switch between `ar` and `en`/`fr`. Local legacy font files in `lib/fonts/` can be safely decommissioned.

Arabic gets `leading-[1.8]` body / `leading-[1.4]` headings via a `[dir=rtl]` rule on the layout root to accommodate Arabic ascenders/descenders gracefully without shifting layout containers.

### D3. Section architecture (new, not a reskin)

```
+----------------------------------------------------------+
| Header: wordmark | anchors | lang | theme                |
+----------------------------------------------------------+
| 1 HERO  full-bleed hero-1.jpg, forest gradient overlay   |
|   H1 global-export line | sub | [Explore Products]       |
|   [Partner With Us] | region chips: Egypt Africa Arab Asia|
+----------------------------------------------------------+
| 2 FOUNDERS' MULTINATIONAL LEGACY & ABOUT                 |
|   Institutional narrative (NO personal names/photos)     |
|   Executive leadership across Egypt, Africa & Asia       |
|   3 interactive region impact cards + proof stats        |
+----------------------------------------------------------+
| 3 CORE OFFERINGS  two large panels side by side          |
|   [SEEDS: forest/growth]   [FERTILIZERS: soil/clay]      |
|   attributes list + climate-resilience badge each        |
+----------------------------------------------------------+
| 4 VISION | MISSION  split 50/50, forest vs cream panel   |
+----------------------------------------------------------+
| 5 STRATEGIC OBJECTIVES  bento grid (5 tiles)             |
|   +-------------+-----+-----+                            |
|   | 1 Climate   | 2   | 3   |   tile 1 spans 2 cols,     |
|   | R&D (large) |Qual |Expn |   tile 3 spans 2 rows      |
|   +------+------+-----+     |   tiles 4,5 share row      |
|   | 4 Workforce | 5 Tech    |                            |
|   +-------------+-----------+                            |
+----------------------------------------------------------+
| 6 EXPORT INQUIRY & CONTACT                               |
|   Official contact card (Nubaria City, Phone, Email)     |
|   International B2B inquiry form                         |
+----------------------------------------------------------+
| Footer: stacked logo, anchors, contact, © Seinagro       |
+----------------------------------------------------------+
```

Implemented as small purpose-built components under `components/sections/` (`hero`, `legacy`, `offerings`, `vision-mission`, `objectives-bento`, `export-inquiry`), each reading a typed translation namespace. Region/offering/objective lists use explicit keys with typed config arrays (id, icon, grid-span), not index arithmetic on `useMessages()`.

Bento grid uses CSS grid with `col-span`/`row-span` that are direction-agnostic (grid flows with `dir`), plus `framer-motion` hover lift and `prefers-reduced-motion` guard. Arrow/chevron icons use `rtl:rotate-180`.

### D4. Hero image handling
Use `hero-1.jpg` (high-res) via `next/image` with `priority`, `fill`, `sizes="100vw"`, `object-cover`, and a forest-to-transparent gradient overlay (start-aligned in both directions) for text legibility. `hero-3.jpg` is the OG image candidate; `hero-2.jpg` (1024px) is not used full-bleed. Logo: header uses `logo-mark.png` + locale wordmark (`name-stack2-arabic.png` for `ar`, `name-stack2-english.png` otherwise); footer uses `logo-stack.png`. Large hero JPEGs (2.2-2.5 MB) are served through Next image optimization.

### D5. i18n structure
Replace legacy namespaces with: `Meta`, `Nav`, `Hero`, `Legacy`, `Offerings`, `VisionMission`, `Objectives`, `Contact`, `Footer`, `NotFound`. Rich text uses `t.rich()` with `<bold>`/`<accent>` tags instead of `dangerouslySetInnerHTML` + regex helpers (`renderGreenHtml`/`renderBoldHtml` removed). A script-free parity check (`scripts/check-i18n.mjs`) compares recursive key sets across the three files. English is authored first from `openspec/project.md`; Arabic (Modern Standard business Arabic, brand "سيناغرو") and French (international/African B2B, brand "Seinagro") are authored idiomatically.

### D6. SEO & Metadata
`app/[locale]/layout.tsx` gains `generateMetadata({params})` using `getTranslations('Meta')`:
- Title template: `%s | Seinagro` / `%s | سيناغرو`
- Canonical base: `https://www.seinagro.com`
- `alternates.languages`: `ar: "https://www.seinagro.com/ar"`, `en: "https://www.seinagro.com/en"`, `fr: "https://www.seinagro.com/fr"`, `x-default: "https://www.seinagro.com/ar"`
- Open Graph tags with localized descriptions and `hero-3.jpg`.
- `app/sitemap.ts` and `app/robots.ts` configured for the 3 locales.

### D7. Inquiry handling
`sendInquiry(formData)` validated by a shared zod schema (server re-validates):
- Fields: Full Name, Company, Country, Business Email, Inquiry Type, Message, Honeypot.
- Target recipient: `info@seinagro.com` (configurable via `CONTACT_TO` env variable).
- Sender: configured via `RESEND_FROM` (e.g. `Seinagro Inquiries <noreply@seinagro.com>`).
- Fix existing bug: Return `{ success: true }` on actual email delivery.
- Toast feedback styled with Seinagro brand tokens.

### D8. Retired routes
`/departments`, `/clients`, `/products` and `/about` pages and their component folders are deleted; `next.config.ts` adds permanent redirects from the legacy paths to `/{locale}/#section` equivalents so indexed URLs resolve gracefully.

### D9. RTL guard enforcement
Every UI task runs the `i18n-rtl-guard` skill checks: (1) logical properties only, (2) same-step ar/en/fr dictionary updates with no hardcoded JSX strings, (3) Arabic font/line-height scaling without layout shifts. Grep gate (`\b(ml|mr|pl|pr|left|right)-|text-(left|right)`) verified clean.

## Risks / Trade-offs

- [Arabic/French copy quality] Model/translated drafts may read stiff → mandatory native-speaker review task before archive; keep glossary (seeds = التقاوي/البذور, fertilizers = الأسمدة, climate resilience = القدرة على مواجهة التغيرات المناخية).
- [Orange contrast] `#F27509` fails as text on light → dedicated `harvest-ink` token and ink-on-orange buttons; verify with contrast check.
- [Hero image weight] 2.5 MB JPEG → `next/image` optimization, `priority` only on hero; verify LCP.
- [Legacy asset leftovers] Unreferenced images remain in `public/` → review list in tasks, delete only confirmed-unused.
- [Breaking URLs] Handled by redirects (D8).

## Migration Plan

1. Land tokens + fonts (`IBM Plex`) + assets + metadata first (app still builds).
2. Replace sections and dictionaries together per section (parity maintained at every commit).
3. Remove legacy components/routes and add redirects.
4. Run purge grep, parity script, lint, build, then manual RTL/LTR visual pass at 360/768/1280px.
Rollback: revert the change branch; no data migration exists.

## Open Questions

None remaining. Contact details, domain, leadership presentation guidelines, and typography have been fully clarified.

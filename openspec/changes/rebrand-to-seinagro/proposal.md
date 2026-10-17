# Proposal

## Why

The repository is a template of a previous company's site (legacy brand "Shahbandar"): its copy, product data (corn/wheat/vegetable seed catalog), claims ("founded 1995"), color tokens, section layout, and missing assets all contradict Seinagro's identity (a newly established seed + fertilizer company led by founders with decades of multinational leadership). A reskin would leave contradictory claims and a recognizable old layout, so Seinagro needs a purpose-built landing page on the existing, proven i18n/routing/contact infrastructure.

## What Changes

- Purge every legacy brand reference ("Shahbandar", "الشهبندر", `shahbandar.biz`, `@SHAHBANDARSEED`, 1995/2004 history, Aswan silos, old client list, old product catalog) from code and `messages/{ar,en,fr}.json`.
- Standardize the company name to **Seinagro** (en/fr) and **سيناجرو** (ar) everywhere, including metadata, footer, and email subject.
- Introduce a new Seinagro design system: palette derived from the new logo/hero (deep forest green, vibrant growth green, harvest orange, fertile-earth neutrals), replacing the olive-green/brown tokens in `app/globals.css`.
- Replace the home page with a new six-section architecture: Hero (image, global-export positioning, dual CTAs), Founders' Legacy & About, Dual Core Offerings (Seeds vs Fertilizers), Vision & Mission split, 5-pillar Strategic Objectives bento grid, International B2B Export Inquiry.
- Rewire logo usage to `public/assets/images/logo-*.png` / `name-stack2*.png` and hero to `hero-*.jpg`; remove references to missing `logo.png`, `leaves.png`, `hero.webm`, `company-logo-*.png`.
- Remove or redirect legacy routes/components that no longer map to the new content (`/departments`, `/clients`, `/products` detail pages, marquee, hover cards, collapsibles).
- Rewrite all copy in en, then natural corporate Arabic and African/International B2B French, with full key parity.
- Add locale-aware SEO metadata (`generateMetadata`, `hreflang` alternates, Open Graph image) and fix the contact action (currently returns `success: false` on success, placeholder sender/recipient).
- **BREAKING**: legacy routes (`/departments`, `/clients`, `/products` sub-sections) and message namespaces (`HomePage.Departments`, `HomePage.Clients`, `NavLinks.*` keys) are removed/renamed.

## Capabilities

### New Capabilities

- `brand-identity-theme`: Seinagro name standardization, logo/hero asset usage, color tokens, typography, and light/dark theming.
- `landing-page-sections`: The six-section home page architecture, navigation anchors, and responsive/bento layout behavior.
- `trilingual-content`: ar/en/fr dictionary parity, RTL/LTR logical-property rules, Arabic/French copy quality, and locale-aware SEO metadata.
- `export-inquiry-contact`: B2B inquiry form (validation, fields, server action delivery, user feedback).

### Modified Capabilities

<!-- None: openspec/specs/ is currently empty. -->

## Impact

- **Code**: `app/layout.tsx`, `app/globals.css`, `app/[locale]/{layout,page}.tsx`, `app/[locale]/{about,clients,departments,products}/`, `components/{navbar,footer,contact-form,marquee,sections,departments,clients,products,ui/feature}`, `actions/contact.ts`, `lib/utils.ts`, `constants/index.ts`, `package.json` (name `articles-work`).
- **Content**: `messages/ar.json`, `messages/en.json`, `messages/fr.json` (full rewrite).
- **Assets**: use existing `public/assets/images/*`; unused stale files (`WhatsApp Image…jpeg`, `wheat-bag*.jpeg` unless used for offerings) to be reviewed; `seinagro-assets/` is empty.
- **Kept unchanged**: `i18n/*`, `middleware.ts`, `rtl-detect` direction logic, theme provider, language switcher, `lib/env.ts`, Resend + react-hook-form + zod stack.
- **Dependencies**: none required; `cobe` (globe) may be reused for export positioning.

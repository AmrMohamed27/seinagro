# trilingual-content Specification

## Purpose
Defines trilingual (ar, en, fr) content behavior: dictionary parity, RTL/LTR layout correctness, copy quality standards, and locale-aware SEO metadata.

## Requirements

### Requirement: Dictionary parity
Every user-visible string SHALL exist with identical keys in `messages/ar.json`, `messages/en.json` and `messages/fr.json`, and MUST NOT be hardcoded in components.

#### Scenario: Key parity check
- **WHEN** the key sets of the three message files are compared
- **THEN** they are identical

#### Scenario: No hardcoded strings
- **WHEN** components are reviewed
- **THEN** all visible text and aria labels come from translations

### Requirement: Logical directional styling
UI SHALL use CSS logical properties only (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`) and MUST NOT use physical `ml/mr/pl/pr/left/right/text-left/text-right` utilities.

#### Scenario: Physical utilities absent
- **WHEN** the codebase is searched for physical directional utilities
- **THEN** no matches exist outside third-party UI primitives explicitly allow-listed in design

#### Scenario: Mirrored layout in Arabic
- **WHEN** the site is viewed in `ar`
- **THEN** `dir="rtl"`, layouts, icons with direction (arrows, chevrons) and the bento grid mirror correctly

### Requirement: Arabic typography
Arabic pages SHALL use the Arabic font with line-height and sizing adjustments so that text is legible and containers do not shift relative to LTR.

#### Scenario: Arabic line-height
- **WHEN** headings and body copy render in `ar`
- **THEN** line-height is taller than Latin, with no clipped diacritics or overflow

### Requirement: Copy quality
Arabic copy SHALL be natural Modern Standard business Arabic and French copy SHALL be international/African B2B French; both MUST convey the English meaning rather than literal word-for-word translation.

#### Scenario: Reviewed translation
- **WHEN** a native reviewer reads the `ar` and `fr` copy
- **THEN** no machine-translation artifacts, mixed-language fragments, or inconsistent terminology are found

### Requirement: Locale routing preserved
The site SHALL continue to serve `ar` (default, RTL), `en` and `fr` via locale-prefixed routes and the language switcher.

#### Scenario: Locale switch
- **WHEN** a user selects another language
- **THEN** the same section is shown in that locale with correct direction

### Requirement: Locale-aware SEO metadata
Each locale SHALL expose a localized title, description, Open Graph data, canonical URL, and `hreflang` alternates for all three locales.

#### Scenario: Metadata per locale
- **WHEN** page head is inspected for each locale
- **THEN** title and description are in that locale and contain "Seinagro"/"سيناجرو"

#### Scenario: Hreflang alternates
- **WHEN** the head is inspected
- **THEN** alternates for `ar`, `en`, `fr` and `x-default` are present

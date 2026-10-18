# brand-identity-theme Specification

## Purpose
Defines the Seinagro visual identity: standardized naming, logo and hero asset usage, color tokens, typography, and light/dark theming, so no trace of the legacy brand remains.

## Requirements

### Requirement: Standardized company name
The site SHALL present the company as "Seinagro" in English and French and "سيناجرو" in Arabic in every visible string, page title, metadata field, footer, and outgoing email. The legacy brand names and the misspelling "Sinagro" MUST NOT appear anywhere in source or content.

#### Scenario: No legacy brand strings
- **WHEN** the repository source and all message files are searched case-insensitively for "shahbandar", "الشهبندر", "شهبندر" and "sinagro"
- **THEN** there are zero matches

#### Scenario: Name per locale
- **WHEN** a page is rendered in `ar`, `en` or `fr`
- **THEN** the company name appears as "سيناجرو", "Seinagro" and "Seinagro" respectively

### Requirement: Official brand assets
The site SHALL use only the provided assets in `public/assets/images/` for logo and hero imagery, and MUST NOT reference missing files.

#### Scenario: Asset references resolve
- **WHEN** the production build is crawled
- **THEN** every referenced image under `/assets/` returns HTTP 200

#### Scenario: Localized wordmark
- **WHEN** a wordmark is shown in the header or footer
- **THEN** the Arabic wordmark is used for `ar` and the English wordmark for `en` and `fr`

### Requirement: Seinagro color palette
The site SHALL define theme color tokens derived from the logo and hero (deep forest green, vibrant growth green, harvest orange, fertile-earth neutrals) and expose them via the Tailwind theme. Text/background pairs MUST meet WCAG AA contrast.

#### Scenario: Legacy tokens removed
- **WHEN** the global stylesheet is inspected
- **THEN** no `primary-green` olive tokens or `secondary-brown` heading color from the legacy brand remain

#### Scenario: Contrast compliance
- **WHEN** body text, headings, and button labels are measured in light and dark themes
- **THEN** each pair has a contrast ratio of at least 4.5:1 (3:1 for large text)

### Requirement: Light and dark theming
The site SHALL support light and dark themes using the same Seinagro palette, with the theme toggle preserved.

#### Scenario: Theme toggle
- **WHEN** the user toggles dark mode
- **THEN** all sections re-render with dark-variant tokens without layout shift

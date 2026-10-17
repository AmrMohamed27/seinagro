## Purpose

Defines the structure and behavior of the Seinagro single-page landing site: the six ordered sections, their content obligations, and navigation behavior.

## ADDED Requirements

### Requirement: Home page section order
The home page SHALL render, in order: Hero, Founders' Legacy & About, Core Offerings, Vision & Mission, Strategic Objectives, and Export Inquiry. Each section SHALL have a stable anchor id and a navigation entry.

#### Scenario: Ordered sections
- **WHEN** the home page loads in any locale
- **THEN** the six sections appear in the specified order with ids `home`, `about`, `offerings`, `vision`, `objectives`, `contact`

#### Scenario: Anchor navigation
- **WHEN** a user selects a nav link
- **THEN** the page scrolls to the matching section and the link shows an active state

### Requirement: Hero section
The hero SHALL display the provided hero image, a headline positioning Seinagro for global export, and two CTAs: "Explore Products" (to offerings) and "Partner With Us" (to contact).

#### Scenario: Dual CTAs
- **WHEN** the hero is visible
- **THEN** both CTAs are present, keyboard-focusable, and scroll to `offerings` and `contact` respectively

#### Scenario: Hero image loads without layout shift
- **WHEN** the page loads on mobile or desktop
- **THEN** the hero image is prioritized, has reserved dimensions, and text remains legible over it

### Requirement: Founders' Legacy and About
The about section SHALL state that Seinagro is newly established and backed by founders with decades of executive leadership in multinational agricultural corporations across Egypt, Africa, and Asia. The section MUST NOT contain personal founder names or placeholder/stock founder portraits, and MUST NOT claim a founding year or history belonging to the legacy brand.

#### Scenario: Leadership presentation
- **WHEN** the section is viewed
- **THEN** the narrative focuses strictly on the executive team's multinational track record and scientific/practical capability, without individual founder names or portraits

#### Scenario: Legacy region highlights
- **WHEN** the section is viewed
- **THEN** Egypt, Africa, and Asia are each represented as highlighted regions with the multinational-experience message

### Requirement: Dual core offerings
The offerings section SHALL present two equal-weight offerings: certified strategic crop seeds (exclusive, high-yielding, climate-resilient) and straight, compound and specialized organic fertilizers, each with a climate-resilience highlight.

#### Scenario: Two offerings shown
- **WHEN** the section renders
- **THEN** exactly two offering cards appear, each with title, description, and key attributes

#### Scenario: Responsive stacking
- **WHEN** viewport width is below the tablet breakpoint
- **THEN** the cards stack vertically in seeds-then-fertilizers order

### Requirement: Vision and Mission split showcase
The site SHALL present Vision and Mission as two visually distinct panels using the statements defined in `openspec/project.md`.

#### Scenario: Split layout
- **WHEN** viewed on desktop
- **THEN** Vision and Mission appear side by side, mirrored correctly in RTL

### Requirement: Strategic objectives bento grid
The site SHALL show five strategic objectives (Climate-Resilient R&D, Uncompromising Quality, Egypt/Africa/Arab/Global Expansion, Elite Scientific and Field Workforce, Global Technology Adoption) in a bento grid with hover/focus interaction.

#### Scenario: Five tiles
- **WHEN** the grid renders
- **THEN** five tiles appear with icon, title, and summary; no tile is cut off at any breakpoint

#### Scenario: Reduced motion
- **WHEN** the user prefers reduced motion
- **THEN** tile and section animations are disabled or minimized

### Requirement: Header and footer
The header and footer SHALL provide section navigation, the language switcher, theme toggle, localized wordmark, and official company contact details (Nubaria City, Egypt; Phone `+20 11 2222 8970`; Email `info@seinagro.com`).

#### Scenario: Mobile menu
- **WHEN** the viewport is below the desktop breakpoint
- **THEN** navigation is available through the mobile menu in the active text direction

### Requirement: Legacy routes retired
Routes for the legacy departments, clients and product catalog pages SHALL no longer render legacy content.

#### Scenario: Legacy URL access
- **WHEN** a user visits `/{locale}/departments`, `/clients`, or `/products`
- **THEN** they are redirected to the corresponding home anchor or receive the localized not-found page

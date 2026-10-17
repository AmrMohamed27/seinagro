# Tasks

> **Guard rule for every UI task (G):** run the `i18n-rtl-guard` skill checks before marking the task done: (1) logical properties only (`ms/me/ps/pe/start/end/text-start/text-end`; grep `\b(ml|mr|pl|pr|left|right)-|text-(left|right)` returns nothing in touched files), (2) ar/en/fr dictionaries updated in the same step with no hardcoded JSX strings, (3) Arabic font/line-height scaling verified with no container shift. Tasks marked **[G]** require this.

## 1. Foundations: tokens, assets, typography & metadata

- [x] 1.1 Replace color tokens in `app/globals.css` with the Seinagro palette (design D1), remap shadcn base tokens, delete `primary-green*` / `secondary-brown*`; verify `grep -n "primary-green\|secondary-brown" -r app components` returns nothing and light/dark render without errors **[G]**
- [x] 1.2 Implement Google Fonts `IBM Plex Sans` (Latin) and `IBM Plex Sans Arabic` (Arabic) in `lib/fonts.ts` (design D2), apply `[dir=rtl]` line-height rules, and decommission legacy local fonts (`Foda.otf`, `gumela-arabic`); verify clean font loading and no clipping/layout shifts between AR and EN/FR **[G]**
- [x] 1.3 Replace `green` button variant with `primary`/`accent` variants in `components/ui/button.tsx`; verify no `variant="green"` usage remains and buttons meet 4.5:1 contrast **[G]**
- [x] 1.4 Audit `components/ui/*` for physical directional utilities and migrate to logical equivalents; verify the grep gate is clean **[G]**
- [x] 1.5 Create `lib/brand.ts` mapping logo/hero asset paths and locale wordmarks; verify every referenced path exists in `public/assets/images/`
- [x] 1.6 Configure metadata base `https://www.seinagro.com` and replace root metadata in `app/layout.tsx`; add `generateMetadata` (title, description, canonical, hreflang incl. `x-default`, Open Graph with `hero-3.jpg`) in `app/[locale]/layout.tsx`, plus `app/sitemap.ts` and `app/robots.ts`; verify via `curl` that each locale head contains correct tags
- [x] 1.7 Rename `package.json` name to `seinagro`; verify `npm run build` still starts

## 2. Trilingual dictionaries (rewrite)

- [x] 2.1 Draft the English source dictionary `messages/en.json` with namespaces `Meta, Nav, Hero, Legacy, Offerings, VisionMission, Objectives, Contact, Footer, NotFound`, incorporating verified contact info (Nubaria City, Egypt; `+20 11 2222 8970`; `info@seinagro.com`) and strictly institutional leadership (no individual founder names/photos); verify JSON parses and contains no legacy brand strings
- [x] 2.2 Translate the English company profile into natural, high-level corporate Modern Standard Arabic in `messages/ar.json`, brand written "سيناغرو" everywhere, idiomatic rather than literal, using the glossary in design Risks; verify key parity with en and no Latin brand spelling
- [x] 2.3 Translate the English company profile into African/International B2B French in `messages/fr.json`, brand "Seinagro", formal "nous/vous" register, consistent agri terminology (semences certifiées, engrais simples, composés et organiques spécialisés, résilience climatique); verify key parity with en
- [x] 2.4 Add a verification script `scripts/check-i18n.mjs` (recursive key-set diff across ar/en/fr plus brand-spelling checks for "Shahbandar", "الشهبندر", "Sinagro"); run it and verify exit code 0
- [ ] 2.5 Native-speaker review pass of `ar` and `fr` copy (terminology consistency, no mixed-language fragments, no machine artifacts); record review notes in the change folder before archive
- [ ] 2.6 Replace `renderGreenHtml`/`renderBoldHtml` HTML-string helpers in `lib/utils.ts` with `t.rich()` usage; verify no `dangerouslySetInnerHTML` remains in components

## 3. Header, footer, shell

- [ ] 3.1 Rebuild header/navbar (`components/navbar/*`) with new logo (`logo-mark.png` + locale wordmark), anchors `home, about, offerings, vision, objectives, contact`, active-section highlight, language switcher and theme toggle preserved; verify desktop and mobile menu in `ar` (RTL) and `en` **[G]**
- [ ] 3.2 Rebuild footer (`components/footer.tsx`) with `logo-stack.png`, anchors, verified official contact details (Nubaria City, Egypt; `+20 11 2222 8970`; `info@seinagro.com`), and `© Seinagro`; remove legacy social links; verify no hardcoded strings and RTL mirroring **[G]**
- [ ] 3.3 Update `app/not-found.tsx` and `components/loader.tsx` to the new brand and translations; verify visiting an unknown URL shows localized not-found **[G]**

## 4. Home page sections

- [ ] 4.1 Build Hero section (`hero-1.jpg` via `next/image` priority, forest gradient overlay, global-export headline, region chips, dual CTAs to `#offerings` and `#contact`); verify one `<h1>`, CTAs scroll correctly, text legible at 360px and 1440px in all locales **[G]**
- [ ] 4.2 Build Founders' Legacy & About section (narrative of executive leadership across Egypt, Africa & Asia, with 3 interactive region impact cards; strictly NO personal founder names or placeholder portraits); verify copy matches `project.md` and layout mirrors in RTL **[G]**
- [ ] 4.3 Build Dual Core Offerings (Certified Strategic Crop Seeds vs Straight, Compound & Specialized Organic Fertilizers, each with climate-resilience badge, forest vs soil panel styling); verify exactly two cards, stacked seeds-then-fertilizers on mobile **[G]**
- [ ] 4.4 Build Vision & Mission split showcase using `project.md` statements; verify side-by-side on desktop, mirrored in `ar`, stacked on mobile **[G]**
- [ ] 4.5 Build 5-pillar Strategic Objectives bento grid with typed config (id, icon, span), hover/focus motion, `prefers-reduced-motion` support; verify five tiles with no cut-off at 360/768/1280px and correct mirroring **[G]**
- [ ] 4.6 Compose `app/[locale]/page.tsx` in the specified section order with ids `home, about, offerings, vision, objectives, contact` and reuse `AnimatedSection`; verify order and anchor navigation in all three locales **[G]**

## 5. Export inquiry & contact

- [ ] 5.1 Add `RESEND_FROM` and `CONTACT_TO` to `lib/env.ts` and `.env.example` (defaulting `CONTACT_TO` to `info@seinagro.com`); verify build fails clearly when missing and passes when set
- [ ] 5.2 Create shared zod inquiry schema (name, company, country, email, inquiry type, message, honeypot) and rewrite `actions/contact.ts` to validate server-side, send to `info@seinagro.com` via Resend with reply-to, and return correct `success` (fixing the legacy inverted/false return); verify with a mocked Resend that valid input succeeds, invalid input is rejected, and provider failure returns failure
- [ ] 5.3 Build Export Inquiry section and form (`components/contact-form.tsx` rewrite) displaying official HQ contact details (Nubaria City, Egypt; `+20 11 2222 8970`; `info@seinagro.com`) with localized labels, errors, inquiry-type select, honeypot, and palette-based toasts; verify validation messages in `ar`, `en`, `fr` and RTL field alignment **[G]**

## 6. Legacy purge

- [ ] 6.1 Delete legacy routes and components (`app/[locale]/{about,clients,departments,products}`, `components/{departments,clients,products}`, `components/marquee.tsx`, `components/sections/{departments*,clients,products,hero-video-template,hero-image-template}.tsx` as superseded, `components/ui/{aceternity-carousel,infinite-moving-cards,carousel,collapsible,hover-card}.tsx` if unused); verify `npm run build` and `npm run lint` pass with no dead imports
- [ ] 6.2 Add redirects in `next.config.ts`/middleware for legacy paths (`/departments`, `/clients`, `/products`, `/about`) to home anchors; verify with `curl -I` that each returns a permanent redirect and `/ar/...` variants work
- [ ] 6.3 Remove unused dependencies identified after deletion (e.g. `embla-carousel*`, `react-fast-marquee`, hover-card/collapsible Radix packages) and unused legacy images in `public/` (review `WhatsApp Image…jpeg`, `wheat-bag*.jpeg` for reuse in offerings first); verify `npm install` and build succeed
- [ ] 6.4 Run purge verification: case-insensitive search for "shahbandar", "الشهبندر", "شهبندر", "sinagro", `1995`, `2004`, `shahbandar.biz`, `SHAHBANDARSEED` across repo (excluding `openspec/changes/archive` and this change); verify zero matches

## 7. Integration verification

- [ ] 7.1 Run `node scripts/check-i18n.mjs`, `npm run lint`, `npm run build`; verify all pass
- [ ] 7.2 Run the physical-direction grep gate across `app`, `components`; verify zero matches
- [ ] 7.3 Manual visual pass in light/dark and `ar`/`en`/`fr` at 360/768/1280px using the browser; verify no overflow, correct mirroring, correct contrast, and hero LCP image is prioritized
- [ ] 7.4 Run an accessibility check (headings order, alt texts localized, focus states, contrast); verify no critical issues

## Workflow follow-up

- Set live `RESEND_API_KEY` and verified sender domain in production environment.
- Archive the change after native-speaker review (task 2.5) and sign-off.

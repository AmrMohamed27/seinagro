# Tasks

> **Guard rule for every UI task (G):** run the `i18n-rtl-guard` skill checks before marking the task done: (1) logical properties only (`ms/me/ps/pe/start/end/text-start/text-end`; grep `\b(ml|mr|pl|pr|left|right)-|text-(left|right)` returns nothing in touched files), (2) ar/en/fr dictionaries updated in the same step with no hardcoded JSX strings, (3) Arabic font/line-height scaling verified with no container shift. Tasks marked **[G]** require this.

## 1. Foundations: tokens, assets, typography & metadata

- [X] 1.1 Replace color tokens in `app/globals.css` with the Seinagro palette (design D1), remap shadcn base tokens, delete `primary-green*` / `secondary-brown*`; verify `grep -n "primary-green\|secondary-brown" -r app components` returns nothing and light/dark render without errors **[G]**
- [X] 1.2 Implement Google Fonts `IBM Plex Sans` (Latin) and `IBM Plex Sans Arabic` (Arabic) in `lib/fonts.ts` (design D2), apply `[dir=rtl]` line-height rules, and decommission legacy local fonts (`Foda.otf`, `gumela-arabic`); verify clean font loading and no clipping/layout shifts between AR and EN/FR **[G]**
- [X] 1.3 Replace `green` button variant with `primary`/`accent` variants in `components/ui/button.tsx`; verify no `variant="green"` usage remains and buttons meet 4.5:1 contrast **[G]**
- [X] 1.4 Audit `components/ui/*` for physical directional utilities and migrate to logical equivalents; verify the grep gate is clean **[G]**
- [X] 1.5 Create `lib/brand.ts` mapping logo/hero asset paths and locale wordmarks; verify every referenced path exists in `public/assets/images/`
- [X] 1.6 Configure metadata base `https://www.seinagro.com` and replace root metadata in `app/layout.tsx`; add `generateMetadata` (title, description, canonical, hreflang incl. `x-default`, Open Graph with `hero-3.jpg`) in `app/[locale]/layout.tsx`, plus `app/sitemap.ts` and `app/robots.ts`; verify via `curl` that each locale head contains correct tags
- [X] 1.7 Rename `package.json` name to `seinagro`; verify `npm run build` still starts

## 2. Trilingual dictionaries (rewrite)

- [X] 2.1 Draft the English source dictionary `messages/en.json` with namespaces `Meta, Nav, Hero, Legacy, Offerings, VisionMission, Objectives, Contact, Footer, NotFound`, incorporating verified contact info (Nubaria City, Egypt; `+20 11 2222 8970`; `info@seinagro.com`) and strictly institutional leadership (no individual founder names/photos); verify JSON parses and contains no legacy brand strings
- [X] 2.2 Translate the English company profile into natural, high-level corporate Modern Standard Arabic in `messages/ar.json`, brand written "سيناجرو" everywhere, idiomatic rather than literal, using the glossary in design Risks; verify key parity with en and no Latin brand spelling
- [X] 2.3 Translate the English company profile into African/International B2B French in `messages/fr.json`, brand "Seinagro", formal "nous/vous" register, consistent agri terminology (semences certifiées, engrais simples, composés et organiques spécialisés, résilience climatique); verify key parity with en
- [X] 2.5 Native-speaker review pass of `ar` and `fr` copy (terminology consistency, no mixed-language fragments, no machine artifacts); record review notes in the change folder before archive
- [X] 2.6 Replace `renderGreenHtml`/`renderBoldHtml` HTML-string helpers in `lib/utils.ts` with `t.rich()` usage; verify no `dangerouslySetInnerHTML` remains in components

## 3. Header, footer, shell

- [X] 3.1 Rebuild header/navbar (`components/navbar/*`) with new logo (`logo-mark.png` + locale wordmark), anchors `home, about, offerings, vision, objectives, contact`, active-section highlight, language switcher and theme toggle preserved; verify desktop and mobile menu in `ar` (RTL) and `en` **[G]**
- [X] 3.2 Rebuild footer (`components/footer.tsx`) with `logo-stack.png`, anchors, verified official contact details (Nubaria City, Egypt; `+20 11 2222 8970`; `info@seinagro.com`), and `© Seinagro`; remove legacy social links; verify no hardcoded strings and RTL mirroring **[G]**
- [X] 3.3 Update `app/not-found.tsx` and `components/loader.tsx` to the new brand and translations; verify visiting an unknown URL shows localized not-found **[G]**

## 4. Home page sections

- [X] 4.1 Build Hero section (`hero-1.jpg` via `next/image` priority, forest gradient overlay, global-export headline, region chips, dual CTAs to `#offerings` and `#contact`); verify one `<h1>`, CTAs scroll correctly, text legible at 360px and 1440px in all locales **[G]**
- [X] 4.2 Build Founders' Legacy & About section (narrative of executive leadership across Egypt, Africa & Asia, with 3 interactive region impact cards; strictly NO personal founder names or placeholder portraits); verify copy matches `project.md` and layout mirrors in RTL **[G]**
- [X] 4.3 Build Dual Core Offerings (Certified Strategic Crop Seeds vs Straight, Compound & Specialized Organic Fertilizers, each with climate-resilience badge, forest vs soil panel styling); verify exactly two cards, stacked seeds-then-fertilizers on mobile **[G]**
- [X] 4.4 Build Vision & Mission split showcase using `project.md` statements; verify side-by-side on desktop, mirrored in `ar`, stacked on mobile **[G]**
- [X] 4.5 Build 5-pillar Strategic Objectives bento grid with typed config (id, icon, span), hover/focus motion, `prefers-reduced-motion` support; verify five tiles with no cut-off at 360/768/1280px and correct mirroring **[G]**
- [X] 4.6 Compose `app/[locale]/page.tsx` in the specified section order with ids `home, about, offerings, vision, objectives, contact` and reuse `AnimatedSection`; verify order and anchor navigation in all three locales **[G]**

## 5. Export inquiry & contact

- [X] 5.1 Add `RESEND_FROM` and `CONTACT_TO` to `lib/env.ts` and `.env.example` (defaulting `CONTACT_TO` to `info@seinagro.com`); verify build fails clearly when missing and passes when set
- [X] 5.2 Create shared zod inquiry schema (name, company, country, email, inquiry type, message, honeypot) and rewrite `actions/contact.ts` to validate server-side, send to `info@seinagro.com` via Resend with reply-to, and return correct `success` (fixing the legacy inverted/false return); verify with a mocked Resend that valid input succeeds, invalid input is rejected, and provider failure returns failure
- [X] 5.3 Build Export Inquiry section and form (`components/contact-form.tsx` rewrite) displaying official HQ contact details (Nubaria City, Egypt; `+20 11 2222 8970`; `info@seinagro.com`) with localized labels, errors, inquiry-type select, honeypot, and palette-based toasts; verify validation messages in `ar`, `en`, `fr` and RTL field alignment **[G]**

## 6. Legacy purge

- [X] 6.1 Delete legacy routes and components (`app/[locale]/{about,clients,departments,products}`, `components/{departments,clients,products}`, `components/marquee.tsx`, `components/sections/{departments*,clients,products,hero-video-template,hero-image-template}.tsx` as superseded, `components/ui/{aceternity-carousel,infinite-moving-cards,carousel,collapsible,hover-card}.tsx` if unused); verify `npm run build` and `npm run lint` pass with no dead imports
- [X] 6.2 Add redirects in `next.config.ts`/middleware for legacy paths (`/departments`, `/clients`, `/products`, `/about`) to home anchors; verify with `curl -I` that each returns a permanent redirect and `/ar/...` variants work
- [X] 6.3 Remove unused dependencies identified after deletion (e.g. `embla-carousel*`, `react-fast-marquee`, hover-card/collapsible Radix packages) and unused legacy images in `public/` (review `WhatsApp Image…jpeg`, `wheat-bag*.jpeg` for reuse in offerings first); verify `npm install` and build succeed
- [X] 6.4 Run purge verification: case-insensitive search for "shahbandar", "الشهبندر", "شهبندر", "sinagro", `1995`, `2004`, `shahbandar.biz`, `SHAHBANDARSEED` across repo (excluding `openspec/changes/archive` and this change); verify zero matches

## 7. Integration verification

- [X] 7.1 Run `node scripts/check-i18n.mjs`, `npm run lint`, `npm run build`; verify all pass
- [X] 7.2 Run the physical-direction grep gate across `app`, `components`; verify zero matches
- [X] 7.3 Manual visual pass in light/dark and `ar`/`en`/`fr` at 360/768/1280px using the browser; verify no overflow, correct mirroring, correct contrast, and hero LCP image is prioritized
- [X] 7.4 Run an accessibility check (headings order, alt texts localized, focus states, contrast); verify no critical issues

## 10. Client Photography & Dedicated About Us Page

- [X] 10.1 Phase A: Visual audit of all 11 client images (`field1.jpeg`–`field5.jpeg` and `plant1.jpeg`–`plant6.jpeg`), document crop types, framing, and aspect ratios in `design.md` with explicit image-to-section mapping
- [X] 10.2 Phase A: Remove `/about` and `/:locale/about` from redirects in `next.config.ts` to unblock dedicated route
- [X] 10.3 Phase A: Populate `aboutPage` namespace across `messages/en.json`, `messages/ar.json`, and `messages/fr.json` (hero, founders' multinational legacy, human capital & field expertise, vision & mission deep-dive, 5 strategic objectives, and localized image alt texts) and verify with `node scripts/check-i18n.mjs`
- [X] 10.4 Phase B: Integrate client photography into Home landing page (`/[locale]`) sections (`Offerings` seeds & fertilizer panels, `Objectives` bento tiles) with responsive aspect ratios and localized alt texts **[G]**
- [X] 10.5 Phase B: Implement dedicated About Us page (`app/[locale]/about/page.tsx`) with full section architecture (Hero, Founders' Legacy, Human Capital & Field Expertise featuring `field3.jpeg` with `object-top`, Vision & Mission Deep-Dive, 5 Strategic Objectives) **[G]**
- [X] 10.6 Phase B: Update header/nav links and footer to support seamless navigation between Home page anchors and dedicated About Us page in all 3 locales **[G]**
- [X] 10.7 Phase B: Verification pass (build, lint, i18n check, logical properties check, and responsive visual inspection) **[G]**

## 11. Vertical Spacing Tightening & Footer Seam Fix

- [X] 11.1 Reduce excessive vertical padding on Home page (`py-12 md:py-16` on sections, `py-14 lg:py-20` on Hero content container) and tighten header-to-grid margins (`mb-8 md:mb-10`) **[G]**
- [X] 11.2 Reduce vertical padding on About page (`py-12 md:py-16` across sections, `py-14 lg:py-20` on Hero and B2B Partnership CTA) and tighten header margins to `mb-8 md:mb-10` **[G]**
- [X] 11.3 Fix the Abou	t Us CTA-to-Footer white gap seam by removing Footer `mt-20` so the full-bleed dark green CTA band sits flush against the Footer with a subtle `border-t border-white/10` visual seam **[G]**
- [X] 11.4 Verification pass: verify zero physical direction regressions with grep gate, `npm run lint`, and `npm run build` with 0 errors **[G]**

## 12. Trilingual B2B Copywriting Polish (AR/EN/FR)

- [X] 12.1 Audit and rewrite `messages/ar.json` applying `mena-b2b-copywriter` rules (authoritative Egyptian/MENA agribusiness phrasing, verb-first flow, punchy headings, authentic agronomic terms: "البذور والتقاوي المعتمدة عالية الإنتاجية", "الأسمدة الأحادية والمركبة والعضوية المتخصصة", "مقاومة التغيرات المناخية والإجهاد البيئي", "الخبرة الميدانية العملية")
- [X] 12.2 Polish `messages/fr.json` and `messages/en.json` for export B2B clarity, conciseness, and action-oriented CTAs
- [X] 12.3 Verify 100% trilingual dictionary key parity (201 keys) with `node scripts/check-i18n.mjs` and clean production build with `npm run build`

## 13. Beheira Governorate Address Standardization & 9:16 Field Video Showcase

- [X] 13.1 Update all address references across `messages/ar.json`, `messages/en.json`, `messages/fr.json`, `lib/brand.ts`, `openspec/project.md`, `design.md`, Contact section, and Footer to explicitly specify Beheira Governorate ("مدينة النوبارية، محافظة البحيرة، مصر" / "Nubariya City, Beheira Governorate, Egypt" / "Ville de Noubariya, Gouvernorat de Béheira, Égypte") **[G]**
- [X] 13.2 Build editorial 9:16 vertical Field Proof video card (`aspect-9/16 overflow-hidden rounded-2xl bg-black group/video border-b border-border`) with HTML5 `<video>` (`autoPlay loop muted playsInline preload="metadata"` and fallback poster `/assets/images/field1.jpeg`) in card number 03 (Regional & Global Expansion) of Strategic Objectives bento grid in `components/sections/objectives.tsx`, featuring floating pill badge (`start-3 top-3`) with localized copy ("من حقولنا • نتائج فعلية" / "Field Proof • Seeds in Action" / "Sur le Terrain • Semences en Action") **[G]**
- [X] 13.3 Verify 100% logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`), zero `dark:*` classes in touched components, and pass `node scripts/check-i18n.mjs`, `npm run lint`, and `npm run build` with 0 errors **[G]**

## 14. Dedicated Products & Services Pages

- [X] 14.1 Phase A: Standardize official Arabic brand spelling ("سيناجرو") in `openspec/project.md` and verify all occurrences in `messages/ar.json`
- [X] 14.2 Phase A: Document dedicated Products and Services page layouts and technical structures in `design.md` (D11)
- [X] 14.3 Phase A: Verify `/products` and `/:locale/products` redirects in `next.config.ts` (unblocked for direct page routing)
- [X] 14.4 Phase A: Populate grounded trilingual copy for `productsPage` and `servicesPage` in `ar.json`, `en.json`, and `fr.json` with authentic client phrasing and zero hallucinated specs
- [X] 14.5 Phase A: Add/verify localized navbar and footer labels for "products" and "services" across all 3 locales
- [X] 14.6 Phase A: Run `node scripts/check-i18n.mjs` to verify 100% key parity across `ar`, `en`, and `fr`
- [X] 14.7 Phase B: Implement `app/[locale]/products/page.tsx` with 4 core divisions, quality standard, and B2B RFQ CTA **[G]**
- [X] 14.8 Phase B: Implement `app/[locale]/services/page.tsx` with 4 service pillars, 4-step workflow, and consultation CTA **[G]**
- [X] 14.9 Phase B: Update header/nav links and footer to support direct navigation to `/products` and `/services` **[G]**
- [X] 14.10 Phase B: Verification pass (build, lint, i18n check, logical properties check) **[G]**

## 15. Dedicated Contact Us Page

- [X] 15.1 Reuse existing Contact Form & Telegram / Resend integration in a single shared component (`components/contact-form.tsx` & `actions/contact.ts`) without code duplication
- [X] 15.2 Add `contactPage` localized metadata and header strings across `messages/en.json`, `messages/ar.json`, and `messages/fr.json` with 100% parity, using "سيناجرو" in Arabic
- [X] 15.3 Build `app/[locale]/contact/page.tsx` with light theme, compact vertical spacing (`py-12 md:py-16`), compact header, and 12-column split layout (Start 5 cols: verified HQ details in Nubariya City, Beheira Governorate, phone, email, B2B focus notes; End 7 cols: existing Contact Form) **[G]**
- [X] 15.4 Update Navigation & CTAs: change Navbar (`NAV_ANCHORS` and active route tracking), Mobile Menu, Footer (`FOOTER_NAV_LINKS`), and all CTAs on `/about`, `/products`, `/services`, and Hero to point to `/contact` instead of `/#contact` **[G]**
- [X] 15.5 Replace bottom contact form on Home page (`app/[locale]/page.tsx`) with a high-conversion B2B Partnership CTA section that routes to `/contact` sitting flush above the Footer with zero white light-leak gap **[G]**
- [X] 15.6 Verification pass: enforce 100% logical CSS properties, zero `dark:*` classes in touched components, and pass `node scripts/check-i18n.mjs`, `npm run lint`, and `npm run build` with 0 errors **[G]**

## 16. Subpage Hero Banners, Services Card 03 Image Framing & Footer Logo Alignment

- [X] 16.1 Fix Services Page Card 03 Image Cropping (`app/[locale]/services/page.tsx`): swapped image to landscape `plant1.jpeg` (1600x900) with `object-center`, filling the wide 16:9 card naturally while reserving vertical `field3.jpeg` for its portrait container on `/about` **[G]**
- [X] 16.2 Add cohesive Subpage Hero Banners across `/products`, `/services`, `/contact`, and `/about`: full-width distinct `field[1-5].jpeg` image backdrops (`field1.jpeg` on `/services`, `field5.jpeg` on `/products`, `field4.jpeg` on `/contact`, `field2.jpeg` on `/about`), dark directional gradient overlay, pill badge, title, subtitle, and category quick-jump pills on `/products` **[G]**
- [X] 16.3 Fix Footer Logo Whitespace Offset & Add Brand Name Variant Underneath (`components/footer.tsx`): calibrated tight wrapper with negative top and start offsets (`-mt-3.5 -ms-2.5`) to eliminate transparent padding and align flush with adjacent column headings; added crisp authoritative typographic brand lockup (`SEINAGRO` / `سيناجرو`) and localized tagline (`"للبذور المعتمدة والأسمدة المتخصصة"` / `"Certified Seeds & Specialized Fertilizers"`) **[G]**
- [X] 16.4 Verification pass: 100% logical CSS properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`), zero `dark:*` classes in touched files, passed `node scripts/check-i18n.mjs` (298 keys across ar, en, fr with 100% parity), `npm run lint` (0 errors), and `npm run build` (6/6 static & dynamic pages successfully generated) **[G]**

## 17. Home Page Products/Services Funnel Integration & Subpage Arabic Copy Polish

- [X] 17.1 Hero CTA Routing: Ensure Home Hero primary CTA links directly to localized `/products` route and secondary CTA links to `/contact` **[G]**
- [X] 17.2 Upgrade Core Offerings Section into `/products` Gateway: Add visual tags for 4 product divisions (Certified Strategic Seeds, Straight, Compound, and Specialized Organic Fertilizers) with direct action link/button to `/products` **[G]**
- [X] 17.3 Add Compact "Our Services & Agronomic Solutions" Preview Section to Home Page (`components/sections/services-preview.tsx`): sleek 4-card teaser highlighting Nubariya-based support across Egypt, Africa, and Arab world with prominent CTA to `/services` **[G]**
- [X] 17.4 Dedicated `mena-b2b-copywriter` Pass on Arabic Copy (`ar.json`, `en.json`, `fr.json`): Eliminate literal AI translations and polish copywriting across `/products`, `/services`, `/contact`, and home gateway keys with authentic MENA agribusiness rhetoric while preserving 100% key parity **[G]**
- [X] 17.5 Verification pass: 100% logical CSS properties, zero `dark:*` classes, pass `node scripts/check-i18n.mjs`, `npm run lint`, and `npm run build` with 0 errors **[G]**

## 18. Trusted Partners & Founders Network Logo Marquee

- [X] 18.1 Build pure CSS RTL-safe Partner Marquee (`components/sections/partners-marquee.tsx`) with zero JS bundle overhead, warm-stone background (`bg-[#F7F6F2] border-y border-stone-200/80 py-8 md:py-10`), uniform containers (`h-12 md:h-14`), monochrome filter (`grayscale opacity-65 hover:grayscale-0 hover:opacity-100`), edge fade gradient masks, bulletproof `dir="ltr"` container loop, and `prefers-reduced-motion` support **[G]**
- [X] 18.2 Add authentic trilingual copy for `partners` namespace across `messages/ar.json`, `messages/en.json`, and `messages/fr.json` connecting logos to founders' track record with 100% key parity
- [X] 18.3 Integrate `<PartnersMarquee />` into Home page (`app/[locale]/page.tsx`) directly below Hero and on About Us page (`app/[locale]/about/page.tsx`) below Founders' Multinational Legacy section **[G]**
- [X] 18.4 Verification pass: 100% logical CSS properties, passed `node scripts/check-i18n.mjs` (320 keys with 100% parity across ar/en/fr), `npm run lint` (0 errors), and `npm run build` (6/6 static & dynamic pages successfully generated) **[G]**

## Workflow follow-up

- Set live `RESEND_API_KEY` and verified sender domain in production environment.
- Archive the change after native-speaker review (task 2.5) and sign-off.



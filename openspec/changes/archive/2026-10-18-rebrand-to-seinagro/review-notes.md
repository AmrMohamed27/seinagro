# Native-Speaker Review Notes (Arabic & French)
**Change:** `rebrand-to-seinagro`  
**Date:** 2026-10-18  
**Scope:** `messages/ar.json`, `messages/en.json`, `messages/fr.json` (320 keys across 10 namespaces)  
**Evaluator Guidelines:** `mena-b2b-copywriter`, `i18n-rtl-guard`

---

## 1. Arabic (ar) Review Summary
- **Brand Name Uniformity:** Standardized to `"سيناجرو"` across all 320 keys (zero instances of legacy "الشهبندر" or Latin spellings).
- **Tone & Register:** High-level corporate Modern Standard Arabic adapted specifically for Egyptian, African, and MENA agribusiness (B2B wholesale, corporate contracts, and large-scale farming).
- **Terminology Validation:**
  - Certified strategic crop seeds: `"بذور المحاصيل الاستراتيجية المعتمدة"` / `"التقاوي المعتمدة"`
  - Fertilizer spectrum: `"الأسمدة الأحادية والمركبة والعضوية المتخصصة"`
  - Agronomic resilience: `"مقاومة التغيرات المناخية والإجهاد البيئي"`
  - Hands-on field expertise: `"الخبرة الميدانية العملية والبحث التطبيقي"`
  - Official Headquarters: `"مدينة النوبارية، محافظة البحيرة، مصر"`
- **RTL & Typographic Verification:** Handled via `IBM Plex Sans Arabic`, with `[dir=rtl]` line-height accommodations in `globals.css`. No mixed-language syntax fragments or untranslated UI tokens.

---

## 2. French (fr) Review Summary
- **Brand Name Uniformity:** Standardized to `"Seinagro"`.
- **Tone & Register:** Formal executive B2B register utilizing consistent `"nous/vous"` form, tailored for West/Central African bilateral agricultural import/export as well as European and Mediterranean partners.
- **Terminology Validation:**
  - Certified seeds: *"semences certifiées de cultures stratégiques"*
  - Specialized fertilizers: *"engrais simples, composés et fertilisants organiques spécialisés"*
  - Climatic resilience: *"résilience climatique et tolérance aux stress abiotiques"*
  - Field proof: *"Sur le Terrain • Semences en Action"*
  - Official Headquarters: *"Ville de Noubariya, Gouvernorat de Béheira, Égypte"*
- **Flow & Coherence:** Free of literal machine translations; natural French syntax and idiomatic corporate agricultural phrasing throughout.

---

## 3. English (en) Reference Baseline
- Clear, concise institutional messaging avoiding hyperbolic claims and honoring founders' multinational corporate track record without individual personality focus.
- 100% dictionary structural parity verified by `scripts/check-i18n.mjs`.

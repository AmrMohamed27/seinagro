// Brand asset mappings and locale wordmarks for Seinagro
// All referenced assets reside in public/assets/images/

export const BRAND_ASSETS = {
  logo: {
    mark: "/assets/images/logo-mark.png",
    name: "/assets/images/logo-name.png",
    stack: "/assets/images/logo-stack.png",
    wordmark: {
      ar: "/assets/images/name-stack2-arabic.png",
      en: "/assets/images/name-stack2-english.png",
      fr: "/assets/images/name-stack2-english.png",
    },
  },
  hero: {
    primary: {
      ar: "/assets/images/hero-3.jpg",
      en: "/assets/images/hero-2.jpg",
      fr: "/assets/images/hero-2.jpg",
    },
    ogImage: {
      ar: "/assets/images/hero-3.jpg",
      en: "/assets/images/hero-2.jpg",
      fr: "/assets/images/hero-2.jpg",
    },
    preview: "/assets/images/hero-2.jpg",
  },
} as const;

export const COMPANY_INFO = {
  name: {
    en: "Seinagro",
    fr: "Seinagro",
    ar: "سيناجرو",
  },
  domain: "https://www.seinagro.com",
  canonicalUrl: "https://www.seinagro.com",
  email: "info@seinagro.com",
  phone: "+20 11 2222 8970",
  headquarters: {
    en: "Nubaria City, Arab Republic of Egypt",
    fr: "Ville de Noubaria, République Arabe d'Égypte",
    ar: "جمهورية مصر العربية – مدينة النوبارية",
  },
} as const;

export function getWordmark(locale: string): string {
  if (locale === "ar") {
    return BRAND_ASSETS.logo.wordmark.ar;
  }
  return BRAND_ASSETS.logo.wordmark.en;
}

export function getHeroImage(locale: string): string {
  if (locale === "ar") {
    return BRAND_ASSETS.hero.primary.ar;
  }
  return BRAND_ASSETS.hero.primary.en;
}

export function getOgImage(locale: string): string {
  if (locale === "ar") {
    return BRAND_ASSETS.hero.ogImage.ar;
  }
  return BRAND_ASSETS.hero.ogImage.en;
}

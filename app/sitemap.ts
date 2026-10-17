import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.seinagro.com";
  const locales = ["ar", "en", "fr"];
  const now = new Date();

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: locale === "ar" ? 1.0 : 0.9,
    alternates: {
      languages: {
        ar: `${baseUrl}/ar`,
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
        "x-default": `${baseUrl}/ar`,
      },
    },
  }));
}

import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { COMPANY_INFO } from "@/lib/brand";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Leaf,
  Microscope,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  Zap,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "productsPage.meta" });
  const baseUrl = COMPANY_INFO.canonicalUrl;
  const canonicalPath = `${baseUrl}/${locale}/products`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalPath,
      languages: {
        ar: `${baseUrl}/ar/products`,
        en: `${baseUrl}/en/products`,
        fr: `${baseUrl}/fr/products`,
        "x-default": `${baseUrl}/ar/products`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalPath,
      siteName: locale === "ar" ? COMPANY_INFO.name.ar : COMPANY_INFO.name.en,
      images: [
        {
          url: `${baseUrl}/assets/images/plant5.jpeg`,
          width: 1599,
          height: 1200,
          alt: t("title"),
        },
      ],
      locale: locale === "ar" ? "ar_EG" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/assets/images/plant5.jpeg`],
    },
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "productsPage" });
  const tAbout = await getTranslations({ locale, namespace: "aboutPage" });

  const categoryPills = [
    { id: "seeds", labelKey: "divisions.seeds.title" },
    { id: "straight", labelKey: "divisions.straight.title" },
    { id: "compound", labelKey: "divisions.compound.title" },
    { id: "organic", labelKey: "divisions.organic.title" },
  ] as const;

  return (
    <div className="flex flex-col w-full bg-background">
      {/* 1. Cohesive Subpage Hero Banner: Framed with field5.jpeg */}
      <section
        id="products-hero"
        aria-labelledby="products-hero-heading"
        className="relative min-h-[300px] md:min-h-[360px] flex items-center overflow-hidden bg-forest"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/field5.jpeg"
            alt={tAbout("images.field5")}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
          {/* Directional gradient overlay ensuring optimal contrast */}
          <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-e from-forest/90 via-forest/80 md:via-forest/70 to-forest/35" />
          <div className="absolute inset-0 bg-radial-[at_start_top] from-transparent via-transparent to-black/25" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8 py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl flex flex-col gap-4 md:gap-5 text-white">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-medium tracking-wide text-wheat">
              <span className="size-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span>{t("hero.badge")}</span>
            </div>

            <h1
              id="products-hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.2] md:leading-[1.15]"
            >
              {t("hero.title")}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-normal">
              {t("hero.subtitle")}
            </p>

            {/* Quick-Jump Category Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {categoryPills.map((pill) => (
                <a
                  key={pill.id}
                  href={`#${pill.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-white transition-colors shadow-2xs"
                >
                  <span className="size-1.5 rounded-full bg-wheat" aria-hidden="true" />
                  <span>{t(pill.labelKey)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Alternating 2-Column Product Division Showcases */}
      <div className="flex flex-col">
        {/* Division 1: Certified Strategic Crop Seeds (plant5.jpeg) */}
        <section
          id="seeds"
          aria-labelledby="division-seeds-heading"
          className="py-12 md:py-16 bg-background border-b border-border scroll-mt-20"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Visual Showcase (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="relative aspect-4/3 sm:aspect-16/11 w-full rounded-2xl overflow-hidden shadow-md border-2 border-forest/20 group bg-forest/5">
                  <Image
                    src="/assets/images/plant5.jpeg"
                    alt={tAbout("images.plant5")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-forest/80 via-transparent to-transparent" />
                  <div className="absolute top-4 start-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-forest text-xs font-semibold shadow-xs">
                      <Sprout className="size-3.5" aria-hidden="true" />
                      <span>{t("divisions.seeds.tag")}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 inset-x-4 text-white text-xs sm:text-sm font-medium bg-forest/85 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    {tAbout("images.plant5")}
                  </div>
                </div>
              </div>

              {/* Technical Narrative (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold tracking-wide">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  <span>{t("divisions.seeds.tag")}</span>
                </div>

                <h2
                  id="division-seeds-heading"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.25]"
                >
                  {t("divisions.seeds.title")}
                </h2>

                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                  {t("divisions.seeds.description")}
                </p>

                {/* Agronomic Feature Points */}
                <div className="flex flex-col gap-3 pt-1">
                  {(t.raw("divisions.seeds.features") as string[]).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/85">
                      <CheckCircle2 className="size-5 text-growth shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-forest text-white text-sm font-medium transition-colors hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>{t("cta.catalogButton")}</span>
                    <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Division 2: Straight Fertilizers (plant1.jpeg) */}
        <section
          id="straight"
          aria-labelledby="division-straight-heading"
          className="py-12 md:py-16 bg-surface-cream/30 border-b border-border scroll-mt-20"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Technical Narrative (7 cols) - Appears first on desktop for alternation */}
              <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-clay/15 text-earth-soil text-xs font-semibold tracking-wide">
                  <Target className="size-3.5" aria-hidden="true" />
                  <span>{t("divisions.straight.tag")}</span>
                </div>

                <h2
                  id="division-straight-heading"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.25]"
                >
                  {t("divisions.straight.title")}
                </h2>

                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                  {t("divisions.straight.description")}
                </p>

                {/* Agronomic Feature Points */}
                <div className="flex flex-col gap-3 pt-1">
                  {(t.raw("divisions.straight.features") as string[]).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/85">
                      <CheckCircle2 className="size-5 text-earth-soil shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-soil text-white text-sm font-medium transition-colors hover:bg-soil/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>{t("cta.catalogButton")}</span>
                    <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Visual Showcase (5 cols) */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-3">
                <div className="relative aspect-4/3 sm:aspect-16/11 w-full rounded-2xl overflow-hidden shadow-md border-2 border-clay/30 group bg-soil/5">
                  <Image
                    src="/assets/images/plant1.jpeg"
                    alt={tAbout("images.plant1")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-soil/80 via-transparent to-transparent" />
                  <div className="absolute top-4 start-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-soil text-xs font-semibold shadow-xs">
                      <Target className="size-3.5 text-harvest-ink" aria-hidden="true" />
                      <span>{t("divisions.straight.tag")}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 inset-x-4 text-white text-xs sm:text-sm font-medium bg-soil/85 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    {tAbout("images.plant1")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Division 3: Compound Fertilizers (plant6.jpeg) */}
        <section
          id="compound"
          aria-labelledby="division-compound-heading"
          className="py-12 md:py-16 bg-background border-b border-border scroll-mt-20"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Visual Showcase (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="relative aspect-3/4 sm:aspect-4/5 w-full rounded-2xl overflow-hidden shadow-md border-2 border-growth/25 group bg-growth/5">
                  <Image
                    src="/assets/images/plant6.jpeg"
                    alt={tAbout("images.plant6")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-forest/80 via-transparent to-transparent" />
                  <div className="absolute top-4 start-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-forest text-xs font-semibold shadow-xs">
                      <Layers className="size-3.5 text-growth" aria-hidden="true" />
                      <span>{t("divisions.compound.tag")}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 inset-x-4 text-white text-xs sm:text-sm font-medium bg-forest/85 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    {tAbout("images.plant6")}
                  </div>
                </div>
              </div>

              {/* Technical Narrative (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-growth/10 text-growth text-xs font-semibold tracking-wide">
                  <Layers className="size-3.5" aria-hidden="true" />
                  <span>{t("divisions.compound.tag")}</span>
                </div>

                <h2
                  id="division-compound-heading"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.25]"
                >
                  {t("divisions.compound.title")}
                </h2>

                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                  {t("divisions.compound.description")}
                </p>

                {/* Agronomic Feature Points */}
                <div className="flex flex-col gap-3 pt-1">
                  {(t.raw("divisions.compound.features") as string[]).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/85">
                      <CheckCircle2 className="size-5 text-growth shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-forest text-white text-sm font-medium transition-colors hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>{t("cta.catalogButton")}</span>
                    <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Division 4: Specialized Organic Fertilizers (plant2.jpeg) */}
        <section
          id="organic"
          aria-labelledby="division-organic-heading"
          className="py-12 md:py-16 bg-surface-cream/30 border-b border-border scroll-mt-20"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Technical Narrative (7 cols) - Appears first on desktop for alternation */}
              <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-harvest/15 text-harvest-ink text-xs font-semibold tracking-wide">
                  <Leaf className="size-3.5" aria-hidden="true" />
                  <span>{t("divisions.organic.tag")}</span>
                </div>

                <h2
                  id="division-organic-heading"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.25]"
                >
                  {t("divisions.organic.title")}
                </h2>

                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                  {t("divisions.organic.description")}
                </p>

                {/* Agronomic Feature Points */}
                <div className="flex flex-col gap-3 pt-1">
                  {(t.raw("divisions.organic.features") as string[]).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/85">
                      <CheckCircle2 className="size-5 text-harvest-ink shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-harvest-ink text-white text-sm font-medium transition-colors hover:bg-harvest-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>{t("cta.catalogButton")}</span>
                    <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Visual Showcase (5 cols) */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-3">
                <div className="relative aspect-3/4 sm:aspect-4/5 w-full rounded-2xl overflow-hidden shadow-md border-2 border-harvest/30 group bg-harvest/5">
                  <Image
                    src="/assets/images/plant2.jpeg"
                    alt={tAbout("images.plant2")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-soil/80 via-transparent to-transparent" />
                  <div className="absolute top-4 start-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-harvest-ink text-xs font-semibold shadow-xs">
                      <Leaf className="size-3.5" aria-hidden="true" />
                      <span>{t("divisions.organic.tag")}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 inset-x-4 text-white text-xs sm:text-sm font-medium bg-soil/85 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    {tAbout("images.plant2")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Uncompromising Quality & Climate Resilience Strip */}
      <section
        id="quality-standards"
        aria-labelledby="quality-standards-heading"
        className="py-12 md:py-16 bg-surface-cream/40 border-b border-border"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl flex flex-col gap-4 mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 text-forest text-xs sm:text-sm font-semibold tracking-wide">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              <span>{t("quality.badge")}</span>
            </div>
            <h2
              id="quality-standards-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
            >
              {t("quality.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("quality.description")}
            </p>
          </div>

          {/* 3 Quality Assurance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(
              t.raw("quality.points") as Array<{
                title: string;
                description: string;
              }>
            ).map((point, idx) => {
              const icons = [Microscope, ShieldCheck, Zap];
              const IconComponent = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-card border border-border shadow-2xs flex flex-col gap-3.5 relative overflow-hidden group hover:border-forest/40 transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-forest/10 text-forest w-fit">
                    <IconComponent className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Bottom B2B Inquiry CTA (Sitting flush above Footer) */}
      <section
        id="products-cta"
        aria-labelledby="products-cta-heading"
        className="py-14 lg:py-20 bg-forest text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-wheat text-xs sm:text-sm font-semibold backdrop-blur-xs">
              <Sparkles className="size-4" aria-hidden="true" />
              <span>{t("cta.badge")}</span>
            </span>

            <h2
              id="products-cta-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              {t("cta.title")}
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
              {t("cta.subtitle")}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-accent text-accent-foreground font-semibold text-base transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-lg"
              >
                <span>{t("cta.catalogButton")}</span>
                <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-white/20"
              >
                <span>{t("cta.consultButton")}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Ambient background accents */}
        <div
          className="absolute -top-24 -start-24 size-96 rounded-full bg-white/5 pointer-events-none blur-2xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -end-24 size-96 rounded-full bg-wheat/10 pointer-events-none blur-2xl"
          aria-hidden="true"
        />
      </section>
    </div>
  );
}

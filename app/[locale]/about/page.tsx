import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { COMPANY_INFO } from "@/lib/brand";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Compass,
  Cpu,
  FlaskConical,
  Globe2,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  Users,
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

  const t = await getTranslations({ locale, namespace: "aboutPage.meta" });
  const baseUrl = COMPANY_INFO.canonicalUrl;
  const canonicalPath = `${baseUrl}/${locale}/about`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalPath,
      languages: {
        ar: `${baseUrl}/ar/about`,
        en: `${baseUrl}/en/about`,
        fr: `${baseUrl}/fr/about`,
        "x-default": `${baseUrl}/ar/about`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalPath,
      siteName: locale === "ar" ? COMPANY_INFO.name.ar : COMPANY_INFO.name.en,
      images: [
        {
          url: `${baseUrl}/assets/images/field2.jpeg`,
          width: 1152,
          height: 864,
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
      images: [`${baseUrl}/assets/images/field2.jpeg`],
    },
  };
}

import { notFound } from "next/navigation";

const HUMAN_CAPITAL_KEYS = ["1", "2", "3", "4"] as const;
const OBJECTIVE_KEYS = ["1", "2", "3", "4", "5"] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return (
    <div className="flex flex-col w-full bg-background">
      {/* 1. Hero Banner: Sweeping field2.jpeg backdrop */}
      <section
        id="about-hero"
        aria-labelledby="about-hero-heading"
        className="relative min-h-[320px] md:min-h-[380px] flex items-center overflow-hidden bg-forest"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/field2.jpeg"
            alt={t("images.field2")}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
          {/* Directional gradient overlay ensuring optimal contrast */}
          <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-e from-forest/90 via-forest/75 md:via-forest/65 to-forest/30" />
          <div className="absolute inset-0 bg-radial-[at_start_top] from-transparent via-transparent to-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8 py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl flex flex-col gap-4 md:gap-5 text-white">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-medium tracking-wide text-wheat">
              <span
                className="size-2 rounded-full bg-accent animate-pulse"
                aria-hidden="true"
              />
              <span>{t("hero.badge")}</span>
            </div>

            <h1
              id="about-hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.2] md:leading-[1.15]"
            >
              {t("hero.title")}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-normal">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Founders' Multinational Legacy: Editorial layout with field5.jpeg */}
      <section
        id="founders-legacy"
        aria-labelledby="founders-legacy-heading"
        className="py-12 md:py-16 bg-surface-cream/35 border-b border-border"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Editorial Text Content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 text-forest text-xs sm:text-sm font-semibold tracking-wide">
                <span>{t("legacy.badge")}</span>
              </div>

              <h2
                id="founders-legacy-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.25]"
              >
                {t("legacy.title")}
              </h2>

              <p className="text-base sm:text-lg font-medium text-foreground/90 leading-relaxed">
                {t("legacy.lead")}
              </p>

              <div className="flex flex-col gap-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>{t("legacy.p1")}</p>
                <p>{t("legacy.p2")}</p>
              </div>

              {/* 3 Regional Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-5 rounded-xl bg-card border border-growth/30 shadow-xs flex flex-col gap-2.5">
                  <div className="p-2 rounded-lg bg-growth/10 text-growth w-fit">
                    <Landmark className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">
                    {t("legacy.regions.egypt.title")}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("legacy.regions.egypt.description")}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-card border border-harvest/30 shadow-xs flex flex-col gap-2.5">
                  <div className="p-2 rounded-lg bg-harvest/10 text-harvest-ink w-fit">
                    <Sprout className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">
                    {t("legacy.regions.africa.title")}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("legacy.regions.africa.description")}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-card border border-mist/40 shadow-xs flex flex-col gap-2.5">
                  <div className="p-2 rounded-lg bg-mist/20 text-forest w-fit">
                    <Globe2 className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">
                    {t("legacy.regions.asia.title")}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("legacy.regions.asia.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Image Feature: field5.jpeg */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-4/3 sm:aspect-16/11 w-full rounded-2xl overflow-hidden shadow-md border-2 border-border group bg-muted">
                <Image
                  src="/assets/images/field5.jpeg"
                  alt={t("images.field5")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4 text-white text-xs sm:text-sm font-medium bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/15">
                  {t("images.field5")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Human Capital & Field Agronomy: Featuring field3.jpeg with object-top */}
      <section
        id="human-capital"
        aria-labelledby="human-capital-heading"
        className="py-12 md:py-16 bg-background border-b border-border"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Image Feature: field3.jpeg with object-top framing the agronomist in the field */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-4">
              <div className="relative aspect-3/4 sm:aspect-4/5 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-forest/20 group bg-forest/5">
                <Image
                  src="/assets/images/field3.jpeg"
                  alt={t("images.field3")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-forest/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4 text-white text-xs sm:text-sm font-medium bg-forest/80 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                  <div className="flex items-center gap-2 mb-1 text-wheat font-semibold text-xs">
                    <Users className="size-4" aria-hidden="true" />
                    <span>{t("humanCapital.badge")}</span>
                  </div>
                  {t("images.field3")}
                </div>
              </div>
            </div>

            {/* Content Narrative */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 text-forest text-xs sm:text-sm font-semibold tracking-wide">
                <span>{t("humanCapital.badge")}</span>
              </div>

              <h2
                id="human-capital-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.25]"
              >
                {t("humanCapital.title")}
              </h2>

              <p className="text-base sm:text-lg font-medium text-foreground/90 leading-relaxed">
                {t("humanCapital.lead")}
              </p>

              <div className="flex flex-col gap-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>{t("humanCapital.p1")}</p>
                <p>{t("humanCapital.p2")}</p>
              </div>

              {/* 4 Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {HUMAN_CAPITAL_KEYS.map((key) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-cream/50 border border-border"
                  >
                    <CheckCircle2
                      className="size-4 text-forest shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-xs sm:text-sm font-medium text-foreground/90 leading-snug">
                      {t(`humanCapital.features.${key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Vision & Mission Deep-Dive: Accented with plant4.jpeg & plant3.jpeg */}
      <section
        id="vision-mission-deepdive"
        aria-labelledby="vision-mission-deepdive-heading"
        className="py-12 md:py-16 bg-surface-cream/40 border-b border-border"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl flex flex-col gap-4 mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 text-forest text-xs sm:text-sm font-semibold tracking-wide">
              <span>{t("visionMission.badge")}</span>
            </div>
            <h2
              id="vision-mission-deepdive-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
            >
              {t("visionMission.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Vision Showcase Card */}
            <div className="flex flex-col rounded-2xl bg-card border-2 border-forest/20 shadow-xs overflow-hidden group">
              <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-forest/10">
                <Image
                  src="/assets/images/plant4.jpeg"
                  alt={t("images.plant4")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/25 to-transparent" />
                <div className="absolute top-4 start-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest text-white text-xs font-semibold shadow-xs">
                    <Compass className="size-3.5" aria-hidden="true" />
                    {t("visionMission.vision.title")}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col gap-5 flex-1 justify-between">
                <div className="flex flex-col gap-4">
                  <blockquote className="text-lg sm:text-xl font-bold text-forest leading-snug">
                    “{t("visionMission.vision.statement")}”
                  </blockquote>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {t("visionMission.vision.description")}
                  </p>
                </div>
                <div className="pt-4 border-t border-border text-xs text-muted-foreground flex items-center gap-2">
                  <Sparkles
                    className="size-4 text-forest shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t("images.plant4")}</span>
                </div>
              </div>
            </div>

            {/* Mission Showcase Card */}
            <div className="flex flex-col rounded-2xl bg-card border-2 border-clay/30 shadow-xs overflow-hidden group">
              <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-soil/10">
                <Image
                  src="/assets/images/plant3.jpeg"
                  alt={t("images.plant3")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/25 to-transparent" />
                <div className="absolute top-4 start-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-soil text-white text-xs font-semibold shadow-xs">
                    <Target
                      className="size-3.5 text-wheat"
                      aria-hidden="true"
                    />
                    {t("visionMission.mission.title")}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col gap-5 flex-1 justify-between">
                <div className="flex flex-col gap-4">
                  <blockquote className="text-lg sm:text-xl font-bold text-soil leading-snug">
                    “{t("visionMission.mission.statement")}”
                  </blockquote>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {t("visionMission.mission.description")}
                  </p>
                </div>
                <div className="pt-4 border-t border-border text-xs text-muted-foreground flex items-center gap-2">
                  <Sparkles
                    className="size-4 text-harvest-ink shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t("images.plant3")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Strategic Objectives Showcase: With plant2.jpeg & plant6.jpeg */}
      <section
        id="strategic-objectives"
        aria-labelledby="strategic-objectives-heading"
        className="py-12 md:py-16 bg-background border-b border-border"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl flex flex-col gap-4 mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 text-forest text-xs sm:text-sm font-semibold tracking-wide">
              <span>{t("objectives.badge")}</span>
            </div>
            <h2
              id="strategic-objectives-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
            >
              {t("objectives.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("objectives.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 5 Strategic Pillars Breakdown (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {OBJECTIVE_KEYS.map((key) => {
                const icons = [FlaskConical, Award, Globe2, GraduationCap, Cpu];
                const IconComponent = icons[parseInt(key, 10) - 1];
                return (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-forest/30 transition-colors"
                  >
                    <div className="p-3 rounded-xl bg-forest/10 text-forest shrink-0">
                      <IconComponent className="size-6" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-foreground">
                          {t(`objectives.pillars.${key}.title`)}
                        </h3>
                        <span className="text-xs font-bold text-muted-foreground">
                          0{key}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground/85 leading-relaxed">
                        {t(`objectives.pillars.${key}.description`)}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 border-t border-border/60">
                        {t(`objectives.pillars.${key}.detail`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visual Photography Accent Column: plant2.jpeg & plant6.jpeg (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Card 1: plant2.jpeg (Vertical Growth Stalk) */}
              <div className="flex flex-col rounded-2xl bg-card border border-border overflow-hidden shadow-xs group">
                <div className="relative aspect-4/5 w-full overflow-hidden bg-forest/5">
                  <Image
                    src="/assets/images/plant2.jpeg"
                    alt={t("images.plant2")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card via-card/10 to-transparent" />
                </div>
                <div className="p-4 flex items-start gap-2.5">
                  <ShieldCheck
                    className="size-4 text-forest shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-xs text-muted-foreground leading-snug">
                    {t("images.plant2")}
                  </p>
                </div>
              </div>

              {/* Card 2: plant6.jpeg (Dense Flowering & Pod Set) */}
              <div className="flex flex-col rounded-2xl bg-card border border-border overflow-hidden shadow-xs group">
                <div className="relative aspect-4/5 w-full overflow-hidden bg-growth/5">
                  <Image
                    src="/assets/images/plant6.jpeg"
                    alt={t("images.plant6")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card via-card/10 to-transparent" />
                </div>
                <div className="p-4 flex items-start gap-2.5">
                  <Sparkles
                    className="size-4 text-growth shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-xs text-muted-foreground leading-snug">
                    {t("images.plant6")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. B2B Partnership CTA (Full-bleed dark green band sitting flush above Footer) */}
      <section
        id="about-cta"
        aria-labelledby="about-cta-heading"
        className="py-14 lg:py-20 bg-forest text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-wheat text-xs sm:text-sm font-semibold backdrop-blur-xs">
              <Sparkles className="size-4" aria-hidden="true" />
              <span>{t("cta.badge")}</span>
            </span>

            <h2
              id="about-cta-heading"
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
                <span>{t("cta.partnerButton")}</span>
                <ArrowUpRight
                  className="size-4 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/#offerings"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-white/20"
              >
                <span>{t("cta.exploreButton")}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative ambient background accents */}
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

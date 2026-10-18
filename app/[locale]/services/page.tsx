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
  Dna,
  Globe2,
  RotateCw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Sprout,
  TrendingUp,
  Truck,
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

  const t = await getTranslations({ locale, namespace: "servicesPage.meta" });
  const baseUrl = COMPANY_INFO.canonicalUrl;
  const canonicalPath = `${baseUrl}/${locale}/services`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalPath,
      languages: {
        ar: `${baseUrl}/ar/services`,
        en: `${baseUrl}/en/services`,
        fr: `${baseUrl}/fr/services`,
        "x-default": `${baseUrl}/ar/services`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalPath,
      siteName: locale === "ar" ? COMPANY_INFO.name.ar : COMPANY_INFO.name.en,
      images: [
        {
          url: `${baseUrl}/assets/images/field1.jpeg`,
          width: 1600,
          height: 960,
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
      images: [`${baseUrl}/assets/images/field1.jpeg`],
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const tAbout = await getTranslations({ locale, namespace: "aboutPage" });

  const workflowStepKeys = ["1", "2", "3", "4"] as const;

  return (
    <div className="flex flex-col w-full bg-background">
      {/* 1. Service Hero Banner: Framed with field1.jpeg */}
      <section
        id="services-hero"
        aria-labelledby="services-hero-heading"
        className="relative min-h-[300px] md:min-h-[360px] flex items-center overflow-hidden bg-forest"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/field1.jpeg"
            alt={tAbout("images.field1")}
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
              id="services-hero-heading"
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

      {/* 2. 2x2 Architectural Capability Grid: 4 Core Service Pillars */}
      <section
        id="service-pillars"
        aria-labelledby="service-pillars-heading"
        className="py-12 md:py-16 bg-surface-cream/35 border-b border-border"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl flex flex-col gap-4 mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 text-forest text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="size-3.5" aria-hidden="true" />
              <span>{t("pillars.badge")}</span>
            </div>
            <h2
              id="service-pillars-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.25]"
            >
              {t("pillars.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
              {t("pillars.subtitle")}
            </p>
          </div>

          {/* 2x2 Grid of Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Pillar 1: Seed Breeding & Production (field4.jpeg) */}
            <div className="flex flex-col justify-between rounded-2xl bg-card border border-forest/20 shadow-xs overflow-hidden group hover:border-forest/40 transition-colors">
              <div className="relative aspect-16/9 w-full overflow-hidden bg-forest/5">
                <Image
                  src="/assets/images/field4.jpeg"
                  alt={tAbout("images.field4")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 start-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-forest text-xs font-semibold shadow-xs">
                    <Dna className="size-3.5 text-forest" aria-hidden="true" />
                    <span>01 • {t("pillars.seedDevelopment.tag")}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col gap-5 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {t("pillars.seedDevelopment.title")}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t("pillars.seedDevelopment.description")}
                </p>

                <div className="flex flex-col gap-3 pt-2 mt-auto">
                  {(t.raw("pillars.seedDevelopment.details") as string[]).map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-foreground/85">
                      <CheckCircle2 className="size-4 text-growth shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pillar 2: Fertilizer Trading & Supply Chain (field5.jpeg) */}
            <div className="flex flex-col justify-between rounded-2xl bg-card border border-clay/30 shadow-xs overflow-hidden group hover:border-clay/50 transition-colors">
              <div className="relative aspect-16/9 w-full overflow-hidden bg-soil/5">
                <Image
                  src="/assets/images/field5.jpeg"
                  alt={tAbout("images.field5")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 start-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-earth-soil text-xs font-semibold shadow-xs">
                    <Truck className="size-3.5 text-harvest-ink" aria-hidden="true" />
                    <span>02 • {t("pillars.supplyChain.tag")}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col gap-5 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {t("pillars.supplyChain.title")}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t("pillars.supplyChain.description")}
                </p>

                <div className="flex flex-col gap-3 pt-2 mt-auto">
                  {(t.raw("pillars.supplyChain.details") as string[]).map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-foreground/85">
                      <CheckCircle2 className="size-4 text-earth-soil shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pillar 3: Agronomic Field Support (plant1.jpeg) */}
            <div className="flex flex-col justify-between rounded-2xl bg-card border border-forest/20 shadow-xs overflow-hidden group hover:border-forest/40 transition-colors">
              <div className="relative aspect-16/9 w-full overflow-hidden bg-forest/5">
                <Image
                  src="/assets/images/plant1.jpeg"
                  alt={tAbout("images.plant1")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 start-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-forest text-xs font-semibold shadow-xs">
                    <Users className="size-3.5 text-forest" aria-hidden="true" />
                    <span>03 • {t("pillars.fieldSupport.tag")}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col gap-5 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {t("pillars.fieldSupport.title")}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t("pillars.fieldSupport.description")}
                </p>

                <div className="flex flex-col gap-3 pt-2 mt-auto">
                  {(t.raw("pillars.fieldSupport.details") as string[]).map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-foreground/85">
                      <CheckCircle2 className="size-4 text-growth shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pillar 4: Global Tech Transfer & Market Advisory (field2.jpeg) */}
            <div className="flex flex-col justify-between rounded-2xl bg-card border border-mist/50 shadow-xs overflow-hidden group hover:border-forest/40 transition-colors">
              <div className="relative aspect-16/9 w-full overflow-hidden bg-mist/10">
                <Image
                  src="/assets/images/field2.jpeg"
                  alt={tAbout("images.field2")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 start-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-forest text-xs font-semibold shadow-xs">
                    <Globe2 className="size-3.5 text-forest" aria-hidden="true" />
                    <span>04 • {t("pillars.techTransfer.tag")}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col gap-5 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {t("pillars.techTransfer.title")}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t("pillars.techTransfer.description")}
                </p>

                <div className="flex flex-col gap-3 pt-2 mt-auto">
                  {(t.raw("pillars.techTransfer.details") as string[]).map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-foreground/85">
                      <CheckCircle2 className="size-4 text-forest shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4-Step Partnership & Execution Flow (Horizontal desktop / Vertical mobile) */}
      <section
        id="workflow"
        aria-labelledby="workflow-heading"
        className="py-12 md:py-16 bg-background border-b border-border"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl flex flex-col gap-4 mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 text-forest text-xs sm:text-sm font-semibold tracking-wide">
              <RotateCw className="size-3.5" aria-hidden="true" />
              <span>{t("workflow.badge")}</span>
            </div>
            <h2
              id="workflow-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.25]"
            >
              {t("workflow.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
              {t("workflow.subtitle")}
            </p>
          </div>

          {/* Connected Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowStepKeys.map((stepKey, idx) => {
              const stepIcons = [SearchCheck, Sprout, ShieldCheck, TrendingUp];
              const StepIcon = stepIcons[idx % stepIcons.length];

              return (
                <div
                  key={stepKey}
                  className="flex flex-col gap-4 p-6 rounded-2xl bg-surface-cream/40 border border-border relative overflow-hidden group hover:border-forest/40 transition-colors"
                >
                  {/* Step Header with number badge and icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-forest/30 font-mono group-hover:text-forest transition-colors">
                      {t(`workflow.steps.${stepKey}.number`)}
                    </span>
                    <div className="p-2.5 rounded-xl bg-forest/10 text-forest">
                      <StepIcon className="size-5" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-foreground mt-1">
                    {t(`workflow.steps.${stepKey}.title`)}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`workflow.steps.${stepKey}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Bottom Partnership CTA (Sitting flush above Footer) */}
      <section
        id="services-cta"
        aria-labelledby="services-cta-heading"
        className="py-14 lg:py-20 bg-forest text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-wheat text-xs sm:text-sm font-semibold backdrop-blur-xs">
              <Sparkles className="size-4" aria-hidden="true" />
              <span>{t("cta.badge")}</span>
            </span>

            <h2
              id="services-cta-heading"
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
                <span>{t("cta.contactButton")}</span>
                <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-white/20"
              >
                <span>{t("cta.productsButton")}</span>
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

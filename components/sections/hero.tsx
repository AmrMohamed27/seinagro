import { getHeroImage } from "@/lib/brand";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const REGION_KEYS = ["egypt", "africa", "arab", "asia"] as const;

const HeroSection = () => {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const heroImageSrc = getHeroImage(locale);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-forest"
    >
      {/* Background Image with next/image priority */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Refined direction-aware forest gradient overlay: lightened for photography luminosity while ensuring contrast */}
        <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-e from-forest/85 via-forest/70 md:via-forest/60 to-forest/25" />
        <div className="absolute inset-0 bg-radial-[at_start_top] from-transparent via-transparent to-black/25" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24 pb-14 lg:pt-32 lg:pb-20">
        <div className="max-w-3xl flex flex-col gap-6 text-white">
          {/* Eyebrow / Badge */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-medium tracking-wide text-wheat">
            <span className="size-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span>{t("badge")}</span>
          </div>

          {/* Main H1 Headline */}
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.2] md:leading-[1.15]"
          >
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-normal">
            {t("subtitle")}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <a
              href="#offerings"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-md bg-accent text-accent-foreground font-semibold text-base transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-lg"
            >
              <span>{t("exploreCta")}</span>
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-medium text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>{t("partnerCta")}</span>
            </a>
          </div>

          {/* Target Region Chips */}
          <div className="pt-6 sm:pt-8 border-t border-white/15 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex flex-wrap items-center gap-2" role="list">
              {REGION_KEYS.map((region) => (
                <span
                  key={region}
                  role="listitem"
                  className="px-3 py-1 rounded-md bg-black/25 backdrop-blur-xs border border-white/15 text-xs sm:text-sm text-white/90 font-medium"
                >
                  {t(`regions.${region}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { CheckCircle2, ShieldCheck, Sparkles, Sprout } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SEED_ITEM_KEYS = ["1", "2", "3", "4"] as const;
const FERTILIZER_ITEM_KEYS = ["1", "2", "3", "4"] as const;

const OfferingsSection = () => {
  const t = useTranslations("Offerings");
  const tAbout = useTranslations("aboutPage");

  return (
    <section
      id="offerings"
      aria-labelledby="offerings-heading"
      className="py-12 md:py-16 bg-surface-cream/50 dark:bg-card/40 border-y border-border relative"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col gap-4 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 dark:bg-forest/20 text-forest dark:text-forest text-xs sm:text-sm font-semibold tracking-wide">
            <span>{t("sectionBadge")}</span>
          </div>
          <h2
            id="offerings-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          >
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Dual Core Offerings: Seeds (Forest/Growth) vs Fertilizers (Soil/Clay) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Panel 1: Certified Strategic Crop Seeds */}
          <div className="flex flex-col justify-between rounded-2xl bg-card border-2 border-forest/20 dark:border-forest/30 shadow-xs relative overflow-hidden group">
            {/* Subtle top indicator bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-forest z-10" />

            {/* Visual Image Banner: field1.jpeg */}
            <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-forest/10">
              <Image
                src="/assets/images/field1.jpeg"
                alt={tAbout("images.field1")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />
              <div className="absolute top-4 start-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-md text-forest dark:text-forest text-xs font-semibold shadow-xs">
                  <Sprout className="size-3.5" aria-hidden="true" />
                  {t("seeds.badge")}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-6 sm:p-8 pt-2">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                {t("seeds.title")}
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t("seeds.description")}
              </p>

              {/* Climate Resilience Callout */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-forest/5 dark:bg-forest/10 border border-forest/15">
                <ShieldCheck className="size-5 text-forest dark:text-forest shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs sm:text-sm font-medium text-foreground/90 leading-relaxed">
                  {t("seeds.climateResilience")}
                </p>
              </div>

              {/* Feature Items */}
              <ul className="flex flex-col gap-3 pt-2" role="list">
                {SEED_ITEM_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-3 text-sm text-foreground/85">
                    <CheckCircle2 className="size-4 text-growth shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{t(`seeds.items.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8 pt-0 mt-auto border-t border-border flex items-center justify-between">
              <a
                href="#contact"
                className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-forest text-white text-xs md:text-sm font-medium transition-colors hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t("seeds.badge")}
              </a>
            </div>
          </div>

          {/* Panel 2: Straight, Compound & Specialized Organic Fertilizers */}
          <div className="flex flex-col justify-between rounded-2xl bg-card border-2 border-clay/30 dark:border-clay/40 shadow-xs relative overflow-hidden group">
            {/* Subtle top indicator bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-clay z-10" />

            {/* Visual Image Banner: plant1.jpeg */}
            <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-soil/10">
              <Image
                src="/assets/images/plant1.jpeg"
                alt={tAbout("images.plant1")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />
              <div className="absolute top-4 start-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-md text-soil dark:text-clay text-xs font-semibold shadow-xs">
                  <Sparkles className="size-3.5 text-harvest-ink dark:text-harvest" aria-hidden="true" />
                  {t("fertilizers.badge")}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-6 sm:p-8 pt-2">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                {t("fertilizers.title")}
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t("fertilizers.description")}
              </p>

              {/* Climate Resilience Callout */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-soil/5 dark:bg-soil/15 border border-clay/20">
                <ShieldCheck className="size-5 text-harvest-ink dark:text-harvest shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs sm:text-sm font-medium text-foreground/90 leading-relaxed">
                  {t("fertilizers.climateResilience")}
                </p>
              </div>

              {/* Feature Items */}
              <ul className="flex flex-col gap-3 pt-2" role="list">
                {FERTILIZER_ITEM_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-3 text-sm text-foreground/85">
                    <CheckCircle2 className="size-4 text-harvest-ink dark:text-harvest shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{t(`fertilizers.items.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8 pt-0 mt-auto border-t border-border flex items-center justify-between">
              <a
                href="#contact"
                className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-soil text-white dark:bg-clay dark:text-foreground text-sm font-medium transition-colors hover:bg-soil/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t("fertilizers.badge")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;

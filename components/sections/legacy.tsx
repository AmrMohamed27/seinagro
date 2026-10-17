"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe2, Landmark, Sprout } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const REGION_CARDS = [
  {
    id: "egypt",
    icon: Landmark,
    accentBorder: "border-growth/30 dark:border-growth/20",
    badgeBg: "bg-growth/10 text-growth",
  },
  {
    id: "africa",
    icon: Sprout,
    accentBorder: "border-harvest/30 dark:border-harvest/20",
    badgeBg: "bg-harvest/10 text-harvest-ink dark:text-harvest",
  },
  {
    id: "asia",
    icon: Globe2,
    accentBorder: "border-mist/40 dark:border-mist/20",
    badgeBg: "bg-mist/15 text-forest dark:text-mist",
  },
] as const;

const LegacySection = () => {
  const t = useTranslations("Legacy");
  const tNav = useTranslations("Nav");

  return (
    <section
      id="about"
      aria-labelledby="legacy-heading"
      className="py-12 md:py-16 bg-background relative"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="max-w-3xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 dark:bg-forest/20 text-forest dark:text-forest text-xs sm:text-sm font-semibold tracking-wide">
              <span>{t("sectionBadge")}</span>
            </div>
            <h2
              id="legacy-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
            >
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("narrative")}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-forest/20 bg-forest/5 hover:bg-forest/10 text-forest dark:text-forest text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>{tNav("about")}</span>
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* 3 Interactive Region Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REGION_CARDS.map(({ id, icon: Icon, accentBorder, badgeBg }) => (
            <motion.div
              key={id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-card border ${accentBorder} shadow-xs hover:shadow-md transition-shadow`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${badgeBg}`}>
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">
                    {t(`cards.${id}.title`)}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {t(`cards.${id}.role`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`cards.${id}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegacySection;

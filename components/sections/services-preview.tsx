import { ArrowUpRight, Dna, Globe2, Truck, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const SERVICE_PREVIEW_ITEMS = [
  {
    id: "rAndD",
    icon: Dna,
    accentBorder: "border-forest/20 hover:border-forest/40",
    badgeBg: "bg-forest/10 text-forest",
    stepNum: "01",
  },
  {
    id: "trading",
    icon: Truck,
    accentBorder: "border-clay/20 hover:border-clay/40",
    badgeBg: "bg-soil/10 text-soil",
    stepNum: "02",
  },
  {
    id: "fieldSupport",
    icon: Users,
    accentBorder: "border-growth/20 hover:border-growth/40",
    badgeBg: "bg-growth/10 text-growth",
    stepNum: "03",
  },
  {
    id: "techTransfer",
    icon: Globe2,
    accentBorder: "border-harvest/20 hover:border-harvest/40",
    badgeBg: "bg-harvest/10 text-harvest-ink",
    stepNum: "04",
  },
] as const;

const ServicesPreviewSection = () => {
  const t = useTranslations("ServicesPreview");

  return (
    <section
      id="services-preview"
      aria-labelledby="services-preview-heading"
      className="py-12 md:py-16 bg-surface-cream/30 border-b border-border relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header with Gateway Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="max-w-3xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 text-forest text-xs sm:text-sm font-semibold tracking-wide">
              <span>{t("sectionBadge")}</span>
            </div>
            <h2
              id="services-preview-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
            >
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest hover:bg-forest/90 text-white text-sm font-semibold transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>{t("exploreCta")}</span>
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* 4 Compact Service Teaser Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_PREVIEW_ITEMS.map(({ id, icon: Icon, accentBorder, badgeBg, stepNum }) => (
            <div
              key={id}
              className={`flex flex-col justify-between p-6 rounded-xl bg-card border-2 ${accentBorder} shadow-xs hover:shadow-md transition-all duration-300 relative group`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-lg ${badgeBg} transition-transform duration-200 group-hover:scale-105`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground/60 tracking-wider">
                    {stepNum}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-forest transition-colors">
                  {t(`cards.${id}.title`)}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t(`cards.${id}.description`)}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border/70 flex items-center justify-between">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest/80 transition-colors"
                >
                  <span>{t("exploreCta")}</span>
                  <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreviewSection;

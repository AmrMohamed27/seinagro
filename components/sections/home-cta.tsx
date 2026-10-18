import { ArrowUpRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const HomeCtaSection = () => {
  const t = useTranslations("Contact");

  return (
    <section
      id="contact"
      aria-labelledby="home-cta-heading"
      className="py-14 lg:py-20 bg-forest text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-wheat text-xs sm:text-sm font-semibold backdrop-blur-xs">
            <Sparkles className="size-4" aria-hidden="true" />
            <span>{t("homeCta.badge")}</span>
          </span>

          <h2
            id="home-cta-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            {t("homeCta.title")}
          </h2>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
            {t("homeCta.subtitle")}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-accent text-accent-foreground font-semibold text-base transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-lg"
            >
              <span>{t("homeCta.contactButton")}</span>
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-white/20"
            >
              <span>{t("homeCta.exploreButton")}</span>
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
  );
};

export default HomeCtaSection;

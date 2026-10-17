import { Compass, Target } from "lucide-react";
import { useTranslations } from "next-intl";

const VisionMissionSection = () => {
  const t = useTranslations("VisionMission");

  return (
    <section
      id="vision"
      aria-labelledby="vision-mission-heading"
      className="py-12 md:py-16 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col gap-4 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 dark:bg-forest/20 text-forest dark:text-forest text-xs sm:text-sm font-semibold tracking-wide">
            <span>{t("sectionBadge")}</span>
          </div>
          <h2
            id="vision-mission-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          >
            {t("title")}
          </h2>
        </div>

        {/* 50/50 Split Showcase: Forest Panel (Vision) vs Warm Card Panel (Mission) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Vision Panel (Deep Forest) */}
          <div className="flex flex-col justify-between p-8 sm:p-12 rounded-2xl bg-forest text-white shadow-md relative overflow-hidden">
            <div className="flex flex-col gap-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-wheat text-xs sm:text-sm font-semibold self-start backdrop-blur-xs">
                <Compass className="size-4" aria-hidden="true" />
                <span>{t("vision.label")}</span>
              </div>
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug tracking-tight text-white/95">
                “{t("vision.statement")}”
              </blockquote>
            </div>
            {/* Subtle decorative geometry */}
            <div
              className="absolute -bottom-12 -end-12 size-48 rounded-full bg-white/5 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Mission Panel (Warm Cream / Elevated Card) */}
          <div className="flex flex-col justify-between p-8 sm:p-12 rounded-2xl bg-card border-2 border-border shadow-xs relative overflow-hidden">
            <div className="flex flex-col gap-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/10 dark:bg-forest/20 text-forest dark:text-forest text-xs sm:text-sm font-semibold self-start">
                <Target className="size-4" aria-hidden="true" />
                <span>{t("mission.label")}</span>
              </div>
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug tracking-tight text-foreground">
                “{t("mission.statement")}”
              </blockquote>
            </div>
            {/* Subtle decorative geometry */}
            <div
              className="absolute -bottom-12 -end-12 size-48 rounded-full bg-forest/5 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;

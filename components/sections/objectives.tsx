"use client";

import { motion } from "framer-motion";
import {
  Award,
  Cpu,
  FlaskConical,
  Globe,
  GraduationCap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PillarConfig {
  id: "1" | "2" | "3" | "4" | "5";
  icon: typeof FlaskConical;
  gridSpan: string;
  badgeStyle: string;
  image?: {
    src: string;
    altKey: "plant5" | "field4";
    aspect: string;
  };
}

const OBJECTIVE_PILLARS: PillarConfig[] = [
  {
    id: "1",
    icon: FlaskConical,
    gridSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    badgeStyle: "bg-forest/10 dark:bg-forest/20 text-forest dark:text-forest",
    image: {
      src: "/assets/images/plant5.jpeg",
      altKey: "plant5",
      aspect: "h-44 sm:h-48",
    },
  },
  {
    id: "2",
    icon: Award,
    gridSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    badgeStyle: "bg-growth/10 text-growth",
    image: {
      src: "/assets/images/field4.jpeg",
      altKey: "field4",
      aspect: "h-36 sm:h-40",
    },
  },
  {
    id: "3",
    icon: Globe,
    gridSpan: "col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-2",
    badgeStyle: "bg-harvest/10 text-harvest-ink dark:text-harvest",
  },
  {
    id: "4",
    icon: GraduationCap,
    gridSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    badgeStyle: "bg-clay/15 text-soil dark:text-clay",
  },
  {
    id: "5",
    icon: Cpu,
    gridSpan: "col-span-1 md:col-span-1 lg:col-span-2",
    badgeStyle: "bg-mist/20 text-forest dark:text-mist",
  },
];

const ObjectivesSection = () => {
  const t = useTranslations("Objectives");
  const tAbout = useTranslations("aboutPage");

  return (
    <section
      id="objectives"
      aria-labelledby="objectives-heading"
      className="py-12 md:py-16 bg-surface-cream/40 dark:bg-background relative"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col gap-4 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 dark:bg-forest/20 text-forest dark:text-forest text-xs sm:text-sm font-semibold tracking-wide">
            <span>{t("sectionBadge")}</span>
          </div>
          <h2
            id="objectives-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          >
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 5-Pillar Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          {OBJECTIVE_PILLARS.map(({ id, icon: Icon, gridSpan, badgeStyle, image }) => (
            <motion.div
              key={id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col justify-between rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-shadow overflow-hidden group ${gridSpan}`}
            >
              {image && (
                <div className={`relative w-full ${image.aspect} overflow-hidden bg-muted`}>
                  <Image
                    src={image.src}
                    alt={tAbout(`images.${image.altKey}`)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card via-card/10 to-transparent" />
                </div>
              )}

              <div className="flex flex-col justify-between flex-1 p-6 sm:p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${badgeStyle}`}>
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground tracking-wider">
                      0{id}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {t(`pillars.${id}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`pillars.${id}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectivesSection;

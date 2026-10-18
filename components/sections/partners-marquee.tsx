import Image from "next/image";
import { getTranslations } from "next-intl/server";

const PARTNER_LOGOS = [
  {
    id: "1",
    src: "/assets/company-logos/company-logo-1.png",
    width: 180,
    height: 60,
  },
  {
    id: "2",
    src: "/assets/company-logos/company-logo-2.png",
    width: 180,
    height: 60,
  },
  {
    id: "3",
    src: "/assets/company-logos/company-logo-3.png",
    width: 180,
    height: 60,
  },
  {
    id: "4",
    src: "/assets/company-logos/company-logo-4.png",
    width: 180,
    height: 60,
  },
  {
    id: "5",
    src: "/assets/company-logos/company-logo-5.png",
    width: 180,
    height: 60,
  },
  {
    id: "6",
    src: "/assets/company-logos/company-logo-6.png",
    width: 180,
    height: 60,
  },
] as const;

export default async function PartnersMarquee() {
  const t = await getTranslations("partners");

  return (
    <section
      aria-label={t("eyebrow")}
      className="w-full bg-[#F7F6F2] border-y border-stone-200/80 py-8 md:py-10 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 mb-6 md:mb-8 text-center">
        <p className="text-xs md:text-sm font-semibold tracking-wider uppercase text-forest/80 mb-2">
          {t("eyebrow")}
        </p>
        <p className="text-sm md:text-base text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* Marquee Track Container with Edge Fade Masks (Skill Step 4) */}
      <div
        className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        dir="ltr"
      >
        {/*
          Marquee Skill Implementation:
          1. Duplicated item sequence (first instance + duplicated instance matching perfectly).
          2. Linear transform from 0 to -50% via animate-marquee.
          3. Fixed stable item widths/heights to prevent jumps during loop.
          4. Edge fade mask applied to parent container.
          5. Pause on hover enabled.
          6. Respects prefers-reduced-motion with static wrapped layout.
          dir="ltr" ensures bulletproof direction-agnostic continuous loop in AR/EN/FR.
        */}
        <div
          dir="ltr"
          className="flex w-max items-center motion-safe:animate-marquee hover:[animation-play-state:paused] motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:w-full motion-reduce:gap-8"
        >
          {/* Primary Sequence (Instance 1) */}
          <div className="flex items-center gap-10 md:gap-16 pe-10 md:pe-16 shrink-0">
            {PARTNER_LOGOS.map((partner) => (
              <div
                key={`p1-${partner.id}`}
                className="h-12 md:h-14 w-32 md:w-40 flex items-center justify-center shrink-0"
              >
                <Image
                  src={partner.src}
                  alt={t("partnerAlt")}
                  width={partner.width}
                  height={partner.height}
                  className="max-h-12 md:max-h-14 w-auto max-w-[140px] md:max-w-[160px] object-contain opacity-65 transition-all duration-300 hover:opacity-100"
                />
              </div>
            ))}
          </div>

          {/* Duplicated Sequence matching perfectly for seamless 0 to -50% infinite loop (Instance 2) */}
          <div
            className="flex items-center gap-10 md:gap-16 pe-10 md:pe-16 shrink-0"
            aria-hidden="true"
          >
            {PARTNER_LOGOS.map((partner) => (
              <div
                key={`p2-${partner.id}`}
                className="h-12 md:h-14 w-32 md:w-40 flex items-center justify-center shrink-0"
              >
                <Image
                  src={partner.src}
                  alt=""
                  width={partner.width}
                  height={partner.height}
                  className="max-h-12 md:max-h-14 w-auto max-w-[140px] md:max-w-[160px] object-contain opacity-65 transition-all duration-300 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import AboutParagraphs from "@/components/about-paragraphs";
import AnimatedSection from "@/components/sections/animated-section";
import HeroVideoTemplate from "@/components/sections/hero-video-template";
import { renderGreenHtml } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AboutPage = () => {
  const t = useTranslations("AboutPage");
  return (
    <div className="flex flex-col gap-2">
      {/* Hero */}
      <HeroVideoTemplate
        title={renderGreenHtml(t.raw("h1"))}
        videoSrc="/assets/videos/hero.webm"
        fallbackImage={"/assets/videos/hero_fallback.png"}
      />
      <AnimatedSection
        className="flex flex-col items-center gap-8 pt-0 pb-4 border-0"
        firstChild
      >
        {/* Paragraphs */}
        <AboutParagraphs />
        {/* Gallery */}
        <div className="flex flex-col items-center gap-4">
          {/* Header */}
          <h2 className={`font-bold text-lg md:text-xl lg:text-2xl`}>
            {t("gallery")}
          </h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {Array.from({ length: 18 }).map((_, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-[300px]"
              >
                <Image
                  src={`/assets/images/about/about (${index + 1}).jpeg`}
                  alt=""
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AboutPage;

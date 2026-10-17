import { renderGreenHtml } from "@/lib/utils";
import { useTranslations } from "next-intl";
import HeroVideoTemplate from "./hero-video-template";
const HeroSection = () => {
  const t = useTranslations("HomePage");
  return (
    <HeroVideoTemplate
      title={renderGreenHtml(t.raw("Hero.title"))}
      description={t("Hero.description")}
      videoSrc="/assets/videos/hero.webm"
      fallbackImage="/assets/videos/hero_fallback.png"
    />
  );
};

export default HeroSection;

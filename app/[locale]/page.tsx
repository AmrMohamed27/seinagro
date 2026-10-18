import AnimatedSection from "@/components/sections/animated-section";
import HeroSection from "@/components/sections/hero";
import HomeCtaSection from "@/components/sections/home-cta";
import LegacySection from "@/components/sections/legacy";
import ObjectivesSection from "@/components/sections/objectives";
import OfferingsSection from "@/components/sections/offerings";
import PartnersMarquee from "@/components/sections/partners-marquee";
import ServicesPreviewSection from "@/components/sections/services-preview";
import VisionMissionSection from "@/components/sections/vision-mission";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trusted Partners & Network Logo Marquee */}
      <PartnersMarquee />

      {/* 3. Founders' Multinational Legacy & About */}
      <AnimatedSection id="about-wrapper">
        <LegacySection />
      </AnimatedSection>

      {/* 3. Dual Core Offerings / Products Gateway */}
      <AnimatedSection id="offerings-wrapper">
        <OfferingsSection />
      </AnimatedSection>

      {/* 4. Compact Services & Agronomic Solutions Gateway */}
      <AnimatedSection id="services-preview-wrapper">
        <ServicesPreviewSection />
      </AnimatedSection>

      {/* 5. Vision & Mission Showcase */}
      <AnimatedSection id="vision-wrapper">
        <VisionMissionSection />
      </AnimatedSection>

      {/* 5. Strategic Objectives Bento */}
      <AnimatedSection id="objectives-wrapper">
        <ObjectivesSection />
      </AnimatedSection>

      {/* 6. B2B Export Partnership CTA (routes to /contact, sitting flush above Footer) */}
      <AnimatedSection id="contact-wrapper">
        <HomeCtaSection />
      </AnimatedSection>
    </div>
  );
}

import AnimatedSection from "@/components/sections/animated-section";
import ExportInquirySection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import LegacySection from "@/components/sections/legacy";
import ObjectivesSection from "@/components/sections/objectives";
import OfferingsSection from "@/components/sections/offerings";
import VisionMissionSection from "@/components/sections/vision-mission";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Founders' Multinational Legacy & About */}
      <AnimatedSection id="about-wrapper">
        <LegacySection />
      </AnimatedSection>

      {/* 3. Dual Core Offerings */}
      <AnimatedSection id="offerings-wrapper">
        <OfferingsSection />
      </AnimatedSection>

      {/* 4. Vision & Mission Showcase */}
      <AnimatedSection id="vision-wrapper">
        <VisionMissionSection />
      </AnimatedSection>

      {/* 5. Strategic Objectives Bento */}
      <AnimatedSection id="objectives-wrapper">
        <ObjectivesSection />
      </AnimatedSection>

      {/* 6. Export Inquiry & Contact */}
      <AnimatedSection id="contact-wrapper">
        <ExportInquirySection />
      </AnimatedSection>
    </div>
  );
}

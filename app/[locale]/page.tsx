"use client";
import AboutSection from "@/components/sections/about";
import ClientsSection from "@/components/sections/clients";
import ContactSection from "@/components/sections/contact";
import DepartmentsSection from "@/components/sections/departments";
import HeroSection from "@/components/sections/hero";
import ProductsSection from "@/components/sections/products";

export default function Home() {
  return (
    <div className="flex flex-col gap-4" id="home">
      <HeroSection />
      <AboutSection />
      <DepartmentsSection />
      <ProductsSection />
      <ClientsSection />
      <ContactSection />
    </div>
  );
}

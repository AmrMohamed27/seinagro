"use client";

import { BRAND_ASSETS, getWordmark } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import ChangeLanguage from "./change-language";
import MobileMenu from "./mobile-menu";

interface NavbarContentProps {
  scrolled?: boolean;
}

export const NAV_ANCHORS = [
  { id: "home", href: "/#home" },
  { id: "about", href: "/about" },
  { id: "offerings", href: "/#offerings" },
  { id: "vision", href: "/#vision" },
  { id: "objectives", href: "/#objectives" },
  { id: "contact", href: "/#contact" },
] as const;

export type NavAnchorId = (typeof NAV_ANCHORS)[number]["id"];

const NavbarContent = ({ scrolled = false }: NavbarContentProps) => {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const wordmarkSrc = getWordmark(locale);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    if (pathname === "/about") {
      setActiveSection("about");
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = NAV_ANCHORS.length - 1; i >= 0; i--) {
        const item = NAV_ANCHORS[i];
        if (item.id === "about") continue;
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            return;
          }
        }
      }
      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <nav
      aria-label="Main Navigation"
      className="flex flex-row justify-between items-center mx-auto px-4 md:px-8 h-full container"
    >
      {/* Brand Logo with Mark & Wordmark */}
      <Link
        href="/#home"
        className="flex items-center gap-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <Image
          src={BRAND_ASSETS.logo.mark}
          alt={locale === "ar" ? "شعار سيناجرو" : "Seinagro Logo"}
          width={44}
          height={44}
          priority
          className="w-10 md:w-11 h-auto transition-transform duration-300 group-hover:scale-105"
        />
        <Image
          src={wordmarkSrc}
          alt={locale === "ar" ? "سيناجرو" : "Seinagro"}
          width={130}
          height={32}
          priority
          className={cn(
            "max-md:hidden h-7 md:h-8 w-auto transition-opacity",
            scrolled ? "brightness-100 dark:brightness-100" : "brightness-0 invert drop-shadow-sm"
          )}
        />
      </Link>

      {/* Desktop Navigation Links */}
      <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
        {NAV_ANCHORS.map((anchor) => {
          const isActive = activeSection === anchor.id;
          return (
            <li key={anchor.id}>
              <Link
                href={anchor.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  scrolled
                    ? isActive
                      ? "text-forest dark:text-forest font-semibold bg-forest/10 dark:bg-forest/20"
                      : "text-foreground/80 hover:text-forest dark:hover:text-forest"
                    : isActive
                      ? "text-white font-semibold bg-white/20"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {t(anchor.id)}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Controls & Switchers */}
      <div className="flex items-center gap-2 md:gap-3">
        <ChangeLanguage />
        {/* Mobile menu trigger */}
        <div className="lg:hidden">
          <MobileMenu activeSection={activeSection} />
        </div>
      </div>
    </nav>
  );
};

export default NavbarContent;

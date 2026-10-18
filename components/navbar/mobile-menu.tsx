"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BRAND_ASSETS, getWordmark } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { NAV_ANCHORS } from "./navbar-content";

interface MobileMenuProps {
  activeSection?: string;
}

const MobileMenu = ({ activeSection = "home" }: MobileMenuProps) => {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const wordmarkSrc = getWordmark(locale);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="primary"
          size="icon"
          aria-label={locale === "ar" ? "افتح القائمة" : "Open Navigation Menu"}
          className="focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="start" className="overflow-y-auto w-4/5 max-w-xs p-6">
        <SheetHeader className="p-0 pb-6 border-b border-border">
          <SheetTitle asChild>
            <Link
              href="/#home"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3"
            >
              <Image
                src={BRAND_ASSETS.logo.mark}
                alt={locale === "ar" ? "شعار سيناجرو" : "Seinagro Logo"}
                width={36}
                height={36}
                className="w-9 h-auto"
              />
              <Image
                src={wordmarkSrc}
                alt={locale === "ar" ? "سيناجرو" : "Seinagro"}
                width={110}
                height={28}
                className="h-6 w-auto"
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 pt-6">
          <ul className="flex flex-col gap-1.5" role="list">
            {NAV_ANCHORS.map((anchor) => {
              const isActive = activeSection === anchor.id;
              return (
                <li key={anchor.id}>
                  <Link
                    href={anchor.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center w-full px-3 py-2.5 rounded-md text-base transition-colors",
                      isActive
                        ? "bg-forest/10 dark:bg-forest/20 text-forest dark:text-forest font-semibold"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {t(anchor.id)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

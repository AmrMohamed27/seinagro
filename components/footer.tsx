import { BRAND_ASSETS } from "@/lib/brand";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const FOOTER_NAV_LINKS = [
  { id: "home", href: "/#home" },
  { id: "about", href: "/about" },
  { id: "offerings", href: "/#offerings" },
  { id: "vision", href: "/#vision" },
  { id: "objectives", href: "/#objectives" },
  { id: "contact", href: "/#contact" },
] as const;

const Footer = () => {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tOfferings = useTranslations("Offerings");
  const locale = useLocale();

  return (
    <footer className="border-t border-white/10 dark:border-border bg-soil text-white dark:bg-card dark:text-foreground">
      <div className="container mx-auto px-4 md:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Stack & Tagline (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link
              href="/#home"
              className="flex items-center gap-3 w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              <Image
                src={BRAND_ASSETS.logo.stack}
                alt={locale === "ar" ? "شعار سيناجرو" : "Seinagro"}
                width={200}
                height={80}
                className="h-28 w-auto object-contain brightness-0 invert dark:brightness-100 dark:invert-0"
              />
            </Link>
            <p className="text-white/80 dark:text-muted-foreground text-sm leading-relaxed max-w-sm">
              {t("tagline")}
            </p>
          </div>

          {/* Column 2: Quick Links Anchors (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-semibold text-base tracking-wide text-white dark:text-foreground">
              {t("quickLinks")}
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm" role="list">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-white/75 dark:text-muted-foreground hover:text-white dark:hover:text-forest transition-colors"
                  >
                    {tNav(link.id)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Pillars (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-semibold text-base tracking-wide text-white dark:text-foreground">
              {t("pillarsLabel")}
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm" role="list">
              <li>
                <Link
                  href="/#offerings"
                  className="text-white/75 dark:text-muted-foreground hover:text-white dark:hover:text-forest transition-colors"
                >
                  {tOfferings("seeds.title")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#offerings"
                  className="text-white/75 dark:text-muted-foreground hover:text-white dark:hover:text-forest transition-colors"
                >
                  {tOfferings("fertilizers.title")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="font-semibold text-base tracking-wide text-white dark:text-foreground">
              {t("headquartersLabel")}
            </h3>
            <ul className="flex flex-col gap-3 text-sm" role="list">
              <li className="flex items-start gap-3 text-white/85 dark:text-muted-foreground">
                <MapPin className="size-4 text-wheat mt-0.5 shrink-0" aria-hidden="true" />
                <span className="leading-snug">{t("headquartersValue")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-wheat shrink-0" aria-hidden="true" />
                <a
                  href="tel:+201122228970"
                  dir="ltr"
                  className="text-white/85 dark:text-muted-foreground hover:text-white dark:hover:text-forest transition-colors text-start"
                >
                  {t("phoneValue")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-wheat shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@seinagro.com"
                  dir="ltr"
                  className="text-white/85 dark:text-muted-foreground hover:text-white dark:hover:text-forest transition-colors"
                >
                  {t("emailValue")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom border & copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 dark:border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60 dark:text-muted-foreground">
          <p>{t("copyright")}</p>
          <p className="text-white/50 dark:text-muted-foreground/80">
            {t("companyName")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { routing } from "@/i18n/routing";
import { COMPANY_INFO } from "@/lib/brand";
import Image from "next/image";
import {
  Building2,
  Clock,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "contactPage.meta" });
  const baseUrl = COMPANY_INFO.canonicalUrl;
  const canonicalPath = `${baseUrl}/${locale}/contact`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalPath,
      languages: {
        ar: `${baseUrl}/ar/contact`,
        en: `${baseUrl}/en/contact`,
        fr: `${baseUrl}/fr/contact`,
        "x-default": `${baseUrl}/ar/contact`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalPath,
      siteName: locale === "ar" ? COMPANY_INFO.name.ar : COMPANY_INFO.name.en,
      images: [
        {
          url: `${baseUrl}/assets/images/field4.jpeg`,
          width: 720,
          height: 728,
          alt: locale === "ar" ? "سيناجرو - اتصل بنا" : "Seinagro - Contact Us",
        },
      ],
      locale: locale === "ar" ? "ar_EG" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

import { notFound } from "next/navigation";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const tContact = await getTranslations({ locale, namespace: "Contact" });
  const tContactPage = await getTranslations({
    locale,
    namespace: "contactPage",
  });
  const tAbout = await getTranslations({ locale, namespace: "aboutPage" });

  return (
    <div className="flex flex-col w-full bg-background">
      {/* 1. Cohesive Subpage Hero Banner: Framed with field4.jpeg */}
      <section
        id="contact-hero"
        aria-labelledby="contact-page-heading"
        className="relative min-h-[280px] md:min-h-[340px] flex items-center overflow-hidden bg-forest"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/field4.jpeg"
            alt={tAbout("images.field4")}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
          {/* Directional gradient overlay ensuring optimal contrast */}
          <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-e from-forest/90 via-forest/80 md:via-forest/70 to-forest/35" />
          <div className="absolute inset-0 bg-radial-[at_start_top] from-transparent via-transparent to-black/25" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8 py-14 md:py-16 lg:py-20">
          <div className="max-w-3xl flex flex-col gap-4 text-white">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-medium tracking-wide text-wheat">
              <span className="size-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span>{tContactPage("header.badge")}</span>
            </div>

            <h1
              id="contact-page-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              {tContactPage("header.title")}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-normal">
              {tContactPage("header.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* 2. 2-Column Split Layout */}
      <section
        id="contact-details-form"
        aria-label="Contact Details and Inquiry Form"
        className="py-12 md:py-16 bg-background"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Start Column (5 cols): Official Verified HQ Details & B2B Editorial Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Card 1: Official Headquarters Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-surface-cream/70 border-2 border-border shadow-xs flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-forest/10 text-forest shrink-0">
                    <Building2 className="size-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">
                      {tContact("hq.title")}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {tContact("hq.country")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5 text-sm" role="list">
                  {/* Address */}
                  <div className="flex items-start gap-3.5" role="listitem">
                    <div className="p-2 rounded-lg bg-forest/10 text-forest shrink-0 mt-0.5">
                      <MapPin className="size-4" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-foreground text-xs uppercase tracking-wider text-muted-foreground">
                        {tContact("hq.city")}
                      </span>
                      <span className="text-foreground font-medium leading-relaxed">
                        {tContact("hq.address")}
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5" role="listitem">
                    <div className="p-2 rounded-lg bg-forest/10 text-forest shrink-0 mt-0.5">
                      <Phone className="size-4" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        {tContact("hq.phoneLabel")}
                      </span>
                      <a
                        href="tel:+201122228970"
                        dir="ltr"
                        className="text-foreground font-medium hover:text-forest transition-colors text-start"
                      >
                        +20 11 2222 8970
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5" role="listitem">
                    <div className="p-2 rounded-lg bg-forest/10 text-forest shrink-0 mt-0.5">
                      <Mail className="size-4" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        {tContact("hq.emailLabel")}
                      </span>
                      <a
                        href="mailto:info@seinagro.com"
                        dir="ltr"
                        className="text-foreground font-medium hover:text-forest transition-colors text-start"
                      >
                        info@seinagro.com
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3.5" role="listitem">
                    <div className="p-2 rounded-lg bg-forest/10 text-forest shrink-0 mt-0.5">
                      <Clock className="size-4" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        {tContact("hq.hoursLabel")}
                      </span>
                      <span className="text-muted-foreground leading-relaxed">
                        {tContact("hq.hours")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: B2B Focus Note & Certified Capabilities */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-xs flex flex-col gap-4">
                <div className="flex items-center gap-2.5 text-forest font-semibold text-sm">
                  <ShieldCheck className="size-5 shrink-0" aria-hidden="true" />
                  <span>{tContactPage("b2bFocus.title")}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tContactPage("b2bFocus.description")}
                </p>

                <div className="pt-2 border-t border-border grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <Sprout className="size-4 text-growth shrink-0" aria-hidden="true" />
                    <span>{locale === "ar" ? "تقاوي وبذور معتمدة" : locale === "fr" ? "Semences certifiées" : "Certified Seeds"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <Globe2 className="size-4 text-forest shrink-0" aria-hidden="true" />
                    <span>{locale === "ar" ? "تصدير وتوزيع إقليمي" : locale === "fr" ? "Export & distribution" : "Regional & Global Export"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* End Column (7 cols): Contact Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {tContact("title")}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {tContact("subtitle")}
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

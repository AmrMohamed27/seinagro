import type { Metadata } from "next";
import Footer from "@/components/footer";
import Loader from "@/components/loader";
import Header from "@/components/navbar/header";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getLangDir } from "rtl-detect";
import { latinFont, arabicFont } from "@/lib/fonts";
import { COMPANY_INFO, getOgImage } from "@/lib/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Meta" });
  const baseUrl = COMPANY_INFO.canonicalUrl;
  const canonicalPath = `${baseUrl}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalPath,
      languages: {
        ar: `${baseUrl}/ar`,
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
        "x-default": `${baseUrl}/ar`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalPath,
      siteName: locale === "ar" ? COMPANY_INFO.name.ar : COMPANY_INFO.name.en,
      images: [
        {
          url: `${baseUrl}${getOgImage(locale)}`,
          width: 2752,
          height: 1536,
          alt: t("title"),
        },
      ],
      locale: locale === "ar" ? "ar_EG" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}${getOgImage(locale)}`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const direction = getLangDir(locale);
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Seinagro" />
      </head>
      <body
        className={cn(
          "antialiased min-h-screen bg-background text-foreground",
          latinFont.variable,
          arabicFont.variable,
          direction === "rtl"
            ? `${arabicFont.className} [dir=rtl]:leading-[1.8]`
            : `${latinFont.className} leading-normal`
        )}
      >
        <NextIntlClientProvider>
          <Header />
          <main>
            <Suspense fallback={<Loader />}>
              {children}
              <Toaster />
            </Suspense>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

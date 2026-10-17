import Footer from "@/components/footer";
import Header from "@/components/navbar/header";
import { arabicFont, latinFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider, useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { getLangDir } from "rtl-detect";

export default function NotFound() {
  const locale = useLocale();
  const direction = getLangDir(locale);
  const t = useTranslations("NotFound");

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={cn(
          "antialiased min-h-screen bg-background text-foreground flex flex-col justify-between",
          latinFont.variable,
          arabicFont.variable,
          direction === "rtl"
            ? `${arabicFont.className} [dir=rtl]:leading-[1.8]`
            : `${latinFont.className} leading-normal`
        )}
      >
          <NextIntlClientProvider>
            <Header />
            <main className="flex-1 flex flex-col justify-center items-center px-4 py-24 text-center">
              <div className="max-w-md mx-auto flex flex-col items-center gap-6">
                <span className="font-bold text-7xl md:text-8xl text-forest dark:text-forest">
                  404
                </span>
                <h1 className="font-bold text-2xl md:text-3xl text-foreground">
                  {t("title")}
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {t("description")}
                </p>
                <Link
                  href="/#home"
                  className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t("homeCta")}
                </Link>
              </div>
            </main>
            <Footer />
          </NextIntlClientProvider>
      </body>
    </html>
  );
}

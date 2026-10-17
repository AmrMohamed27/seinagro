import Footer from "@/components/footer";
import Header from "@/components/navbar/header";
import { NextIntlClientProvider, useLocale, useTranslations } from "next-intl";
import { Zain } from "next/font/google";
import { getLangDir } from "rtl-detect";
import { ThemeProvider } from "./providers/theme-provider";
const zain = Zain({
  variable: "--font-zain",
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "700", "800", "900"],
});

const NotFound = () => {
  const locale = useLocale();
  const direction = getLangDir(locale);
  const t = useTranslations("ErrorPage");
  return (
    <html lang={locale} suppressHydrationWarning dir={direction}>
      <body className={`${zain.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Header />
            <main className="min-h-screen">
              <div className="flex flex-col justify-center items-center mx-auto mt-20 container">
                <h1 className={`font-bold text-xl md:text-2xl lg:text-4xl `}>
                  {t("notFound")}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl">
                  {t("errorMessage")}
                </p>
              </div>
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default NotFound;

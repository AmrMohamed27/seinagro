import ContactForm from "@/components/contact-form";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

const ExportInquirySection = () => {
  const t = useTranslations("Contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-12 md:py-16 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col gap-4 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-forest/10 dark:bg-forest/20 text-forest dark:text-forest text-xs sm:text-sm font-semibold tracking-wide">
            <span>{t("sectionBadge")}</span>
          </div>
          <h2
            id="contact-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          >
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 2-Column Layout: Form (7 cols) + Official HQ Details (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs">
            <ContactForm />
          </div>

          {/* Official HQ Contact Info Card */}
          <div className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-8 rounded-2xl bg-surface-cream/70 dark:bg-card border-2 border-border shadow-xs">
            <h3 className="text-xl font-bold text-foreground">
              {t("hq.title")}
            </h3>

            <div className="flex flex-col gap-5 text-sm" role="list">
              {/* Address */}
              <div className="flex items-start gap-3.5" role="listitem">
                <div className="p-2.5 rounded-lg bg-forest/10 text-forest dark:text-forest shrink-0">
                  <MapPin className="size-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-foreground">
                    {t("hq.city")}, {t("hq.country")}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">
                    {t("hq.address")}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5" role="listitem">
                <div className="p-2.5 rounded-lg bg-forest/10 text-forest dark:text-forest shrink-0">
                  <Phone className="size-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-foreground">
                    {t("hq.phoneLabel")}
                  </span>
                  <a
                    href="tel:+201122228970"
                    dir="ltr"
                    className="text-muted-foreground hover:text-forest dark:hover:text-forest transition-colors text-start"
                  >
                    +20 11 2222 8970
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5" role="listitem">
                <div className="p-2.5 rounded-lg bg-forest/10 text-forest dark:text-forest shrink-0">
                  <Mail className="size-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-foreground">
                    {t("hq.emailLabel")}
                  </span>
                  <a
                    href="mailto:info@seinagro.com"
                    dir="ltr"
                    className="text-muted-foreground hover:text-forest dark:hover:text-forest transition-colors text-start"
                  >
                    info@seinagro.com
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5" role="listitem">
                <div className="p-2.5 rounded-lg bg-forest/10 text-forest dark:text-forest shrink-0">
                  <Clock className="size-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-foreground">
                    {t("hq.hoursLabel")}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">
                    {t("hq.hours")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportInquirySection;

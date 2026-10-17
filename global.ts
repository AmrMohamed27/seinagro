import formats from "@/i18n/request";
import messages from "./messages/en.json";

type locales = "en" | "fr" | "ar";

declare module "next-intl" {
  interface AppConfig {
    Locale: locales;
    Messages: typeof messages;
    Formats: typeof formats;
  }
}

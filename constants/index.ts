import { Locale } from "@/i18n/config";
import { Playfair_Display_SC } from "next/font/google";

export const languages: { id: Locale; name: string }[] = [
  {
    id: "en",
    name: "English",
  },
  {
    id: "fr",
    name: "Français",
  },
  {
    id: "ar",
    name: "عربي",
  },
];

export const playfairFont = Playfair_Display_SC({
  weight: "700",
  variable: "--font-playfair",
  subsets: ["latin"],
});


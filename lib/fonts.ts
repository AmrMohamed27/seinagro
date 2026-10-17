import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";

export const latinFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
});

// Backward-compatible exports for existing layout references
export const latin_secondary_font = latinFont;
export const arabic_font = arabicFont;
export const header_font = latinFont;

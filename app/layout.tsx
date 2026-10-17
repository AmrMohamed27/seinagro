import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.seinagro.com"),
  title: {
    default: "Seinagro | Strategic Crop Seeds & Advanced Fertilizers",
    template: "%s | Seinagro",
  },
  description:
    "Seinagro specializes in certified, climate-resilient strategic crop seeds and high-performance straight, compound, and specialized organic fertilizers.",
  icons: {
    icon: "/assets/images/logo-mark.png",
    shortcut: "/assets/images/logo-mark.png",
    apple: "/assets/images/logo-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

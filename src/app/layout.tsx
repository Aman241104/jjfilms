import type { Metadata } from "next";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  Cormorant_Garamond,
  Dancing_Script,
} from "next/font/google";
import "./globals.css";
import { GlobalShell } from "@/components/ui/GlobalShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JJFILMS | Premium Photography Studio",
    template: "%s | JJFILMS",
  },
  description:
    "Professional photography for real estate, product, events and weddings. We capture what matters.",
  keywords: ["Photography", "Real Estate Photography", "Product Photography", "Event Photography", "Wedding Photography", "JJFILMS"],
  openGraph: {
    siteName: "JJFILMS",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${playfair.variable} ${cormorant.variable} ${dancingScript.variable} font-sans antialiased`}
      >
        <GlobalShell>{children}</GlobalShell>
      </body>
    </html>
  );
}

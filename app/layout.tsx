import type { Metadata } from "next";
import { Cinzel, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";

// ═══════════════════════════════════════════════════════════════
// ROOT LAYOUT — Golden Pushers Productions LLP
// Clean layout with luxury typography, smooth scroll provider,
// persistent R3F canvas, navbar, film grain, and footer.
// ═══════════════════════════════════════════════════════════════

// Typography System
const serif = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

const body = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// SEO Metadata
export const metadata: Metadata = {
  title: `${siteConfig.fullName} | ${siteConfig.tagline}`,
  description: siteConfig.bio,
  keywords: [
    "film production",
    "cinematic",
    "luxury production house",
    "brand films",
    "commercial production",
    "Golden Pushers",
  ],
  openGraph: {
    title: siteConfig.fullName,
    description: siteConfig.bio,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${body.variable}`}
    >
      <body className="bg-[#0A0A0A] text-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
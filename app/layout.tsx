import React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import CursorTrailer from "@/components/CursorTrailer";

// ═══════════════════════════════════════════════════════════════
// ROOT LAYOUT — Golden Pushers Production
// Editorial Identity System
// Cormorant Garamond (display) + Inter (body)
// ═══════════════════════════════════════════════════════════════

// Primary Display Font — Cormorant Garamond
const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Secondary Body Font — Inter
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// SEO Metadata
export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.bio,
  keywords: [
    "visual production",
    "brand films",
    "commercial films",
    "music videos",
    "product photography",
    "corporate films",
    "wedding films",
    "creative direction",
    "visual storytelling",
    "Golden Pushers Production",
    "Kochi",
    "Kerala",
  ],
  openGraph: {
    title: siteConfig.name,
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
      className={`${display.variable} ${sans.variable}`}
    >
      <body className="bg-[#F8F4EE] text-[#1E1E1E] font-sans antialiased overflow-x-hidden">
        <CursorTrailer />
        {children}
      </body>
    </html>
  );
}
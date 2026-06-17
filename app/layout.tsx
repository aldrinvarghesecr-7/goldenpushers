import React from "react";
import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import CursorTrailer from "@/components/CursorTrailer";

// ═══════════════════════════════════════════════════════════════
// ROOT LAYOUT — Golden Pushers Productions LLP
// Cinematic Reveal Design System
// Syne + Plus Jakarta Sans + JetBrains Mono
// ═══════════════════════════════════════════════════════════════

// Typography System
const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-[#0B0D1A] text-[#E8ECF4] font-sans antialiased overflow-x-hidden">
        {/* Ambient glow overlay */}
        <div className="ambient-glow" />
        <CursorTrailer />
        {children}
      </body>
    </html>
  );
}
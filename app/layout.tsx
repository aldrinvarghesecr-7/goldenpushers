import type { Metadata } from "next";
import { Cinzel, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CursorTrailer from "@/components/CursorTrailer";
import { siteConfig } from "@/lib/config";
import FilmGrain from "@/components/FilmGrain";
import CinematicPreloader from "@/components/CinematicPreloader";

const serif = Cinzel({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600", "700", "800", "900"], display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "500", "600", "900"], display: "swap" });
const bodyFont = Playfair_Display({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: `${siteConfig.title} | ${siteConfig.tagline}`,
  description: siteConfig.bio,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${bodyFont.variable}`}>
      <body className="bg-[#050505] text-white font-body antialiased overflow-hidden selection:bg-[#D4AF77] selection:text-black">
        {/* Persistent Cinematic Overlays */}
        <FilmGrain />
        <CursorTrailer />
        <Navbar />

        {/* Global Preloader handling the entrance logic */}
        <CinematicPreloader />

        {/* The Main App Content (Cinematic Canvas) */}
        {children}

      </body>
    </html>
  );
}
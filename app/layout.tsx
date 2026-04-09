import type { Metadata } from "next";
import { Cinzel, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollProgress from "@/components/ScrollProgress";
import CursorTrailer from "@/components/CursorTrailer";
import PageTransition from "@/components/PageTransition";
import { siteConfig } from "@/lib/config";

const serif = Cinzel({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600", "700", "800", "900"], display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "500", "600", "900"], display: "swap" });
const bodyFont = Playfair_Display({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: `${siteConfig.title} | ${siteConfig.tagline}`,
  description: siteConfig.bio,
};
import FilmGrain from "@/components/FilmGrain";
import CinematicStoryScene from "@/components/CinematicStoryScene";
import CinematicPreloader from "@/components/CinematicPreloader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${bodyFont.variable}`}>
      <body className="bg-primary text-text-primary font-body antialiased overflow-x-hidden selection:bg-accent selection:text-primary">
        <FilmGrain />
        <CinematicPreloader />
        <CinematicStoryScene />
        <SmoothScrollProvider>
          <ScrollProgress />
          <CursorTrailer />
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
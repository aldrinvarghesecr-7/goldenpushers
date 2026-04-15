import type { Metadata } from "next";
import { Cinzel, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import { siteConfig } from "@/lib/config";
import FilmGrain from "@/components/FilmGrain";
import ClientWrappers from "@/components/ClientWrappers";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

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
      <body className="bg-primary text-text-primary font-body antialiased overflow-x-hidden selection:bg-accent selection:text-primary">
        <SmoothScrollProvider>
          <FilmGrain />
          <ClientWrappers>
            <ScrollProgress />
            <Navbar />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer />
          </ClientWrappers>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
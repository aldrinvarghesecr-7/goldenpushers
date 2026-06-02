'use client';

// ═══════════════════════════════════════════════════════════════
// HOME PAGE — Golden Pushers Productions LLP
// Modern production house — single dark page, no page breaks.
// ═══════════════════════════════════════════════════════════════

import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import FilmGrain from '@/components/FilmGrain';
import HeroSection from '@/components/HeroSection';
import EthosSection from '@/components/EthosSection';
import CraftSection from '@/components/CraftSection';
import ReelsSection from '@/components/ReelsSection';
import ArchitectsSection from '@/components/ArchitectsSection';
import EnquireSection from '@/components/EnquireSection';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';

// Minimal interactive 3D background
const MinimalInteractive3D = dynamic(() => import('@/components/3d/MinimalInteractive3D'), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      {/* ─── Persistent Minimal 3D Background (z-0) ─── */}
      <MinimalInteractive3D />

      {/* ─── Film Grain Overlay (z-150) ─── */}
      <FilmGrain />

      {/* ─── Scroll Progress Bar (z-999) ─── */}
      <ScrollProgress />

      {/* ─── Navigation (z-100) ─── */}
      <Navbar />

      {/* ─── Main Content (z-10) ─── */}
      <main className="relative z-10">
        <HeroSection />

        {/* Ticker divider */}
        <div className="border-t border-b border-white/[0.04] overflow-hidden py-5 bg-[#111110]">
          <Marquee
            text="CINEMATIC EXCELLENCE — BRAND FILMS — COMMERCIAL — MUSIC VIDEO — EDITORIAL — EVENT COVERAGE —"
            speed={30}
            className="text-[11px] md:text-xs font-sans font-bold tracking-[0.5em] text-white/[0.12] uppercase leading-none"
          />
        </div>

        <EthosSection />
        <CraftSection />
        <ReelsSection />
        <ArchitectsSection />
        <EnquireSection />
      </main>

      {/* ─── Footer ─── */}
      <div className="relative z-10">
        <Footer />
      </div>
    </SmoothScroll>
  );
}
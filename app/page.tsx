'use client';

// ═══════════════════════════════════════════════════════════════
// HOME PAGE — Golden Pushers Productions LLP
// Single-page cinematic experience with marquee dividers.
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

        {/* Marquee Divider — Cinematic */}
        <Marquee 
          text="CINEMATIC EXCELLENCE" 
          speed={35} 
          className="py-6 text-[10vw] md:text-[6vw] font-serif font-black text-white/[0.015] leading-none border-y border-white/[0.03]" 
        />

        <EthosSection />

        {/* Marquee Divider — Services */}
        <Marquee 
          text="CRAFT & PRECISION" 
          speed={40} 
          reverse 
          className="py-4 text-[8vw] md:text-[5vw] font-serif font-black text-white/[0.02] leading-none" 
        />

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
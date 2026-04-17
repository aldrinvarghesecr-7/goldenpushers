'use client';

// ═══════════════════════════════════════════════════════════════
// HOME PAGE — Golden Pushers Productions LLP
// Single-page cinematic experience. All sections composed here.
// Persistent R3F canvas behind content, smooth scroll with Lenis,
// GSAP-powered animations throughout.
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

// R3F Canvas — loaded client-only to prevent SSR issues with Three.js
const LuxuryCanvas = dynamic(() => import('@/components/LuxuryCanvas'), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      {/* ─── Persistent 3D Background (z-0) ─── */}
      <LuxuryCanvas />

      {/* ─── Film Grain Overlay (z-150) ─── */}
      <FilmGrain />

      {/* ─── Scroll Progress Bar (z-999) ─── */}
      <ScrollProgress />

      {/* ─── Navigation (z-100) ─── */}
      <Navbar />

      {/* ─── Main Content (z-10) ─── */}
      <main className="relative z-10">
        <HeroSection />
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
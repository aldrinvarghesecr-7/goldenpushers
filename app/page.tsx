'use client';

// ═══════════════════════════════════════════════════════════════
// HOME PAGE — Golden Pushers Productions LLP
// Cinematic Reveal Experience — scroll-driven scenes
// ═══════════════════════════════════════════════════════════════

import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import EthosSection from '@/components/EthosSection';
import CraftSection from '@/components/CraftSection';
import ReelsSection from '@/components/ReelsSection';
import ArchitectsSection from '@/components/ArchitectsSection';
import EnquireSection from '@/components/EnquireSection';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import SceneTransition from '@/components/SceneTransition';

export default function Home() {
  return (
    <SmoothScroll>
      {/* ─── Scroll Progress Bar (z-999) ─── */}
      <ScrollProgress />

      {/* ─── Navigation (z-100) ─── */}
      <Navbar />

      {/* ─── Main Content (z-10) ─── */}
      <main className="relative z-10">
        <HeroSection />

        {/* Ticker divider */}
        <div className="border-t border-b border-[#00E5FF]/[0.06] overflow-hidden py-5 bg-[#0F1128]">
          <Marquee
            text="CINEMATIC EXCELLENCE — BRAND FILMS — COMMERCIAL — MUSIC VIDEO — EDITORIAL — EVENT COVERAGE —"
            speed={30}
            className="text-[11px] md:text-xs font-sans font-bold tracking-[0.5em] text-[#5A6285]/40 uppercase leading-none"
          />
        </div>

        <SceneTransition sceneNumber="02" label="Philosophy" />
        <EthosSection />

        <SceneTransition sceneNumber="03" label="Expertise" />
        <CraftSection />

        <SceneTransition sceneNumber="04" label="Portfolio" />
        <ReelsSection />

        <SceneTransition sceneNumber="05" label="Team" />
        <ArchitectsSection />

        <SceneTransition sceneNumber="06" label="Contact" />
        <EnquireSection />
      </main>

      {/* ─── Footer ─── */}
      <div className="relative z-10">
        <Footer />
      </div>
    </SmoothScroll>
  );
}
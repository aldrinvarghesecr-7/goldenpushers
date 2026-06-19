'use client';

// ═══════════════════════════════════════════════════════════════
// HOME PAGE — Golden Pushers Production
// Editorial Visual Identity — Stories Engineered To Last.
// ═══════════════════════════════════════════════════════════════

import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import ProductionProof from '@/components/ProductionProof';
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
      {/* ─── Scroll Progress Bar ─── */}
      <ScrollProgress />

      {/* ─── Navigation ─── */}
      <Navbar />

      {/* ─── Main Content ─── */}
      <main className="relative">
        <HeroSection />
        <ProductionProof />

        {/* Editorial ticker divider */}
        <div
          className="overflow-hidden py-4 border-t border-b border-[#C8C2B8]/40"
          style={{ background: '#F0EAE0' }}
        >
          <Marquee
            text="Commercial Films — Brand Campaigns — Product Photography — Music Videos — Podcasts — Wedding Films — Corporate Films — Creative Direction"
            speed={40}
            className="text-[#9B9B9B]"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          />
        </div>

        <SceneTransition sceneNumber="02" label="Studio" />
        <EthosSection />

        <SceneTransition sceneNumber="03" label="Services" />
        <CraftSection />

        <SceneTransition sceneNumber="04" label="Work" />
        <ReelsSection />

        <SceneTransition sceneNumber="05" label="Team" />
        <ArchitectsSection />

        <SceneTransition sceneNumber="06" label="Enquire" />
        <EnquireSection />
      </main>

      {/* ─── Footer ─── */}
      <Footer />
    </SmoothScroll>
  );
}

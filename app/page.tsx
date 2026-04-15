'use client';

import Hero3D from '@/components/Hero3D';
import AboutParallax from '@/components/AboutParallax';
import CinematicStats from '@/components/CinematicStats';
import TheCraft from '@/components/TheCraft';
import Portfolio from '@/components/Portfolio';
import TeamGrid from '@/components/TeamGrid';
import ContactForm from '@/components/ContactForm';
import KonamiCode from '@/components/KonamiCode';

export default function Home() {
  return (
    <>
      <Hero3D />

      <main className="relative z-10 min-h-screen text-white font-light tracking-wide">
        <KonamiCode />
        <AboutParallax />
        <CinematicStats />
        <div className="py-24 md:py-32" />
        <TheCraft />
        <div className="py-24 md:py-32" />
        <Portfolio />
        <TeamGrid />
        <ContactForm />
      </main>
    </>
  );
}
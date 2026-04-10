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
      <KonamiCode />
      <Hero3D />
      <AboutParallax />
      <CinematicStats />
      <div className="py-24 md:py-32" /> {/* Generous agency whitespace */}
      <TheCraft />
      <div className="py-24 md:py-32" />
      <Portfolio />
      <TeamGrid />
      <ContactForm />
    </>
  );
}
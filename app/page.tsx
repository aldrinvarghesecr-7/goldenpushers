import Hero3D from '@/components/Hero3D';
import AboutParallax from '@/components/AboutParallax';
import Portfolio from '@/components/Portfolio';
import TheCraft from '@/components/TheCraft';
import TeamGrid from '@/components/TeamGrid';
import ContactForm from '@/components/ContactForm';
import KonamiCode from '@/components/KonamiCode';

export default function Home() {
  return (
    <>
      <KonamiCode />
      <Hero3D />
      
      <div id="about">
         <AboutParallax />
      </div>

      <div id="services">
         <TheCraft />
      </div>

      <div id="work">
         <Portfolio />
      </div>

      <div id="team">
         <TeamGrid />
      </div>

      <div id="contact">
         <ContactForm />
      </div>
    </>
  );
}
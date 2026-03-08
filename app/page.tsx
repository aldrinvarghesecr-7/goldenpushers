import Hero from '@/components/Hero';
import SectionReveal from '@/components/SectionReveal';
import HorizontalScroll from '@/components/HorizontalScroll';
import MasonryGrid from '@/components/MasonryGrid';
import Button from '@/components/Button';

import InstagramArchive from '@/components/InstagramArchive';
import QuoteMoment from '@/components/QuoteMoment';
import MidpageInteraction from '@/components/MidpageInteraction';

export default function Home() {
  return (
    <>
      <Hero />


      <SectionReveal className="py-24 md:py-32 lg:py-40 bg-primary text-center max-w-4xl mx-auto px-8 relative">

        <h2 className="text-7xl font-serif leading-none tracking-tight">Light collected with intention.</h2>
        <p className="text-xl text-text-secondary mt-10">Every frame is a deliberate moment between me and the world.</p>
      </SectionReveal>

      <QuoteMoment text="STYLE IS AN ATTITUDE." />

      <section className="py-12 bg-section-alt relative">
        <div className="max-w-7xl mx-auto px-8">

          <div className="flex justify-between items-end mb-12">
            <h2 className="text-6xl font-serif tracking-tight">Featured Works</h2>
            <Button href="/work">View All</Button>
          </div>
          <HorizontalScroll />
        </div>
      </section>

      <MidpageInteraction />

      <section className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-6xl font-serif mb-16 text-center tracking-tight">The Work</h2>
          <MasonryGrid />
        </div>
      </section>

      <QuoteMoment text="NOT JUST CLOTHING. A STATEMENT." />

      <section className="py-24 bg-primary border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-8 mb-16">

          <h2 className="text-6xl font-serif text-center mt-4">Archived Stills</h2>
        </div>
        <InstagramArchive />
      </section>

      <SectionReveal className="py-32 bg-section-alt text-center relative mt-auto">
        <div className="max-w-xl mx-auto px-8">

          <p className="text-4xl font-serif leading-tight mt-8">"I don’t take pictures. I collect moments of light."</p>
          <p className="mt-10 text-text-muted uppercase tracking-[4px] text-sm md:text-base">— Aldrin Criro</p>
        </div>
      </SectionReveal>
    </>
  );
}
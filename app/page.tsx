import Hero from '@/components/Hero';
import SectionReveal from '@/components/SectionReveal';
import HorizontalScroll from '@/components/HorizontalScroll';
import MasonryGrid from '@/components/MasonryGrid';
import Button from '@/components/Button';

export default function Home() {
  return (
    <>
      <Hero />
      
      <SectionReveal className="py-24 md:py-32 lg:py-40 bg-primary text-center max-w-4xl mx-auto px-8">
        <h2 className="text-7xl font-serif leading-none tracking-tight">Light collected with intention.</h2>
        <p className="text-xl text-text-secondary mt-10">Every frame is a deliberate moment between me and the world.</p>
      </SectionReveal>

      <section className="py-12 bg-section-alt">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-6xl font-serif">Featured Works</h2>
            <Button href="/work">View All</Button>
          </div>
          <HorizontalScroll />
        </div>
      </section>

      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-6xl font-serif mb-16 text-center">The Work</h2>
          <MasonryGrid />
        </div>
      </section>

      <SectionReveal className="py-32 bg-section-alt text-center">
        <div className="max-w-xl mx-auto px-8">
          <p className="text-4xl font-serif leading-tight">"I don’t take pictures. I collect moments of light."</p>
          <p className="mt-10 text-text-muted">— Aldrin Criro</p>
        </div>
      </SectionReveal>
    </>
  );
}
import Hero from '@/components/Hero';
import SectionReveal from '@/components/SectionReveal';
import HorizontalScroll from '@/components/HorizontalScroll';
import MasonryGrid from '@/components/MasonryGrid';
import Button from '@/components/Button';
import SceneTitle from '@/components/SceneTitle';
import InstagramArchive from '@/components/InstagramArchive';

export default function Home() {
  return (
    <>
      <Hero />
      <SceneTitle title="SCENE 01 — THE INTRO" className="absolute top-[100vh] left-1/2 -translate-x-1/2 mt-8 z-10 hidden" />

      <SectionReveal className="py-24 md:py-32 lg:py-40 bg-primary text-center max-w-4xl mx-auto px-8 relative">
        <SceneTitle title="SCENE 01 — THE INTRO" />
        <h2 className="text-7xl font-serif leading-none tracking-tight">Light collected with intention.</h2>
        <p className="text-xl text-text-secondary mt-10">Every frame is a deliberate moment between me and the world.</p>
      </SectionReveal>

      <section className="py-12 bg-section-alt relative">
        <div className="max-w-7xl mx-auto px-8">
          <SceneTitle title="SCENE 02 — THE STORY" />
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-6xl font-serif tracking-tight">Featured Works</h2>
            <Button href="/work">View All</Button>
          </div>
          <HorizontalScroll />
        </div>
      </section>

      <section className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-8">
          <SceneTitle title="SCENE 03 — THE COLLECTION" className="text-center" />
          <h2 className="text-6xl font-serif mb-16 text-center tracking-tight">The Work</h2>
          <MasonryGrid />
        </div>
      </section>

      <section className="py-24 bg-primary border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-8 mb-16">
          <SceneTitle title="SCENE 04 — THE ARCHIVE" className="text-center" />
          <h2 className="text-6xl font-serif text-center mt-4">Archived Stills</h2>
        </div>
        <InstagramArchive />
      </section>

      <SectionReveal className="py-32 bg-section-alt text-center relative mt-auto">
        <div className="max-w-xl mx-auto px-8">
          <SceneTitle title="SCENE 05 — THE CONNECTION" />
          <p className="text-4xl font-serif leading-tight mt-8">"I don’t take pictures. I collect moments of light."</p>
          <p className="mt-10 text-text-muted uppercase tracking-[4px] text-sm md:text-base">— Aldrin Criro</p>
        </div>
      </SectionReveal>
    </>
  );
}
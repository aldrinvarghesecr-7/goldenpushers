import MasonryGrid from '@/components/MasonryGrid';
import SectionReveal from '@/components/SectionReveal';

export default function Work() {
  return (
    <div className="pt-20">
      <SectionReveal className="py-24 text-center">
        <h1 className="text-7xl font-serif">The Work</h1>
        <p className="text-text-secondary mt-6 text-xl tracking-widest">Selected series 2023–2025</p>
      </SectionReveal>
      <MasonryGrid />
    </div>
  );
}
import SectionReveal from '@/components/SectionReveal';

export default function About() {
  return (
    <div className="pt-20">
      <SectionReveal className="section-padding max-w-4xl mx-auto px-8">
        <h1 className="text-8xl font-serif leading-none tracking-tighter">Since 1887</h1>
        <div className="prose prose-invert max-w-none mt-20 text-lg text-text-secondary">
          <p>Golden Pushers was founded in Geneva by master horologist Henri Laurent with a singular vision: to create mechanical watches that transcend time itself.</p>
          <p>Today, every piece is still assembled by hand using centuries-old techniques paired with modern precision engineering. Only the finest materials and movements are selected.</p>
        </div>
      </SectionReveal>

      {/* Visual storytelling blocks with large images and text – add more SectionReveal as needed */}
    </div>
  );
}

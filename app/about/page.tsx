import SectionReveal from '@/components/SectionReveal';
import SceneTitle from '@/components/SceneTitle';

export default function About() {
  return (
    <div className="pt-32 pb-24 bg-primary min-h-screen">
      <SectionReveal className="max-w-4xl mx-auto px-8 relative">
        <SceneTitle title="SCENE 01 — THE ORIGIN" />
        <h1 className="text-6xl md:text-8xl font-serif leading-none tracking-tighter mb-12">Stories that matter.</h1>

        <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-text-secondary font-sans leading-relaxed">
          <p>
            GoldenPushers Production LLP is a full-service photography and video production company dedicated to capturing stories that matter. Based in India, we specialize in wedding storytelling, cinematic videography, corporate productions, podcast recording, and event coverage, delivering visually compelling content for individuals and brands.
          </p>
          <p className="mt-8">
            Our team provides end-to-end production services — from concept development and filming to professional editing and final delivery. Whether it’s a wedding celebration, corporate event, brand shoot, or podcast production, we focus on creating authentic visuals that reflect real emotions, powerful moments, and meaningful stories.
          </p>
          <p className="mt-8">
            In less than a year, GoldenPushers has rapidly grown by building strong relationships with clients and consistently delivering reliable, high-quality production services.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="mt-32 max-w-4xl mx-auto px-8 relative">
        <SceneTitle title="SCENE 02 — THE ARSENAL" />
        <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-10">What We Do</h2>
        <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-text-secondary">
          <p className="mb-8">
            At GoldenPushers, we combine creative storytelling with professional-grade equipment and experienced cinematographers to produce high-quality content that stands out. Our specialization includes:
          </p>
          <ul className="list-disc pl-6 space-y-4 text-white/80 marker:text-accent">
            <li>Wedding Storytelling & Cinematic Wedding Films</li>
            <li>Pre-Wedding and Post-Wedding Shoots</li>
            <li>Corporate Events & Corporate Headshots</li>
            <li>Podcast Recording & Production</li>
            <li>Private Events & Celebrations</li>
            <li>Baptisms & Religious Ceremonies</li>
            <li>Professional Photo & Video Editing</li>
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal className="mt-40 max-w-4xl mx-auto px-8 text-center relative border-t border-white/10 pt-32">
        <SceneTitle title="SCENE 03 — THE BELIEF" className="flex justify-center" />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
          "At the heart of everything we do is a simple belief: every story deserves to be told beautifully."
        </h2>
      </SectionReveal>
    </div>
  );
}

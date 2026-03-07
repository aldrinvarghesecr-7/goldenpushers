import SectionReveal from '@/components/SectionReveal';
import SceneTitle from '@/components/SceneTitle';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

const teamMembers = [
  { name: 'Peter McKinnon', role: 'Lead Cinematographer', image: 'https://images.unsplash.com/photo-1554046920-90dcac2a50ab?auto=format&fit=crop&w=800&q=80', instagram: 'https://instagram.com/petermckinnon' },
  { name: 'Chris Burkard', role: 'Aerial Specialist', image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=800&q=80', instagram: 'https://instagram.com/chrisburkard' },
  { name: 'Jimmy Chin', role: 'Documentary Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', instagram: 'https://instagram.com/jimmychin' },
  { name: 'Brandon Woelfel', role: 'Portrait Specialist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', instagram: 'https://instagram.com/brandonwoelfel' },
  { name: 'Sam Kolder', role: 'Colorist & Editor', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80', instagram: 'https://instagram.com/samkolder' },
  { name: 'Ami Vitale', role: 'Story & Concept', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', instagram: 'https://instagram.com/amivitale' },
];

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

      <SectionReveal className="mt-32 max-w-7xl mx-auto px-8 relative">
        <SceneTitle title="SCENE 02 — THE ARSENAL" />
        <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">What We Do</h2>
        <p className="text-xl text-text-secondary max-w-2xl mb-16">
          At GoldenPushers, we combine creative storytelling with professional-grade equipment to produce high-quality content that stands out.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Wedding Storytelling",
              desc: "Cinematic, documentary-style wedding films that capture the raw emotion, scale, and intimacy of your most important day.",
              icon: "01"
            },
            {
              title: "Corporate Productions",
              desc: "Premium brand storytelling, corporate headshots, and event coverage designed to elevate your company's visual identity.",
              icon: "02"
            },
            {
              title: "Podcast Recording",
              desc: "Professional multi-camera podcast production and crisp audio recording right out of our bespoke studio setup.",
              icon: "03"
            },
            {
              title: "Pre & Post Weddings",
              desc: "Curated, stylized locational shoots built around your narrative, setting the stage before and after the main event.",
              icon: "04"
            },
            {
              title: "Private Events",
              desc: "Discreet, high-end coverage of exclusive celebrations, baptisms, and religious ceremonies without disrupting the moment.",
              icon: "05"
            },
            {
              title: "Post-Production",
              desc: "Expert color grading, sound design, and narrative editing that transforms scattered footage into a cohesive film.",
              icon: "06"
            }
          ].map((service) => (
            <div key={service.title} className="group relative border border-white/10 p-8 hover:bg-white/5 transition-colors duration-500 overflow-hidden flex flex-col justify-between min-h-[300px]">
              {/* Background accent layer */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />

              <div>
                <span className="font-serif tracking-widest text-accent text-sm mb-6 block">{service.icon}</span>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      <section className="mt-40 max-w-7xl mx-auto px-8 relative border-t border-white/10 pt-32">
        <SectionReveal>
          <SceneTitle title="SCENE 03 — THE SQUAD" />
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-16">The Visionaries</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="group relative break-inside-avoid">
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />

                  {/* Instagram Overlay Link */}
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-6 right-6 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:border-accent hover:text-black z-10"
                    aria-label={`${member.name} Instagram`}
                  >
                    <Instagram size={20} />
                  </a>
                </div>

                <div>
                  <h3 className="font-serif text-3xl group-hover:text-accent transition-colors">{member.name}</h3>
                  <p className="text-text-secondary mt-1 tracking-widest uppercase text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <SectionReveal className="mt-40 max-w-4xl mx-auto px-8 text-center relative border-t border-white/10 pt-32">
        <SceneTitle title="SCENE 04 — THE BELIEF" className="flex justify-center" />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
          "At the heart of everything we do is a simple belief: every story deserves to be told beautifully."
        </h2>
      </SectionReveal>
    </div>
  );
}

import SectionReveal from '@/components/SectionReveal';
import GlassCard from '@/components/GlassCard';
import ImageReveal from '@/components/ImageReveal';
import Image from 'next/image';

const teamMembers = [
  { name: 'Peter McKinnon', role: 'Lead Cinematographer', image: 'https://images.unsplash.com/photo-1554046920-90dcac2a50ab?auto=format&fit=crop&w=800&q=80' },
  { name: 'Chris Burkard', role: 'Aerial Specialist', image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=800&q=80' },
  { name: 'Jimmy Chin', role: 'Documentary Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Brandon Woelfel', role: 'Portrait Specialist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sam Kolder', role: 'Colorist & Editor', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ami Vitale', role: 'Story & Concept', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
];

export default function Team() {
  return (
    <div className="pt-32 pb-24 bg-primary min-h-screen">
      <section className="max-w-7xl mx-auto px-8 relative">
        <SectionReveal>

          <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-6">The Visionaries</h1>
          <p className="text-xl text-text-secondary max-w-2xl mb-16">
            Meet the creative minds behind GoldenPushers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            {teamMembers.map((member, i) => (
              <GlassCard key={member.name} className="p-6 group relative break-inside-avoid flex flex-col items-center w-full">
                <ImageReveal delay={i * 0.1}>
                  <div className="relative aspect-[3/4] overflow-hidden mb-6 w-[200px] md:w-[240px] rounded-lg shadow-2xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors duration-500 pointer-events-none" />
                  </div>
                </ImageReveal>

                <div>
                  <h3 className="font-serif text-2xl group-hover:text-accent transition-colors">{member.name}</h3>
                  <p className="text-text-secondary mt-1 tracking-widest uppercase text-xs">{member.role}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}

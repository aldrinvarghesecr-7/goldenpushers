import SectionReveal from '@/components/SectionReveal';

import Image from 'next/image';

const teamMembers = [
  { name: 'Peter McKinnon', role: 'Lead Cinematographer', image: 'https://images.unsplash.com/photo-1554046920-90dcac2a50ab?auto=format&fit=crop&w=800&q=80' },
  { name: 'Chris Burkard', role: 'Aerial Specialist', image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=800&q=80' },
  { name: 'Jimmy Chin', role: 'Documentary Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Brandon Woelfel', role: 'Portrait Specialist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sam Kolder', role: 'Colorist & Editor', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ami Vitale', role: 'Story & Concept', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
];

const serviceCategories = [
  {
    category: "Single‑Camera / Small Scale Services",
    icon: "📸",
    services: [
      { title: "Portrait Sessions", desc: "Individual, couple, lifestyle", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80" },
      { title: "Editorial Shoots", desc: "Fashion, magazine‑style", image: "https://images.unsplash.com/photo-1510832198440-a52376950479?auto=format&fit=crop&w=800&q=80" },
      { title: "Event Coverage (Minimal)", desc: "Private parties, launches, intimate gatherings", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80" },
      { title: "Product Photography", desc: "Luxury goods, jewelry, clothing", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" },
      { title: "Social Media Content", desc: "Short reels, curated posts", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80" },
    ]
  },
  {
    category: "Mid‑Scale Production Services",
    icon: "🎬",
    services: [
      { title: "Brand Campaign Shoots", desc: "Multi‑scene, styled sets", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" },
      { title: "Commercial Photography", desc: "Advertising visuals, catalog work", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" },
      { title: "Music Video Support", desc: "Cinematic stills + BTS coverage", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80" },
      { title: "Corporate Profiles", desc: "Executive portraits, team branding", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
      { title: "Documentary‑Style", desc: "Storytelling for brands or individuals", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80" },
    ]
  },
  {
    category: "Full Production / Large Scale",
    icon: "🎥",
    services: [
      { title: "Fashion Films", desc: "Cinematic video + photography integration", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80" },
      { title: "Luxury Event Coverage", desc: "Weddings, galas, brand launches with multi‑camera setup", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" },
      { title: "Advertising Campaigns", desc: "Concept development → shoot → post‑production", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80" },
      { title: "Creative Direction & Styling", desc: "Art direction, set design, wardrobe coordination", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" },
      { title: "End‑to‑End Production", desc: "Script, storyboard, filming, editing, delivery", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" },
    ]
  },
  {
    category: "Add‑On Services",
    icon: "🛠️",
    services: [
      { title: "Post‑Production & Retouching", desc: "Color grading, cinematic edits", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80" },
      { title: "Drone Cinematography", desc: "Aerial shots for events or campaigns", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80" },
      { title: "Behind‑the‑Scenes", desc: "Process films, making‑of content", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80" },
      { title: "Creative Consulting", desc: "Brand positioning, visual identity strategy", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" },
      { title: "Archival & Print Services", desc: "Luxury photobooks, curated prints", image: "https://images.unsplash.com/photo-1534068590799-09895a2818de?auto=format&fit=crop&w=800&q=80" },
    ]
  }
];

export default function About() {
  return (
    <div className="pt-32 pb-24 bg-primary min-h-screen">
      <SectionReveal className="max-w-4xl mx-auto px-8 relative">

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

        <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Our Services</h2>
        <p className="text-xl text-text-secondary max-w-2xl mb-16">
          Tailored production at any scale. We combine creative storytelling with professional-grade equipment to produce high-quality content that stands out.
        </p>

        <div className="space-y-32">
          {serviceCategories.map((category) => (
            <div key={category.category}>
              <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
                <span className="text-3xl lg:text-4xl">{category.icon}</span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight">{category.category}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, index) => (
                  <div key={service.title} className="group relative border border-white/10 p-8 hover:border-white/30 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[300px]">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 bg-black">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                      />
                    </div>

                    {/* Background accent layer */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-10" />

                    <div className="relative z-10 pointer-events-none">
                      <span className="font-serif tracking-widest text-accent text-sm mb-6 block">0{index + 1}</span>
                      <h4 className="text-2xl font-serif mb-4 group-hover:text-white transition-colors drop-shadow-md">{service.title}</h4>
                      <p className="text-text-secondary leading-relaxed text-sm md:text-base group-hover:text-white/90 drop-shadow">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      <section className="mt-40 max-w-7xl mx-auto px-8 relative border-t border-white/10 pt-32">
        <SectionReveal>

          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-16">The Visionaries</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="group relative break-inside-avoid flex flex-col items-center">
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

                <div>
                  <h3 className="font-serif text-2xl group-hover:text-accent transition-colors">{member.name}</h3>
                  <p className="text-text-secondary mt-1 tracking-widest uppercase text-xs">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <SectionReveal className="mt-40 max-w-4xl mx-auto px-8 text-center relative border-t border-white/10 pt-32">

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
          "At the heart of everything we do is a simple belief: every story deserves to be told beautifully."
        </h2>
      </SectionReveal>
    </div>
  );
}

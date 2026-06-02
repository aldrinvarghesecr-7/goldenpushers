'use client';

// ═══════════════════════════════════════════════════════════════
// THE CRAFT — Services Section
// Modern production house editorial. Numbered service rows.
// Each service expands on hover. Full dark. Zero whitespace waste.
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Plus, Minus } from 'lucide-react';

const categories = [
  {
    id: '01',
    title: 'Creative Development & Strategy',
    description: 'Architecting the soul of your cinematic vision.',
    items: [
      'Concept ideation and storytelling',
      'Brand strategy and campaign development',
      'Scriptwriting and screenplay development',
      'Storyboarding and visual planning',
      'Creative consulting and direction',
    ],
  },
  {
    id: '02',
    title: 'Pre-Production Services',
    description: 'Precision planning for seamless execution.',
    items: [
      'Budgeting and project planning',
      'Location scouting',
      'Casting (talent/actors/models)',
      'Talent direction and choreography',
      'Set design and art direction',
      'Wardrobe, styling, hair & makeup',
      'Equipment planning and crew assembly',
      'Scheduling and logistics',
    ],
  },
  {
    id: '03',
    title: 'Production (Filming & Shooting)',
    description: 'Capturing the light with masterwork precision.',
    items: [
      'Full-scale video/film production',
      'Commercials & TV advertisements',
      'Brand films and promotional videos',
      'Music videos',
      'Luxury & high-end fashion films',
      'Corporate storytelling',
      'Short films and narrative content',
      'Documentary-style content',
      'Live event coverage',
      'Aerial/drone cinematography',
      'Studio or on-location shoots',
    ],
  },
  {
    id: '04',
    title: 'Post-Production Services',
    description: 'Refining the cut into cinematic gold.',
    items: [
      'Video editing and assembly',
      'Color grading and correction',
      'Sound design and audio post',
      'Voice-over and ADR',
      'Visual effects (VFX) and CGI',
      'Motion graphics and animation',
      'Title design and end credits',
      'Final mastering and delivery',
    ],
  },
  {
    id: '05',
    title: 'Specialized Content Creation',
    description: 'Tailored narratives for the digital age.',
    items: [
      'Social media content (Reels, TikTok)',
      'Product and e-commerce content',
      'Experiential films',
      'Podcast video production',
      'Behind-the-scenes content',
    ],
  },
  {
    id: '06',
    title: 'Additional Premium Services',
    description: 'Extending the reach of your visual identity.',
    items: [
      'Photography (campaigns, stills)',
      '360-degree campaign production',
      'Distribution and optimization',
      'Marketing support and materials',
      'Archiving and asset management',
    ],
  },
];

function ServiceRow({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className="craft-card border-b border-white/[0.06] group"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-7 md:py-8 gap-6 text-left group cursor-default"
        data-cursor-hover
      >
        {/* Left: Number + Title */}
        <div className="flex items-baseline gap-6 md:gap-10 flex-1 min-w-0">
          <span className="text-[#8B1E1F]/40 font-sans font-black text-sm tracking-[0.2em] shrink-0 group-hover:text-[#8B1E1F] transition-colors duration-400">
            {cat.id}
          </span>
          <h3 className="text-lg md:text-2xl lg:text-3xl font-serif font-black text-white/70 uppercase tracking-tight group-hover:text-white transition-colors duration-400 truncate">
            {cat.title}
          </h3>
        </div>

        {/* Right: Description (hidden on mobile) + icon */}
        <div className="flex items-center gap-6 shrink-0">
          <span className="hidden md:block text-white/20 text-xs font-sans italic tracking-wide group-hover:text-white/40 transition-colors duration-400">
            {cat.description}
          </span>
          <div className={`w-8 h-8 border rounded-full flex items-center justify-center transition-all duration-400 ${open ? 'border-[#8B1E1F] text-[#8B1E1F]' : 'border-white/10 text-white/30 group-hover:border-white/30 group-hover:text-white/60'}`}>
            {open ? <Minus size={12} /> : <Plus size={12} />}
          </div>
        </div>
      </button>

      {/* Expandable items */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-0 md:pl-[calc(14px+40px)]">
              {cat.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 py-2">
                  <div className="w-px h-full min-h-[1em] bg-[#8B1E1F]/30 mt-1.5 shrink-0 self-stretch" />
                  <span className="text-white/40 text-sm font-sans leading-relaxed hover:text-white/70 transition-colors duration-300 cursor-default">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CraftSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, { scope: container });

  return (
    <section ref={container} id="services" className="relative py-32 md:py-48 bg-[#111110] overflow-hidden">
      <div className="max-w-[90vw] mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-16"
        >
          <span className="text-[#8B1E1F] text-[9px] tracking-[0.6em] uppercase font-sans font-bold">Our Expertise</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-white/15 text-[9px] tracking-[0.4em] font-sans hidden md:block">03 / Craft</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
          className="text-[13vw] sm:text-[10vw] md:text-[9vw] font-serif font-black text-white uppercase tracking-[-0.05em] leading-[0.9] mb-6 cursor-default"
          data-cursor-hover
        >
          The <span className="text-gold-gradient">Craft</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md text-white/30 text-sm md:text-base font-sans font-light leading-relaxed mb-20"
        >
          From first spark to final frame — every stage crafted with
          uncompromising cinematic excellence.
        </motion.p>

        {/* Top border */}
        <div className="w-full h-px bg-white/[0.06] mb-0" />

        {/* Service Rows — accordion */}
        <div>
          {categories.map((cat, idx) => (
            <ServiceRow key={cat.id} cat={cat} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

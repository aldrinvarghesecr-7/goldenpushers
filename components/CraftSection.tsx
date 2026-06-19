'use client';

// ═══════════════════════════════════════════════════════════════
// CRAFT SECTION — Services with editorial accordion/slide
// Warm image treatment, olive/copper accents, no glow
// ═══════════════════════════════════════════════════════════════

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    id: '01',
    title: 'Commercial Films',
    sub: 'Brand & Campaign',
    description: 'High-impact commercial production for brands that demand attention. From TVCs to digital-first campaigns, we craft narratives that convert.',
    image: 'https://images.unsplash.com/photo-1574717024458-868582236a39?q=80&w=1200&auto=format&fit=crop',
    items: ['TV Commercials & Digital Ads', 'Brand Narrative Films', 'Product Launch Films', 'Campaign Strategy & Direction'],
  },
  {
    id: '02',
    title: 'Brand Campaigns',
    sub: 'Identity & Strategy',
    description: 'End-to-end visual brand campaigns built for longevity. We translate brand values into visual assets that hold weight across years.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
    items: ['Campaign Concept & Strategy', 'Art Direction', 'Multi-format Asset Production', 'Brand Film Series'],
  },
  {
    id: '03',
    title: 'Product Photography',
    sub: 'Editorial & Commercial',
    description: 'Clean, warm, editorially-informed product photography. From e-commerce to luxury lookbooks, we make products feel alive.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    items: ['Luxury Product Stills', 'E-commerce Photography', 'Editorial Lookbooks', 'Lifestyle & Context Shoots'],
  },
  {
    id: '04',
    title: 'Music Videos',
    sub: 'Cinematic Production',
    description: 'Visually rich music video production — from concept to color grade. We work closely with artists to build a unique visual language.',
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=1200&auto=format&fit=crop',
    items: ['Concept & Creative Direction', 'Cinematic Production', 'Color Grading & Post', 'Performance & Narrative Hybrid'],
  },
  {
    id: '05',
    title: 'Corporate & Podcast',
    sub: 'Documentary & Content',
    description: 'Corporate films and multi-camera podcast productions that are cinematic enough to hold attention and clear enough to communicate.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
    items: ['Corporate Documentary Films', 'Multi-cam Podcast Production', 'Founder Story Films', 'Internal & Training Films'],
  },
  {
    id: '06',
    title: 'Wedding Films',
    sub: 'Cinematic Storytelling',
    description: 'Wedding films that feel like cinema, not ceremony coverage. Emotion-first, editorially-minded visual storytelling of life\'s defining moments.',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
    items: ['Cinematic Feature Films', 'Short Wedding Films', 'Same-Day Edits', 'Destination Wedding Production'],
  },
];

export default function CraftSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <section id="services" className="relative py-24 md:py-40 bg-[#F0EAE0] overflow-hidden">

      <div className="max-w-[90vw] mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-16 md:mb-20"
        >
          <span className="label-olive">Our Services</span>
          <div className="h-px flex-1 bg-[#C8C2B8]/60" />
          <span className="label-editorial hidden md:block">03 / Craft</span>
        </motion.div>

        {/* Section title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 8vw, 100px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
              color: '#1E1E1E',
            }}
          >
            What We{' '}
            <em style={{ color: '#39463A', fontStyle: 'italic' }}>Build</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 300,
              color: '#6F6F6F',
              lineHeight: 1.75,
              maxWidth: '320px',
            }}
          >
            From first concept to final delivery — every stage executed with intentional craft.
          </motion.p>
        </div>

        {/* Main panel — two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#C8C2B8]/50 bg-[#F8F4EE]">

          {/* Left — service list */}
          <div className="lg:col-span-4 border-r border-[#C8C2B8]/50">
            {services.map((service, i) => (
              <button
                key={service.id}
                onClick={() => setActiveIndex(i)}
                data-cursor-hover
                className={`w-full text-left flex items-center justify-between px-8 py-5 border-b border-[#C8C2B8]/40 group transition-all duration-300 ${
                  activeIndex === i ? 'bg-[#39463A]' : 'bg-transparent hover:bg-[#F0EAE0]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '9px',
                      fontWeight: 400,
                      letterSpacing: '0.25em',
                      color: activeIndex === i ? 'rgba(248,244,238,0.5)' : '#9B9B9B',
                    }}
                  >
                    {service.id}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(14px, 1.5vw, 18px)',
                      fontWeight: 400,
                      letterSpacing: '0',
                      color: activeIndex === i ? '#F8F4EE' : '#1E1E1E',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {service.title}
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  strokeWidth={1}
                  style={{
                    color: activeIndex === i ? '#A66B45' : 'transparent',
                    transition: 'color 0.3s ease',
                    transform: activeIndex === i ? 'translateX(0)' : 'translateX(-4px)',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Right — active service detail */}
          <div className="lg:col-span-8 relative overflow-hidden min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="h-full flex flex-col md:flex-row"
              >
                {/* Image */}
                <div className="relative w-full md:w-[45%] aspect-[4/3] md:aspect-auto overflow-hidden shrink-0">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover image-editorial"
                    quality={85}
                    priority
                  />
                  {/* Warm overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F8F4EE]/20" />
                </div>

                {/* Content */}
                <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <span
                      className="block mb-3"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '9px',
                        fontWeight: 500,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: '#A66B45',
                      }}
                    >
                      {active.sub}
                    </span>

                    <h3
                      className="mb-5"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(24px, 3vw, 38px)',
                        fontWeight: 300,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.1,
                        color: '#1E1E1E',
                      }}
                    >
                      {active.title}
                    </h3>

                    <p
                      className="mb-8 border-accent-olive"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        fontWeight: 300,
                        color: '#6F6F6F',
                        lineHeight: 1.8,
                      }}
                    >
                      {active.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {active.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.06 + 0.1, duration: 0.35 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-[2px] h-4 bg-[#C8C2B8] mt-0.5 shrink-0 group-hover:bg-[#39463A] transition-colors duration-300" />
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '12px',
                              fontWeight: 300,
                              color: '#6F6F6F',
                              lineHeight: 1.5,
                            }}
                          >
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-10 flex items-center gap-4">
                    <div className="flex-1 h-px bg-[#C8C2B8]/40">
                      <motion.div
                        className="h-full bg-[#39463A]"
                        animate={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
                        transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '9px',
                        fontWeight: 400,
                        letterSpacing: '0.25em',
                        color: '#9B9B9B',
                      }}
                    >
                      {String(activeIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

// ═══════════════════════════════════════════════════════════════
// THE CRAFT — The Blueprint Unfold
// Services carousel with cinematic slide interactions.
// ═══════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import TiltCard from './TiltCard';

const categories = [
  { 
    id: '01', 
    title: 'Creative Development & Strategy', 
    description: 'Architecting the soul of your cinematic vision from the ground up.', 
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
    items: ['Concept ideation & storytelling', 'Brand campaign strategy', 'Scriptwriting & screenplays', 'Storyboarding & visual design', 'Creative consulting & art direction'] 
  },
  { 
    id: '02', 
    title: 'Pre-Production Services', 
    description: 'Precision planning and casting for a flawless set execution.', 
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=1200&auto=format&fit=crop',
    items: ['Budgeting & logistical planning', 'Location scouting & permissions', 'Casting directors & agency coordination', 'Set design & custom construction', 'Wardrobe, styling, hair & makeup', 'Camera rig planning & crew assembly'] 
  },
  { 
    id: '03', 
    title: 'Production (Filming)', 
    description: 'Capturing light with masterwork cameras and precision choreography.', 
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
    items: ['Full-scale cinema production', 'TV Commercials & digital ads', 'Brand narrative films', 'Cinematic music videos', 'Luxury fashion films', 'Aerial/drone cinematography'] 
  },
  { 
    id: '04', 
    title: 'Post-Production', 
    description: 'Refining the cut, color grading, and mixing into cinematic gold.', 
    image: 'https://images.unsplash.com/photo-1574717024458-868582236a39?q=80&w=1200&auto=format&fit=crop',
    items: ['Offline/Online video editing', 'High-end color grading (DaVinci)', 'Sound design & atmospheric mix', 'Voiceover, ADR & foley editing', 'CGI, VFX & motion graphics', 'Cinema mastering & delivery format'] 
  },
  { 
    id: '05', 
    title: 'Specialized Content', 
    description: 'Tailored high-end visual assets optimized for modern social feeds.', 
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
    items: ['High-impact Instagram Reels/TikToks', 'E-commerce & editorial lookbooks', 'Interactive experiential films', 'Multi-cam podcast production', 'Documentary & BTS content'] 
  },
  { 
    id: '06', 
    title: 'Additional Premium Services', 
    description: 'Extending your visual identity across campaigns and formats.', 
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    items: ['High-resolution stills campaigns', '360° campaign production assets', 'Digital delivery optimization', 'Marketing collateral support', 'Long-term digital asset archiving'] 
  },
];

export default function CraftSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(8px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      filter: 'blur(8px)',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.3 }
      }
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const activeCategory = categories[currentIndex];

  return (
    <section id="services" className="relative py-24 md:py-36 bg-[#0F1128] overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-[90vw] mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-16"
        >
          <span className="text-[#00E5FF] text-[9px] tracking-[0.6em] uppercase font-sans font-bold">Our Expertise</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#00E5FF]/20 to-transparent" />
          <span className="text-[#5A6285] text-[9px] tracking-[0.4em] font-mono hidden md:block">03 / Craft</span>
        </motion.div>

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] sm:text-[10vw] md:text-[8vw] font-display font-bold text-[#E8ECF4] uppercase tracking-[-0.03em] leading-[0.9] cursor-default"
            >
              The <span className="text-cyan-gradient">Craft</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-md text-[#5A6285] text-sm md:text-base font-sans font-light leading-relaxed mt-4"
            >
              From first spark to final frame — every stage crafted with uncompromising cinematic excellence.
            </motion.p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button 
              onClick={handlePrev} 
              className="group w-12 h-12 border border-[#E8ECF4]/10 hover:border-[#00E5FF]/50 flex items-center justify-center text-[#E8ECF4]/40 hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all duration-400 cursor-none"
              aria-label="Previous service"
              data-cursor-hover
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={handleNext} 
              className="group w-12 h-12 border border-[#E8ECF4]/10 hover:border-[#00E5FF]/50 flex items-center justify-center text-[#E8ECF4]/40 hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all duration-400 cursor-none"
              aria-label="Next service"
              data-cursor-hover
            >
              <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel Content */}
        <div className="min-h-[450px] relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              {/* Left Side: Cinematic Service Image Card with 3D Tilt */}
              <div className="lg:col-span-5 relative group/card">
                <TiltCard className="w-full">
                  <div className="aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/5] relative w-full overflow-hidden bg-black/40 border border-[#00E5FF]/10 rounded-sm shadow-[0_0_40px_rgba(0,229,255,0.02)]">
                    {/* Glowing border detail */}
                    <div className="absolute inset-0 border border-[#00E5FF]/20 group-hover/card:border-[#00E5FF]/50 transition-all duration-500 z-20 pointer-events-none" />
                    
                    {/* Unsplash image loader */}
                    <Image
                      src={activeCategory.image}
                      alt={activeCategory.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover opacity-60 group-hover/card:opacity-85 group-hover/card:scale-[1.03] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)] z-10"
                      quality={85}
                      priority
                    />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 z-15 pointer-events-none" />

                    {/* Text Overlay inside image */}
                    <div className="absolute bottom-6 left-6 z-20 pointer-events-none" style={{ transform: 'translateZ(30px)' }}>
                      <span className="text-4xl md:text-5xl font-mono text-[#00E5FF]/40 tracking-widest font-bold block mb-1">
                        {activeCategory.id}
                      </span>
                      <span className="text-[#E8ECF4]/60 text-xs font-sans tracking-[0.2em] uppercase font-bold block">
                        Production Stage
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Right Side: Service Details */}
              <div className="lg:col-span-7 flex flex-col justify-center py-4">
                <span className="text-[#00E5FF]/70 font-mono text-xs md:text-sm tracking-[0.3em] font-semibold mb-3 uppercase block">
                  Service Chapter {activeCategory.id}
                </span>
                
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-extrabold text-[#E8ECF4] tracking-tight uppercase leading-[1.0] mb-6 cursor-default">
                  {activeCategory.title}
                </h3>
                
                <p className="text-[#5A6285] text-sm md:text-base font-sans font-light leading-relaxed mb-10 max-w-2xl border-l-2 border-[#00E5FF]/30 pl-4 py-1">
                  {activeCategory.description}
                </p>

                {/* Sub-items grid list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCategory.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.2 }}
                      className="flex items-start gap-3 group/item py-1"
                    >
                      <div className="w-[3px] h-full min-h-[1.2em] bg-[#00E5FF]/20 group-hover/item:bg-[#00E5FF] group-hover/item:shadow-[0_0_8px_rgba(0,229,255,0.6)] mt-1 shrink-0 transition-all duration-300" />
                      <span className="text-[#5A6285] group-hover/item:text-[#E8ECF4] text-xs md:text-sm font-sans tracking-wide leading-relaxed transition-colors duration-300">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar & Indicators */}
        <div className="mt-16 w-full h-[2px] bg-[#E8ECF4]/[0.05] relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" 
            animate={{ width: `${((currentIndex + 1) / categories.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
        <div className="flex justify-between mt-3 text-[10px] font-mono tracking-[0.4em] text-[#5A6285] uppercase font-bold">
          <span>01</span>
          <span className="text-[#00E5FF]">{currentIndex + 1} / 0{categories.length}</span>
          <span>0{categories.length}</span>
        </div>

      </div>
    </section>
  );
}

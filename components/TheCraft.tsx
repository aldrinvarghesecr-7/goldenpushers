'use client';

/**
 * TheCraft — 3D Canister-Style Service Carousel
 * ============================================
 * 
 * Rebuilt to blend "Luxury Cinematic" with "Modern Agency" polish.
 * Features 3D film-canister style cards that expand to reveal details.
 * Synced with the global 3D background light sweep.
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCinematicStore } from '@/lib/store';

const chapters = [
  {
    id: "01",
    title: "The Spark",
    category: "Creative Development",
    description: "Every masterpiece begins in darkness. We architect the soul of your narrative before the first frame is ever captured.",
    items: ["Concept Ideation", "Brand Strategy", "Scriptwriting", "Storyboarding", "Creative Direction"]
  },
  {
    id: "02",
    title: "The Blueprint",
    category: "Pre-Production",
    description: "Mastering the logistics of visual gold. We map out every detail to ensure a seamless transition from thought to reality.",
    items: ["Budgeting", "Location Scouting", "Casting", "Set Design", "Production Planning"]
  },
  {
    id: "03",
    title: "The Shoot",
    category: "Production",
    description: "Visceral truth captured through light. Our world-class crew brings the vision to life with uncompromising precision.",
    items: ["Cinematography", "Directing", "Aerial Filming", "High-End Lighting", "Sound Capture"]
  },
  {
    id: "04",
    title: "The Magic",
    category: "Post-Production",
    description: "Carving masterpieces from raw frames. The edit is where the story truly finds its pulse and emotional resonance.",
    items: ["Editing", "Color Grading", "VFX & CGI", "Sound Design", "Motion Graphics"]
  },
  {
    id: "05",
    title: "The Reach",
    category: "Specialized Content",
    description: "Amplifying impact in the digital void. We tailor the experience for every platform, ensuring your message resonates everywhere.",
    items: ["Social Media Content", "Product Films", "Digital Campaigns", "Vertical Video", "Podcast Production"]
  },
  {
    id: "06",
    title: "The Legacy",
    category: "Premium Distribution",
    description: "The final golden frame. We ensure your project leaves a lasting impact and is preserved with the dignity it deserves.",
    items: ["Final Mastering", "Asset Management", "Marketing Support", "Campaign Rollout", "Archive Strategy"]
  }
];

function ServiceCard({ 
  chapter, 
  index, 
  isCenter, 
  isExpanded, 
  onToggle 
}: { 
  chapter: typeof chapters[0], 
  index: number, 
  isCenter: boolean,
  isExpanded: boolean,
  onToggle: () => void
}) {
  return (
    <motion.div
      layout
      className={`
        relative flex-shrink-0 md:snap-center transition-all duration-700
        ${isExpanded ? 'w-full md:w-[600px] h-auto md:h-auto' : 'w-full md:w-[320px] h-auto md:h-auto'}
      `}
    >
      {/* 3D Canister Body */}
      <div 
        onClick={onToggle}
        className={`
          relative h-[500px] rounded-[40px] border transition-all duration-700 cursor-pointer overflow-hidden
          ${isCenter 
            ? 'border-[#D4AF77]/40 shadow-[0_40px_80px_rgba(0,0,0,0.4)]' 
            : 'border-white/5 opacity-40 hover:opacity-100'
          }
          bg-gradient-to-br from-black/60 to-black/20 backdrop-blur-md
        `}
      >
        {/* Glossy Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <span className="text-[#D4AF77] font-sans text-xs tracking-[0.4em] uppercase font-black">
                CH. {chapter.id}
              </span>
              <motion.div 
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF77]"
              >
                {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
              </motion.div>
            </div>

            <div>
              <h3 className="text-white text-3xl md:text-4xl font-sans font-black uppercase tracking-tighter leading-none mb-3">
                {chapter.title}
              </h3>
              <p className="text-[#D4AF77]/60 font-serif italic text-sm">
                {chapter.category}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="space-y-6 pt-6 border-t border-white/5"
                >
                  <p className="text-white/60 text-sm leading-relaxed">
                    {chapter.description}
                  </p>
                  <ul className="grid grid-cols-1 gap-3">
                    {chapter.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-white/40 text-[10px] tracking-widest uppercase font-bold">
                        <div className="w-1 h-1 rounded-full bg-[#D4AF77]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="group flex items-center gap-3 text-[#D4AF77] text-xs underline-offset-8 hover:underline uppercase tracking-widest font-black transition-all pt-4">
                    Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pt-6"
                >
                  <p className="text-white/30 text-xs uppercase tracking-[0.2em] font-bold line-clamp-2">
                    {chapter.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Light Sweep Highlight */}
        <AnimatePresence>
          {isCenter && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF77]/5 to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function TheCraft() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { setActiveCraftIndex } = useCinematicStore();

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    
    // Calculate which card is closest to center
    const cardWidth = window.innerWidth < 768 ? clientWidth * 0.8 : 320;
    const gap = 32;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    const boundedIndex = Math.max(0, Math.min(index, chapters.length - 1));
    
    if (boundedIndex !== activeIndex) {
      setActiveIndex(boundedIndex);
      setActiveCraftIndex(boundedIndex);
    }
  }, [activeIndex, setActiveCraftIndex]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const move = direction === 'left' ? -352 : 352;
    scrollContainerRef.current.scrollTo({ left: scrollLeft + move, behavior: 'smooth' });
  };

  return (
    <section className="relative py-32 md:py-48 bg-transparent" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-[#D4AF77]" />
              <span className="text-[#D4AF77] font-sans text-xs tracking-[0.5em] uppercase font-black">
                Excellence in Motion
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-sans font-black text-white uppercase tracking-tighter leading-none">
              The <span className="text-white/20">Craft</span>
            </h2>
            <p className="max-w-xl text-white/50 text-base md:text-lg font-serif italic leading-relaxed">
              Six chapters of meticulously architected cinema. From early ideation to premium global distribution, we forge masterpieces.
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => scrollCarousel('left')}
              className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#D4AF77] hover:text-[#D4AF77] hover:bg-[#D4AF77]/5 transition-all duration-500"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scrollCarousel('right')}
              className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#D4AF77] hover:text-[#D4AF77] hover:bg-[#D4AF77]/5 transition-all duration-500"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex flex-col md:flex-row gap-8 px-6 md:px-[calc(50vw-160px)] md:overflow-x-auto md:snap-x md:snap-mandatory scrollbar-hide pb-20"
      >
        {chapters.map((chapter, i) => (
          <ServiceCard 
            key={chapter.id} 
            chapter={chapter} 
            index={i} 
            isCenter={activeIndex === i}
            isExpanded={expandedIndex === i}
            onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
          />
        ))}
        {/* Spacer for end scroll */}
        <div className="min-w-[40vw] flex-shrink-0" />
      </div>
    </section>
  );
}

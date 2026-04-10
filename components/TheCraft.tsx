'use client';

/**
 * TheCraft — Apple-Style Horizontal Service Carousel
 * ===================================================
 * 
 * Desktop: Horizontal scroll-snap carousel with golden film-frame cards.
 *          Smooth momentum scrolling with snap points per card.
 *          Active card gets a golden glow accent.
 * 
 * Mobile:  Clean vertical stack — no horizontal scroll, no lag.
 * 
 * All 6 service chapters with full bullet points preserved.
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const chapters = [
  {
    id: "01",
    title: "The Spark",
    category: "Creative Development & Strategy",
    description: "Every masterpiece begins in darkness. We architect the soul of your narrative before the first frame is ever captured.",
    items: ["Concept Ideation", "Brand Strategy", "Scriptwriting", "Storyboarding", "Creative Direction"]
  },
  {
    id: "02",
    title: "The Blueprint",
    category: "Pre-Production Services",
    description: "Mastering the logistics of visual gold. We map out every detail to ensure a seamless transition from thought to reality.",
    items: ["Budgeting", "Location Scouting", "Casting", "Set Design", "Production Planning"]
  },
  {
    id: "03",
    title: "The Shoot",
    category: "Production / Filming",
    description: "Visceral truth captured through light. Our world-class crew and equipment bring the vision to life with uncompromising precision.",
    items: ["Cinematography", "Directing", "Aerial Filming", "High-End Lighting", "Sound Capture"]
  },
  {
    id: "04",
    title: "The Magic",
    category: "Post-Production Services",
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

function ServiceCard({ chapter, index, isActive }: { chapter: typeof chapters[0], index: number, isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      className={`
        relative flex-shrink-0 w-[85vw] md:w-[420px] lg:w-[380px] 
        snap-center group
      `}
    >
      <div className={`
        relative h-full p-8 md:p-10 border transition-all duration-700
        ${isActive 
          ? 'border-[#D4AF77]/40 shadow-[0_0_40px_rgba(212,175,119,0.08)]' 
          : 'border-white/5 hover:border-white/10'
        }
        bg-black/40 backdrop-blur-sm
      `}>
        {/* Gold accent line — top */}
        <div className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF77] to-transparent transition-all duration-700 ${isActive ? 'w-full' : 'w-0 group-hover:w-1/3'}`} />
        
        {/* Chapter number */}
        <span className="text-[#D4AF77]/30 font-sans text-6xl font-black block mb-6 leading-none">
          {chapter.id}
        </span>

        {/* Title */}
        <h3 className="text-white text-2xl md:text-3xl font-sans font-black uppercase tracking-tight leading-none mb-2">
          {chapter.title}
        </h3>
        
        {/* Category */}
        <p className="text-[#D4AF77] font-serif italic text-sm md:text-base mb-6">
          {chapter.category}
        </p>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-8">
          {chapter.description}
        </p>

        {/* Service items */}
        <ul className="space-y-3 border-t border-white/5 pt-6">
          {chapter.items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-white/35 text-xs tracking-widest uppercase font-semibold hover:text-[#D4AF77] transition-colors duration-300">
              <div className={`w-1 h-1 rounded-full transition-colors duration-500 ${isActive ? 'bg-[#D4AF77] shadow-[0_0_6px_#D4AF77]' : 'bg-white/20'}`} />
              {item}
            </li>
          ))}
        </ul>

        {/* Subtle inner glow when active */}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF77]/[0.02] via-transparent to-transparent pointer-events-none" />
        )}
      </div>
    </motion.div>
  );
}

export default function TheCraft() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track which card is centered (desktop carousel)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || isMobile) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = el;
      const cardWidth = 420; // approximate card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, chapters.length - 1));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const move = direction === 'left' ? -clientWidth * 0.6 : clientWidth * 0.6;
    scrollContainerRef.current.scrollTo({ left: scrollLeft + move, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-black/70 py-24 md:py-32 overflow-hidden" id="services">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-[#D4AF77]" />
              <span className="text-[#D4AF77] font-sans text-xs tracking-[0.5em] uppercase">The Craft</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-black text-white uppercase tracking-tighter leading-none">
              A Cinematic<br />Journey
            </h2>
            <p className="mt-4 text-white/40 text-sm md:text-base max-w-md font-serif italic">
              Six chapters of cinematic mastery — from the first spark to the final golden frame.
            </p>
          </div>

          {/* Navigation arrows — desktop only */}
          {!isMobile && (
            <div className="flex gap-4">
              <button
                onClick={() => scrollCarousel('left')}
                className="group w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#D4AF77] hover:text-[#D4AF77] transition-all duration-500"
              >
                <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="group w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#D4AF77] hover:text-[#D4AF77] transition-all duration-500"
              >
                <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP: Horizontal scroll-snap carousel */}
      {!isMobile ? (
        <div
          ref={scrollContainerRef}
          className="flex gap-8 px-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Leading spacer for visual breathing */}
          <div className="min-w-[2vw] flex-shrink-0" />
          
          {chapters.map((chapter, i) => (
            <ServiceCard key={chapter.id} chapter={chapter} index={i} isActive={activeIndex === i} />
          ))}

          {/* Trailing spacer */}
          <div className="min-w-[15vw] flex-shrink-0" />
        </div>
      ) : (
        /* MOBILE: Clean vertical stack */
        <div className="flex flex-col gap-6 px-6">
          {chapters.map((chapter, i) => (
            <ServiceCard key={chapter.id} chapter={chapter} index={i} isActive={false} />
          ))}
        </div>
      )}

      {/* Progress dots — desktop */}
      {!isMobile && (
        <div className="flex justify-center gap-3 mt-10">
          {chapters.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === idx
                  ? 'w-8 bg-[#D4AF77]'
                  : 'w-1.5 bg-white/15'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

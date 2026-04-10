'use client';

import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

export default function TheCraft() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          
          // Calculate active chapter based on progress (6 stages)
          const chapterIndex = Math.min(Math.floor(p * 6), 5);
          setActiveChapter(chapterIndex);
        }
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', checkMobile);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-black/70" id="services">
      {/* HTML Overlays (Pinned) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Section Title Overlay */}
        <div className="absolute top-12 left-12 z-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="h-[1px] w-12 bg-[#D4AF77]" />
            <span className="text-[#D4AF77] font-sans text-xs tracking-[0.5em] uppercase">The Craft</span>
          </motion.div>
          <h2 className="text-white text-3xl md:text-5xl font-sans font-black uppercase tracking-tighter mt-4">
            A Cinematic Journey
          </h2>
        </div>

        {/* Text Content Grid */}
        <div className="absolute inset-0 flex items-center justify-end px-6 md:px-24 z-10 pointer-events-none">
          <div className="max-w-xl w-full pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-8"
              >
                <div>
                  <span className="text-[#D4AF77] font-sans text-4xl block mb-2 opacity-50">
                    {chapters[activeChapter].id}
                  </span>
                  <h3 className="text-white text-5xl md:text-7xl font-sans font-black uppercase leading-none tracking-tighter">
                    {chapters[activeChapter].title}
                  </h3>
                  <p className="text-[#D4AF77] font-serif italic text-xl md:text-2xl mt-4">
                    {chapters[activeChapter].category}
                  </p>
                </div>

                <p className="text-white/60 text-lg leading-relaxed max-w-md">
                  {chapters[activeChapter].description}
                </p>

                <ul className="grid grid-cols-1 gap-4 pt-4 border-t border-white/10">
                  {chapters[activeChapter].items.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="flex items-center gap-3 text-white/40 text-sm tracking-widest uppercase font-bold hover:text-[#D4AF77] transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF77] shadow-[0_0_8px_#D4AF77]" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
          {chapters.map((_, idx) => (
            <motion.div
              key={idx}
              animate={{ 
                scale: activeChapter === idx ? 1.5 : 1,
                backgroundColor: activeChapter === idx ? "#D4AF77" : "rgba(255,255,255,0.2)"
              }}
              className="w-2 h-2 rounded-full cursor-pointer transition-colors"
            />
          ))}
        </div>
      </div>

      {/* Spacer to create scroll length (6 stages * 100vh) */}
      <div className="h-[600vh]" />
    </section>
  );
}

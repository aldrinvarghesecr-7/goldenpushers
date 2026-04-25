'use client';

// ═══════════════════════════════════════════════════════════════
// THE REELS — Cinematic Portfolio Showcase
// Horizontal scroll carousel on desktop with video-on-hover.
// Clean vertical stack on mobile. GSAP-animated entrance.
// ═══════════════════════════════════════════════════════════════

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'TEMPLE SCALE',
    category: 'HERITAGE FILM',
    image: '/work/ig-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'INTIMATE FRAME',
    category: 'MODERN ROMANCE',
    image: '/work/ig-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'TROPICAL CUTS',
    category: 'COMMERCIAL AD',
    image: '/work/ig-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'BTS TECHNICAL',
    category: 'STUDIO GEAR',
    image: '/work/ig-4.jpg',
    fallback: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'GOLDEN HOUR',
    category: 'DESTINATION',
    image: '/work/ig-5.jpg',
    fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'CANDID JOY',
    category: 'PRIVATE EVENT',
    image: '/work/ig-6.jpg',
    fallback: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1200&auto=format&fit=crop',
  },
];

// ─── PROJECT CARD ───
function ProjectCard({ project, index, onClick }: { project: (typeof projects)[0]; index: number; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  const [imgSrc, setImgSrc] = useState(project.image);

  return (
    <motion.div
      className="group relative w-full md:w-[30vw] lg:w-[22vw] aspect-[3/4] flex-shrink-0 cursor-none snap-center"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      data-cursor-hover
      data-cursor-text="VIEW"
    >
      <motion.div
        layoutId={`project-${project.id}`}
        className="w-full h-full relative overflow-hidden rounded-sm"
        whileHover={{ y: -15, scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* Image */}
        <Image
          src={imgSrc}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 35vw"
          onError={() => setImgSrc(project.fallback)}
          className="object-cover transition-transform duration-[2s] group-hover:scale-110"
          quality={80}
          loading={index < 2 ? 'eager' : 'lazy'}
        />

        {/* Cinematic Frame */}
        <div className="absolute inset-0 border border-white/[0.03] group-hover:border-[#D4AF77]/30 m-5 md:m-8 transition-all duration-700 pointer-events-none" />

        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700" />

        {/* Content */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 right-8 z-10 transition-all duration-700 group-hover:translate-x-2">
          <p className="text-[#D4AF77] text-[9px] md:text-[10px] tracking-[0.5em] font-sans font-bold mb-3 uppercase transition-colors duration-500 group-hover:text-white">
            {project.category}
          </p>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black text-white uppercase tracking-tighter leading-none transition-colors duration-500 group-hover:text-[#D4AF77]">
            {project.title}
          </h3>
        </div>

        {/* Gold overlay on hover */}
        <div className="absolute inset-0 bg-[#D4AF77]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN REELS SECTION ───
export default function ReelsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setScrollProgress((scrollLeft / (scrollWidth - clientWidth)) * 100);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [selectedProject]);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const move = dir === 'left' ? -clientWidth * 0.6 : clientWidth * 0.6;
    scrollRef.current.scrollTo({ left: scrollLeft + move, behavior: 'smooth' });
  };

  return (
    <section id="work" className="py-24 md:py-40 relative overflow-hidden">
      {/* Background accent glow */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-[#D4AF77]/[0.03] blur-[100px] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/4" />

      {/* Header */}
      <div className="max-w-[90vw] mx-auto mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter text-white uppercase leading-none"
          >
            The <span className="text-[#D4AF77]">Reels</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mt-4 ml-1"
          >
            <div className="h-px w-12 bg-[#D4AF77]/40" />
            <p className="text-white/30 tracking-[0.4em] uppercase text-[10px] font-sans font-bold">
              Selected Works 2024
            </p>
          </motion.div>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => scroll('left')}
            className="group w-16 h-16 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:border-[#D4AF77]/40 hover:text-[#D4AF77] transition-all duration-500"
            aria-label="Previous"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="group w-16 h-16 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:border-[#D4AF77]/40 hover:text-[#D4AF77] transition-all duration-500"
            aria-label="Next"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Carousel: horizontal on desktop, vertical on mobile */}
      <div
        ref={scrollRef}
        className="flex flex-col md:flex-row gap-8 md:gap-12 px-6 md:px-[8vw] overflow-y-visible md:overflow-x-auto md:snap-x md:snap-mandatory scrollbar-hide py-8 relative z-10"
      >
        {projects.map((proj, i) => (
          <ProjectCard key={proj.id} project={proj} index={i} onClick={() => setSelectedProject(proj)} />
        ))}
        {/* End spacer for scroll */}
        <div className="hidden md:block min-w-[15vw] h-1 flex-shrink-0" />
      </div>

      {/* Progress Bar (Desktop) */}
      <div className="max-w-[80vw] mx-auto mt-16 hidden md:block">
        <div className="w-full h-px bg-white/5 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#D4AF77] shadow-[0_0_10px_rgba(212,175,119,0.4)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3 text-[9px] font-sans tracking-[0.3em] text-white/15 uppercase font-bold">
          <span>01</span>
          <span>0{projects.length}</span>
        </div>
      </div>

      {/* ─── FULLSCREEN LIGHTBOX MODAL ─── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8">
            {/* Dark Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
              data-cursor-hover
              data-cursor-text="CLOSE"
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="relative w-full max-w-xl aspect-[3/4] md:aspect-[3/4] rounded-sm overflow-hidden shadow-2xl bg-[#0A0A0A] border border-white/5"
            >
              {/* Image */}
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
                quality={100}
                priority
              />

              {/* Close Button (Top Right) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(null);
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 bg-black/40 hover:bg-black/80 backdrop-blur-md rounded-full text-white/50 hover:text-white transition-all border border-white/10 group"
                data-cursor-hover
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>

              {/* Info Overlay (Team Member Style) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 bg-black/40 backdrop-blur-md p-6 border border-white/5 rounded-sm z-10"
              >
                <p className="font-serif text-[#D4AF77] text-xs md:text-sm italic tracking-wider">
                  {selectedProject.category}
                </p>
                <h3 className="text-2xl md:text-3xl font-serif font-black text-white tracking-widest uppercase">
                  {selectedProject.title}
                </h3>
              </motion.div>
              
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

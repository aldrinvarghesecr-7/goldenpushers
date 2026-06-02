'use client';

// ═══════════════════════════════════════════════════════════════
// THE REELS — Cinematic Portfolio Showcase
// Modern production house gallery: wide 16:9 cards, viewfinder
// overlays (● REC, timecode, aperture). Dark background.
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
    timecode: '01:04:12:15',
    fstop: 'F/1.8',
    year: '2024',
  },
  {
    id: 2,
    title: 'INTIMATE FRAME',
    category: 'MODERN ROMANCE',
    image: '/work/ig-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=1200&auto=format&fit=crop',
    timecode: '02:18:05:22',
    fstop: 'F/2.0',
    year: '2024',
  },
  {
    id: 3,
    title: 'TROPICAL CUTS',
    category: 'COMMERCIAL AD',
    image: '/work/ig-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1200&auto=format&fit=crop',
    timecode: '03:45:11:04',
    fstop: 'F/2.8',
    year: '2024',
  },
  {
    id: 4,
    title: 'BTS TECHNICAL',
    category: 'STUDIO GEAR',
    image: '/work/ig-4.jpg',
    fallback: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
    timecode: '04:11:29:18',
    fstop: 'F/1.4',
    year: '2024',
  },
  {
    id: 5,
    title: 'GOLDEN HOUR',
    category: 'DESTINATION',
    image: '/work/ig-5.jpg',
    fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
    timecode: '05:08:44:09',
    fstop: 'F/4.0',
    year: '2024',
  },
  {
    id: 6,
    title: 'CANDID JOY',
    category: 'PRIVATE EVENT',
    image: '/work/ig-6.jpg',
    fallback: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1200&auto=format&fit=crop',
    timecode: '06:23:51:11',
    fstop: 'F/2.0',
    year: '2024',
  },
];

// ─── PROJECT CARD ───
function ProjectCard({ project, index, onClick }: { project: (typeof projects)[0]; index: number; onClick: () => void }) {
  const [imgSrc, setImgSrc] = useState(project.image);

  return (
    <motion.div
      className="group relative w-full md:w-[42vw] lg:w-[36vw] flex-shrink-0 snap-center cursor-none"
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      data-cursor-hover
      data-cursor-text="PLAY REEL"
    >
      {/* 16:9 Viewfinder Container */}
      <div className="w-full aspect-[16/9] relative overflow-hidden bg-[#0A0A0A]">
        <Image
          src={imgSrc}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => setImgSrc(project.fallback)}
          className="object-cover transition-transform duration-[2s] group-hover:scale-[1.04]"
          quality={80}
          loading={index < 2 ? 'eager' : 'lazy'}
        />

        {/* Viewfinder HUD */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none z-10 font-mono text-[8px] tracking-[0.08em] text-white/50">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-none">
              <motion.span
                animate={{ opacity: [1, 0.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-1.5 h-1.5 bg-[#8B1E1F] rounded-full inline-block"
              />
              <span className="text-white font-sans font-bold text-[8px] tracking-[0.2em]">REC</span>
            </div>
            <span className="bg-black/50 backdrop-blur-sm px-2 py-1 text-white/50">RAW 4K 24fps</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="bg-black/50 backdrop-blur-sm px-2 py-1">{project.timecode}</span>
            <span className="bg-black/50 backdrop-blur-sm px-2 py-1">{project.fstop}</span>
          </div>
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />

        {/* Crimson tint on hover */}
        <div className="absolute inset-0 bg-[#8B1E1F]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Meta row below */}
      <div className="flex items-baseline justify-between mt-4 px-0">
        <div className="flex items-baseline gap-4">
          <span className="text-[#8B1E1F]/50 text-[8px] tracking-[0.4em] font-sans font-bold uppercase">{project.category}</span>
          <h3 className="text-base md:text-lg font-serif font-black text-white/70 uppercase tracking-tight group-hover:text-white transition-colors duration-400">
            {project.title}
          </h3>
        </div>
        <span className="text-white/15 text-[9px] font-sans">{project.year}</span>
      </div>
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

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.history.pushState({ modalOpen: true }, '');
      const handlePopState = () => setSelectedProject(null);
      const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') window.history.back(); };
      window.addEventListener('popstate', handlePopState);
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [selectedProject]);

  const closeModal = () => { if (selectedProject) window.history.back(); };

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const move = dir === 'left' ? -scrollRef.current.clientWidth * 0.65 : scrollRef.current.clientWidth * 0.65;
    scrollRef.current.scrollTo({ left: scrollRef.current.scrollLeft + move, behavior: 'smooth' });
  };

  return (
    <section id="work" className="py-32 md:py-48 bg-[#111110] relative overflow-hidden">

      {/* Header */}
      <div className="max-w-[90vw] mx-auto mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-16"
        >
          <span className="text-[#8B1E1F] text-[9px] tracking-[0.6em] uppercase font-sans font-bold">Selected Works</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-white/15 text-[9px] tracking-[0.4em] font-sans hidden md:block">04 / Reels</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
            className="text-[13vw] sm:text-[10vw] md:text-[9vw] font-serif font-black tracking-[-0.05em] text-white uppercase leading-[0.9]"
          >
            The <span className="text-[#8B1E1F]">Reels</span>
          </motion.h2>

          {/* Navigation arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scroll('left')} className="group w-12 h-12 border border-white/10 flex items-center justify-center text-white/30 hover:border-[#8B1E1F]/50 hover:text-[#8B1E1F] transition-all duration-400" aria-label="Previous">
              <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button onClick={() => scroll('right')} className="group w-12 h-12 border border-white/10 flex items-center justify-center text-white/30 hover:border-[#8B1E1F]/50 hover:text-[#8B1E1F] transition-all duration-400" aria-label="Next">
              <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex flex-col md:flex-row gap-8 md:gap-6 px-[5vw] overflow-y-visible md:overflow-x-auto md:snap-x md:snap-mandatory scrollbar-hide py-4 relative z-10"
      >
        {projects.map((proj, i) => (
          <ProjectCard key={proj.id} project={proj} index={i} onClick={() => setSelectedProject(proj)} />
        ))}
        <div className="hidden md:block min-w-[8vw] h-1 flex-shrink-0" />
      </div>

      {/* Progress Bar */}
      <div className="max-w-[90vw] mx-auto mt-12 hidden md:block">
        <div className="w-full h-px bg-white/[0.06] relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 h-full bg-[#8B1E1F]" style={{ width: `${scrollProgress}%` }} />
        </div>
        <div className="flex justify-between mt-3 text-[8px] font-sans tracking-[0.4em] text-white/15 uppercase font-bold">
          <span>01</span>
          <span>0{projects.length}</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => { if (info.offset.y > 150 || info.velocity.y > 500) closeModal(); }}
              className="relative w-full max-w-4xl aspect-[16/10] overflow-hidden bg-[#0A0A0A] border border-white/5 touch-none"
            >
              <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" quality={100} priority />

              <button
                onClick={(e) => { e.stopPropagation(); closeModal(); }}
                className="absolute top-5 right-5 z-50 p-2 bg-black/60 hover:bg-[#8B1E1F] text-white/60 hover:text-white transition-all border border-white/10 group"
                data-cursor-hover
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-400" />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/95 to-transparent"
              >
                <p className="text-[#8B1E1F] text-[9px] tracking-[0.4em] font-sans font-bold uppercase mb-1">
                  {selectedProject.category} — {selectedProject.timecode}
                </p>
                <h3 className="text-2xl md:text-4xl font-serif font-black text-white tracking-tight uppercase">
                  {selectedProject.title}
                </h3>
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

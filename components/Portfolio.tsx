'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  { id: 1, title: 'TEMPLE SCALE', category: 'HERITAGE FILM', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop', video: 'https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-man-working-on-a-production-set-33824-large.mp4' },
  { id: 2, title: 'INTIMATE FRAME', category: 'MODERN ROMANCE', image: 'https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=1200&auto=format&fit=crop', video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-filming-a-sunset-with-her-camera-33827-large.mp4' },
  { id: 3, title: 'TROPICAL CUTS', category: 'COMMERCIAL AD', image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1200&auto=format&fit=crop', video: 'https://assets.mixkit.co/videos/preview/mixkit-professional-video-camera-on-a-production-set-33825-large.mp4' },
  { id: 4, title: 'BTS TECHNICAL', category: 'STUDIO GEAR', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop', video: 'https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-man-working-on-a-production-set-33824-large.mp4' },
];


function ProjectCard({ project, index }: { project: any, index: number }) {
    const [hover, setHover] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (hover) {
                videoRef.current.play().catch(() => {});
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [hover]);

    return (
        <motion.div 
            className="group relative w-full md:w-[75vw] lg:w-[45vw] h-[55vh] md:h-[75vh] flex-shrink-0 cursor-pointer overflow-visible snap-center md:snap-start lg:snap-center"
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
            <motion.div 
               className="w-full h-full relative overflow-hidden rounded-sm"
               whileHover={{ y: -25, scale: 1.02 }}
               transition={{ type: "spring", stiffness: 150, damping: 25 }}
            >
                {/* Fallback Image */}
                <img 
                    src={project.image} 
                    alt={project.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hover ? 'opacity-0' : 'opacity-70'}`}
                />
                
                {/* Video Playback */}
                <video 
                    ref={videoRef}
                    src={project.video}
                    loop 
                    muted 
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hover ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Cinematic Frame Overlay */}
                <div className="absolute inset-0 border-[1px] border-white/5 group-hover:border-accent/40 m-4 md:m-8 transition-all duration-700 pointer-events-none" />
                
                {/* Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Text Content */}
                <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 right-10 z-10 transition-all duration-700 group-hover:translate-x-3">
                    <p className="text-accent text-[9px] md:text-[11px] tracking-[0.5em] font-mono mb-3 uppercase opacity-90">{project.category}</p>
                    <h3 className="text-3xl md:text-6xl font-serif font-black text-white uppercase tracking-tighter leading-none max-w-min">
                        {project.title}
                    </h3>
                </div>

                {/* Gold Glow on Hover */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            </motion.div>
        </motion.div>
    );
}

export default function Portfolio() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const move = dir === 'left' ? -clientWidth * 0.7 : clientWidth * 0.7;
      scrollContainerRef.current.scrollTo({ left: scrollLeft + move, behavior: 'smooth' });
  };

  return (
    <section id="work" className="bg-black/50 py-24 md:py-48 relative overflow-hidden">
      {/* Background Accent Shadow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-accent/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-[90vw] mx-auto mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 relative z-10">
        <div className="space-y-4">
           <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">
             THE <span className="text-accent">REELS</span>
           </h2>
           <div className="flex items-center gap-4 ml-1 md:ml-2">
                <div className="h-px w-12 bg-accent/50" />
                <p className="text-white/40 tracking-[0.4em] uppercase text-[10px] md:text-xs font-mono font-bold">Selected Masterpieces 2024</p>
           </div>
        </div>
        
        {/* Navigation for Desktop */}
        <div className="hidden md:flex gap-6">
             <button 
                onClick={() => scroll('left')} 
                className="group w-20 h-20 rounded-full border border-white/5 flex items-center justify-center text-white/50 hover:border-accent hover:text-accent transition-all duration-500 glass"
             >
                 <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
             </button>
             <button 
                onClick={() => scroll('right')} 
                className="group w-20 h-20 rounded-full border border-white/5 flex items-center justify-center text-white/50 hover:border-accent hover:text-accent transition-all duration-500 glass"
             >
                 <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
             </button>
        </div>
      </div>

      {/* Main Container: Snap Carousel (Desktop) / Column (Mobile) */}
      <div 
        ref={scrollContainerRef}
        className="flex flex-col md:flex-row gap-12 md:gap-20 px-6 md:px-[10vw] overflow-y-visible md:overflow-x-auto md:snap-x md:snap-mandatory scrollbar-hide py-12 relative z-10"
      >
        {projects.map((proj, i) => (
           <ProjectCard key={proj.id} project={proj} index={i} />
        ))}
        {/* End Spacer */}
        <div className="hidden md:block min-w-[20vw] h-1" />
      </div>

      {/* Progress Bar (Desktop Only) */}
      <div className="max-w-[80vw] mx-auto mt-24 hidden md:block">
           <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
                <motion.div 
                    className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_rgba(206,169,0,0.5)]"
                    style={{ width: `${scrollProgress}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
           </div>
           <div className="flex justify-between mt-4 text-[10px] font-mono tracking-[0.3em] text-white/20 uppercase font-black">
                <span>Shift [01]</span>
                <span>Shift [04]</span>
           </div>
      </div>
    </section>
  );
}

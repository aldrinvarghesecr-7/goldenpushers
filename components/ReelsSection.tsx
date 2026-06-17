'use client';

// ═══════════════════════════════════════════════════════════════
// THE REELS — Redesigned Glassmorphic Portfolio Carousel & Menu
// ═══════════════════════════════════════════════════════════════

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Heart, MessageCircle, Instagram, Play, Pause, Volume2, VolumeX, Eye } from 'lucide-react';
import Image from 'next/image';

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'brand', label: 'Brand Films' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'stills', label: 'Editorial Stills' },
  { id: 'podcast', label: 'Podcasts' },
  { id: 'bts', label: 'Behind the Scenes' },
];

const instagramFeed = [
  {
    id: 1,
    type: 'reel',
    title: 'MAD++ Podcast: Episode 04',
    category: 'PODCAST PRODUCTION',
    catGroupId: 'podcast',
    image: '/work/ig-1.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-recording-a-podcast-in-a-studio-40306-large.mp4',
    likes: '1,248',
    comments: '64',
    views: '12.4k',
    caption: 'Directing and editing video for the Mad++ Podcast. Diving into startup life, developer flows, and tech stacks. Full clip on YouTube.',
    date: '2d ago',
    specs: { camera: 'Sony FX6', lens: 'Sony G-Master 24-70mm', format: '4K ProRes', color: 'Rec.709 S-Log3' }
  },
  {
    id: 2,
    type: 'reel',
    title: 'Monochrome Editorial Campaign',
    category: 'FASHION FILM',
    catGroupId: 'brand',
    image: '/work/ig-2.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-sunglasses-posing-for-a-photo-shoot-41584-large.mp4',
    likes: '2,104',
    comments: '112',
    views: '24.9k',
    caption: 'Stills and film from our monochrome study with @merin_monroe. Lighting is everything. Shot on Arri Alexa Mini LF.',
    date: '5d ago',
    specs: { camera: 'Arri Alexa Mini LF', lens: 'Cooke Anamorphic Primes', format: 'Open Gate 4.5K', color: 'Custom LUT (Monochrome)' }
  },
  {
    id: 3,
    type: 'post',
    title: 'Muted Linen Lookbook',
    category: 'EDITORIAL STILLS',
    catGroupId: 'stills',
    image: '/work/ig-3.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
    videoUrl: '', // static image
    likes: '954',
    comments: '38',
    views: '',
    caption: 'Frame studies from the Muted Linen campaign. Minimal palettes, organic textures, and natural light. Styled by @linda_styling.',
    date: '1w ago',
    specs: { camera: 'Phase One XF', lens: 'Schneider Kreuznach 80mm', format: '100MP TIFF', color: 'Capture One Warm Profile' }
  },
  {
    id: 4,
    type: 'reel',
    title: 'Kochi Startup Hub Campaign',
    category: 'BRAND FILM',
    catGroupId: 'brand',
    image: '/work/ig-4.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-editor-working-on-a-video-in-a-production-studio-40348-large.mp4',
    likes: '1,420',
    comments: '85',
    views: '16.2k',
    caption: 'Building corporate narratives. A short sneak peek into the brand film produced for Kochi\'s premium co-working hub.',
    date: '2w ago',
    specs: { camera: 'Red Komodo 6K', lens: 'DZOFilm Vespid Retro', format: '6K REDCODE RAW', color: 'DaVinci Wide Gamut' }
  },
  {
    id: 5,
    type: 'reel',
    title: 'Munnar Whispering Pines Wedding',
    category: 'WEDDING TEASER',
    catGroupId: 'wedding',
    image: '/work/ig-5.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-in-a-beautiful-garden-40234-large.mp4',
    likes: '3,842',
    comments: '241',
    views: '48.5k',
    caption: 'Dancing through the morning mist. A tiny teaser of Akhil & Divya\'s wedding story in Munnar. Cinematic film launching soon.',
    date: '3w ago',
    specs: { camera: 'Sony FX3 + FX6', lens: 'Sirui Anamorphic 50mm', format: '4K XAVC-I', color: 'S-Cinetone Grade' }
  },
  {
    id: 6,
    type: 'post',
    title: 'BTS: Arri Alexa Rig Setup',
    category: 'BEHIND THE SCENES',
    catGroupId: 'bts',
    image: '/work/ig-6.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=800&auto=format&fit=crop',
    videoUrl: '', // static image
    likes: '1,895',
    comments: '73',
    views: '',
    caption: 'Ready for action. Our Alexa setup loaded with Cooke Anamorphic prime lenses, prepped for the upcoming luxury campaign shoot.',
    date: '1m ago',
    specs: { camera: 'Arri Alexa Mini', lens: 'Cooke S4/i Prime', format: 'Rig Presentation', color: 'Production Reference' }
  }
];

function PortfolioCard({ 
  post, 
  index, 
  onClick 
}: { 
  post: (typeof instagramFeed)[0]; 
  index: number; 
  onClick: () => void 
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(post.image);

  useEffect(() => {
    if (post.type !== 'reel' || !videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, post.type]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-[290px] md:w-[330px] flex-shrink-0 snap-center cursor-none glass-premium hover:border-[#00E5FF]/40 p-4 transition-all duration-500 rounded-sm"
      data-cursor-hover
      data-cursor-text={post.type === 'reel' ? 'PLAY' : 'VIEW'}
    >
      {/* 4:5 Instagram Aspect Ratio Container */}
      <div className="w-full aspect-[4/5] relative overflow-hidden bg-[#070811] rounded-sm">
        {/* Cover Image */}
        <Image
          src={imgSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          onError={() => setImgSrc(post.fallbackImage)}
          className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1 mix-blend-luminosity group-hover:mix-blend-normal ease-[cubic-bezier(0.25,1,0.3,1)]"
          quality={85}
          loading="lazy"
        />

        {/* Hover Silent Autoplay Video */}
        {post.type === 'reel' && post.videoUrl && (
          <video
            ref={videoRef}
            src={post.videoUrl}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Hover Information Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-4">
          <div className="flex items-center gap-3 text-white/90 mb-2">
            <div className="flex items-center gap-1">
              <Heart size={14} className="text-red-500" fill="currentColor" />
              <span className="text-[11px] font-mono">{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={14} className="text-sky-400" fill="currentColor" />
              <span className="text-[11px] font-mono">{post.comments}</span>
            </div>
            {post.type === 'reel' && (
              <div className="flex items-center gap-1 ml-auto">
                <Eye size={12} className="text-[#00E5FF]" />
                <span className="text-[10px] font-mono text-[#00E5FF]">{post.views}</span>
              </div>
            )}
          </div>
          
          <p className="text-[10px] text-white/80 font-sans leading-relaxed line-clamp-2 italic">
            "{post.caption}"
          </p>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 right-3 z-30 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-white/60 group-hover:text-[#00E5FF] group-hover:border-[#00E5FF]/30 transition-all duration-300">
          <Instagram size={13} />
        </div>

        {post.type === 'reel' && !isHovered && (
          <div className="absolute bottom-3 right-3 z-30 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-sm text-[8px] font-mono text-white/60 flex items-center gap-1 border border-white/10">
            <Play size={7} fill="currentColor" /> REEL
          </div>
        )}
      </div>

      {/* Title Details Row */}
      <div className="mt-4 px-1">
        <span className="text-[#00E5FF]/60 text-[8px] tracking-[0.4em] font-sans font-bold uppercase block mb-1">
          {post.category}
        </span>
        <div className="flex justify-between items-baseline gap-4">
          <h3 className="text-xs md:text-sm font-display font-bold text-[#E8ECF4]/80 uppercase tracking-tight group-hover:text-[#00E5FF] transition-colors truncate">
            {post.title}
          </h3>
          <span className="text-[#5A6285] text-[9px] font-mono shrink-0">{post.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReelsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedPost, setSelectedPost] = useState<(typeof instagramFeed)[0] | null>(null);

  // sound and play controls
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isModalPlaying, setIsModalPlaying] = useState(true);
  const [isModalMuted, setIsModalMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);

  // Filter items
  const filteredFeed = instagramFeed.filter(
    (item) => selectedCategory === 'all' || item.catGroupId === selectedCategory
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const progress = scrollWidth - clientWidth > 0 ? (scrollLeft / (scrollWidth - clientWidth)) * 100 : 0;
      setScrollProgress(progress);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger scroll update on category change
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
      window.history.pushState({ modalOpen: true }, '');
      const handlePopState = () => setSelectedPost(null);
      const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') window.history.back(); };
      window.addEventListener('popstate', handlePopState);
      window.addEventListener('keydown', handleEsc);
      
      // Reset play states
      setIsModalPlaying(true);
      setIsModalMuted(false);
      
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [selectedPost]);

  const closeModal = () => { if (selectedPost) window.history.back(); };

  const handleModalPlayPause = () => {
    if (!modalVideoRef.current) return;
    if (isModalPlaying) {
      modalVideoRef.current.pause();
    } else {
      modalVideoRef.current.play().catch(() => {});
    }
    setIsModalPlaying(!isModalPlaying);
  };

  const handleModalMuteToggle = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !isModalMuted;
    setIsModalMuted(!isModalMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (modalVideoRef.current) {
      modalVideoRef.current.volume = v;
      modalVideoRef.current.muted = v === 0;
      setIsModalMuted(v === 0);
    }
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const move = dir === 'left' ? -scrollRef.current.clientWidth * 0.7 : scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollTo({ left: scrollRef.current.scrollLeft + move, behavior: 'smooth' });
  };

  return (
    <section id="work" className="py-24 md:py-36 bg-[#070814] relative overflow-hidden">
      {/* Background Accent Mesh */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vh] bg-[#00E5FF]/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vh] bg-[#8B5CF6]/[0.02] blur-[180px] rounded-full pointer-events-none" />

      {/* Header section */}
      <div className="max-w-[90vw] mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-16"
        >
          <span className="text-[#00E5FF] text-[9px] tracking-[0.6em] uppercase font-sans font-bold">Selected Work</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#00E5FF]/20 to-transparent" />
          <span className="text-[#5A6285] text-[9px] tracking-[0.4em] font-mono hidden md:block">04 / Portfolio</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="text-[13vw] sm:text-[10vw] md:text-[8vw] font-display font-bold tracking-[-0.03em] text-[#E8ECF4] uppercase leading-[0.9]"
            >
              The <span className="text-cyan-gradient">Reels</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[#5A6285] text-xs md:text-sm font-sans font-light mt-4 tracking-wide max-w-lg"
            >
              Step into the visual archive. Hover to preview clips from our Instagram <a href="https://instagram.com/goldenpushersproductions" target="_blank" rel="noopener noreferrer" className="text-[#00E5FF] hover:underline cursor-none" data-cursor-hover>@goldenpushers</a>.
            </motion.p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button 
              onClick={() => scroll('left')} 
              className="group w-12 h-12 border border-white/10 hover:border-[#00E5FF]/50 flex items-center justify-center text-white/50 hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] rounded-full transition-all duration-400 cursor-none" 
              aria-label="Previous posts"
              data-cursor-hover
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="group w-12 h-12 border border-white/10 hover:border-[#00E5FF]/50 flex items-center justify-center text-white/50 hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] rounded-full transition-all duration-400 cursor-none" 
              aria-label="Next posts"
              data-cursor-hover
            >
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* REDESIGNED: Glassmorphic Category Selector Menu */}
      <div className="max-w-[90vw] mx-auto mb-10 overflow-x-auto scrollbar-hide py-2">
        <div className="flex items-center gap-2 border border-white/[0.06] rounded-full p-1 bg-white/[0.02] backdrop-blur-md w-fit whitespace-nowrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-5 py-2 text-[9px] md:text-[10px] tracking-[0.25em] font-sans font-bold uppercase transition-all duration-300 rounded-full cursor-none`}
              data-cursor-hover
            >
              {/* Background Bubble */}
              {selectedCategory === cat.id && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-[#00E5FF]/15 border border-[#00E5FF]/30 rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className={`relative z-10 ${selectedCategory === cat.id ? 'text-[#00E5FF]' : 'text-[#5A6285] hover:text-[#E8ECF4]'}`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Carousel Snap-Track */}
      <div className="relative z-10 w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 px-[5vw] overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 relative z-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredFeed.map((post, i) => (
              <PortfolioCard key={post.id} post={post} index={i} onClick={() => setSelectedPost(post)} />
            ))}
          </AnimatePresence>

          {filteredFeed.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full min-h-[300px] text-[#5A6285] font-sans text-sm tracking-widest py-10 uppercase">
              No files currently matching category
            </div>
          )}

          {/* Carousel Spacing Buffer */}
          <div className="min-w-[5vw] h-1 flex-shrink-0" />
        </div>
      </div>

      {/* Progress Bar indicator */}
      <div className="max-w-[90vw] mx-auto mt-10">
        <div className="w-full h-[1px] bg-white/[0.06] relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" 
            animate={{ width: `${scrollProgress}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          />
        </div>
        <div className="flex justify-between mt-3 text-[8px] font-mono tracking-[0.4em] text-[#5A6285] uppercase font-bold">
          <span>01</span>
          <span className="text-[#00E5FF]">{filteredFeed.length} Items Listed</span>
          <span>06</span>
        </div>
      </div>

      {/* Immersive Instagram Lightbox Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 overflow-hidden bg-black/95 backdrop-blur-2xl">
            {/* Modal Backdrop overlay for close click */}
            <motion.div
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 cursor-none"
              data-cursor-hover
              data-cursor-text="CLOSE"
            />

            {/* Split Screen Media Modal container */}
            <motion.div
              layoutId={`instagram-${selectedPost.id}`}
              className="relative w-full max-w-5xl bg-[#090A13] border border-[#00E5FF]/20 grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-[0_0_60px_rgba(0,229,255,0.12)] max-h-[90dvh]"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 md:top-5 md:right-5 z-50 p-2 bg-black/60 hover:bg-[#00E5FF] text-white hover:text-[#0B0D1A] transition-all border border-white/10 rounded-full group cursor-none"
                data-cursor-hover
              >
                <X size={15} className="group-hover:rotate-90 transition-transform duration-400" />
              </button>

              {/* LEFT SIDE: Media Presentation */}
              <div className="relative md:col-span-7 bg-black flex items-center justify-center min-h-[280px] md:min-h-[500px] aspect-[4/5] md:aspect-auto">
                {selectedPost.type === 'reel' && selectedPost.videoUrl ? (
                  <div className="relative w-full h-full flex items-center justify-center group/video bg-[#030303]">
                    <video
                      ref={modalVideoRef}
                      src={selectedPost.videoUrl}
                      autoPlay
                      loop
                      playsInline
                      muted={isModalMuted}
                      className="w-full h-full object-contain max-h-[85vh]"
                      onClick={handleModalPlayPause}
                    />

                    {/* Custom Video Controls Overlay */}
                    <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-20 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 bg-black/70 p-3 rounded-sm border border-white/10 backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        {/* Play/Pause control */}
                        <button 
                          onClick={handleModalPlayPause} 
                          className="text-white hover:text-[#00E5FF] transition-colors cursor-none p-1"
                          data-cursor-hover
                        >
                          {isModalPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
                        </button>

                        {/* Mute toggle */}
                        <button 
                          onClick={handleModalMuteToggle} 
                          className="text-white hover:text-[#00E5FF] transition-colors cursor-none p-1"
                          data-cursor-hover
                        >
                          {isModalMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                        </button>

                        {/* Volume bar */}
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={isModalMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-16 md:w-24 accent-[#00E5FF] bg-white/20 h-0.5 rounded-lg cursor-none"
                          data-cursor-hover
                        />
                      </div>
                      
                      <span className="text-[8px] font-mono text-[#00E5FF] tracking-[0.2em] uppercase">
                        Cinema Audio
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      fill
                      className="object-contain"
                      quality={95}
                      priority
                    />
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: Cinema Details & Specifications */}
              <div className="md:col-span-5 flex flex-col justify-between p-6 md:p-8 bg-[#0b0c16] border-t md:border-t-0 md:border-l border-white/[0.06]">
                <div>
                  {/* Title Row */}
                  <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                    <div className="w-8 h-8 rounded-full border border-[#00E5FF]/20 flex items-center justify-center bg-[#111326] text-[#00E5FF] text-[10px] font-bold">
                      GP
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white tracking-wider flex items-center gap-1.5">
                        goldenpushers
                        <span className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full inline-block shadow-[0_0_5px_#00E5FF]" />
                      </h4>
                      <p className="text-[8px] font-sans text-[#5A6285] tracking-widest uppercase">Kochi, Kerala</p>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="py-5 overflow-y-auto max-h-[25vh] scrollbar-hide">
                    <span className="text-[#00E5FF]/70 text-[8px] font-mono tracking-[0.3em] font-bold block mb-2 uppercase">
                      {selectedPost.category}
                    </span>
                    <h3 className="text-base md:text-lg font-display font-bold text-white tracking-tight leading-tight uppercase mb-3">
                      {selectedPost.title}
                    </h3>
                    <p className="text-xs font-sans text-white/70 leading-relaxed font-light mb-4">
                      {selectedPost.caption}
                    </p>
                  </div>

                  {/* Director Spec Sheet Section */}
                  <div className="mt-2 pt-4 border-t border-white/5">
                    <span className="text-[#5A6285] text-[8px] tracking-[0.25em] font-mono font-bold block mb-3 uppercase">
                      TECHNICAL METADATA
                    </span>
                    <div className="grid grid-cols-2 gap-3 text-[9px] font-mono">
                      <div className="bg-[#111326]/40 p-2 border border-white/[0.04]">
                        <span className="text-[#5A6285] block text-[7px] tracking-wider uppercase mb-1">SYSTEM</span>
                        <span className="text-white font-medium truncate block">{selectedPost.specs.camera}</span>
                      </div>
                      <div className="bg-[#111326]/40 p-2 border border-white/[0.04]">
                        <span className="text-[#5A6285] block text-[7px] tracking-wider uppercase mb-1">OPTICS</span>
                        <span className="text-white font-medium truncate block">{selectedPost.specs.lens}</span>
                      </div>
                      <div className="bg-[#111326]/40 p-2 border border-white/[0.04]">
                        <span className="text-[#5A6285] block text-[7px] tracking-wider uppercase mb-1">CAPTURE</span>
                        <span className="text-white font-medium truncate block">{selectedPost.specs.format}</span>
                      </div>
                      <div className="bg-[#111326]/40 p-2 border border-white/[0.04]">
                        <span className="text-[#5A6285] block text-[7px] tracking-wider uppercase mb-1">COLOR WORK</span>
                        <span className="text-white font-medium truncate block">{selectedPost.specs.color}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer (likes & CTA) */}
                <div className="pt-4 border-t border-white/5 mt-6">
                  <div className="flex items-center justify-between text-xs text-[#5A6285] mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-white">
                        <Heart size={13} className="text-red-500" fill="currentColor" />
                        <span className="font-mono text-xs">{selectedPost.likes}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-white">
                        <MessageCircle size={13} className="text-sky-400" fill="currentColor" />
                        <span className="font-mono text-xs">{selectedPost.comments}</span>
                      </span>
                    </div>
                    <span className="font-mono text-[9px]">{selectedPost.date}</span>
                  </div>

                  {/* View on Instagram CTA */}
                  <a
                    href="https://instagram.com/goldenpushersproductions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#090A13] text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300 cursor-none"
                    data-cursor-hover
                  >
                    <Instagram size={13} />
                    <span>View Post on Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

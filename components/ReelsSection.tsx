'use client';

// ═══════════════════════════════════════════════════════════════
// REELS / WORK SECTION — Instagram Grid System + Reel Cover System
//
// 3-Column Structure:
//   Col 1 — Featured Projects
//   Col 2 — Behind The Scenes
//   Col 3 — Story Frames (editorial quotes)
//
// Reel Cover System:
//   Top-Left: GP
//   Center:   Project Name
//   Bottom:   Location • Year
// ═══════════════════════════════════════════════════════════════

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Instagram } from 'lucide-react';
import Image from 'next/image';

// ─── Grid Types ───────────────────────────────────────────────
type ColType = 'featured' | 'bts' | 'story';

interface GridItem {
  id: number;
  colType: ColType;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  videoUrl?: string;
  quote?: string;
  caption: string;
  specs?: { camera: string; format: string };
}

// ─── Grid Data ────────────────────────────────────────────────
const gridItems: GridItem[] = [
  // Row 1
  {
    id: 1, colType: 'featured',
    title: 'Summer Brand Campaign', category: 'Commercial Film',
    location: 'KOCHI', year: '2026',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-editor-working-on-a-video-in-a-production-studio-40348-large.mp4',
    caption: 'A 60-second commercial produced for a Kochi-based lifestyle brand. Warm palettes, natural light, and deliberate pacing.',
    specs: { camera: 'Sony FX6', format: '4K ProRes' },
  },
  {
    id: 2, colType: 'bts',
    title: 'Lighting Setup — Product Shoot', category: 'Behind The Scenes',
    location: 'THRISSUR', year: '2026',
    image: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=800&auto=format&fit=crop',
    caption: 'Three-point setup built for our muted linen product campaign. Natural light supplemented with Aputure 600D.',
    specs: { camera: 'Phase One XF', format: '100MP TIFF' },
  },
  {
    id: 3, colType: 'story',
    title: 'On Storytelling', category: 'Studio Thought',
    location: 'STUDIO', year: '2026',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop',
    quote: '"Stories are remembered longer than advertisements."',
    caption: 'The reason we frame every project as a story — not a deliverable.',
  },

  // Row 2
  {
    id: 4, colType: 'featured',
    title: 'Akhil & Divya Wedding Film', category: 'Wedding Film',
    location: 'MUNNAR', year: '2025',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-in-a-beautiful-garden-40234-large.mp4',
    caption: 'Cinematic wedding film for Akhil & Divya. Morning mist, soft light, and two people in their truest moment.',
    specs: { camera: 'Arri Alexa Mini LF', format: 'Open Gate 4.5K' },
  },
  {
    id: 5, colType: 'bts',
    title: 'Camera Rig — Brand Film', category: 'Behind The Scenes',
    location: 'KOCHI', year: '2025',
    image: 'https://images.unsplash.com/photo-1574717024458-868582236a39?q=80&w=800&auto=format&fit=crop',
    caption: 'Gimbal rig assembly for the Corporate Campus film. Movi Pro with Tilta wireless follow focus.',
    specs: { camera: 'Red Komodo 6K', format: '6K REDCODE RAW' },
  },
  {
    id: 6, colType: 'story',
    title: 'On Attention', category: 'Brand Philosophy',
    location: 'STUDIO', year: '2026',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
    quote: '"Attention is earned. Every frame must justify its presence."',
    caption: 'Our editing philosophy — cut anything that doesn\'t serve the story.',
  },

  // Row 3
  {
    id: 7, colType: 'featured',
    title: 'MAD++ Podcast — Season 02', category: 'Podcast Production',
    location: 'KOCHI', year: '2026',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-recording-a-podcast-in-a-studio-40306-large.mp4',
    caption: 'Three-camera podcast production for the MAD++ series. Natural light studio, clean sound design.',
    specs: { camera: 'Sony FX3 ×3', format: '4K XAVC-I' },
  },
  {
    id: 8, colType: 'bts',
    title: 'Production Crew at Work', category: 'Behind The Scenes',
    location: 'KOZHIKODE', year: '2025',
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=800&auto=format&fit=crop',
    caption: 'Full crew of eight for the Vistara Campaign. Everyone with a role. No wasted motion.',
    specs: { camera: 'Canon EOS R5', format: '8K RAW Light' },
  },
  {
    id: 9, colType: 'story',
    title: 'On Value', category: 'Creative Direction',
    location: 'STUDIO', year: '2025',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    quote: '"Emotion creates value. Design creates recall."',
    caption: 'Why we approach every project as a combination of feeling and architecture.',
  },
];

// ─── Column config ───────────────────────────────────────────
const COL_CONFIG: Record<ColType, { label: string; accent: string; border: string }> = {
  featured: { label: 'Featured Projects', accent: '#39463A', border: '#39463A' },
  bts:      { label: 'Behind The Scenes', accent: '#A66B45', border: '#A66B45' },
  story:    { label: 'Story Frames',      accent: '#9B9B9B', border: '#C8C2B8' },
};

// ─── Reel Cover Overlay ──────────────────────────────────────
function ReelCover({ item }: { item: GridItem }) {
  if (item.colType === 'story') return null;
  return (
    <div className="reel-cover">
      {/* Top row — GP badge */}
      <div className="flex items-start justify-between">
        <span className="reel-gp">GP</span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '8px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(248,244,238,0.55)',
          }}
        >
          {item.category}
        </span>
      </div>

      {/* Center — Project Name */}
      <div className="flex flex-col items-center text-center">
        <span className="reel-title">{item.title}</span>
      </div>

      {/* Bottom — Location • Year */}
      <div className="flex justify-center">
        <span className="reel-meta">{item.location} • {item.year}</span>
      </div>
    </div>
  );
}

// ─── Story Frame Card ────────────────────────────────────────
function StoryCard({ item, onClick }: { item: GridItem; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      onClick={onClick}
      data-cursor-hover
      data-cursor-text="READ"
      className="relative aspect-square bg-[#F0EAE0] border border-[#C8C2B8]/40 flex flex-col justify-between p-6 cursor-none group hover:border-[#C8C2B8] transition-all duration-400"
    >
      {/* Eyebrow */}
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '8px',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#9B9B9B',
        }}
      >
        {item.category}
      </span>

      {/* Quote */}
      <blockquote
        className="flex-1 flex items-center"
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(16px, 1.8vw, 22px)',
          fontWeight: 300,
          lineHeight: 1.35,
          color: '#1E1E1E',
          letterSpacing: '-0.005em',
        }}
      >
        {item.quote}
      </blockquote>

      {/* Bottom — thin rule + label */}
      <div className="flex items-center gap-3">
        <div className="w-4 h-px bg-[#C8C2B8] group-hover:w-8 group-hover:bg-[#39463A] transition-all duration-400" />
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '8px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#9B9B9B',
          }}
        >
          {item.year}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Portfolio Card ─────────────────────────────────────
function PortfolioCard({ item, onClick }: { item: GridItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!videoRef.current || !item.videoUrl) return;
    if (hovered) videoRef.current.play().catch(() => {});
    else { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  }, [hovered, item.videoUrl]);

  if (item.colType === 'story') {
    return <StoryCard item={item} onClick={onClick} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      data-cursor-hover
      data-cursor-text={item.videoUrl ? 'PLAY' : 'VIEW'}
      className="relative aspect-square overflow-hidden cursor-none group"
    >
      {/* Cover image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover image-editorial group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        quality={85}
      />

      {/* Video on hover */}
      {item.videoUrl && (
        <video
          ref={videoRef}
          src={item.videoUrl}
          muted loop playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Reel Cover System Overlay */}
      <div className="z-20 absolute inset-0">
        <ReelCover item={item} />
      </div>

      {/* Hover detail layer */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 right-0 z-30 p-5 bg-gradient-to-t from-[#1E1E1E]/85 to-transparent"
      >
        {item.specs && (
          <div className="flex items-center gap-3 mb-1">
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '8px',
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(248,244,238,0.6)',
              }}
            >
              {item.specs.camera} — {item.specs.format}
            </span>
          </div>
        )}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 300,
            color: 'rgba(248,244,238,0.85)',
            lineHeight: 1.5,
          }}
          className="line-clamp-2"
        >
          {item.caption}
        </p>
      </motion.div>

      {/* Play indicator */}
      {item.videoUrl && !hovered && (
        <div className="absolute top-4 right-4 z-30 w-7 h-7 border border-[rgba(248,244,238,0.4)] flex items-center justify-center">
          <Play size={10} fill="rgba(248,244,238,0.8)" color="rgba(248,244,238,0.8)" />
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────
export default function ReelsSection() {
  const [selectedItem, setSelectedItem] = useState<GridItem | null>(null);
  const [filter, setFilter] = useState<ColType | 'all'>('all');
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const filtered = filter === 'all' ? gridItems : gridItems.filter(i => i.colType === filter);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedItem(null); };
      window.addEventListener('keydown', esc);
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
    }
  }, [selectedItem]);

  return (
    <section id="work" className="relative py-24 md:py-40 bg-[#F8F4EE] overflow-hidden">
      <div className="max-w-[90vw] mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-16 md:mb-20"
        >
          <span className="label-olive">Selected Work</span>
          <div className="h-px flex-1 bg-[#C8C2B8]/60" />
          <span className="label-editorial hidden md:block">04 / Portfolio</span>
        </motion.div>

        {/* Title + filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
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
            The{' '}
            <em style={{ color: '#39463A', fontStyle: 'italic' }}>Work</em>
          </motion.h2>

          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {(['all', 'featured', 'bts', 'story'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor-hover
                className="px-4 py-2 border transition-all duration-300 cursor-none"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  background: filter === f ? '#39463A' : 'transparent',
                  borderColor: filter === f ? '#39463A' : '#C8C2B8',
                  color: filter === f ? '#F8F4EE' : '#6F6F6F',
                }}
              >
                {f === 'all' ? 'All' : f === 'featured' ? 'Projects' : f === 'bts' ? 'BTS' : 'Story Frames'}
              </button>
            ))}
          </div>
        </div>

        {/* Column type labels */}
        <div className="hidden md:grid grid-cols-3 gap-px mb-1">
          {(['featured', 'bts', 'story'] as ColType[]).map(col => (
            <div
              key={col}
              className="px-1 pb-2 flex items-center gap-2"
              style={{ borderBottom: `2px solid ${COL_CONFIG[col].border}` }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '8px',
                  fontWeight: 500,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: COL_CONFIG[col].accent,
                }}
              >
                {COL_CONFIG[col].label}
              </span>
            </div>
          ))}
        </div>

        {/* Instagram 3-column grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-px bg-[#C8C2B8]/30 ${
              filter === 'all' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
            }`}
          >
            {filtered.map(item => (
              <div key={item.id} className="bg-[#F8F4EE]">
                <PortfolioCard item={item} onClick={() => setSelectedItem(item)} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-between border-t border-[#C8C2B8]/40 pt-8"
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 300,
              color: '#9B9B9B',
            }}
          >
            More work available on Instagram
          </span>
          <a
            href="https://instagram.com/goldenpushersproductions"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="flex items-center gap-2 btn-olive cursor-none"
          >
            <Instagram size={13} strokeWidth={1.5} />
            <span>@goldenpushersproductions</span>
          </a>
        </motion.div>
      </div>

      {/* ─── Detail Modal ─── */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[#1E1E1E]/80 backdrop-blur-sm"
              data-cursor-hover
              data-cursor-text="CLOSE"
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#F8F4EE] flex flex-col md:flex-row overflow-hidden max-h-[90dvh]"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 w-8 h-8 border border-[#C8C2B8] flex items-center justify-center bg-[#F8F4EE] hover:bg-[#39463A] hover:border-[#39463A] transition-all duration-300 group"
                data-cursor-hover
              >
                <X size={14} strokeWidth={1.5} className="text-[#6F6F6F] group-hover:text-[#F8F4EE]" />
              </button>

              {/* Media */}
              <div className="relative w-full md:w-[52%] aspect-square md:aspect-auto overflow-hidden bg-[#1E1E1E] shrink-0">
                {selectedItem.videoUrl && selectedItem.colType !== 'story' ? (
                  <video
                    ref={modalVideoRef}
                    src={selectedItem.videoUrl}
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image src={selectedItem.image} alt={selectedItem.title} fill className="object-cover image-editorial" quality={90} priority />
                )}
                {/* Reel cover on modal */}
                {selectedItem.colType !== 'story' && (
                  <div className="absolute inset-0 z-10">
                    <ReelCover item={selectedItem} />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#C8C2B8]/40">
                    <div
                      className="w-7 h-7 border border-[#C8C2B8] flex items-center justify-center"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: '#39463A',
                      }}
                    >
                      GP
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '10px',
                          fontWeight: 500,
                          letterSpacing: '0.1em',
                          color: '#1E1E1E',
                        }}
                      >
                        goldenpushers
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '8px',
                          fontWeight: 400,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: '#9B9B9B',
                        }}
                      >
                        {selectedItem.location}
                      </p>
                    </div>
                  </div>

                  <span
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '9px',
                      fontWeight: 500,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: '#A66B45',
                    }}
                  >
                    {selectedItem.category}
                  </span>

                  <h3
                    className="mb-4"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(22px, 3vw, 32px)',
                      fontWeight: 300,
                      letterSpacing: '-0.01em',
                      color: '#1E1E1E',
                      lineHeight: 1.15,
                    }}
                  >
                    {selectedItem.title}
                  </h3>

                  {selectedItem.colType === 'story' && selectedItem.quote && (
                    <blockquote
                      className="mb-4 border-accent-olive"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(16px, 1.8vw, 20px)',
                        fontWeight: 300,
                        color: '#39463A',
                        lineHeight: 1.4,
                      }}
                    >
                      {selectedItem.quote}
                    </blockquote>
                  )}

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 300,
                      color: '#6F6F6F',
                      lineHeight: 1.8,
                    }}
                  >
                    {selectedItem.caption}
                  </p>

                  {selectedItem.specs && (
                    <div className="mt-6 pt-5 border-t border-[#C8C2B8]/40 grid grid-cols-2 gap-4">
                      {[
                        { label: 'Camera', value: selectedItem.specs.camera },
                        { label: 'Format', value: selectedItem.specs.format },
                        { label: 'Location', value: selectedItem.location },
                        { label: 'Year', value: selectedItem.year },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B9B9B' }}>
                            {label}
                          </p>
                          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 400, color: '#1E1E1E', marginTop: '2px' }}>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href="https://instagram.com/goldenpushersproductions"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="mt-8 w-full flex items-center justify-center gap-2 btn-copper cursor-none"
                >
                  <Instagram size={13} strokeWidth={1.5} />
                  <span>View on Instagram</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

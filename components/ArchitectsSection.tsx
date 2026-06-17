'use client';

// ═══════════════════════════════════════════════════════════════
// THE ARCHITECTS — The Cast Reveal
// Cinematic team showcase with dramatic hover states and modals.
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

const team = [
  { id: 1, name: 'AVRIL JOHN VARGHESE', role: 'Founder', bio: 'Visionary architect of cinematic experiences.', image: '/team/founder.jpg', fallback: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop', attribute: { key: 'Visual Range', value: '120mm' } },
  { id: 2, name: 'JERRY ABRAHAM JOHNSON', role: 'Co-Founder / Creative Director', bio: 'Strategic partner in creative excellence.', image: '/team/co-founder.jpg', fallback: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop', attribute: { key: 'Focus Depth', value: 'f/1.2' } },
  { id: 3, name: 'DANISH MACKENZIE', role: 'DOP', bio: 'Master of light and cinematic rhythm.', image: '/team/danish.jpg', fallback: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', attribute: { key: 'Optics System', value: 'Anamorphic' } },
  { id: 4, name: 'BHANUNNI', role: 'Creativity Director', bio: 'Turning abstract concepts into cinematic gold.', image: '/team/bhanunni.jpg', fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', attribute: { key: 'Motion Speed', value: '120 fps' } },
  { id: 5, name: 'ARJUNAN', role: 'DOP', bio: 'Every frame is a tribute to cinematic truth.', image: '/team/arjunan.jpg', fallback: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=800&auto=format&fit=crop', attribute: { key: 'ISO Sensitivity', value: 'Dual Native' } },
  { id: 6, name: 'JYOTHI PRAKASH', role: 'Designer', bio: 'Visual architect crafting the layout of dreams.', image: '/team/jyothi.jpg', fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop', attribute: { key: 'Aperture Range', value: 'F1.4–F22' } },
];

function TeamRow({ member, index, onClick }: { member: (typeof team)[0]; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(member.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-center justify-between py-7 border-b border-[#00E5FF]/[0.06] cursor-none"
      data-cursor-hover
      data-cursor-text="DOSSIER"
    >
      {/* Index */}
      <span className="text-[#00E5FF]/30 font-mono font-bold text-sm tracking-[0.2em] w-12 shrink-0 group-hover:text-[#00E5FF] transition-colors duration-300">
        0{member.id}
      </span>

      {/* Name */}
      <h3 className="flex-1 text-xl md:text-3xl lg:text-4xl font-display font-bold text-[#E8ECF4]/60 uppercase tracking-tight group-hover:text-white transition-colors duration-300">
        {member.name}
      </h3>

      {/* Role */}
      <span className="text-[#5A6285] text-xs tracking-[0.3em] uppercase font-sans hidden md:block w-48 text-right group-hover:text-[#E8ECF4]/50 transition-colors duration-300 shrink-0">
        {member.role}
      </span>

      {/* Hover portrait */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, rotate: -4, scale: 1 }}
            exit={{ opacity: 0, x: 40, rotate: 10, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="absolute right-64 top-1/2 -translate-y-1/2 w-24 h-32 overflow-hidden z-20 pointer-events-none hidden lg:block border border-[#D4AF77]/30 shadow-[0_15px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(212,175,119,0.1)] rounded-sm"
          >
            <Image src={imgSrc} alt={member.name} fill className="object-cover object-top mix-blend-luminosity scale-110 group-hover:scale-100 transition-all duration-700" onError={() => setImgSrc(member.fallback)} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-[#D4AF77]/10 mix-blend-color z-15" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow indicator */}
      <motion.div
        animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-[#00E5FF] text-xs tracking-[0.3em] font-sans font-bold shrink-0 ml-6 hidden md:block"
      >
        VIEW →
      </motion.div>
    </motion.div>
  );
}

export default function ArchitectsSection() {
  const [selectedMember, setSelectedMember] = useState<(typeof team)[0] | null>(null);

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
      window.history.pushState({ modalOpen: true }, '');
      const handlePopState = () => setSelectedMember(null);
      const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') window.history.back(); };
      window.addEventListener('popstate', handlePopState);
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [selectedMember]);

  const closeModal = () => { if (selectedMember) window.history.back(); };

  return (
    <>
      <section id="team" className="relative w-full py-32 md:py-48 bg-[#0F1128] overflow-hidden">
        <div className="absolute inset-0 film-perforations opacity-30 pointer-events-none w-8 left-4" />
        <div className="absolute inset-0 film-perforations opacity-30 pointer-events-none w-8 right-4" />

        <div className="max-w-[90vw] mx-auto">
          {/* Section label row */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16"
          >
            <span className="text-[#00E5FF] text-[9px] tracking-[0.6em] uppercase font-sans font-bold">The Team</span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00E5FF]/20 to-transparent" />
            <span className="text-[#5A6285] text-[9px] tracking-[0.4em] font-mono hidden md:block">05 / Architects</span>
          </motion.div>

          {/* Heading + sub-text */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] sm:text-[10vw] md:text-[9vw] font-display font-bold text-[#E8ECF4] uppercase tracking-[-0.03em] leading-[0.9] cursor-default"
            >
              The <span className="text-cyan-gradient">Architects</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-sans text-[#5A6285] text-sm max-w-xs text-left md:text-right font-light leading-relaxed shrink-0"
            >
              World-class talent strictly curated for the pursuit of visual perfection.
            </motion.p>
          </div>

          {/* Top border */}
          <div className="w-full h-px bg-[#00E5FF]/[0.06]" />

          {/* Team Rows */}
          <div>
            {team.map((member, i) => (
              <TeamRow key={member.id} member={member} index={i} onClick={() => setSelectedMember(member)} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-auto p-4 md:p-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#0B0D1A]/95 backdrop-blur-xl"
              data-cursor-hover
              data-cursor-text="CLOSE"
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#090a13]/85 backdrop-blur-2xl overflow-hidden flex flex-col md:flex-row border border-[#00E5FF]/20 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(0,229,255,0.05)]"
            >
              <button
                onClick={(e) => { e.stopPropagation(); closeModal(); }}
                className="absolute top-5 right-5 z-[100] p-2 bg-black/60 hover:bg-[#00E5FF] text-white/60 hover:text-[#0B0D1A] transition-all border border-[#00E5FF]/20 group"
                data-cursor-hover
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-400" />
              </button>

              {/* Portrait */}
              <div className="relative w-full md:w-[40%] aspect-[4/5] md:aspect-auto md:min-h-[500px] overflow-hidden bg-[#0B0D1A] shrink-0">
                <ModalImage src={selectedMember.image} fallback={selectedMember.fallback} alt={selectedMember.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a13] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#090a13] opacity-90" />
              </div>

              {/* Content */}
              <div className="flex-1 p-8 md:p-14 flex flex-col justify-center">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <span className="text-[#00E5FF] text-[10px] tracking-[0.4em] uppercase font-mono font-medium block mb-4">
                    {selectedMember.attribute.key}: {selectedMember.attribute.value}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-display font-bold text-[#E8ECF4] uppercase tracking-tight leading-none mb-3">
                    {selectedMember.name}
                  </h3>
                  <p className="text-[#8B5CF6] font-sans text-sm tracking-[0.2em] uppercase font-bold mb-8">
                    {selectedMember.role}
                  </p>
                  <div className="w-8 h-[2px] bg-[#00E5FF] mb-8 shadow-[0_0_8px_#00E5FF]" />
                  <div className="text-[#5A6285] font-sans font-light leading-relaxed text-sm space-y-4">
                    <p className="text-[#E8ECF4]/80">{selectedMember.bio}</p>
                    <p>
                      With an unwavering commitment to cinematic truth, {selectedMember.name.split(' ')[0]} brings a unique perspective to every frame. Their approach transcends traditional production, architecting moments that resonate on a visceral level and defining the Golden Pushers standard of visual excellence.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ModalImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => { setImgSrc(src); }, [src]);
  return <Image src={imgSrc} alt={alt} fill className="object-cover object-top mix-blend-luminosity" quality={100} priority onError={() => setImgSrc(fallback)} />;
}

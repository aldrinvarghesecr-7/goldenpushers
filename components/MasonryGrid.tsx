'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/projects';
import dynamic from 'next/dynamic';
import TiltCard from './TiltCard';

const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });

const categories = ['All', 'Wedding Storytelling', 'Portraits', 'Corporate Productions', 'Private Events'] as const;

export default function MasonryGrid() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Wedding Storytelling' | 'Portraits' | 'Corporate Productions' | 'Private Events'>('All');
  const [lightbox, setLightbox] = useState<{ image: string; title: string } | null>(null);

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <div className="flex justify-center gap-8 mb-16 flex-wrap">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveFilter(cat)} className={`text-sm tracking-widest pb-2 border-b-2 transition-all ${activeFilter === cat ? 'border-accent text-accent' : 'border-transparent text-text-secondary hover:text-white'}`}>{cat}</button>
        ))}
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto px-8">
        <AnimatePresence mode="wait">
          {filtered.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ delay: i * 0.04 }} className="mb-6 break-inside-avoid">
              <TiltCard>
                <Link href={`/work/${p.slug}`} className="group block relative">
                  <motion.div layoutId={`image-${p.slug}`} className="relative overflow-hidden cursor-pointer">
                    <Image src={p.heroImage} alt={p.title} width={800} height={1200} className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-colors duration-300 pointer-events-none" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-center bg-black/40">
                      <p className="text-accent tracking-[4px] uppercase text-[10px] font-semibold mb-2">Featuring</p>
                      <h3 className="font-serif text-3xl text-white tracking-widest uppercase">{p.title}</h3>
                      <div className="h-px w-8 bg-accent/50 my-4" />
                      <p className="text-white/90 text-xs tracking-widest uppercase">{p.shortDesc}</p>
                    </div>
                  </motion.div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Lightbox isOpen={!!lightbox} onClose={() => setLightbox(null)} image={lightbox?.image || ''} title={lightbox?.title || ''} />
    </>
  );
}
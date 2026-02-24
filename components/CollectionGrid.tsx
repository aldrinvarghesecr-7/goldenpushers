'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/projects';
import dynamic from 'next/dynamic';
import TiltCard from './TiltCard';

const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });

const categories = ['All', 'Landscapes', 'Portraits', 'Urban'] as const;

export default function MasonryGrid() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Landscapes' | 'Portraits' | 'Urban'>('All');
  const [lightbox, setLightbox] = useState<{ image: string; title: string } | null>(null);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex justify-center gap-8 mb-16 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`text-sm tracking-widest pb-2 border-b-2 transition-all ${
              activeFilter === cat
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto px-8">
        <AnimatePresence mode="wait">
          {filteredProjects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ delay: i * 0.04 }}
              className="mb-6 break-inside-avoid group"
            >
              <TiltCard>
                <Link href={`/work/${p.slug}`}>
                  <motion.div
                    layoutId={`image-${p.slug}`}
                    className="relative overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={p.heroImage}
                      alt={p.title}
                      width={800}
                      height={1200}
                      className="w-full transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </Link>
              </TiltCard>

              <Link href={`/work/${p.slug}`} className="block mt-6 group">
                <h3 className="font-serif text-3xl group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="text-text-secondary mt-1 text-sm tracking-wide">
                  {p.shortDesc}
                </p>
                <span className="text-accent text-sm mt-2 block">{p.year}</span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Lightbox
        isOpen={!!lightbox}
        onClose={() => setLightbox(null)}
        image={lightbox?.image || ''}
        title={lightbox?.title || ''}
      />
    </>
  );
}
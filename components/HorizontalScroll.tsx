'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function HorizontalScroll() {
  return (
    <div className="overflow-hidden py-12 bg-section-alt">
      <div className="flex gap-8 px-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {projects.map((p, i) => (
          <Link key={i} href={`/work/${p.slug}`} className="flex-shrink-0 w-[85vw] md:w-[620px] snap-start group relative">
            <div className="relative aspect-[16/7] md:aspect-[21/9] overflow-hidden">
              <Image src={p.heroImage} alt={p.title} fill className="object-cover origin-center transform-gpu will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]" sizes="(max-width: 768px) 85vw, 620px" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                <p className="text-accent tracking-[6px] uppercase text-xs font-semibold mb-4">Starring</p>
                <h3 className="font-serif text-5xl md:text-6xl text-white tracking-widest uppercase">{p.title}</h3>
                <div className="h-px w-12 bg-accent/50 my-6" />
                <p className="text-white/80 tracking-widest uppercase text-sm font-medium">{p.year} • {p.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
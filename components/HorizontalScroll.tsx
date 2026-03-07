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
              <Image src={p.heroImage} alt={p.title} fill className="object-cover transition-transform group-hover:scale-[1.04] duration-300 ease-out" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-300" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="font-serif text-5xl text-white">{p.title}</h3>
              <p className="text-text-secondary mt-2 tracking-widest uppercase text-sm font-medium">{p.year} • {p.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
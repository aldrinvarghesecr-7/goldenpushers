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
          <Link key={i} href={`/work/${p.slug}`} className="flex-shrink-0 w-[85vw] md:w-[620px] snap-start group">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={p.heroImage} alt={p.title} fill className="object-cover transition-transform group-hover:scale-105 duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            <div className="mt-6">
              <h3 className="font-serif text-4xl group-hover:text-accent transition-colors">{p.title}</h3>
              <p className="text-text-secondary mt-2">{p.year} • {p.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
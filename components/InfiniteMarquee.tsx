'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';

export default function InfiniteMarquee() {
  return (
    <div className="py-20 border-y border-white/10 overflow-hidden bg-primary">
      <motion.div 
        animate={{ x: [0, -50 + "%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-24"
      >
        {[...siteConfig.logos, ...siteConfig.logos].map((logo, i) => (
          <div key={i} className="flex-shrink-0 h-8 opacity-40 hover:opacity-80 transition-opacity">
            <Image src={logo} alt="Featured in" width={180} height={32} className="h-full w-auto" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
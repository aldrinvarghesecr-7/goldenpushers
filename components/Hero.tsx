'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from './Button';
import { siteConfig } from '@/lib/config';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <motion.div style={{ y }} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=95')] bg-cover opacity-40" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }} className="text-[88px] md:text-[128px] leading-none font-serif tracking-[-4px] mb-6">{siteConfig.title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.8, ease: [0.23, 1, 0.32, 1] }} className="text-2xl md:text-3xl text-text-secondary tracking-[6px] mb-12">{siteConfig.tagline}</motion.p>
        <Button href="/work" variant="primary">ENTER THE WORK</Button>
      </div>
    </div>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FilmGrain() {
    const [mounted, setMounted] = useState(false);
    const { scrollY } = useScroll();
    
    useEffect(() => {
        setMounted(true);
    }, []);

    // Subtle breathing light leak at the bottom
    const opacity = useTransform(scrollY, [0, 1500, 3000, 4500], [0.02, 0.08, 0.02, 0.08]);

    if (!mounted) return null;

    return (
        <>
            {/* Static grain texture — no scroll-driven transform needed, much cheaper */}
            <div
                className="fixed -inset-0 z-[150] pointer-events-none mix-blend-overlay"
                style={{
                    opacity: 0.04,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                }}
            />
            <motion.div
                className="fixed inset-0 z-[149] pointer-events-none mix-blend-screen"
                style={{
                  opacity,
                  background: 'radial-gradient(circle at 50% 120%, rgba(212,175,119,0.3) 0%, transparent 70%)'
                }}
            />
        </>
    );
}

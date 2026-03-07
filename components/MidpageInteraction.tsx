'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MidpageInteraction() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Darken the background as we scroll through
    const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

    return (
        <div ref={containerRef} className="h-screen relative flex items-center justify-center bg-primary">
            <motion.div
                style={{ opacity }}
                className="text-center px-6"
            >
                <h2 className="text-5xl md:text-7xl font-serif text-white tracking-widest leading-tight">
                    "You're in the scene now."
                </h2>
            </motion.div>
        </div>
    );
}

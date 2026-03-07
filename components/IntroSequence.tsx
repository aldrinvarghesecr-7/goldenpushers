'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroSequence() {
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
        if (hasSeenIntro) {
            setShowIntro(false);
        } else {
            sessionStorage.setItem('hasSeenIntro', 'true');
            const timer = setTimeout(() => {
                setShowIntro(false);
            }, 3000); // 1s fade + 1s pause + 1s extra buffer
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <AnimatePresence>
            {showIntro && (
                <motion.div
                    key="intro-sequence"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: "easeIn" }}
                    >
                        <h1 className="text-4xl md:text-6xl font-serif tracking-[0.2em] text-white/90 uppercase">
                            Golden Pushers
                        </h1>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

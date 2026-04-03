'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroSequence() {
    const [showIntro, setShowIntro] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
        if (hasSeenIntro) {
            setShowIntro(false);
            return;
        } 
        
        sessionStorage.setItem('hasSeenIntro', 'true');
        
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setShowIntro(false), 800); // short delay after hitting 100
                    return 100;
                }
                return p + Math.floor(Math.random() * 15) + 5;
            });
        }, 150);
        
        return () => clearInterval(interval);
    }, []);

    // Stagger animation for text
    const title = "GOLDEN PUSHERS";
    
    return (
        <AnimatePresence>
            {showIntro && (
                <motion.div
                    key="intro-sequence"
                    initial={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                    transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none overflow-hidden"
                >
                    {/* Background Shimmer */}
                    <div className="absolute inset-0 shimmer-gradient opacity-10" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="overflow-hidden flex gap-2">
                             {title.split("").map((char, i) => (
                                 <motion.span
                                     key={i}
                                     initial={{ y: 40, opacity: 0 }}
                                     animate={{ y: 0, opacity: 1 }}
                                     transition={{ delay: i * 0.05 + 0.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                                     className="text-4xl md:text-6xl font-serif tracking-[0.2em] text-white/95 uppercase"
                                 >
                                     {char === " " ? "\u00A0" : char}
                                 </motion.span>
                             ))}
                        </div>
                        
                        {/* Progress line */}
                        <motion.div 
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.8 }}
                           className="w-48 md:w-64 h-[1px] bg-white/10 mt-8 relative overflow-hidden"
                        >
                            <motion.div 
                               className="absolute top-0 left-0 bottom-0 bg-accent shadow-[0_0_10px_rgba(198,169,94,0.5)]"
                               initial={{ width: 0 }}
                               animate={{ width: `${progress}%` }}
                               transition={{ ease: "easeOut" }}
                            />
                        </motion.div>
                        
                        {/* Percentage */}
                        <motion.div 
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.8 }}
                           className="text-accent text-[10px] tracking-widest mt-4 font-mono"
                        >
                            {progress}%
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

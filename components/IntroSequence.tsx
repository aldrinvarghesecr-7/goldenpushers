'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroSequence() {
    const [showIntro, setShowIntro] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem('hasSeenIntro_GP');
        if (hasSeenIntro) {
            setShowIntro(false);
            return;
        } 
        
        sessionStorage.setItem('hasSeenIntro_GP', 'true');
        
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setShowIntro(false), 1200);
                    return 100;
                }
                return p + Math.floor(Math.random() * 10) + 2;
            });
        }, 80);
        
        return () => clearInterval(interval);
    }, []);

    const title = "GOLDEN PUSHERS";
    
    return (
        <AnimatePresence>
            {showIntro && (
                <motion.div
                    key="intro-sequence"
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0, 
                        filter: "blur(20px) brightness(3)", 
                        scale: 1.5,
                        transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] } 
                    }}
                    className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center pointer-events-none overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-primary to-primary opacity-50" />

                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                          className="mb-8"
                        >
                             <img 
                               src="/logo.png" 
                               alt="Golden Pushers" 
                               className="h-32 md:h-48 w-auto object-contain"
                             />
                        </motion.div>
                        
                        <motion.div 
                           initial={{ opacity: 0, width: 0 }}
                           animate={{ opacity: 1, width: "16rem" }}
                           transition={{ delay: 1.5, duration: 1 }}
                           className="h-[1px] bg-white/10 mt-12 relative overflow-hidden"
                        >
                            <motion.div 
                               className="absolute top-0 left-0 bottom-0 bg-accent shadow-[0_0_15px_rgba(212,175,119,0.8)]"
                               initial={{ width: 0 }}
                               animate={{ width: `${progress}%` }}
                               transition={{ ease: "easeOut" }}
                            />
                        </motion.div>
                        
                        <motion.div 
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 1.5 }}
                           className="text-accent text-[12px] tracking-[0.2em] mt-6 font-mono font-bold"
                        >
                            {progress < 100 ? `LOADING... ${progress}%` : "SCENE COMPLETE"}
                        </motion.div>
                    </div>

                    {/* Exit Film Burn Elements mapped via framer motion exit */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        exit={{ opacity: [0, 1, 0], scale: [1, 1.2, 1.5], rotate: [0, 5, -5] }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[#D4AF77] mix-blend-color-dodge z-50 pointer-events-none"
                        style={{ filter: 'blur(40px)' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

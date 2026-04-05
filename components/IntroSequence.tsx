'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const ClapperBoard = ({ onComplete }: { onComplete: () => void }) => {
    const [isClapped, setIsClapped] = useState(false);
    const audioContext = useRef<AudioContext | null>(null);

    const playClapSound = () => {
        if (!audioContext.current) {
            audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        const ctx = audioContext.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(150, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.1);

        // White noise burst for the snap
        const bufferSize = ctx.sampleRate * 0.05;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.3, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        noise.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start();
    };

    useEffect(() => {
        // Longer delay to let the clapperboard sink in
        const timer = setTimeout(() => {
            setIsClapped(true);
            try {
                playClapSound();
            } catch (e) {
                console.warn("Audio blocked by browser");
            }
            // Slower transition to reveal
            setTimeout(onComplete, 2000);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1.1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-[90vw] max-w-4xl aspect-[4/3] flex flex-col items-center justify-center pointer-events-auto"
        >
            {/* Clapper Top */}
            <motion.div 
                animate={isClapped ? { rotate: 0, y: 30 } : { rotate: -25, y: 0 }}
                transition={{ type: "spring", stiffness: 40, damping: 12 }} // Slower snap
                className="absolute top-[15%] left-0 w-full h-20 md:h-28 bg-black border-[6px] border-white overflow-hidden origin-right z-20"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
                <div className="w-full h-full flex">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex-1 h-full bg-white skew-x-[-45deg] odd:bg-black" />
                    ))}
                </div>
            </motion.div>

            {/* Clapper Base */}
            <div className="w-full h-[60%] bg-black border-[10px] border-white mt-24 rounded-sm shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col p-8 md:p-12 font-mono text-white relative overflow-hidden z-10 transition-transform duration-1000">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                
                <div className="flex justify-between border-b-[4px] border-white pb-6 mb-6">
                    <div className="text-xl md:text-2xl uppercase tracking-tighter opacity-70">Production</div>
                    <div className="text-4xl md:text-6xl font-black tracking-[0.1em] text-accent">GOLDEN PUSHERS</div>
                </div>

                <div className="grid grid-cols-2 gap-8 flex-grow">
                    <div className="border-r-[4px] border-white pr-8 flex flex-col justify-center">
                        <span className="text-sm md:text-lg uppercase opacity-70 block mb-2">Scene</span>
                        <span className="text-7xl md:text-9xl font-black">01</span>
                    </div>
                    <div className="pl-8 flex flex-col justify-center">
                        <span className="text-sm md:text-lg uppercase opacity-70 block mb-2">Take</span>
                        <span className="text-7xl md:text-9xl font-black">01</span>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t-[4px] border-white flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase opacity-70">Date</span>
                        <div className="text-lg md:text-2xl">{new Date().toLocaleDateString()}</div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs uppercase opacity-70">Director</span>
                        <div className="text-lg md:text-2xl font-bold tracking-widest text-accent">TEAM GP</div>
                    </div>
                </div>
            </div>

            {/* Visual Flash on Clap */}
            <AnimatePresence>
                {isClapped && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 bg-white z-[110] pointer-events-none"
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function IntroSequence() {
    const [showIntro, setShowIntro] = useState(true);
    const [isProjecting, setIsProjecting] = useState(false);

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem('hasSeenIntro_GP');
        if (hasSeenIntro) {
            setShowIntro(false);
            return;
        } 
        sessionStorage.setItem('hasSeenIntro_GP', 'true');
        // Prevent scrolling while intro is active
        document.body.style.overflow = 'hidden';
        return () => {
             document.body.style.overflow = 'unset';
        };
    }, []);

    if (!showIntro) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="intro-sequence"
                exit={{ 
                    opacity: 0, 
                    filter: "blur(40px) brightness(4)",
                    scale: 2,
                    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
                }}
                className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center pointer-events-auto overflow-hidden select-none"
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-primary to-primary opacity-80" />
                
                {/* Projector Flickering Overlay */}
                {isProjecting && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: [0.2, 0.5, 0.2, 0.7, 0.4, 0.1, 0.6],
                            background: [
                                "rgba(255,255,100,0.05)", 
                                "rgba(255,255,255,0.15)", 
                                "rgba(255,255,150,0.02)"
                            ]
                        }}
                        transition={{ duration: 0.15, repeat: Infinity }}
                        className="absolute inset-0 z-[105] pointer-events-none"
                    />
                )}

                <ClapperBoard onComplete={() => {
                    setIsProjecting(true);
                    setTimeout(() => {
                        setShowIntro(false);
                        document.body.style.overflow = 'unset';
                    }, 3000); // 3s projector duration (slower)
                }} />

                {/* Old Projector Lines / Scratches */}
                {isProjecting && (
                    <>
                        <div className="absolute inset-0 z-[106] pointer-events-none opacity-40">
                            <div className="absolute top-0 left-[15%] w-[2px] h-full bg-white/40 animate-[projectorLine_1.5s_infinite]" />
                            <div className="absolute top-0 left-[65%] w-[1px] h-full bg-white/30 animate-[projectorLine_2s_infinite]" />
                            <div className="absolute top-0 left-[85%] w-[3px] h-full bg-white/20 animate-[projectorLine_3.5s_infinite]" />
                        </div>
                        {/* Film Grain Jitter */}
                        <motion.div 
                            animate={{ x: [-2, 2, -1, 1], y: [1, -1, 2, -2] }}
                            transition={{ duration: 0.1, repeat: Infinity }}
                            className="absolute inset-0 z-[107] pointer-events-none bg-accent/5 mix-blend-overlay"
                        />
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

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
        const timer = setTimeout(() => {
            setIsClapped(true);
            try {
                playClapSound();
            } catch (e) {
                console.warn("Audio blocked by browser");
            }
            setTimeout(onComplete, 1500);
        }, 2000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            className="relative w-64 md:w-96 aspect-[4/3] flex flex-col items-center justify-center"
        >
            {/* Clapper Top */}
            <motion.div 
                animate={isClapped ? { rotate: 0, y: 15 } : { rotate: -30, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute top-[20%] left-0 w-full h-12 bg-black border-2 border-white overflow-hidden origin-right"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
                <div className="w-full h-full flex">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex-1 h-full bg-white skew-x-[-45deg] odd:bg-black" />
                    ))}
                </div>
            </motion.div>

            {/* Clapper Base */}
            <div className="w-full h-48 bg-black border-4 border-white mt-12 rounded-sm shadow-2xl flex flex-col p-4 font-mono text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                
                <div className="flex justify-between border-b-2 border-white pb-2 mb-2">
                    <div className="text-[10px] uppercase opacity-70">Production</div>
                    <div className="text-xl font-bold tracking-widest text-accent">GOLDEN PUSHERS</div>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-grow italic">
                    <div className="border-r-2 border-white pr-2 flex flex-col justify-center">
                        <span className="text-[10px] uppercase opacity-70 block mb-1">Scene</span>
                        <span className="text-4xl font-bold">01</span>
                    </div>
                    <div className="pl-2 flex flex-col justify-center">
                        <span className="text-[10px] uppercase opacity-70 block mb-1">Take</span>
                        <span className="text-4xl font-bold">01</span>
                    </div>
                </div>

                <div className="mt-4 pt-2 border-t-2 border-white flex justify-between items-end opacity-70">
                    <div className="text-[10px]">{new Date().toLocaleDateString()}</div>
                    <div className="text-[10px]">DIRECTOR: GP TEAM</div>
                </div>
            </div>

            {/* Visual Cues on Clap */}
            <AnimatePresence>
                {isClapped && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.1 }}
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
    }, []);

    if (!showIntro) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="intro-sequence"
                exit={{ 
                    opacity: 0, 
                    filter: "blur(20px) brightness(2)",
                    transition: { duration: 1 } 
                }}
                className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center pointer-events-none overflow-hidden"
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-primary to-primary opacity-60" />
                
                {/* Projector Flickering Overlay */}
                {isProjecting && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: [0.1, 0.3, 0.1, 0.4, 0.2, 0.5],
                            background: [
                                "rgba(255,255,255,0.05)", 
                                "rgba(255,255,255,0.1)", 
                                "rgba(255,255,255,0.02)"
                            ]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                        className="absolute inset-0 z-[105] pointer-events-none"
                    />
                )}

                <ClapperBoard onComplete={() => {
                    setIsProjecting(true);
                    setTimeout(() => setShowIntro(false), 2000);
                }} />

                {/* Old Projector Lines / Scratches */}
                {isProjecting && (
                    <div className="absolute inset-0 z-[106] pointer-events-none opacity-20">
                        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/30 animate-[projectorLine_2s_infinite]" />
                        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/30 animate-[projectorLine_3s_infinite]" />
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

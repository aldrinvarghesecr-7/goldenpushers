'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function KonamiCode() {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[index]) {
        if (index === KONAMI_CODE.length - 1) {
          setActive(true);
          setIndex(0);
          setTimeout(() => setActive(false), 5000);
        } else {
          setIndex(index + 1);
        }
      } else {
        setIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
           className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
        >
           {/* Easter Egg Content */}
           <motion.div
              initial={{ scale: 0.8, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="relative w-64 h-64 flex items-center justify-center"
           >
              <svg className="w-32 h-32 text-accent drop-shadow-[0_0_50px_rgba(206,169,0,1)]" viewBox="0 0 24 24" fill="currentColor">
                 <polygon points="12,2 22,22 2,22" />
              </svg>
           </motion.div>
           <motion.h2 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="text-white font-serif font-black tracking-[0.5em] mt-8 text-2xl uppercase"
           >
               The Director's Cut
           </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

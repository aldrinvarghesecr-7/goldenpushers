'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
}

export default function Lightbox({ isOpen, onClose, image, title }: Props) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
          onClick={onClose}
        >
          <button 
            onClick={onClose} 
            className="absolute top-8 right-8 z-50 text-white/70 hover:text-white transition-colors"
          >
            <X size={36} />
          </button>

          <motion.div 
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 24 }}
            className="relative max-w-[92vw] max-h-[92vh] w-full"
            onClick={e => e.stopPropagation()}
          >
            <Image 
              src={image} 
              alt={title} 
              width={1600} 
              height={1200} 
              className="rounded-2xl shadow-2xl" 
              priority 
            />
            <p className="text-center text-sm tracking-[2px] text-text-secondary mt-8">{title}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
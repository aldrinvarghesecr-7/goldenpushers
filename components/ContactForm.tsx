'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCinematicStore } from '@/lib/store';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const triggerClap = useCinematicStore((state) => state.triggerClap);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('submitting');
      
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        setStatus('success');
        triggerClap(); // Snap the clapper on completion
      } catch (error) {
        console.error('Failed to send inquiry', error);
        setStatus('idle');
        alert('Transmission failed. Please try again or use direct email.');
      }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-black/70 flex flex-col items-center justify-center py-32 overflow-hidden">

        <div className="relative z-10 w-full max-w-4xl px-8 mx-auto">
            <AnimatePresence mode="wait">
                {status !== 'success' ? (
                    <motion.div 
                        key="form"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
                    >
                        <div className="flex flex-col justify-center">
                            <h2 className="text-5xl md:text-7xl md:-ml-4 font-serif font-black text-white uppercase tracking-tighter mix-blend-difference">
                                Enquire.
                            </h2>
                            <p className="mt-6 text-accent font-serif italic text-xl">
                                Let's forge your vision into gold.
                            </p>
                            
                            <div className="mt-16 text-white/50 text-xs tracking-widest font-mono uppercase space-y-4">
                                <p>Golden Pushers Productions LLP</p>
                                <p>hello@goldenpushers.com</p>
                                <p>+1 (800) 999 0000</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-8 glass p-8 md:p-12">
                            <div className="group relative">
                                <input required type="text" placeholder="Name" className="w-full bg-transparent border-b border-white/20 pb-4 text-white font-serif focus:outline-none focus:border-accent transition-colors peer placeholder-transparent" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                <label className="absolute left-0 top-0 text-white/40 font-serif text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-5 peer-valid:text-xs peer-valid:text-accent pointer-events-none">Name</label>
                            </div>

                            <div className="group relative">
                                <input required type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/20 pb-4 text-white font-serif focus:outline-none focus:border-accent transition-colors peer placeholder-transparent" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                <label className="absolute left-0 top-0 text-white/40 font-serif text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-5 peer-valid:text-xs peer-valid:text-accent pointer-events-none">Email</label>
                            </div>

                            <div className="group relative">
                                <select required className="w-full bg-transparent border-b border-white/20 pb-4 text-white/40 font-serif focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer placeholder-transparent" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                    <option value="" disabled>Project Type</option>
                                    <option value="commercial" className="bg-[#111]">Commercial</option>
                                    <option value="film" className="bg-[#111]">Brand Film</option>
                                    <option value="music" className="bg-[#111]">Music Video</option>
                                    <option value="other" className="bg-[#111]">Other</option>
                                </select>
                            </div>

                            <div className="group relative">
                                <textarea required rows={4} placeholder="Message" className="w-full bg-transparent border-b border-white/20 pb-4 text-white font-serif focus:outline-none focus:border-accent transition-colors peer placeholder-transparent resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                                <label className="absolute left-0 top-0 text-white/40 font-serif text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-5 peer-valid:text-xs peer-valid:text-accent pointer-events-none">Message</label>
                            </div>

                            <button 
                                disabled={status === 'submitting'}
                                type="submit" 
                                className="mt-4 py-4 w-full border border-accent/50 text-accent font-sans font-black tracking-widest uppercase text-sm hover:bg-accent hover:text-black transition-all duration-500 overflow-hidden relative group"
                            >
                                <span className="relative z-10">{status === 'submitting' ? 'Processing...' : 'Submit Transmission'}</span>
                                <div className="absolute inset-0 bg-accent -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]" />
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.8, filter: "brightness(0) blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "brightness(1.2) blur(0px)" }}
                        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        className="flex flex-col items-center justify-center text-center py-20"
                    >
                        <div className="relative mb-12">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                                className="w-24 h-24 rounded-full border border-accent flex items-center justify-center relative z-10 bg-black"
                            >
                                <Check className="text-accent" size={40} />
                            </motion.div>
                            <div className="absolute inset-0 bg-accent/20 blur-[60px] rounded-full animate-pulse" />
                        </div>
                        
                        <h2 className="text-5xl md:text-8xl font-sans font-black text-white uppercase tracking-[0.1em] mb-4">
                           SCENE <span className="text-accent">COMPLETE</span>
                        </h2>
                        
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px w-8 bg-accent/30" />
                            <p className="text-white/40 font-mono text-[10px] tracking-[0.5em] uppercase">Transmission Successful</p>
                            <div className="h-px w-8 bg-accent/30" />
                        </div>

                        <p className="text-xl md:text-2xl font-serif text-white/50 italic max-w-md mx-auto leading-relaxed">
                           Our architects will review your vision and be in touch shortly.
                        </p>
                        
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            onClick={() => setStatus('idle')}
                            className="mt-12 text-[10px] font-sans font-bold tracking-[0.4em] text-accent uppercase border-b border-accent/30 pb-1 hover:text-white hover:border-white transition-all duration-500"
                        >
                            Return to Studio
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </section>
  );
}

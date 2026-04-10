'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCinematicStore } from '@/lib/store';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const triggerClap = useCinematicStore((state) => state.triggerClap);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('submitting');
      // Simulate network request
      setTimeout(() => {
          setStatus('success');
          triggerClap(); // Snap the clapper on completion
      }, 2000);
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
                            <h2 className="text-6xl md:text-8xl font-serif font-black text-white uppercase tracking-tighter mix-blend-difference">
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
                        initial={{ opacity: 0, scale: 0.9, filter: "brightness(0)" }}
                        animate={{ opacity: 1, scale: 1, filter: "brightness(2)" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center text-center h-[60vh]"
                    >
                        <div className="w-24 h-24 rounded-full border border-accent flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(206,169,0,0.5)]">
                            <Check className="text-accent" size={40} />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                           SCENE COMPLETE
                        </h2>
                        <p className="mt-6 text-xl font-serif text-accent tracking-widest uppercase">
                           We will be in touch.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </section>
  );
}

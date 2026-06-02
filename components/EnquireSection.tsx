'use client';

// ═══════════════════════════════════════════════════════════════
// ENQUIRE — Contact Form Section
// Modern production house contact. Split two-column layout.
// Left: Large type + contact info. Right: minimal form.
// Full dark. Red highlights.
// ═══════════════════════════════════════════════════════════════

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export default function EnquireSection() {
  const container = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send');
      setStatus('success');
    } catch (error) {
      console.error('Failed to send inquiry', error);
      setStatus('idle');
      alert('Transmission failed. Please try again or email us directly at goldenpushers@gmail.com');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section ref={container} id="contact" className="relative w-full min-h-screen bg-[#0E0E0D] flex flex-col justify-center py-32 overflow-hidden">

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.05]" />

      {mounted && (
        <div className="relative z-10 w-full max-w-[90vw] mx-auto">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16"
          >
            <span className="text-[#8B1E1F] text-[9px] tracking-[0.6em] uppercase font-sans font-bold">Get In Touch</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-white/15 text-[9px] tracking-[0.4em] font-sans hidden md:block">06 / Enquire</span>
          </motion.div>

          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
              >
                {/* Left: Title & Info */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <motion.h2
                      style={{ y: yTitle }}
                      className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-serif font-black text-white uppercase tracking-[-0.05em] leading-[0.9] cursor-default mb-10"
                      data-cursor-hover
                    >
                      Enquire.
                    </motion.h2>
                    <p className="text-[#8B1E1F] font-sans text-sm font-bold tracking-[0.1em] mb-16">
                      Let&apos;s forge your vision into reality.
                    </p>
                  </div>

                  <div className="space-y-4 text-white/25 text-[10px] tracking-[0.35em] font-sans uppercase">
                    <p className="hover:text-white transition-colors duration-300 cursor-default">Golden Pushers Productions LLP</p>
                    <p className="hover:text-[#8B1E1F] transition-colors duration-300 cursor-default">goldenpushers@gmail.com</p>
                    <p className="hover:text-white transition-colors duration-300 cursor-default">+91 73063 51867</p>
                  </div>
                </div>

                {/* Right: Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-2">

                  {/* Name */}
                  <div className="group relative border-b border-white/[0.08] focus-within:border-[#8B1E1F]/60 transition-colors duration-400 pb-4" data-cursor-hover data-cursor-text="TYPE">
                    <input
                      required type="text" placeholder="Name"
                      className="w-full bg-transparent text-white font-sans text-base focus:outline-none peer placeholder-transparent cursor-none"
                      value={formData.name} onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <label className="absolute left-0 top-0 text-white/20 font-sans text-xs tracking-[0.3em] uppercase transition-all peer-focus:-top-5 peer-focus:text-[8px] peer-focus:text-[#8B1E1F] peer-focus:tracking-[0.5em] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#8B1E1F] peer-[:not(:placeholder-shown)]:tracking-[0.5em] pointer-events-none">
                      Name
                    </label>
                  </div>

                  {/* Email */}
                  <div className="group relative border-b border-white/[0.08] focus-within:border-[#8B1E1F]/60 transition-colors duration-400 pb-4" data-cursor-hover data-cursor-text="TYPE">
                    <input
                      required type="email" placeholder="Email"
                      className="w-full bg-transparent text-white font-sans text-base focus:outline-none peer placeholder-transparent cursor-none"
                      value={formData.email} onChange={(e) => handleChange('email', e.target.value)}
                    />
                    <label className="absolute left-0 top-0 text-white/20 font-sans text-xs tracking-[0.3em] uppercase transition-all peer-focus:-top-5 peer-focus:text-[8px] peer-focus:text-[#8B1E1F] peer-focus:tracking-[0.5em] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#8B1E1F] peer-[:not(:placeholder-shown)]:tracking-[0.5em] pointer-events-none">
                      Email
                    </label>
                  </div>

                  {/* Phone */}
                  <div className="group relative border-b border-white/[0.08] focus-within:border-[#8B1E1F]/60 transition-colors duration-400 pb-4" data-cursor-hover data-cursor-text="TYPE">
                    <input
                      type="tel" placeholder="Phone"
                      className="w-full bg-transparent text-white font-sans text-base focus:outline-none peer placeholder-transparent cursor-none"
                      value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)}
                    />
                    <label className="absolute left-0 top-0 text-white/20 font-sans text-xs tracking-[0.3em] uppercase transition-all peer-focus:-top-5 peer-focus:text-[8px] peer-focus:text-[#8B1E1F] peer-focus:tracking-[0.5em] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#8B1E1F] peer-[:not(:placeholder-shown)]:tracking-[0.5em] pointer-events-none">
                      Phone (optional)
                    </label>
                  </div>

                  {/* Project Type */}
                  <div className="border-b border-white/[0.08] focus-within:border-[#8B1E1F]/60 transition-colors duration-400 pb-4" data-cursor-hover data-cursor-text="SELECT">
                    <select
                      required
                      className="w-full bg-transparent text-white/40 font-sans text-base focus:outline-none focus:text-white appearance-none cursor-none transition-colors"
                      value={formData.type} onChange={(e) => handleChange('type', e.target.value)}
                    >
                      <option value="" disabled className="bg-[#0E0E0D]">Project Type</option>
                      <option value="commercial" className="bg-[#0E0E0D] text-white">Commercial</option>
                      <option value="brand-film" className="bg-[#0E0E0D] text-white">Brand Film</option>
                      <option value="music-video" className="bg-[#0E0E0D] text-white">Music Video</option>
                      <option value="wedding" className="bg-[#0E0E0D] text-white">Wedding Film</option>
                      <option value="corporate" className="bg-[#0E0E0D] text-white">Corporate Film</option>
                      <option value="other" className="bg-[#0E0E0D] text-white">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="group relative border-b border-white/[0.08] focus-within:border-[#8B1E1F]/60 transition-colors duration-400 pb-4" data-cursor-hover data-cursor-text="TYPE">
                    <textarea
                      required rows={4} placeholder="Message"
                      className="w-full bg-transparent text-white font-sans text-base focus:outline-none peer placeholder-transparent resize-none cursor-none"
                      value={formData.message} onChange={(e) => handleChange('message', e.target.value)}
                    />
                    <label className="absolute left-0 top-0 text-white/20 font-sans text-xs tracking-[0.3em] uppercase transition-all peer-focus:-top-5 peer-focus:text-[8px] peer-focus:text-[#8B1E1F] peer-focus:tracking-[0.5em] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#8B1E1F] peer-[:not(:placeholder-shown)]:tracking-[0.5em] pointer-events-none">
                      Tell us about your vision
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    disabled={status === 'submitting'}
                    type="submit"
                    data-cursor-hover
                    data-cursor-text="SEND"
                    className="flex items-center justify-between py-5 px-0 border-t border-b border-white/[0.08] text-white/60 hover:text-white hover:border-[#8B1E1F]/40 group transition-all duration-500 disabled:opacity-40 cursor-none"
                  >
                    <span className="font-sans font-black text-sm tracking-[0.4em] uppercase">
                      {status === 'submitting' ? 'Processing...' : 'Submit Transmission'}
                    </span>
                    <ArrowRight size={18} className="group-hover:translate-x-2 group-hover:text-[#8B1E1F] transition-all duration-400" />
                  </button>
                </form>
              </motion.div>
            ) : (
              /* ─── SUCCESS STATE ─── */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start justify-center py-20 max-w-2xl"
              >
                <div className="relative mb-12">
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 border border-[#8B1E1F] flex items-center justify-center relative z-10"
                  >
                    <Check className="text-[#8B1E1F]" size={28} />
                  </motion.div>
                </div>

                <h2 className="text-5xl md:text-8xl font-serif font-black text-white uppercase tracking-[-0.04em] leading-none mb-6">
                  Scene <br /><span className="text-[#8B1E1F]">Complete</span>
                </h2>

                <div className="w-px h-12 bg-[#8B1E1F]/30 my-8" />

                <p className="text-lg font-sans text-white/30 font-light max-w-md leading-relaxed mb-12">
                  Our architects will review your vision and be in touch shortly.
                </p>

                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                  onClick={() => setStatus('idle')}
                  data-cursor-hover
                  className="flex items-center gap-4 text-[9px] font-sans font-bold tracking-[0.5em] text-[#8B1E1F] uppercase hover:text-white transition-colors duration-400 cursor-none"
                >
                  <span>Send Another</span>
                  <ArrowRight size={12} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

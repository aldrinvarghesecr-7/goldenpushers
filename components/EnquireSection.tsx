'use client';

// ═══════════════════════════════════════════════════════════════
// ENQUIRE — The Final Frame
// Contact form with terminal-aesthetic info and dramatic zoom.
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
    <section ref={container} id="contact" className="relative w-full min-h-screen bg-[#0B0D1A] flex flex-col justify-center py-32 overflow-hidden">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#E8ECF4]/[0.05]" />

      {mounted && (
        <div className="relative z-10 w-full max-w-[90vw] mx-auto">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16"
          >
            <span className="text-[#00E5FF] text-[9px] tracking-[0.6em] uppercase font-sans font-bold">Get In Touch</span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00E5FF]/20 to-transparent" />
            <span className="text-[#5A6285] text-[9px] tracking-[0.4em] font-mono hidden md:block">06 / Enquire</span>
          </motion.div>

          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
              >
                {/* Left: Title & Info */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <motion.h2
                      style={{ y: yTitle }}
                      className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-display font-bold text-[#E8ECF4] uppercase tracking-[-0.03em] leading-[0.9] cursor-default mb-10"
                      data-cursor-hover
                    >
                      Enquire.
                    </motion.h2>
                    <p className="text-[#00E5FF] font-sans text-sm font-bold tracking-[0.1em] mb-16 uppercase">
                      Let&apos;s forge your vision into reality.
                    </p>
                  </div>

                  <div className="space-y-4 text-[#5A6285] text-[10px] tracking-[0.35em] font-mono uppercase">
                    <p className="hover:text-[#E8ECF4] transition-colors duration-300 cursor-default">Golden Pushers Productions LLP</p>
                    <p className="hover:text-[#00E5FF] transition-colors duration-300 cursor-default">goldenpushers@gmail.com</p>
                    <p className="hover:text-[#E8ECF4] transition-colors duration-300 cursor-default">+91 73063 51867</p>
                  </div>
                </div>

                {/* Right: Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 pt-2">
                  {/* Name */}
                  <div className="group relative border border-white/[0.06] focus-within:border-[#00E5FF]/40 bg-white/[0.02] backdrop-blur-md transition-all duration-400 p-4 rounded-sm" data-cursor-hover data-cursor-text="TYPE">
                    <input
                      required type="text" placeholder="Name"
                      className="w-full bg-transparent text-[#E8ECF4] font-sans text-sm focus:outline-none peer placeholder-transparent cursor-none mt-2"
                      value={formData.name} onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <label className="absolute left-4 top-4 text-[#5A6285] font-sans text-[10px] tracking-[0.2em] uppercase transition-all peer-focus:top-1.5 peer-focus:text-[8px] peer-focus:text-[#00E5FF] peer-focus:tracking-[0.3em] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#00E5FF] peer-[:not(:placeholder-shown)]:tracking-[0.3em] pointer-events-none">
                      Name
                    </label>
                  </div>

                  {/* Email */}
                  <div className="group relative border border-white/[0.06] focus-within:border-[#00E5FF]/40 bg-white/[0.02] backdrop-blur-md transition-all duration-400 p-4 rounded-sm" data-cursor-hover data-cursor-text="TYPE">
                    <input
                      required type="email" placeholder="Email"
                      className="w-full bg-transparent text-[#E8ECF4] font-sans text-sm focus:outline-none peer placeholder-transparent cursor-none mt-2"
                      value={formData.email} onChange={(e) => handleChange('email', e.target.value)}
                    />
                    <label className="absolute left-4 top-4 text-[#5A6285] font-sans text-[10px] tracking-[0.2em] uppercase transition-all peer-focus:top-1.5 peer-focus:text-[8px] peer-focus:text-[#00E5FF] peer-focus:tracking-[0.3em] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#00E5FF] peer-[:not(:placeholder-shown)]:tracking-[0.3em] pointer-events-none">
                      Email
                    </label>
                  </div>

                  {/* Phone */}
                  <div className="group relative border border-white/[0.06] focus-within:border-[#00E5FF]/40 bg-white/[0.02] backdrop-blur-md transition-all duration-400 p-4 rounded-sm" data-cursor-hover data-cursor-text="TYPE">
                    <input
                      type="tel" placeholder="Phone"
                      className="w-full bg-transparent text-[#E8ECF4] font-sans text-sm focus:outline-none peer placeholder-transparent cursor-none mt-2"
                      value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)}
                    />
                    <label className="absolute left-4 top-4 text-[#5A6285] font-sans text-[10px] tracking-[0.2em] uppercase transition-all peer-focus:top-1.5 peer-focus:text-[8px] peer-focus:text-[#00E5FF] peer-focus:tracking-[0.3em] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#00E5FF] peer-[:not(:placeholder-shown)]:tracking-[0.3em] pointer-events-none">
                      Phone (optional)
                    </label>
                  </div>

                  {/* Project Type */}
                  <div className="relative border border-white/[0.06] focus-within:border-[#00E5FF]/40 bg-white/[0.02] backdrop-blur-md transition-all duration-400 p-4 rounded-sm" data-cursor-hover data-cursor-text="SELECT">
                    <select
                      required
                      className="w-full bg-transparent text-[#E8ECF4] font-sans text-sm focus:outline-none appearance-none cursor-none transition-colors mt-2"
                      value={formData.type} onChange={(e) => handleChange('type', e.target.value)}
                    >
                      <option value="" disabled className="bg-[#070814] text-[#5A6285]">Project Type</option>
                      <option value="Commercial" className="bg-[#070814] text-white">Commercial</option>
                      <option value="Brand Film" className="bg-[#070814] text-white">Brand Film</option>
                      <option value="Music Video" className="bg-[#070814] text-white">Music Video</option>
                      <option value="Wedding Film" className="bg-[#070814] text-white">Wedding Film</option>
                      <option value="Corporate Film" className="bg-[#070814] text-white">Corporate Film</option>
                      <option value="Other" className="bg-[#070814] text-white">Other</option>
                    </select>
                    <label className="absolute left-4 top-1.5 text-[#5A6285] font-sans text-[8px] tracking-[0.3em] uppercase pointer-events-none">
                      Project Category
                    </label>
                  </div>

                  {/* Message */}
                  <div className="group relative border border-white/[0.06] focus-within:border-[#00E5FF]/40 bg-white/[0.02] backdrop-blur-md transition-all duration-400 p-4 rounded-sm" data-cursor-hover data-cursor-text="TYPE">
                    <textarea
                      required rows={4} placeholder="Message"
                      className="w-full bg-transparent text-[#E8ECF4] font-sans text-sm focus:outline-none peer placeholder-transparent resize-none cursor-none mt-2"
                      value={formData.message} onChange={(e) => handleChange('message', e.target.value)}
                    />
                    <label className="absolute left-4 top-4 text-[#5A6285] font-sans text-[10px] tracking-[0.2em] uppercase transition-all peer-focus:top-1.5 peer-focus:text-[8px] peer-focus:text-[#00E5FF] peer-focus:tracking-[0.3em] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#00E5FF] peer-[:not(:placeholder-shown)]:tracking-[0.3em] pointer-events-none">
                      Tell us about your vision
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    disabled={status === 'submitting'}
                    type="submit"
                    data-cursor-hover
                    data-cursor-text="SEND"
                    className="flex items-center justify-between py-5 px-6 border border-white/[0.06] bg-[#00E5FF]/5 hover:bg-[#00E5FF]/15 text-[#00E5FF] hover:text-white hover:border-[#00E5FF]/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] group transition-all duration-500 disabled:opacity-40 cursor-none rounded-sm"
                  >
                    <span className="font-sans font-bold text-xs tracking-[0.3em] uppercase">
                      {status === 'submitting' ? 'Processing...' : 'Submit Transmission'}
                    </span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 group-hover:text-[#00E5FF] transition-all duration-400" />
                  </button>
                </form>
              </motion.div>
            ) : (
              /* ─── SUCCESS STATE ─── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start justify-center py-20 max-w-2xl"
              >
                <div className="relative mb-12">
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 border border-[#00E5FF] flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                  >
                    <Check className="text-[#00E5FF]" size={28} />
                  </motion.div>
                </div>

                <h2 className="text-5xl md:text-8xl font-display font-bold text-[#E8ECF4] uppercase tracking-[-0.04em] leading-none mb-6">
                  Scene <br /><span className="text-[#00E5FF]">Complete</span>
                </h2>

                <div className="w-px h-12 bg-[#00E5FF]/30 my-8" />

                <p className="text-lg font-sans text-[#5A6285] font-light max-w-md leading-relaxed mb-12">
                  Our architects will review your vision and be in touch shortly.
                </p>

                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                  onClick={() => setStatus('idle')}
                  data-cursor-hover
                  className="flex items-center gap-4 text-[9px] font-sans font-bold tracking-[0.5em] text-[#00E5FF] uppercase hover:text-[#E8ECF4] hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] transition-all duration-400 cursor-none"
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

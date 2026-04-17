'use client';

// ═══════════════════════════════════════════════════════════════
// ENQUIRE — Contact Form Section
// Minimal luxury form that submits to goldenpushers@gmail.com
// via API route. Cinematic "Scene Complete" confirmation.
// ═══════════════════════════════════════════════════════════════

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export default function EnquireSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

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
    <section
      id="contact"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-[#D4AF77]/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 mx-auto">
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
            >
              {/* Left: Title & Info */}
              <div className="flex flex-col justify-center">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="text-5xl md:text-7xl font-serif font-black text-white uppercase tracking-tighter"
                >
                  Enquire.
                </motion.h2>
                <p className="mt-6 text-[#D4AF77] font-sans italic text-lg md:text-xl font-light">
                  Let&apos;s forge your vision into gold.
                </p>

                <div className="mt-16 text-white/40 text-[10px] tracking-[0.3em] font-sans uppercase space-y-3">
                  <p>Golden Pushers Productions LLP</p>
                  <p>goldenpushers@gmail.com</p>
                  <p>+91 73063 51867</p>
                </div>
              </div>

              {/* Right: Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 glass p-8 md:p-12 rounded-sm"
              >
                {/* Name Input */}
                <div className="group relative">
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white font-sans focus:outline-none focus:border-[#D4AF77] transition-colors peer placeholder-transparent"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  <label className="absolute left-0 top-0 text-white/30 font-sans text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#D4AF77] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#D4AF77] pointer-events-none">
                    Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="group relative">
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white font-sans focus:outline-none focus:border-[#D4AF77] transition-colors peer placeholder-transparent"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  <label className="absolute left-0 top-0 text-white/30 font-sans text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#D4AF77] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#D4AF77] pointer-events-none">
                    Email
                  </label>
                </div>

                {/* Phone Input */}
                <div className="group relative">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white font-sans focus:outline-none focus:border-[#D4AF77] transition-colors peer placeholder-transparent"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                  <label className="absolute left-0 top-0 text-white/30 font-sans text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#D4AF77] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#D4AF77] pointer-events-none">
                    Phone (optional)
                  </label>
                </div>

                {/* Project Type Select */}
                <div className="group relative">
                  <select
                    required
                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white/40 font-sans focus:outline-none focus:border-[#D4AF77] transition-colors appearance-none cursor-pointer"
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                  >
                    <option value="" disabled>
                      Project Type
                    </option>
                    <option value="commercial" className="bg-[#111]">Commercial</option>
                    <option value="brand-film" className="bg-[#111]">Brand Film</option>
                    <option value="music-video" className="bg-[#111]">Music Video</option>
                    <option value="wedding" className="bg-[#111]">Wedding Film</option>
                    <option value="corporate" className="bg-[#111]">Corporate Film</option>
                    <option value="other" className="bg-[#111]">Other</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="group relative">
                  <textarea
                    required
                    rows={4}
                    placeholder="Message"
                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white font-sans focus:outline-none focus:border-[#D4AF77] transition-colors peer placeholder-transparent resize-none"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />
                  <label className="absolute left-0 top-0 text-white/30 font-sans text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#D4AF77] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#D4AF77] pointer-events-none">
                    Tell us about your vision
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  disabled={status === 'submitting'}
                  type="submit"
                  className="mt-4 py-4 w-full border border-[#D4AF77]/30 text-[#D4AF77] font-sans font-black tracking-[0.3em] uppercase text-xs hover:bg-[#D4AF77] hover:text-black transition-all duration-700 overflow-hidden relative group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {status === 'submitting' ? 'Processing...' : 'Submit Transmission'}
                  </span>
                  <div className="absolute inset-0 bg-[#D4AF77] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
                </button>
              </form>
            </motion.div>
          ) : (
            /* ─── SUCCESS STATE ─── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(15px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              {/* Checkmark */}
              <div className="relative mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full border border-[#D4AF77] flex items-center justify-center relative z-10 bg-[#0A0A0A]"
                >
                  <Check className="text-[#D4AF77]" size={36} />
                </motion.div>
                <div className="absolute inset-0 bg-[#D4AF77]/15 blur-[50px] rounded-full animate-pulse" />
              </div>

              <h2 className="text-4xl md:text-7xl font-serif font-black text-white uppercase tracking-[0.1em] mb-4">
                Scene <span className="text-[#D4AF77]">Complete</span>
              </h2>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-8 bg-[#D4AF77]/30" />
                <p className="text-white/35 font-sans text-[10px] tracking-[0.5em] uppercase font-bold">
                  Transmission Successful
                </p>
                <div className="h-px w-8 bg-[#D4AF77]/30" />
              </div>

              <p className="text-lg md:text-xl font-sans text-white/40 font-light max-w-md mx-auto leading-relaxed">
                Our architects will review your vision and be in touch shortly.
              </p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={() => setStatus('idle')}
                className="mt-12 text-[10px] font-sans font-bold tracking-[0.4em] text-[#D4AF77] uppercase border-b border-[#D4AF77]/30 pb-1 hover:text-white hover:border-white transition-all duration-500"
              >
                Send Another
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

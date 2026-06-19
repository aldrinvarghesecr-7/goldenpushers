'use client';

// ═══════════════════════════════════════════════════════════════
// ENQUIRE SECTION — Editorial contact form
// Charcoal/olive dark panel with clean form fields
// ═══════════════════════════════════════════════════════════════

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/config';

const INPUT_STYLE = {
  fontFamily: 'var(--font-sans)',
  fontSize: '14px',
  fontWeight: 300,
  color: '#F8F4EE',
  background: 'transparent',
  letterSpacing: '0.02em',
};

const LABEL_STYLE = {
  fontFamily: 'var(--font-sans)',
  fontSize: '9px',
  fontWeight: 500,
  letterSpacing: '0.3em',
  textTransform: 'uppercase' as const,
  color: '#6F6F6F',
};

export default function EnquireSection() {
  const container = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'end start'] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [24, -24]);

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
    } catch (err) {
      console.error('Failed to send inquiry', err);
      setStatus('idle');
      alert(`Submission failed. Please email us directly at ${siteConfig.email}`);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section
      ref={container}
      id="contact"
      className="relative w-full min-h-screen flex flex-col justify-center py-28 md:py-40 overflow-hidden"
      style={{ background: '#1E1E1E' }}
    >
      {/* Very subtle warm wash — top right */}
      <div
        className="absolute top-0 right-0 w-[40vw] h-[40vh] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(166,107,69,0.08) 0%, transparent 70%)' }}
      />

      {/* Thin top rule — stone */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(200,194,184,0.12)]" />

      {mounted && (
        <div className="relative z-10 w-full max-w-[90vw] mx-auto">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16 md:mb-20"
          >
            <span style={{ ...LABEL_STYLE, color: '#A66B45' }}>Start a Project</span>
            <div className="h-px flex-1 bg-[rgba(200,194,184,0.15)]" />
            <span style={{ ...LABEL_STYLE, color: '#6F6F6F' }} className="hidden md:block">06 / Enquire</span>
          </motion.div>

          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
              >

                {/* Left — title + info */}
                <div className="flex flex-col justify-between h-full gap-16">
                  <div>
                    <motion.h2
                      className="cursor-default mb-6"
                      data-cursor-hover
                      style={{
                        y: yTitle,
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(48px, 9vw, 110px)',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        lineHeight: 0.88,
                        color: '#F8F4EE',
                      }}
                    >
                      Let's{' '}
                      <em style={{ color: '#A66B45', fontStyle: 'italic' }}>Work</em>
                      <br />Together.
                    </motion.h2>

                    <p
                      className="mt-8 max-w-sm"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        fontWeight: 300,
                        color: '#6F6F6F',
                        lineHeight: 1.8,
                      }}
                    >
                      Tell us about your project. We'll get back to you within 24 hours to discuss how we can engineer your visual story.
                    </p>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-3 border-t border-[rgba(200,194,184,0.12)] pt-8">
                    <p style={{ ...LABEL_STYLE, color: '#6F6F6F' }}>Golden Pushers Production</p>
                    <p style={{ ...LABEL_STYLE, color: '#6F6F6F' }}>Kochi, Kerala, India</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      style={{ ...LABEL_STYLE, color: '#A66B45', display: 'block' }}
                      className="hover:opacity-70 transition-opacity duration-300"
                    >
                      {siteConfig.email}
                    </a>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      style={{ ...LABEL_STYLE, color: '#6F6F6F', display: 'block' }}
                      className="hover:text-[#F8F4EE] transition-colors duration-300"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                {/* Right — form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-0">

                  {/* Name */}
                  <div
                    className="group relative border-b border-[rgba(200,194,184,0.15)] focus-within:border-[rgba(166,107,69,0.6)] py-5 transition-colors duration-300"
                    data-cursor-hover
                    data-cursor-text="TYPE"
                  >
                    <label style={LABEL_STYLE} className="block mb-2">Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Your full name"
                      style={{ ...INPUT_STYLE, width: '100%', outline: 'none' }}
                      value={formData.name}
                      onChange={e => handleChange('name', e.target.value)}
                      className="cursor-none placeholder-[#3A3A3A]"
                    />
                  </div>

                  {/* Email */}
                  <div
                    className="group relative border-b border-[rgba(200,194,184,0.15)] focus-within:border-[rgba(166,107,69,0.6)] py-5 transition-colors duration-300"
                    data-cursor-hover
                    data-cursor-text="TYPE"
                  >
                    <label style={LABEL_STYLE} className="block mb-2">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="your@email.com"
                      style={{ ...INPUT_STYLE, width: '100%', outline: 'none' }}
                      value={formData.email}
                      onChange={e => handleChange('email', e.target.value)}
                      className="cursor-none placeholder-[#3A3A3A]"
                    />
                  </div>

                  {/* Phone */}
                  <div
                    className="group relative border-b border-[rgba(200,194,184,0.15)] focus-within:border-[rgba(166,107,69,0.6)] py-5 transition-colors duration-300"
                    data-cursor-hover
                    data-cursor-text="TYPE"
                  >
                    <label style={LABEL_STYLE} className="block mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      style={{ ...INPUT_STYLE, width: '100%', outline: 'none' }}
                      value={formData.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      className="cursor-none placeholder-[#3A3A3A]"
                    />
                  </div>

                  {/* Project type */}
                  <div
                    className="group relative border-b border-[rgba(200,194,184,0.15)] focus-within:border-[rgba(166,107,69,0.6)] py-5 transition-colors duration-300"
                    data-cursor-hover
                    data-cursor-text="SELECT"
                  >
                    <label style={LABEL_STYLE} className="block mb-2">Project Type *</label>
                    <select
                      required
                      style={{
                        ...INPUT_STYLE,
                        width: '100%',
                        outline: 'none',
                        appearance: 'none',
                        cursor: 'none',
                        color: formData.type ? '#F8F4EE' : '#3A3A3A',
                      }}
                      value={formData.type}
                      onChange={e => handleChange('type', e.target.value)}
                    >
                      <option value="" disabled style={{ background: '#1E1E1E', color: '#6F6F6F' }}>Select project type</option>
                      {siteConfig.services.map(s => (
                        <option key={s} value={s} style={{ background: '#1E1E1E', color: '#F8F4EE' }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div
                    className="group relative border-b border-[rgba(200,194,184,0.15)] focus-within:border-[rgba(166,107,69,0.6)] py-5 transition-colors duration-300"
                    data-cursor-hover
                    data-cursor-text="TYPE"
                  >
                    <label style={LABEL_STYLE} className="block mb-2">Tell Us About Your Project *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your vision, timeline, and any references you have in mind..."
                      style={{ ...INPUT_STYLE, width: '100%', outline: 'none', resize: 'none' }}
                      value={formData.message}
                      onChange={e => handleChange('message', e.target.value)}
                      className="cursor-none placeholder-[#3A3A3A]"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    data-cursor-hover
                    data-cursor-text="SEND"
                    className="mt-8 self-start flex items-center gap-4 btn-copper disabled:opacity-40 cursor-none group"
                  >
                    <span>{status === 'submitting' ? 'Sending...' : 'Send Enquiry'}</span>
                    <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </form>

              </motion.div>
            ) : (
              /* ─── SUCCESS STATE ─── */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start justify-center py-16 max-w-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 18 }}
                  className="w-14 h-14 border border-[#A66B45] flex items-center justify-center mb-10"
                >
                  <Check size={22} strokeWidth={1.5} color="#A66B45" />
                </motion.div>

                <h2
                  className="mb-6 cursor-default"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(36px, 6vw, 72px)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 0.9,
                    color: '#F8F4EE',
                  }}
                >
                  Message{' '}
                  <em style={{ color: '#A66B45', fontStyle: 'italic' }}>Received.</em>
                </h2>

                <div className="w-8 h-px bg-[#A66B45] my-8" />

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#6F6F6F',
                    lineHeight: 1.8,
                    maxWidth: '380px',
                  }}
                >
                  We'll review your project and be in touch within 24 hours. We look forward to building something lasting together.
                </p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={() => setStatus('idle')}
                  data-cursor-hover
                  className="mt-10 flex items-center gap-3 cursor-none group"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#A66B45',
                  }}
                >
                  <span>Send Another</span>
                  <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </section>
  );
}

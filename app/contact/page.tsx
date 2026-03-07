'use client';
import { useState } from 'react';
import SectionReveal from '@/components/SectionReveal';
import Button from '@/components/Button';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="pt-20 min-h-screen flex items-center">
      <div className="max-w-xl mx-auto px-8 w-full">
        <SectionReveal>
          <h1 className="font-serif text-7xl text-center">Let’s Begin.</h1>
        </SectionReveal>

        <form action="https://formsubmit.co/goldenpushers@gmail.com" method="POST" className="mt-20 space-y-12">
          {/* Prevent redirect on submission (optional but recommended for UX) */}
          <input type="hidden" name="_next" value="http://localhost:3000/contact?submitted=true" />
          <input type="hidden" name="_subject" value="New Inquiry - Golden Pushers!" />
          <input type="hidden" name="_captcha" value="false" />

          <div>
            <input
              type="text"
              name="name"
              placeholder="YOUR NAME"
              className="w-full bg-transparent border-b border-white/20 pb-5 text-2xl placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="YOUR EMAIL"
              className="w-full bg-transparent border-b border-white/20 pb-5 text-2xl placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none mt-12"
              required
            />

            <textarea
              name="message"
              placeholder="TELL US ABOUT YOUR VISION..."
              rows={5}
              className="w-full bg-transparent border-b border-white/20 pb-5 text-2xl placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none resize-y mt-12"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            SEND INQUIRY
          </Button>
        </form>

        {submitted && (
          <p className="text-center mt-8 text-accent text-sm tracking-widest">Thank you. We will respond within 48 hours.</p>
        )}
      </div>
    </div>
  );
}
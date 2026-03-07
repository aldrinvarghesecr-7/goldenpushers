export default function Footer() {
  return (
    <footer className="bg-black py-32 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-8 flex flex-col items-center justify-center text-center space-y-16">

        {/* Main Title Credit */}
        <div>
          <h2 className="font-serif text-3xl md:text-5xl tracking-widest text-white uppercase">Golden Pushers</h2>
        </div>

        {/* Directed By Block */}
        <div className="space-y-2">
          <p className="text-xs tracking-[4px] text-text-muted uppercase">Directed By</p>
          <p className="font-serif tracking-widest text-xl text-white">Golden Pushers</p>
        </div>

        {/* Social / Link Block */}
        <div className="space-y-2">
          <p className="text-xs tracking-[4px] text-text-muted uppercase">Follow The Story</p>
          <a
            href="https://instagram.com/goldenpushers"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif tracking-widest text-xl text-text-secondary hover:text-accent transition-colors block"
          >
            Instagram
          </a>
        </div>

        {/* Legal / Copyright Footer */}
        <div className="pt-16 space-y-4">
          <p className="text-xs text-text-muted tracking-widest uppercase opacity-60">
            © {new Date().getFullYear()} Golden Pushers SA. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
export default function Footer() {
  return (
    <footer className="bg-primary border-t border-white/10 py-20">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-2xl tracking-widest">GOLDEN PUSHERS</p>
          <p className="text-text-muted mt-3 text-sm">Geneva • 1887</p>
        </div>
        <div className="text-sm text-text-secondary space-y-2">
          <p>© {new Date().getFullYear()} Golden Pushers SA. All rights reserved.</p>
          <p>Privacy • Legal • Accessibility</p>
        </div>
        <div className="text-right text-sm text-text-muted">
          Crafted with restraint.<br />Made for those who understand.
        </div>
      </div>
    </footer>
  );
}
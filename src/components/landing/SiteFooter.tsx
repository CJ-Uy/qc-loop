import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-sm font-black text-white">QC</span>
              </div>
              <span className="text-lg font-bold">QC Loop</span>
            </div>
            <p className="text-white/60 text-sm">Everyone&apos;s in the loop.</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <Link href="/collect" className="hover:text-white transition-colors">Demo</Link>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-white/40 text-xs">
            A Quezon City civic initiative. All data shown is for demonstration purposes.
          </p>
          <p className="text-white/40 text-xs">© 2026 QC Loop</p>
        </div>
      </div>
    </footer>
  );
}

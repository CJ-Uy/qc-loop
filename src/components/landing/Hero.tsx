import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-secondary text-white overflow-hidden px-6 text-center">
      {/* Background grid decoration */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Logo */}
      <div className="relative mb-8">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
            <span className="text-xs font-black text-white">QC</span>
          </div>
          <span className="text-sm font-semibold tracking-wide">QC Loop</span>
        </div>
      </div>

      {/* Headline */}
      <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-black leading-tight max-w-3xl mb-6">
        What if every{" "}
        <span className="text-accent">QC resident</span>{" "}
        could help run the city?
      </h1>

      <p className="relative text-lg text-white/70 max-w-xl mb-10 leading-relaxed">
        QC Loop transforms Quezon City into a smart, people-first city. Report
        issues, explore live city data, and connect with your community — all
        in one app.
      </p>

      <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/collect"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors text-base"
        >
          Launch Demo
        </Link>
        <a
          href="#features"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-base"
        >
          Learn More
        </a>
      </div>

      {/* Tagline */}
      <p className="relative mt-16 text-white/40 text-sm tracking-widest uppercase">
        Through QC Loop, everyone&apos;s in the loop.
      </p>
    </section>
  );
}

const STATS = [
  { value: "12,400", label: "Reports filed", emoji: "📋" },
  { value: "87", label: "Barangays covered", emoji: "📍" },
  { value: "3.2 days", label: "Avg. response time", emoji: "⚡" },
  { value: "94%", label: "Citizen satisfaction", emoji: "❤️" },
];

export function ImpactNumbers() {
  return (
    <section className="py-20 px-6 bg-primary text-white">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block text-sm font-semibold text-accent bg-accent/20 rounded-full px-3 py-1 mb-4">
          Impact
        </span>
        <h2 className="text-3xl sm:text-4xl font-black mb-12">
          Making a difference, one report at a time
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-3xl font-black text-accent mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

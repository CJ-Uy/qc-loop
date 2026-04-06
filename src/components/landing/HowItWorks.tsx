const STEPS = [
  {
    number: "01",
    title: "Report",
    description:
      "Spot a problem in your barangay? File a report in seconds — flooding, trash, road damage, or even a biodiversity sighting. Every report matters.",
    emoji: "📲",
  },
  {
    number: "02",
    title: "Verify",
    description:
      "Other residents and city staff verify reports to ensure accuracy. Verified reports are prioritized and forwarded to the right city department.",
    emoji: "✅",
  },
  {
    number: "03",
    title: "Act",
    description:
      "The city responds. Track your report's status in real-time and earn QCredit points for your contribution to a better Quezon City.",
    emoji: "⚡",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">
            Three steps to a better city
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative text-center">
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-3xl mb-4">
                {step.emoji}
              </div>
              <div className="text-xs font-bold text-primary tracking-widest mb-2">
                STEP {step.number}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

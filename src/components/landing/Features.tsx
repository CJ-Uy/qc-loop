const FEATURES = [
  {
    emoji: "📍",
    name: "QCollect",
    description: "Report flooding, trash, bad drivers, accidents, and biodiversity sightings.",
    color: "bg-primary/10 text-primary",
  },
  {
    emoji: "🗺️",
    name: "QCity Map",
    description: "Live interactive flood map with real-time water levels and incident markers.",
    color: "bg-info/10 text-info",
  },
  {
    emoji: "🤝",
    name: "QConnect",
    description: "Find community events, connect with professionals, and join local groups.",
    color: "bg-success/10 text-success",
  },
  {
    emoji: "🤖",
    name: "QCare",
    description: "AI chatbot for city services, flood hotlines, and emergency contacts.",
    color: "bg-warning/10 text-warning",
  },
  {
    emoji: "⭐",
    name: "QCredit",
    description: "Earn points for reporting and participating. Redeem for local rewards.",
    color: "bg-accent/10 text-accent",
  },
  {
    emoji: "📊",
    name: "Public Datasets",
    description: "Open city data accessible to citizens, researchers, and policymakers.",
    color: "bg-secondary/10 text-secondary",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Everything you need to be a better citizen
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Six powerful tools built for Quezon City residents, by Quezon City residents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.name}
              className="bg-background border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 text-2xl ${feature.color}`}>
                {feature.emoji}
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">{feature.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

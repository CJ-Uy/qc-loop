import { Calendar, MapPin, Users } from "lucide-react";
import type { Event } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  Environment: "bg-success/10 text-success",
  Technology: "bg-info/10 text-info",
  Lifestyle: "bg-accent/10 text-accent",
  Safety: "bg-destructive/10 text-destructive",
  Sports: "bg-warning/10 text-warning",
  Health: "bg-success/10 text-success",
  Arts: "bg-primary/10 text-primary",
  Education: "bg-secondary/10 text-secondary",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-PH", { month: "short", day: "numeric", weekday: "short" });
}

export function EventCard({ event }: { event: Event }) {
  const colorClass = CATEGORY_COLORS[event.category] ?? "bg-muted text-muted-foreground";
  return (
    <div className="bg-background border border-border rounded-2xl p-4 hover:shadow-sm transition-shadow cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sm text-foreground leading-snug flex-1">{event.title}</h3>
        <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${colorClass}`}>
          {event.category}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
      <div className="space-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar size={11} className="text-primary" />
          {formatDate(event.date)} · {event.time}
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin size={11} className="text-primary" />
          {event.location}
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={11} className="text-primary" />
          {event.attendees} attending
        </div>
      </div>
      <button className="mt-3 w-full py-2 text-xs font-semibold text-primary border border-primary/30 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors">
        I&apos;m Interested
      </button>
    </div>
  );
}

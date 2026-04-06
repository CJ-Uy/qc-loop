import type { Professional } from "@/lib/types";

export function ProfessionalCard({ professional: p }: { professional: Professional }) {
  return (
    <div className="flex items-start gap-3 bg-background border border-border rounded-2xl p-4 hover:shadow-sm transition-shadow cursor-pointer">
      <div
        className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-base"
        style={{ backgroundColor: p.color }}
      >
        {p.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground">{p.name}</p>
        <p className="text-xs text-primary font-medium">{p.profession}</p>
        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
          📍 {p.barangay}
        </p>
        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{p.bio}</p>
      </div>
      <button className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
        Connect
      </button>
    </div>
  );
}

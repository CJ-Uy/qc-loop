import { X, Droplets, MapPin, Clock } from "lucide-react";
import type { FloodZone } from "@/lib/types";
import { cn } from "@/lib/utils";

const SEVERITY_CONFIG = {
  low: { label: "Low", color: "text-success bg-success/10 border-success/30" },
  medium: { label: "Moderate", color: "text-warning bg-warning/10 border-warning/30" },
  high: { label: "Critical", color: "text-destructive bg-destructive/10 border-destructive/30" },
};

interface ZoneBottomSheetProps {
  zone: FloodZone | null;
  onClose: () => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" });
}

export function ZoneBottomSheet({ zone, onClose }: ZoneBottomSheetProps) {
  if (!zone) return null;
  const severity = SEVERITY_CONFIG[zone.severity];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-background rounded-t-3xl shadow-2xl p-4 border-t border-border">
      <div className="flex justify-center mb-3">
        <div className="w-10 h-1 bg-border rounded-full" />
      </div>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-foreground">{zone.name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border", severity.color)}>
              {severity.label} Risk
            </span>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="bg-muted/50 rounded-xl p-3 text-center">
          <Droplets size={16} className="mx-auto mb-1 text-info" />
          <p className="text-xs text-muted-foreground">Water Level</p>
          <p className="text-sm font-bold text-foreground">{zone.waterLevel}</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-3 text-center">
          <MapPin size={16} className="mx-auto mb-1 text-primary" />
          <p className="text-xs text-muted-foreground">Barangays</p>
          <p className="text-sm font-bold text-foreground">{zone.barangays.length}</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-3 text-center">
          <Clock size={16} className="mx-auto mb-1 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Updated</p>
          <p className="text-sm font-bold text-foreground">{formatDate(zone.lastUpdated)}</p>
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-1.5">Affected barangays:</p>
        <div className="flex flex-wrap gap-1.5">
          {zone.barangays.map((b) => (
            <span key={b} className="text-xs bg-muted px-2 py-0.5 rounded-full text-foreground">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

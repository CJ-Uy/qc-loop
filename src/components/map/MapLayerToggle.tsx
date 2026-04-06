"use client";

import { cn } from "@/lib/utils";

export type MapLayer = "floods" | "reports" | "bus" | "paths";

const LAYERS: { value: MapLayer; label: string; emoji: string }[] = [
  { value: "floods", label: "Floods", emoji: "🌊" },
  { value: "reports", label: "Reports", emoji: "📍" },
  { value: "bus", label: "Bus Stops", emoji: "🚌" },
  { value: "paths", label: "Walkways", emoji: "🚶" },
];

interface MapLayerToggleProps {
  active: Set<MapLayer>;
  onToggle: (layer: MapLayer) => void;
}

export function MapLayerToggle({ active, onToggle }: MapLayerToggleProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {LAYERS.map(({ value, label, emoji }) => (
        <button
          key={value}
          onClick={() => onToggle(value)}
          className={cn(
            "flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
            active.has(value)
              ? "bg-primary text-white border-primary"
              : "bg-background text-muted-foreground border-border"
          )}
        >
          <span>{emoji}</span>
          {label}
        </button>
      ))}
    </div>
  );
}

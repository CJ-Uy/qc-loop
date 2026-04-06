"use client";

import { cn } from "@/lib/utils";
import type { ReportCategory } from "@/lib/types";

type Filter = ReportCategory | "all";

const FILTERS: { value: Filter; label: string; emoji: string }[] = [
  { value: "all", label: "All", emoji: "📋" },
  { value: "flooding", label: "Flooding", emoji: "🌊" },
  { value: "trash", label: "Trash", emoji: "🗑️" },
  { value: "bad-driver", label: "Drivers", emoji: "🚗" },
  { value: "accident", label: "Accidents", emoji: "⚠️" },
  { value: "biodiversity", label: "Nature", emoji: "🌿" },
  { value: "other", label: "Other", emoji: "📌" },
];

interface FilterChipsProps {
  active: Filter;
  onChange: (filter: Filter) => void;
}

export function FilterChips({ active, onChange }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2">
      {FILTERS.map(({ value, label, emoji }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={cn(
            "flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
            active === value
              ? "bg-primary text-white border-primary"
              : "bg-background text-muted-foreground border-border hover:border-primary/50"
          )}
        >
          <span>{emoji}</span>
          {label}
        </button>
      ))}
    </div>
  );
}

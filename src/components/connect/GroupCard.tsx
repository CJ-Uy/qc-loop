import type { Group } from "@/lib/types";

export function GroupCard({ group }: { group: Group }) {
  return (
    <div className="flex items-start gap-3 bg-background border border-border rounded-2xl p-4 hover:shadow-sm transition-shadow cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">
        {group.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground">{group.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{group.members.toLocaleString()} members</p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{group.description}</p>
      </div>
      <button className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold border border-primary text-primary rounded-xl hover:bg-primary/5 transition-colors">
        Join
      </button>
    </div>
  );
}

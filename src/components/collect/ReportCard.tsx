import { ThumbsUp, MapPin, Clock } from "lucide-react";
import { StatusBadge } from "@/components/app/StatusBadge";
import type { Report } from "@/lib/types";

const CATEGORY_EMOJI: Record<Report["category"], string> = {
  flooding: "🌊",
  trash: "🗑️",
  "bad-driver": "🚗",
  accident: "⚠️",
  biodiversity: "🌿",
  other: "📌",
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function ReportCard({ report }: { report: Report }) {
  return (
    <div className="bg-background border-b border-border px-4 py-3 active:bg-muted/30 transition-colors cursor-pointer">
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl">
          {CATEGORY_EMOJI[report.category]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-semibold text-sm text-foreground leading-snug line-clamp-2">
              {report.title}
            </p>
            <StatusBadge status={report.status} />
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {report.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {report.barangay}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {timeAgo(report.timestamp)}
            </span>
            <span className="flex items-center gap-1 ml-auto text-muted-foreground">
              <ThumbsUp size={11} />
              {report.upvotes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

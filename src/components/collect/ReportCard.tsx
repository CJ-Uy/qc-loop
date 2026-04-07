"use client";

import { useState } from "react";
import { ThumbsUp, MapPin, Clock, Trash2 } from "lucide-react";
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

interface ReportCardProps {
  report: Report;
  onDelete: (id: string) => void;
}

export function ReportCard({ report, onDelete }: ReportCardProps) {
  const [upvotes, setUpvotes] = useState(report.upvotes);
  const [deleting, setDeleting] = useState(false);

  async function handleUpvote(e: React.MouseEvent) {
    e.stopPropagation();
    const res = await fetch(`/api/reports/${report.id}/upvote`, { method: "PATCH" });
    if (res.ok) {
      const updated = await res.json() as Report;
      setUpvotes(updated.upvotes);
    }
  }

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    setDeleting(true);
    const res = await fetch(`/api/reports/${report.id}`, { method: "DELETE" });
    if (res.ok) {
      onDelete(report.id);
    } else {
      setDeleting(false);
    }
  }

  return (
    <div className="bg-background border-b border-border px-4 py-3 transition-colors">
      <div className="flex gap-3">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl">
          {CATEGORY_EMOJI[report.category]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-semibold text-sm text-foreground leading-snug line-clamp-2">
              {report.title}
            </p>
            <div className="flex items-center gap-1 shrink-0">
              <StatusBadge status={report.status} />
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40"
                aria-label="Delete report"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {report.description}
          </p>
          {report.imageUrl && (
            <img
              src={report.imageUrl}
              alt="Report photo"
              className="w-full h-28 object-cover rounded-xl mb-2"
            />
          )}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {report.barangay}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {timeAgo(report.timestamp)}
            </span>
            <button
              onClick={handleUpvote}
              className="flex items-center gap-1 ml-auto hover:text-primary transition-colors"
              aria-label="Upvote"
            >
              <ThumbsUp size={11} />
              {upvotes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

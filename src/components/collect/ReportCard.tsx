"use client";

import { useState } from "react";
import { ThumbsUp, MapPin, Clock, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/app/StatusBadge";
import type { Report, ReportStatus } from "@/lib/types";

const CATEGORY_EMOJI: Record<Report["category"], string> = {
  flooding:      "🌊",
  trash:         "🗑️",
  "bad-driver":  "🚗",
  accident:      "⚠️",
  biodiversity:  "🌿",
  other:         "📌",
};

const STATUS_OPTIONS: { value: ReportStatus; label: string; active: string; idle: string }[] = [
  { value: "pending",  label: "Pending",  active: "bg-warning/20 text-warning border-warning/40",   idle: "bg-muted text-muted-foreground border-border hover:bg-muted/80" },
  { value: "verified", label: "Verified", active: "bg-success/20 text-success border-success/40",   idle: "bg-muted text-muted-foreground border-border hover:bg-muted/80" },
  { value: "resolved", label: "Resolved", active: "bg-info/20 text-info border-info/40",             idle: "bg-muted text-muted-foreground border-border hover:bg-muted/80" },
];

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
  isAdmin?: boolean;
}

export function ReportCard({ report, onDelete, isAdmin = false }: ReportCardProps) {
  const [upvotes, setUpvotes] = useState(report.upvotes);
  const [currentStatus, setCurrentStatus] = useState<ReportStatus>(report.status);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

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

  async function handleStatusChange(status: ReportStatus) {
    if (updatingStatus || status === currentStatus) return;
    setUpdatingStatus(true);
    const res = await fetch(`/api/reports/${report.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json() as Report;
      setCurrentStatus(updated.status);
    }
    setUpdatingStatus(false);
  }

  return (
    <>
    {lightboxUrl && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={() => setLightboxUrl(null)}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white"
          onClick={() => setLightboxUrl(null)}
        >
          <X size={20} />
        </button>
        <img
          src={lightboxUrl}
          alt=""
          className="max-w-[92vw] max-h-[85dvh] rounded-2xl object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )}
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
              <StatusBadge status={currentStatus} />
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

          {report.imageUrls && report.imageUrls.length > 0 && (
            <div className="flex gap-1.5 mb-2 overflow-x-auto pb-0.5">
              {report.imageUrls.map((url, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxUrl(url); }}
                  className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-border"
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
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

          {/* Admin status controls */}
          {isAdmin && (
            <div className="flex gap-1.5 mt-2.5 pt-2.5 border-t border-border">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleStatusChange(opt.value)}
                  disabled={updatingStatus}
                  className={cn(
                    "flex-1 py-1 rounded-lg text-xs font-medium border transition-colors disabled:opacity-50",
                    currentStatus === opt.value ? opt.active : opt.idle
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

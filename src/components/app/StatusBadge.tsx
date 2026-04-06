import { cn } from "@/lib/utils";
import type { ReportStatus } from "@/lib/types";

const STATUS_CONFIG: Record<ReportStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-warning/15 text-warning border-warning/30" },
  verified: { label: "Verified", className: "bg-info/15 text-info border-info/30" },
  resolved: { label: "Resolved", className: "bg-success/15 text-success border-success/30" },
};

export function StatusBadge({ status }: { status: ReportStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", config.className)}>
      {config.label}
    </span>
  );
}

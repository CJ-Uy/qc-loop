"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Search, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterChips } from "./FilterChips";
import { ReportCard } from "./ReportCard";
import { NewReportSheet } from "./NewReportSheet";
import { PageHeader } from "@/components/app/PageHeader";
import type { Report, ReportCategory } from "@/lib/types";

type Filter = ReportCategory | "all";

export function ReportFeed() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    fetch("/api/reports")
      .then((r) => r.json())
      .then((data) => setReports(data as Report[]))
      .finally(() => setLoading(false));
    return () => clearTimeout(toastTimer.current);
  }, []);

  const filtered = filter === "all"
    ? reports
    : reports.filter((r) => r.category === filter);

  function handleSubmit(newReport: Report) {
    setReports((prev) => [newReport, ...prev]);
    setShowSuccess(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setShowSuccess(false), 3000);
  }

  function handleDelete(id: string) {
    setReports((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="QCollect"
        subtitle="Quezon City reports"
        right={
          <div className="flex items-center gap-1">
            <button
              onClick={() => setAdminMode((v) => !v)}
              title={adminMode ? "Exit admin mode" : "Enter admin mode"}
              className={cn(
                "p-2 rounded-full transition-colors",
                adminMode
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <ShieldCheck size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Search size={18} className="text-muted-foreground" />
            </button>
          </div>
        }
      />

      {adminMode && (
        <div className="px-4 py-2 bg-primary/5 border-b border-primary/20 flex items-center gap-2">
          <ShieldCheck size={14} className="text-primary shrink-0" />
          <p className="text-xs text-primary font-medium">Admin mode — tap a status to update it</p>
        </div>
      )}

      <FilterChips active={filter} onChange={setFilter} />

      <div className="px-4 py-2 border-b border-border">
        <p className="text-xs text-muted-foreground">
          {filtered.length} report{filtered.length !== 1 ? "s" : ""}
          {filter !== "all" ? ` · ${filter.replace("-", " ")}` : ""}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            Loading reports…
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            No reports yet.
          </div>
        ) : (
          filtered.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onDelete={handleDelete}
              isAdmin={adminMode}
            />
          ))
        )}
      </div>

      <button
        onClick={() => setSheetOpen(true)}
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40 w-14 h-14 bg-accent text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-accent/90 active:scale-95 transition-all"
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-success text-white px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2">
          ✅ Report submitted! +10 QCredit points earned
        </div>
      )}

      <NewReportSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

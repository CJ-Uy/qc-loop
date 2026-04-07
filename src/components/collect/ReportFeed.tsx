"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Search } from "lucide-react";
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
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    fetch("/api/reports")
      .then((r) => r.json())
      .then((data: Report[]) => setReports(data))
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
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <Search size={18} className="text-muted-foreground" />
          </button>
        }
      />

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
            <ReportCard key={report.id} report={report} onDelete={handleDelete} />
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

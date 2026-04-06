"use client";

import { useState } from "react";
import { X, Camera, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReportCategory } from "@/lib/types";

const CATEGORIES: { value: ReportCategory; label: string; emoji: string; color: string }[] = [
  { value: "flooding", label: "Flooding", emoji: "🌊", color: "bg-info/10 border-info/30" },
  { value: "trash", label: "Trash", emoji: "🗑️", color: "bg-success/10 border-success/30" },
  { value: "bad-driver", label: "Bad Driver", emoji: "🚗", color: "bg-warning/10 border-warning/30" },
  { value: "accident", label: "Accident", emoji: "⚠️", color: "bg-destructive/10 border-destructive/30" },
  { value: "biodiversity", label: "Biodiversity", emoji: "🌿", color: "bg-success/10 border-success/30" },
  { value: "other", label: "Other", emoji: "📌", color: "bg-muted border-border" },
];

const MOCK_BARANGAYS = ["Batasan Hills", "Fairview", "Cubao", "Diliman", "Kamuning", "Project 6", "Commonwealth", "Novaliches"];

interface NewReportSheetProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function NewReportSheet({ open, onClose, onSubmit }: NewReportSheetProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<ReportCategory | null>(null);
  const [description, setDescription] = useState("");

  function handleClose() {
    setStep(1);
    setCategory(null);
    setDescription("");
    onClose();
  }

  function handleSubmit() {
    handleClose();
    onSubmit();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-[430px] bg-background rounded-t-3xl max-h-[90vh] overflow-y-auto">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <h2 className="font-bold text-foreground">New Report</h2>
            <p className="text-xs text-muted-foreground">Step {step} of 3</p>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          {step === 1 && (
            <>
              <p className="text-sm font-medium text-foreground mb-3">What are you reporting?</p>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => { setCategory(cat.value); setStep(2); }}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all",
                      cat.color,
                      category === cat.value ? "ring-2 ring-primary" : ""
                    )}
                  >
                    <span className="text-3xl">{cat.emoji}</span>
                    <span className="text-sm font-semibold text-foreground">{cat.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm font-medium text-foreground mb-3">Add details</p>
              <div
                className="flex items-center justify-center w-full h-32 rounded-2xl border-2 border-dashed border-border bg-muted/30 mb-4 cursor-pointer"
              >
                <div className="text-center text-muted-foreground">
                  <Camera size={24} className="mx-auto mb-1" />
                  <p className="text-xs">Tap to add photo</p>
                </div>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue... (e.g., knee-deep floodwater blocking the road)"
                className="w-full h-28 px-3 py-2.5 text-sm border border-border rounded-xl bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-2 mt-3 p-3 bg-muted/50 rounded-xl">
                <MapPin size={14} className="text-primary flex-shrink-0" />
                <span className="text-xs text-muted-foreground">
                  Location: <span className="text-foreground font-medium">{MOCK_BARANGAYS[3]}</span>
                </span>
              </div>
              <button
                onClick={() => setStep(3)}
                className="w-full mt-4 py-3 bg-primary text-white font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                Next <ChevronRight size={16} />
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-sm font-medium text-foreground mb-3">Review your report</p>
              <div className="bg-muted/30 rounded-2xl p-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium capitalize">{category?.replace("-", " ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{MOCK_BARANGAYS[3]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Photo</span>
                  <span className="font-medium text-muted-foreground">None</span>
                </div>
                {description && (
                  <div className="pt-2 border-t border-border text-sm">
                    <span className="text-muted-foreground block mb-1">Description</span>
                    <span className="text-foreground">{description}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 bg-success/10 border border-success/30 rounded-xl p-3 mb-4">
                <span className="text-success text-lg">⭐</span>
                <p className="text-xs text-success font-medium">You&apos;ll earn +10 QCredit points for this report!</p>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-primary text-white font-semibold rounded-xl"
              >
                Submit Report
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

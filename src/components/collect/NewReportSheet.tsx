"use client";

import { useState, useRef } from "react";
import { X, Camera, MapPin, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Report, ReportCategory } from "@/lib/types";

const CATEGORIES: { value: ReportCategory; label: string; emoji: string; color: string }[] = [
  { value: "flooding",     label: "Flooding",     emoji: "🌊", color: "bg-info/10 border-info/30" },
  { value: "trash",        label: "Trash",        emoji: "🗑️", color: "bg-success/10 border-success/30" },
  { value: "bad-driver",   label: "Bad Driver",   emoji: "🚗", color: "bg-warning/10 border-warning/30" },
  { value: "accident",     label: "Accident",     emoji: "⚠️", color: "bg-destructive/10 border-destructive/30" },
  { value: "biodiversity", label: "Biodiversity", emoji: "🌿", color: "bg-success/10 border-success/30" },
  { value: "other",        label: "Other",        emoji: "📌", color: "bg-muted border-border" },
];

const MOCK_BARANGAYS = ["Batasan Hills", "Fairview", "Cubao", "Diliman", "Kamuning", "Project 6", "Commonwealth", "Novaliches"];

interface PhotoEntry { file: File; url: string; }

interface NewReportSheetProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (report: Report) => void;
}

export function NewReportSheet({ open, onClose, onSubmit }: NewReportSheetProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<ReportCategory | null>(null);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedCat = CATEGORIES.find((c) => c.value === category) ?? null;

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const newEntries = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPhotos((prev) => [...prev, ...newEntries]);
    e.target.value = ""; // reset so same file can be re-added if needed
  }

  function removePhoto(index: number) {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleClose() {
    setStep(1);
    setCategory(null);
    setDescription("");
    setError(null);
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setPhotos([]);
    onClose();
  }

  async function handleSubmit() {
    if (submitting || !category) return;
    setSubmitting(true);
    setError(null);
    try {
      const cat = CATEGORIES.find((c) => c.value === category)!;
      const formData = new FormData();
      formData.append("category", category);
      formData.append("title", `${cat.label} report`);
      formData.append("description", description.trim() || "No description provided.");
      formData.append("barangay", MOCK_BARANGAYS[3]);
      formData.append("district", "3");
      photos.forEach((p) => formData.append("photo", p.file));

      const res = await fetch("/api/reports", { method: "POST", body: formData });
      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }
      const report = await res.json() as Report;
      handleClose();
      onSubmit(report);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-107.5 bg-background rounded-t-3xl max-h-[85dvh] overflow-y-scroll overscroll-contain">
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
          {/* ── Step 1 ── */}
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

          {/* ── Step 2 ── */}
          {step === 2 && (
            <>
              {selectedCat && (
                <button
                  onClick={() => setStep(1)}
                  className={cn("flex items-center gap-2 px-3 py-1.5 rounded-xl border mb-4 text-sm font-medium w-full", selectedCat.color)}
                >
                  <span>{selectedCat.emoji}</span>
                  <span>{selectedCat.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">change</span>
                </button>
              )}

              <p className="text-sm font-medium text-foreground mb-3">Add photos</p>

              {/* Hidden file input — no capture so gallery is accessible */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotoSelect}
              />

              {/* Photo grid */}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {photos.map((p, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                      <img src={p.url} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {/* Add more tile */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-1 hover:bg-muted/50 transition-colors"
                  >
                    <Plus size={20} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Add</span>
                  </button>
                </div>
              )}

              {photos.length === 0 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center w-full h-32 rounded-2xl border-2 border-dashed border-border bg-muted/30 mb-4 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Camera size={24} className="text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">Tap to add photos</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">You can select multiple</p>
                </button>
              )}

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue… (e.g., knee-deep floodwater blocking the road)"
                className="w-full h-28 px-3 py-2.5 text-sm border border-border rounded-xl bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground mt-3"
              />
              <div className="flex items-center gap-2 mt-3 p-3 bg-muted/50 rounded-xl">
                <MapPin size={14} className="text-primary shrink-0" />
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

          {/* ── Step 3 ── */}
          {step === 3 && (
            <>
              <p className="text-sm font-medium text-foreground mb-3">Review your report</p>
              <div className="bg-muted/30 rounded-2xl p-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{selectedCat?.emoji} {selectedCat?.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{MOCK_BARANGAYS[3]}</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-muted-foreground">Photos</span>
                  {photos.length > 0 ? (
                    <div className="flex gap-1">
                      {photos.map((p, i) => (
                        <img key={i} src={p.url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      ))}
                    </div>
                  ) : (
                    <span className="font-medium text-muted-foreground">None</span>
                  )}
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

              {error && (
                <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 rounded-xl p-3 mb-4">
                  <span className="text-destructive text-sm">⚠️</span>
                  <p className="text-xs text-destructive font-medium">{error}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-3 bg-primary text-white font-semibold rounded-xl disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit Report"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

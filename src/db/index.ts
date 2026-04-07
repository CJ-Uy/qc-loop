import type { Report } from "@/lib/types";

export interface ReportRow {
  id: string;
  category: string;
  title: string;
  description: string;
  barangay: string;
  district: number;
  timestamp: string;
  upvotes: number;
  status: string;
  image_key: string | null;    // legacy single-image column
  image_keys: string | null;   // JSON array e.g. '["reports/id-0.jpg"]'
}

export function toReport(row: ReportRow): Report {
  let imageUrls: string[] | undefined;

  if (row.image_keys) {
    const keys: string[] = JSON.parse(row.image_keys);
    if (keys.length > 0) {
      imageUrls = keys.map((_, i) => `/api/reports/${row.id}/images/${i}`);
    }
  } else if (row.image_key) {
    // backward compat: single legacy image served from old route
    imageUrls = [`/api/reports/${row.id}/image`];
  }

  return {
    id: row.id,
    category: row.category as Report["category"],
    title: row.title,
    description: row.description,
    barangay: row.barangay,
    district: row.district,
    timestamp: row.timestamp,
    upvotes: row.upvotes,
    status: row.status as Report["status"],
    imageUrls,
  };
}

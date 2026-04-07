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
  image_key: string | null;
}

export function toReport(row: ReportRow): Report {
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
    imageUrl: row.image_key ? `/api/reports/${row.id}/image` : undefined,
  };
}

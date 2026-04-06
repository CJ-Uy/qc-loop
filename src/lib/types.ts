export type ReportCategory =
  | "flooding"
  | "trash"
  | "bad-driver"
  | "accident"
  | "biodiversity"
  | "other";

export type ReportStatus = "pending" | "verified" | "resolved";

export interface Report {
  id: string;
  category: ReportCategory;
  title: string;
  description: string;
  barangay: string;
  district: number;
  timestamp: string;
  upvotes: number;
  status: ReportStatus;
  imageUrl?: string;
}

export interface FloodZone {
  id: string;
  name: string;
  barangays: string[];
  severity: "low" | "medium" | "high";
  waterLevel: string;
  lastUpdated: string;
  coordinates: [number, number][];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  description: string;
}

export interface Professional {
  id: string;
  name: string;
  profession: string;
  barangay: string;
  bio: string;
  initials: string;
  color: string;
}

export interface Group {
  id: string;
  name: string;
  members: number;
  description: string;
  category: string;
  emoji: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

export interface ChatTopic {
  keywords: string[];
  response: string;
}

export interface CreditTransaction {
  id: string;
  action: string;
  points: number;
  date: string;
  type: "earn" | "redeem";
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  emoji: string;
}

export interface EarnAction {
  id: string;
  action: string;
  points: number;
  description: string;
  emoji: string;
}

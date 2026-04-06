import type { CreditTransaction, Reward, EarnAction } from "@/lib/types";

export const MOCK_BALANCE = 420;
export const MOCK_LEVEL = "Active Citizen";
export const NEXT_LEVEL = "QC Champion";
export const POINTS_TO_NEXT_LEVEL = 500;

export const MOCK_TRANSACTIONS: CreditTransaction[] = [
  { id: "t1", action: "Submitted flood report", points: 10, date: "2026-04-06", type: "earn" },
  { id: "t2", action: "Daily login bonus", points: 2, date: "2026-04-06", type: "earn" },
  { id: "t3", action: "Verified report #r3", points: 5, date: "2026-04-05", type: "earn" },
  { id: "t4", action: "Redeemed LRT-2 pass", points: -50, date: "2026-04-04", type: "redeem" },
  { id: "t5", action: "Attended QC Tech Meetup", points: 15, date: "2026-04-03", type: "earn" },
  { id: "t6", action: "Submitted biodiversity report", points: 10, date: "2026-04-02", type: "earn" },
  { id: "t7", action: "Daily login bonus", points: 2, date: "2026-04-01", type: "earn" },
  { id: "t8", action: "Verified report #r7", points: 5, date: "2026-03-31", type: "earn" },
];

export const EARN_ACTIONS: EarnAction[] = [
  { id: "a1", action: "Submit a Report", points: 10, description: "File any report via QCollect", emoji: "📍" },
  { id: "a2", action: "Verify a Report", points: 5, description: "Confirm a report from another resident", emoji: "✅" },
  { id: "a3", action: "Attend an Event", points: 15, description: "Check in at a QConnect event", emoji: "🗓️" },
  { id: "a4", action: "Daily Login", points: 2, description: "Open the app each day", emoji: "📱" },
  { id: "a5", action: "Complete Profile", points: 20, description: "Add photo and barangay info", emoji: "👤" },
  { id: "a6", action: "Biodiversity Sighting", points: 12, description: "Report a plant or animal sighting", emoji: "🌿" },
];

export const REWARDS: Reward[] = [
  { id: "rw1", title: "SM Cinema Ticket", description: "One (1) regular cinema ticket at any SM branch", points: 200, emoji: "🎬" },
  { id: "rw2", title: "LRT-2 Single Journey", description: "One single-journey LRT-2 pass", points: 50, emoji: "🚇" },
  { id: "rw3", title: "Jollibee Meal Voucher", description: "1-PC Chickenjoy meal voucher", points: 150, emoji: "🍗" },
  { id: "rw4", title: "Tree Planting Certificate", description: "Plant a tree in QC on your behalf", points: 0, emoji: "🌳" },
  { id: "rw5", title: "QC Tote Bag", description: "Official QC Loop reusable tote bag", points: 80, emoji: "👜" },
  { id: "rw6", title: "Coffee Voucher", description: "1 cup of any iced drink at Bo's Coffee", points: 100, emoji: "☕" },
];

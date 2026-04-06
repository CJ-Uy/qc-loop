import type { ChatTopic } from "@/lib/types";

export const CHAT_TOPICS: ChatTopic[] = [
  {
    keywords: ["flood", "baha", "tubig", "water", "flooded"],
    response:
      "🌊 **Flood Hotline:** Call QC DRRMO at **(02) 8925-0911** or text **0917-854-9911**. For rescue operations, call the QC Fire District at **(02) 8921-4234**. You can also report flood-prone areas directly through QCollect.",
  },
  {
    keywords: ["garbage", "basura", "trash", "waste", "collection", "pickup"],
    response:
      "🗑️ **Garbage Collection Schedule:**\n\n• **Districts 1–3:** Mon, Wed, Fri\n• **Districts 4–6:** Tue, Thu, Sat\n\nCollection is 6:00 AM – 12:00 NN. Segregate biodegradable (green bag) from non-biodegradable (black bag). Report missed pickups via QCollect.",
  },
  {
    keywords: ["report", "status", "update", "my report", "follow up"],
    response:
      "📋 **Report Status:** Head to the **QCollect** tab and filter by 'My Reports' to track your submissions. Reports typically receive an initial response within **24–48 hours**. Verified reports are forwarded to the relevant QC department within 72 hours.",
  },
  {
    keywords: ["barangay", "services", "certificate", "clearance", "hall"],
    response:
      "🏛️ **Barangay Services:** Visit your barangay hall for:\n\n• Barangay Clearance\n• Certificate of Indigency\n• Certificate of Residency\n• Blotter Reports\n\nMost barangay halls are open **Mon–Fri, 8:00 AM – 5:00 PM**. Bring a valid ID.",
  },
  {
    keywords: ["emergency", "911", "hotline", "help", "rescue", "police", "fire"],
    response:
      "🚨 **QC Emergency Hotlines:**\n\n• **Emergency:** 911\n• **QC Police:** (02) 8924-6123\n• **QC Fire District:** (02) 8921-4234\n• **QC DRRMO:** (02) 8925-0911\n• **NDRRMC:** 8911-5061\n\nFor medical emergencies, call **0917-851-6947** (QC Rescue).",
  },
  {
    keywords: ["credit", "points", "earn", "reward", "qcredit"],
    response:
      "⭐ **QCredit Points:**\n\n• Submit a report: **+10 pts**\n• Verify a report: **+5 pts**\n• Attend an event: **+15 pts**\n• Daily app login: **+2 pts**\n\nRedeem points for LRT-2 passes, cinema tickets, and local vouchers in the **QCredit** tab.",
  },
];

export const DEFAULT_RESPONSE =
  "🤖 I'm **Kaya**, your QC Loop assistant! I can help with flood hotlines, garbage schedules, report status, barangay services, emergency contacts, and QCredit points. What do you need help with?";

export const SUGGESTION_CHIPS = [
  "What's the flood hotline?",
  "When is garbage day?",
  "How do I earn QCredits?",
  "What barangay services are available?",
  "Emergency hotlines",
];

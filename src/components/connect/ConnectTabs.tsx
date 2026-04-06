"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MOCK_EVENTS } from "@/lib/mock-data/events";
import { MOCK_PROFESSIONALS } from "@/lib/mock-data/professionals";
import { MOCK_GROUPS } from "@/lib/mock-data/groups";
import { EventCard } from "./EventCard";
import { ProfessionalCard } from "./ProfessionalCard";
import { GroupCard } from "./GroupCard";
import { PageHeader } from "@/components/app/PageHeader";

type Tab = "events" | "professionals" | "groups";

const TABS: { value: Tab; label: string }[] = [
  { value: "events", label: "Events" },
  { value: "professionals", label: "Professionals" },
  { value: "groups", label: "Groups" },
];

export function ConnectTabs() {
  const [tab, setTab] = useState<Tab>("events");

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="QConnect" subtitle="Community & networking" />

      {/* Tabs */}
      <div className="flex border-b border-border">
        {TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
              tab === value
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tab === "events" && MOCK_EVENTS.map((e) => <EventCard key={e.id} event={e} />)}
        {tab === "professionals" && MOCK_PROFESSIONALS.map((p) => <ProfessionalCard key={p.id} professional={p} />)}
        {tab === "groups" && MOCK_GROUPS.map((g) => <GroupCard key={g.id} group={g} />)}
      </div>
    </div>
  );
}

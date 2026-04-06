"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  EARN_ACTIONS,
  REWARDS,
  MOCK_TRANSACTIONS,
  MOCK_BALANCE,
} from "@/lib/mock-data/credit";
import { PageHeader } from "@/components/app/PageHeader";
import { PointsCard } from "./PointsCard";

type Tab = "earn" | "redeem" | "history";

const TABS: { value: Tab; label: string }[] = [
  { value: "earn", label: "Earn" },
  { value: "redeem", label: "Redeem" },
  { value: "history", label: "History" },
];

export function CreditTabs() {
  const [tab, setTab] = useState<Tab>("earn");

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="QCredit" subtitle="Points & rewards" />
      <div className="flex-1 overflow-y-auto">
        <PointsCard />

        {/* Tabs */}
        <div className="flex border-b border-border mx-4 mt-4">
          {TABS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={cn(
                "flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
                tab === value
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-4 space-y-3">
          {/* Earn tab */}
          {tab === "earn" && EARN_ACTIONS.map((action) => (
            <div key={action.id} className="flex items-center gap-3 bg-background border border-border rounded-2xl p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {action.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">{action.action}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-success">+{action.points}</p>
                <p className="text-xs text-muted-foreground">pts</p>
              </div>
            </div>
          ))}

          {/* Redeem tab */}
          {tab === "redeem" && REWARDS.map((reward) => {
            const canAfford = MOCK_BALANCE >= reward.points;
            return (
              <div key={reward.id} className="flex items-center gap-3 bg-background border border-border rounded-2xl p-4">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {reward.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{reward.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{reward.description}</p>
                  <p className="text-xs font-bold text-primary mt-1">
                    {reward.points === 0 ? "Free" : `${reward.points} pts`}
                  </p>
                </div>
                <button
                  className={cn(
                    "flex-shrink-0 px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors",
                    canAfford
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                  disabled={!canAfford}
                >
                  {canAfford ? "Redeem" : "Need more pts"}
                </button>
              </div>
            );
          })}

          {/* History tab */}
          {tab === "history" && MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 bg-background border border-border rounded-2xl p-4">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0",
                tx.type === "earn" ? "bg-success/10" : "bg-destructive/10"
              )}>
                {tx.type === "earn" ? "⬆️" : "⬇️"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium">{tx.action}</p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
              <p className={cn(
                "text-sm font-bold flex-shrink-0",
                tx.type === "earn" ? "text-success" : "text-destructive"
              )}>
                {tx.points > 0 ? "+" : ""}{tx.points} pts
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

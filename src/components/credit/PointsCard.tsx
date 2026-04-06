import { MOCK_BALANCE, MOCK_LEVEL, NEXT_LEVEL, POINTS_TO_NEXT_LEVEL } from "@/lib/mock-data/credit";

export function PointsCard() {
  const progress = Math.round((MOCK_BALANCE / POINTS_TO_NEXT_LEVEL) * 100);

  return (
    <div className="mx-4 mt-4 bg-primary rounded-3xl p-5 text-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-white/70 text-xs font-medium">Your Balance</p>
          <p className="text-5xl font-black mt-1">{MOCK_BALANCE}</p>
          <p className="text-white/70 text-sm">QCredit points</p>
        </div>
        <div className="bg-accent/20 border border-accent/30 px-3 py-1.5 rounded-full">
          <p className="text-accent text-xs font-bold">{MOCK_LEVEL}</p>
        </div>
      </div>

      {/* Progress to next level */}
      <div>
        <div className="flex justify-between text-xs text-white/70 mb-1.5">
          <span>Progress to {NEXT_LEVEL}</span>
          <span>{MOCK_BALANCE}/{POINTS_TO_NEXT_LEVEL} pts</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

import { BottomNav } from "@/components/app/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center min-h-screen bg-border/40">
      <div className="relative w-full max-w-[430px] min-h-screen bg-background flex flex-col shadow-2xl">
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

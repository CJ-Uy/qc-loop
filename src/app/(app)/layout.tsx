import { BottomNav } from "@/components/app/BottomNav";
import { SideNav } from "@/components/app/SideNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile layout — hidden on md+ */}
      <div className="flex md:hidden justify-center min-h-screen bg-border/40">
        <div className="relative w-full max-w-107.5 min-h-screen bg-background flex flex-col shadow-2xl">
          <main className="flex-1 overflow-y-auto pb-20">
            {children}
          </main>
          <BottomNav />
        </div>
      </div>

      {/* Desktop layout — hidden below md */}
      <div className="hidden md:flex min-h-screen bg-background">
        <SideNav />
        <main className="flex-1 overflow-y-auto min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
}

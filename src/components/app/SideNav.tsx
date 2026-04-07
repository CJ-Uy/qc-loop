"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Map, Users, MessageCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/collect", label: "Collect", icon: MapPin },
  { href: "/map", label: "Map", icon: Map },
  { href: "/connect", label: "Connect", icon: Users },
  { href: "/care", label: "Care", icon: MessageCircle },
  { href: "/credit", label: "Credit", icon: Star },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0 border-r border-border flex flex-col py-6 px-3 bg-background sticky top-0 h-screen">
      <div className="mb-8 px-3 flex items-center gap-3">
        <Image src="/logo.png" alt="QC Loop" width={36} height={36} className="rounded-xl shrink-0" />
        <div>
          <h1 className="text-base font-bold text-foreground leading-tight">QC Loop</h1>
          <p className="text-xs text-muted-foreground">Quezon City</p>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                active
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-sm">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

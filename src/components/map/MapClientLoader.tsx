"use client";

import dynamic from "next/dynamic";

const QCityMapClient = dynamic(
  () => import("@/components/map/QCityMapClient").then((m) => m.QCityMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center bg-muted/30 text-muted-foreground text-sm">
        Loading map…
      </div>
    ),
  }
);

export function MapClientLoader() {
  return <QCityMapClient />;
}

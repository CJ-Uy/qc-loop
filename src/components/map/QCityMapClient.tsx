"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import L, { type LatLngExpression, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MOCK_FLOOD_ZONES } from "@/lib/mock-data/flood-zones";
import { MOCK_REPORTS } from "@/lib/mock-data/reports";
import { MapLayerToggle, type MapLayer } from "./MapLayerToggle";
import { ZoneBottomSheet } from "./ZoneBottomSheet";
import type { FloodZone } from "@/lib/types";
import { PageHeader } from "@/components/app/PageHeader";

// Fix Leaflet default marker icon paths for Next.js bundling
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const QC_CENTER: LatLngExpression = [14.676, 121.044];
const [QC_CENTER_LAT, QC_CENTER_LNG] = QC_CENTER as [number, number];

const SEVERITY_COLORS = {
  low: { color: "#16A34A", fillColor: "#16A34A", fillOpacity: 0.25 },
  medium: { color: "#D97706", fillColor: "#D97706", fillOpacity: 0.3 },
  high: { color: "#DC2626", fillColor: "#DC2626", fillOpacity: 0.35 },
};

const CATEGORY_EMOJI: Record<string, string> = {
  flooding: "🌊", trash: "🗑️", "bad-driver": "🚗",
  accident: "⚠️", biodiversity: "🌿", other: "📌",
};

const BUS_STOPS = [
  { id: "b1", name: "Cubao MRT Bus Stop", position: [14.619, 121.052] as LatLngExpression },
  { id: "b2", name: "Commonwealth Terminal", position: [14.700, 121.065] as LatLngExpression },
  { id: "b3", name: "Fairview Terminal", position: [14.720, 121.060] as LatLngExpression },
  { id: "b4", name: "Diliman Bus Stop", position: [14.651, 121.063] as LatLngExpression },
];

function makeEmojiIcon(emoji: string) {
  return divIcon({
    html: `<div style="font-size:20px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.4))">${emoji}</div>`,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export function QCityMapClient() {
  const [activeLayers, setActiveLayers] = useState<Set<MapLayer>>(
    new Set(["floods", "reports"])
  );
  const [selectedZone, setSelectedZone] = useState<FloodZone | null>(null);

  function toggleLayer(layer: MapLayer) {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layer)) next.delete(layer);
      else next.add(layer);
      return next;
    });
  }


  return (
    <div className="flex flex-col h-full">
      <PageHeader title="QCity Map" subtitle="Live flood & incident map" />

      {/* Layer toggles */}
      <div className="px-4 py-2 border-b border-border">
        <MapLayerToggle active={activeLayers} onToggle={toggleLayer} />
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={QC_CENTER}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* Flood zones */}
          {activeLayers.has("floods") &&
            MOCK_FLOOD_ZONES.map((zone) => (
              <Polygon
                key={zone.id}
                positions={zone.coordinates as LatLngExpression[]}
                pathOptions={SEVERITY_COLORS[zone.severity]}
                eventHandlers={{ click: () => setSelectedZone(zone) }}
              />
            ))}

          {/* Report markers */}
          {activeLayers.has("reports") &&
            MOCK_REPORTS.slice(0, 8).map((report, i) => {
              const lat = QC_CENTER_LAT + (((i * 7) % 13) - 6) * 0.008;
              const lng = QC_CENTER_LNG + (((i * 5) % 11) - 5) * 0.008;
              return (
                <Marker
                  key={report.id}
                  position={[lat, lng]}
                  icon={makeEmojiIcon(CATEGORY_EMOJI[report.category])}
                >
                  <Popup>
                    <strong>{report.title}</strong>
                    <br />
                    {report.barangay} · {report.status}
                  </Popup>
                </Marker>
              );
            })}

          {/* Bus stops */}
          {activeLayers.has("bus") &&
            BUS_STOPS.map((stop) => (
              <Marker
                key={stop.id}
                position={stop.position}
                icon={makeEmojiIcon("🚌")}
              >
                <Popup>{stop.name}</Popup>
              </Marker>
            ))}
        </MapContainer>

        {/* Flood severity legend */}
        {activeLayers.has("floods") && (
          <div className="absolute top-3 right-3 z-[1000] bg-background/90 backdrop-blur-sm border border-border rounded-xl p-2 text-xs space-y-1">
            <p className="font-semibold text-foreground mb-1">Flood Risk</p>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-success" /><span>Low</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-warning" /><span>Medium</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-destructive" /><span>High</span></div>
          </div>
        )}

        {/* Selected zone sheet */}
        {selectedZone && (
          <ZoneBottomSheet zone={selectedZone} onClose={() => setSelectedZone(null)} />
        )}
      </div>
    </div>
  );
}

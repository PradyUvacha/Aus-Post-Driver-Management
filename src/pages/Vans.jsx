import { useState } from "react";
import { Card, SectionHd, Badge, HealthBar, TopBar, ChevronRight, AlertIcon, formatDate, daysUntil } from "../components/ui.jsx";
import { VANS, DRIVERS, INSPECTION_HISTORY } from "../data/seed.js";

export default function Vans() {
  const [selected, setSelected] = useState(null);
  if (selected) return <VanDetail van={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="bg-navy px-4 pt-3 pb-3 flex-shrink-0">
        <div className="font-semibold text-white text-[15px]">Fleet</div>
        <div className="text-[10px] text-white/40 mt-0.5">{VANS.length} vans registered</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
        {VANS.map(v => {
          const assignedDriver = DRIVERS.find(d => d.dispatchLog[0]?.van === v.plate);
          const regDays = daysUntil(v.reg);
          return (
            <Card key={v.id} className="p-3" onClick={() => setSelected(v)}>
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5"><path d="M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[14px] text-gray-900 font-mono">{v.plate}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{v.make} · {v.year}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge label={v.status} variant={v.status === "active" ? "active" : "maintenance"} />
                  {v.violations > 0 && <Badge label={`${v.violations} violation${v.violations > 1 ? "s" : ""}`} variant="warning" />}
                </div>
              </div>
              <HealthBar pct={v.health} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-gray-400">{v.odometer.toLocaleString()} km · Reg expires {formatDate(v.reg)}</span>
                {regDays < 90 && <span className="text-[10px] text-amber-600 font-semibold">⚠ {regDays}d</span>}
              </div>
              {v.notes && <div className="mt-1.5 text-[10px] text-amber-700 bg-amber-50 rounded-lg px-2 py-1">{v.notes}</div>}
            </Card>
          );
        })}
        <div className="h-4" />
      </div>
    </div>
  );
}

function VanDetail({ van, onBack }) {
  const history = INSPECTION_HISTORY.filter(h => h.vanPlate === van.plate);
  const regDays = daysUntil(van.reg);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="bg-navy px-4 pt-3 pb-4 flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-white/50 text-[11px] mb-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Fleet
        </button>
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
          </div>
          <div>
            <div className="font-bold text-white text-[18px] font-mono">{van.plate}</div>
            <div className="text-[11px] text-white/50">{van.make} · {van.year}</div>
            <div className="flex gap-1.5 mt-1.5">
              <Badge label={van.status} variant={van.status === "active" ? "active" : "maintenance"} />
              {van.violations > 0 && <Badge label={`${van.violations} violation${van.violations > 1 ? "s" : ""}`} variant="warning" />}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        {/* Health */}
        <Card className="p-3">
          <SectionHd>Vehicle health</SectionHd>
          <HealthBar pct={van.health} />
          <div className="text-[10px] text-gray-400 mt-2">{van.odometer.toLocaleString()} km total odometer</div>
          {van.notes && <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 rounded-lg px-3 py-2">{van.notes}</div>}
        </Card>

        {/* Registration */}
        <div>
          <SectionHd>Registration</SectionHd>
          <Card className="overflow-hidden">
            {[
              ["Plate", van.plate],
              ["Make & model", van.make],
              ["Year", van.year],
              ["Reg expiry", formatDate(van.reg)],
              ["Days until expiry", `${regDays} days`],
            ].map(([k, v], i, arr) => (
              <div key={k} className={`flex justify-between items-center px-4 py-3 ${i < arr.length - 1 ? "border-b border-gray-50" : ""}`}>
                <span className="text-[11px] text-gray-500">{k}</span>
                <span className={`text-[11px] font-semibold font-mono ${k === "Days until expiry" && regDays < 90 ? "text-amber-600" : "text-gray-900"}`}>{v}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* Inspection history */}
        <div>
          <SectionHd>Inspection history</SectionHd>
          {history.length === 0 ? (
            <Card className="p-4 text-center text-[12px] text-gray-400">No inspections recorded yet</Card>
          ) : (
            <div className="flex flex-col gap-2">
              {history.map(h => (
                <Card key={h.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[12px] font-semibold text-gray-900">{formatDate(h.date)}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Inspector: {h.inspector} · Week {h.week}</div>
                    </div>
                    <Badge label={h.outcome} variant={h.outcome === "passed" ? "active" : "warning"} />
                  </div>
                  {h.notes && <div className="text-[10px] text-gray-500 mt-2 pt-2 border-t border-gray-50">{h.notes}</div>}
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}

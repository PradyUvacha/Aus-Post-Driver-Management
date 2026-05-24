import { useState } from "react";
import { Card, SectionHd, Avatar, Badge, ParcelPills, AlertIcon, PlusIcon } from "../components/ui.jsx";
import { DRIVERS, VANS } from "../data/seed.js";

export default function Home({ dispatches, onNewDispatch }) {
  const totalParcels = dispatches.reduce((a, d) => a + d.normal + d.express + d.xl, 0);
  const totalExpress = dispatches.reduce((a, d) => a + d.express, 0);
  const activeDrivers = DRIVERS.filter(d => d.status === "active").length;
  const pending = activeDrivers - dispatches.length;

  const licenseAlerts = DRIVERS.filter(d => {
    const days = Math.round((new Date(d.licenseExpiry) - new Date()) / (1000 * 60 * 60 * 24));
    return days < 180;
  });
  const maintenanceVans = VANS.filter(v => v.status === "maintenance");

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Top bar */}
      <div className="bg-navy px-4 pt-3 pb-3 flex items-center justify-between flex-shrink-0">
        <div>
          <div className="font-semibold text-white text-[15px]">Today's board</div>
          <div className="text-[10px] text-white/40 mt-0.5">
            {new Date().toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
        <button
          onClick={onNewDispatch}
          className="flex items-center gap-1.5 bg-ap-red text-white text-xs font-semibold px-3 py-2 rounded-xl"
        >
          <PlusIcon size={14} />
          Dispatch
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: "Dispatched", value: dispatches.length, sub: `of ${activeDrivers} drivers`, accent: null },
            { label: "Total parcels", value: totalParcels, sub: "across fleet", accent: null },
            { label: "Express parcels", value: totalExpress, sub: "priority", accent: "amber" },
            { label: "Pending dispatch", value: pending, sub: "not yet sent", accent: pending > 0 ? "red" : "green" },
          ].map(k => (
            <Card key={k.label} className="p-3">
              <div className={`text-2xl font-semibold leading-none ${k.accent === "red" ? "text-ap-red" : k.accent === "amber" ? "text-amber-600" : k.accent === "green" ? "text-green-600" : "text-gray-900"}`}>
                {k.value}
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">{k.label}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{k.sub}</div>
            </Card>
          ))}
        </div>

        {/* Dispatched drivers */}
        <div>
          <SectionHd>Dispatched today</SectionHd>
          {dispatches.length === 0 && (
            <Card className="p-4 text-center text-sm text-gray-400">No dispatches yet today</Card>
          )}
          <div className="flex flex-col gap-2.5">
            {dispatches.map(d => {
              const driver = DRIVERS.find(dr => dr.id === d.driverId);
              if (!driver) return null;
              const total = d.normal + d.express + d.xl;
              return (
                <Card key={d.id} className="p-3">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Avatar initials={driver.avatar} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[13px] text-gray-900">{driver.name}</div>
                      <div className="text-[10px] text-gray-400">{driver.code}</div>
                    </div>
                    <Badge label={driver.type === "fixed" ? "Fixed" : "Floating"} variant={driver.type} />
                    <Badge label="Out" variant="dispatched" />
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-700">{d.vanPlate}</span>
                    <span className="text-[10px] text-gray-400 ml-auto font-semibold">{total} total</span>
                  </div>
                  <ParcelPills normal={d.normal} express={d.express} xl={d.xl} compact />
                  <div className="text-[10px] text-gray-400 mt-1.5">{d.suburbs.join(" · ")}</div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Not yet dispatched */}
        {pending > 0 && (() => {
          const dispatchedIds = dispatches.map(d => d.driverId);
          const notDispatched = DRIVERS.filter(d => d.status === "active" && !dispatchedIds.includes(d.id));
          return (
            <div>
              <SectionHd>Not yet dispatched</SectionHd>
              <div className="flex flex-col gap-2">
                {notDispatched.map(d => (
                  <Card key={d.id} className="p-3 flex items-center gap-2.5">
                    <Avatar initials={d.avatar} size="sm" />
                    <div className="flex-1">
                      <div className="font-semibold text-[13px] text-gray-900">{d.name}</div>
                      <div className="text-[10px] text-gray-400">{d.code} · {d.type === "fixed" ? d.suburbs.map(s => s.name).join(", ") : "Floating"}</div>
                    </div>
                    <button onClick={onNewDispatch} className="text-[10px] bg-ap-red text-white font-semibold px-2.5 py-1.5 rounded-lg">
                      Dispatch
                    </button>
                  </Card>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Alerts */}
        {(licenseAlerts.length > 0 || maintenanceVans.length > 0) && (
          <div>
            <SectionHd>Alerts</SectionHd>
            <div className="flex flex-col gap-2">
              {licenseAlerts.map(d => {
                const days = Math.round((new Date(d.licenseExpiry) - new Date()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={d.id} className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2.5">
                    <AlertIcon size={14} />
                    <div>
                      <div className="text-[11px] font-semibold text-gray-900">{d.name} — license expiry</div>
                      <div className="text-[10px] text-amber-700 mt-0.5">Expires {d.licenseExpiry} · {days} days remaining</div>
                    </div>
                  </div>
                );
              })}
              {maintenanceVans.map(v => (
                <div key={v.id} className="bg-red-50 border border-red-200 rounded-xl p-3 flex gap-2.5">
                  <AlertIcon size={14} />
                  <div>
                    <div className="text-[11px] font-semibold text-gray-900">{v.plate} — in maintenance</div>
                    <div className="text-[10px] text-red-600 mt-0.5">{v.notes || "Unavailable for dispatch"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="h-4" />
      </div>
    </div>
  );
}

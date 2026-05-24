import { useState } from "react";
import { Card, Avatar, Badge, SectionHd, TopBar, ParcelPills, HealthBar,
         ChevronRight, EditIcon, PlusIcon, MapPinIcon, BranchIcon, XIcon,
         AlertIcon, CalendarIcon, daysUntil, formatDate, tenure } from "../components/ui.jsx";
import { DRIVERS } from "../data/seed.js";

// ── Driver List ───────────────────────────────────────────────────────────────
export default function Drivers({ onAddDriver }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  if (selected) return <DriverProfile driver={selected} onBack={() => setSelected(null)} />;

  const filters = [
    { key: "all", label: `All (${DRIVERS.length})` },
    { key: "active", label: `Active (${DRIVERS.filter(d => d.status === "active").length})` },
    { key: "fixed", label: "Fixed" },
    { key: "floating", label: "Floating" },
  ];

  const filtered = DRIVERS.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" ? true :
      filter === "active" ? d.status === "active" :
      filter === "fixed" ? d.type === "fixed" :
      filter === "floating" ? d.type === "floating" : true;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="bg-navy px-4 pt-3 pb-3 flex items-center justify-between flex-shrink-0">
        <div className="font-semibold text-white text-[15px]">Drivers</div>
        <button onClick={onAddDriver}
          className="flex items-center gap-1.5 bg-ap-red text-white text-xs font-semibold px-3 py-2 rounded-xl">
          <PlusIcon size={13} /> Add driver
        </button>
      </div>

      <div className="px-4 py-3 bg-white border-b border-gray-100 flex flex-col gap-2 flex-shrink-0">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input placeholder="Search drivers…" value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent flex-1 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {filters.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`flex-shrink-0 text-[10px] font-semibold px-3 py-1.5 rounded-full border transition-all ${filter === f.key ? "bg-navy text-white border-navy" : "bg-white text-gray-500 border-gray-200"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
        {filtered.map(d => {
          const days = daysUntil(d.licenseExpiry);
          const licenseWarn = days < 180;
          return (
            <Card key={d.id} className="p-3 flex items-center gap-3" onClick={() => setSelected(d)}>
              <Avatar initials={d.avatar} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[13px] text-gray-900">{d.name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{d.code} · {d.type === "fixed" ? d.suburbs[0]?.name : "Floating"}</div>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  <Badge label={d.type === "fixed" ? "Fixed" : "Floating"} variant={d.type} />
                  <Badge label={d.status} variant={d.status} />
                  {licenseWarn && <Badge label="⚠ License" variant="warning" />}
                </div>
              </div>
              <ChevronRight />
            </Card>
          );
        })}
        <div className="h-4" />
      </div>
    </div>
  );
}

// ── Driver Profile ────────────────────────────────────────────────────────────
function DriverProfile({ driver, onBack }) {
  const [tab, setTab] = useState("history");
  const [month, setMonth] = useState(4); // 0-indexed, May = 4
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const year = 2025;

  const monthLog = driver.dispatchLog.filter(l => {
    const d = new Date(l.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
  const activeDays = monthLog.filter(l => !l.leave).length;
  const totalParcels = monthLog.reduce((a, l) => a + l.normal + l.express + l.xl, 0);
  const totalNormal = monthLog.reduce((a, l) => a + l.normal, 0);
  const totalExpress = monthLog.reduce((a, l) => a + l.express, 0);
  const totalXl = monthLog.reduce((a, l) => a + l.xl, 0);
  const avgPerDay = activeDays > 0 ? Math.round(totalParcels / activeDays) : 0;
  const openIncidents = driver.incidents.filter(i => i.status === "open").length;
  const days = daysUntil(driver.licenseExpiry);

  const tabs = ["history", "license", "incidents", "route"];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Sticky header */}
      <div className="bg-navy flex-shrink-0">
        <div className="px-4 pt-3 pb-0">
          <button onClick={onBack} className="flex items-center gap-1.5 text-white/50 text-[11px] mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Drivers
          </button>
          <div className="flex gap-3 items-start mb-3">
            <Avatar initials={driver.avatar} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-[17px] leading-tight">{driver.name}</div>
              <div className="text-[10px] text-white/40 mt-0.5">{driver.code}</div>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                <Badge label={driver.type === "fixed" ? "Fixed route" : "Floating"} variant={driver.type} />
                <Badge label={driver.status} variant={driver.status} />
                {driver.expressCertified && <Badge label="Express certified" variant="express" />}
              </div>
              <div className="flex items-center gap-1 mt-2 text-white/35 text-[10px]">
                <CalendarIcon size={11} />
                <span>Since {formatDate(driver.employmentStart)} · {tenure(driver.employmentStart)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Tab strip */}
        <div className="flex border-t border-white/8">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-[10px] font-semibold capitalize border-b-2 transition-all ${tab === t ? "text-ap-red border-ap-red" : "text-white/35 border-transparent"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4 bg-gray-50">

        {/* ── HISTORY TAB ─────────────────────────────────────── */}
        {tab === "history" && (
          <>
            {/* Month selector */}
            <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-2.5">
              <button onClick={() => setMonth(m => Math.max(0, m - 1))} className="p-1 rounded-lg active:bg-gray-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span className="font-semibold text-[13px] text-gray-900">{MONTHS[month]} {year}</span>
              <button onClick={() => setMonth(m => Math.min(11, m + 1))} className="p-1 rounded-lg active:bg-gray-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            {/* Stats */}
            <div>
              <SectionHd>This month</SectionHd>
              <div className="grid grid-cols-2 gap-2.5">
                <Card className="p-3"><div className="text-2xl font-semibold text-green-600">{activeDays}</div><div className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">Active days</div><div className="text-[10px] text-gray-400 mt-0.5">of ~22 working days</div></Card>
                <Card className="p-3"><div className="text-2xl font-semibold text-gray-900">{totalParcels.toLocaleString()}</div><div className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">Parcels dispatched</div><div className="text-[10px] text-gray-400 mt-0.5">this month</div></Card>
                <Card className="p-3"><div className="text-2xl font-semibold text-amber-600">{avgPerDay}</div><div className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">Avg per day</div><div className="text-[10px] text-gray-400 mt-0.5">parcels / active day</div></Card>
                <Card className="p-3"><div className={`text-2xl font-semibold ${openIncidents > 0 ? "text-ap-red" : "text-gray-400"}`}>{openIncidents}</div><div className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">Open incidents</div><div className="text-[10px] text-gray-400 mt-0.5">this month</div></Card>
              </div>
            </div>

            {/* Parcel breakdown */}
            {totalParcels > 0 && (
              <div>
                <SectionHd>Parcel breakdown — {MONTHS[month]}</SectionHd>
                <Card className="p-3 flex flex-col gap-3">
                  {[
                    { label: "Normal", count: totalNormal, total: totalParcels, col: "bg-blue-500" },
                    { label: "Express", count: totalExpress, total: totalParcels, col: "bg-orange-500" },
                    { label: "XL", count: totalXl, total: totalParcels, col: "bg-amber-500" },
                  ].map(({ label, count, total, col }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-[11px] text-gray-700 w-12">{label}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                        <div className={`${col} h-1.5 rounded-full`} style={{ width: total > 0 ? `${Math.round(count / total * 100)}%` : "0%" }} />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-900 w-8 text-right">{count}</span>
                    </div>
                  ))}
                </Card>
              </div>
            )}

            {/* Dispatch log */}
            <div>
              <SectionHd>Dispatch log — {MONTHS[month]}</SectionHd>
              {monthLog.length === 0 && (
                <Card className="p-4 text-center text-[12px] text-gray-400">No dispatch records for this month</Card>
              )}
              <Card className="overflow-hidden">
                {monthLog.map((log, i) => {
                  const d = new Date(log.date);
                  const dayNum = d.getDate();
                  const dayName = d.toLocaleDateString("en-AU", { weekday: "short" });
                  const total = log.normal + log.express + log.xl;
                  return (
                    <div key={i} className={`flex gap-3 px-3 py-2.5 ${i < monthLog.length - 1 ? "border-b border-gray-50" : ""} ${log.leave ? "opacity-50" : ""}`}>
                      <div className="w-9 flex-shrink-0 text-center">
                        <div className="text-[15px] font-semibold text-gray-900 leading-none">{dayNum}</div>
                        <div className="text-[9px] text-gray-400 uppercase">{dayName}</div>
                      </div>
                      <div className="w-px bg-gray-100 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        {log.leave ? (
                          <div className="text-[11px] text-gray-400 italic pt-1">Not dispatched — leave</div>
                        ) : (
                          <>
                            <span className="text-[9px] font-mono bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-600">{log.van}</span>
                            <div className="text-[10px] text-gray-400 mt-1 truncate">{log.suburbs.join(" · ")}</div>
                            <div className="mt-1"><ParcelPills normal={log.normal} express={log.express} xl={log.xl} compact /></div>
                          </>
                        )}
                      </div>
                      {!log.leave && <div className="text-[12px] font-semibold text-gray-900 flex-shrink-0 pt-1">{total}</div>}
                    </div>
                  );
                })}
              </Card>
            </div>
          </>
        )}

        {/* ── LICENSE TAB ─────────────────────────────────────── */}
        {tab === "license" && (
          <>
            <div>
              <SectionHd>License details</SectionHd>
              <Card className="overflow-hidden">
                {[
                  ["License number", driver.license],
                  ["License class", driver.licenseClass],
                  ["State issued", "Victoria"],
                  ["Expiry date", formatDate(driver.licenseExpiry)],
                  ["Days remaining", `${days} days`],
                ].map(([k, v], i, arr) => (
                  <div key={k} className={`flex justify-between items-center px-4 py-3 ${i < arr.length - 1 ? "border-b border-gray-50" : ""}`}>
                    <span className="text-[11px] text-gray-500">{k}</span>
                    <span className={`text-[11px] font-semibold ${k === "Days remaining" ? (days < 90 ? "text-ap-red" : days < 180 ? "text-amber-600" : "text-green-600") : "text-gray-900"}`}>{v}</span>
                  </div>
                ))}
              </Card>
            </div>

            <div>
              <SectionHd>License photos</SectionHd>
              <div className="grid grid-cols-2 gap-3">
                {["Front", "Back"].map(side => (
                  <div key={side} className={`border rounded-xl p-4 flex flex-col items-center gap-2 ${driver.licensePhotoFront ? "bg-green-50 border-green-200" : "bg-gray-50 border-dashed border-gray-300"}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={driver.licensePhotoFront ? "#1D9E75" : "#9CA3AF"} strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    <span className="text-[10px] font-semibold" style={{ color: driver.licensePhotoFront ? "#1D9E75" : "#9CA3AF" }}>{side} · {driver.licensePhotoFront ? "uploaded" : "missing"}</span>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-center text-gray-400 mt-2">Uploaded {formatDate(driver.employmentStart)} during onboarding</div>
            </div>

            <div>
              <SectionHd>Employment record</SectionHd>
              <Card className="overflow-hidden">
                {[
                  ["Start date", formatDate(driver.employmentStart)],
                  ["Tenure", tenure(driver.employmentStart)],
                  ["Route type", driver.type === "fixed" ? "Fixed (since start)" : "Floating"],
                  ["Express certified", driver.expressCertified ? `Yes — since ${formatDate(driver.expressCertifiedSince)}` : "No"],
                  ["Total active days", driver.totalActiveDays.toLocaleString()],
                ].map(([k, v], i, arr) => (
                  <div key={k} className={`flex justify-between items-center px-4 py-3 ${i < arr.length - 1 ? "border-b border-gray-50" : ""}`}>
                    <span className="text-[11px] text-gray-500">{k}</span>
                    <span className={`text-[11px] font-semibold ${k === "Express certified" && driver.expressCertified ? "text-green-600" : "text-gray-900"}`}>{v}</span>
                  </div>
                ))}
              </Card>
            </div>
          </>
        )}

        {/* ── INCIDENTS TAB ───────────────────────────────────── */}
        {tab === "incidents" && (
          <>
            <div className="grid grid-cols-2 gap-2.5">
              <Card className="p-3"><div className={`text-2xl font-semibold ${openIncidents > 0 ? "text-ap-red" : "text-gray-400"}`}>{openIncidents}</div><div className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">Open</div></Card>
              <Card className="p-3"><div className="text-2xl font-semibold text-gray-900">{driver.incidents.length}</div><div className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">Total logged</div><div className="text-[10px] text-gray-400">all time</div></Card>
            </div>
            <div>
              <SectionHd>All incidents</SectionHd>
              {driver.incidents.length === 0 ? (
                <Card className="p-4 text-center text-[12px] text-gray-400">No incidents recorded</Card>
              ) : (
                <Card className="overflow-hidden">
                  {driver.incidents.map((inc, i) => {
                    const dotCol = inc.type === "damage" ? "bg-red-500" : inc.type === "accident" ? "bg-purple-500" : "bg-amber-500";
                    return (
                      <div key={inc.id} className={`flex gap-3 px-4 py-3 ${i < driver.incidents.length - 1 ? "border-b border-gray-50" : ""}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dotCol}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-semibold text-gray-900 capitalize">{inc.type}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5">{inc.desc}</div>
                          <div className="text-[10px] text-gray-400 mt-1">{formatDate(inc.date)} · {inc.van} · {inc.suburb}</div>
                        </div>
                        <Badge label={inc.status} variant={inc.status} />
                      </div>
                    );
                  })}
                </Card>
              )}
              <button className="w-full mt-3 py-3 border border-dashed border-gray-300 rounded-xl text-[12px] text-gray-400 flex items-center justify-center gap-2">
                <PlusIcon size={14} /> Log new incident
              </button>
            </div>
          </>
        )}

        {/* ── ROUTE TAB ───────────────────────────────────────── */}
        {tab === "route" && (
          <>
            {driver.type === "floating" ? (
              <Card className="p-4 text-center">
                <div className="text-[13px] font-semibold text-amber-700 mb-1">Floating driver</div>
                <div className="text-[11px] text-gray-500">No permanent route allocation. Suburbs are assigned daily at dispatch time by the supervisor.</div>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-semibold text-gray-900">Permanent allocation</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Assigned since {formatDate(driver.employmentStart)}</div>
                  </div>
                  <button className="flex items-center gap-1.5 bg-navy text-white text-[11px] font-semibold px-3 py-2 rounded-xl">
                    <EditIcon size={12} /> Edit
                  </button>
                </div>
                <Card className="overflow-hidden">
                  {driver.suburbs.map((sub, si) => (
                    <div key={sub.name} className={si < driver.suburbs.length - 1 ? "border-b border-gray-50" : ""}>
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50">
                        <MapPinIcon size={12} />
                        <span className="text-[12px] font-semibold text-gray-900">{sub.name}</span>
                      </div>
                      <div className="px-4 py-2 flex flex-col gap-1.5">
                        {sub.mainStreets.map(st => (
                          <div key={st} className="flex items-center gap-2">
                            <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">Main</span>
                            <span className="text-[11px] text-gray-800">{st}</span>
                          </div>
                        ))}
                        {sub.branchStreets.map(st => (
                          <div key={st} className="flex items-center gap-2">
                            <span className="text-[9px] bg-gray-50 text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-full">Branch</span>
                            <span className="text-[11px] text-gray-600">{st}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </Card>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2.5">
                  <AlertIcon size={12} />
                  <div className="text-[10px] text-amber-800">No active substitution. Go to Routes → Set substitution to cover this allocation if driver is on leave.</div>
                </div>
              </>
            )}
          </>
        )}
        <div className="h-4" />
      </div>
    </div>
  );
}

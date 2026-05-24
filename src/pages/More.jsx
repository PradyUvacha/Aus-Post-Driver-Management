import { useState } from "react";
import { Card, SectionHd, Avatar, Badge, TopBar, PlusIcon, MapPinIcon, EditIcon,
         TrashIcon, AlertIcon, BellIcon, CheckIcon, XIcon, ShareIcon, CopyIcon,
         CalendarIcon, formatDate } from "../components/ui.jsx";
import { DRIVERS, VANS, INSPECTION_CHECKLIST_TEMPLATE, INSPECTION_HISTORY, WEEKLY_INSPECTION_VANS, ONBOARDING_QUEUE } from "../data/seed.js";

// ── More menu ─────────────────────────────────────────────────────────────────
export default function More() {
  const [screen, setScreen] = useState("menu");
  const [inspectingVan, setInspectingVan] = useState(null);

  if (screen === "routes") return <Routes onBack={() => setScreen("menu")} />;
  if (screen === "inspections") return <Inspections onBack={() => setScreen("menu")} onStartInspection={v => { setInspectingVan(v); setScreen("checklist"); }} />;
  if (screen === "checklist") return <InspectionChecklist van={inspectingVan} onBack={() => setScreen("inspections")} onDone={() => setScreen("inspections")} />;
  if (screen === "adddriver") return <AddDriver onBack={() => setScreen("menu")} />;

  const items = [
    { key: "routes", icon: "🗺", label: "Route assignments", sub: "Manage driver routes & substitutions" },
    { key: "inspections", icon: "🔍", label: "Van inspections", sub: "Weekly schedule & checklists" },
    { key: "adddriver", icon: "👤", label: "Add new driver", sub: "Generate onboarding link" },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="bg-navy px-4 pt-3 pb-3 flex-shrink-0">
        <div className="font-semibold text-white text-[15px]">More</div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
        {items.map(item => (
          <Card key={item.key} className="p-4 flex items-center gap-3" onClick={() => setScreen(item.key)}>
            <div className="text-2xl">{item.icon}</div>
            <div className="flex-1">
              <div className="font-semibold text-[14px] text-gray-900">{item.label}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{item.sub}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Routes ────────────────────────────────────────────────────────────────────
function Routes({ onBack }) {
  const [subTab, setSubTab] = useState("permanent");
  const [showSubForm, setShowSubForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [subAbsent, setSubAbsent] = useState("");
  const [subSub, setSubSub] = useState("");
  const [subFrom, setSubFrom] = useState("");
  const [subTo, setSubTo] = useState("");
  const [subSaved, setSubSaved] = useState(false);

  const fixedDrivers = DRIVERS.filter(d => d.type === "fixed");

  if (editingDriver) return <RouteEditor driver={editingDriver} onBack={() => setEditingDriver(null)} />;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="bg-navy px-4 pt-3 pb-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div className="font-semibold text-white text-[15px] flex-1">Route assignments</div>
        {subTab === "permanent" && (
          <button onClick={() => setEditingDriver(DRIVERS.find(d => d.type === "fixed"))}
            className="bg-ap-red text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1">
            <PlusIcon size={12} /> Assign
          </button>
        )}
      </div>

      <div className="flex border-b border-gray-100 bg-white flex-shrink-0">
        {["permanent", "substitutions"].map(t => (
          <button key={t} onClick={() => setSubTab(t)}
            className={`flex-1 py-3 text-[11px] font-semibold capitalize border-b-2 transition-all ${subTab === t ? "text-ap-red border-ap-red" : "text-gray-400 border-transparent"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {subTab === "permanent" && fixedDrivers.map(driver => (
          <Card key={driver.id} className="overflow-hidden">
            <div className="flex items-center gap-3 p-3 border-b border-gray-50">
              <Avatar initials={driver.avatar} size="sm" />
              <div className="flex-1">
                <div className="font-semibold text-[13px] text-gray-900">{driver.name}</div>
                <div className="text-[10px] text-gray-400">{driver.code}</div>
              </div>
              <button onClick={() => setEditingDriver(driver)}
                className="flex items-center gap-1 bg-gray-100 text-gray-600 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg">
                <EditIcon size={11} /> Edit
              </button>
            </div>
            {driver.suburbs.map((sub, si) => (
              <div key={sub.name} className={si < driver.suburbs.length - 1 ? "border-b border-gray-50" : ""}>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50/60">
                  <MapPinIcon size={11} />
                  <span className="text-[11px] font-semibold text-gray-800">{sub.name}</span>
                </div>
                <div className="px-4 py-2 flex flex-col gap-1">
                  {sub.mainStreets.map(st => (
                    <div key={st} className="flex items-center gap-2">
                      <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full whitespace-nowrap">Main</span>
                      <span className="text-[11px] text-gray-700">{st}</span>
                    </div>
                  ))}
                  {sub.branchStreets.map(st => (
                    <div key={st} className="flex items-center gap-2">
                      <span className="text-[9px] bg-white border border-gray-200 text-gray-400 px-1.5 py-0.5 rounded-full whitespace-nowrap">Branch</span>
                      <span className="text-[11px] text-gray-600">{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        ))}

        {subTab === "substitutions" && (
          <>
            {!showSubForm && !subSaved && (
              <button onClick={() => setShowSubForm(true)}
                className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-[12px] text-gray-400 flex items-center justify-center gap-2">
                <PlusIcon size={14} /> Set new substitution
              </button>
            )}

            {showSubForm && !subSaved && (
              <Card className="p-4 flex flex-col gap-4">
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-[10px] text-amber-800">
                  The absent driver's route is temporarily handed to a substitute. The original route restores automatically after the period ends.
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Absent driver</label>
                  <select value={subAbsent} onChange={e => setSubAbsent(e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-900 bg-white focus:outline-none appearance-none">
                    <option value="">Select driver…</option>
                    {DRIVERS.filter(d => d.type === "fixed").map(d => (
                      <option key={d.id} value={d.id}>{d.code} — {d.name}</option>
                    ))}
                  </select>
                  {subAbsent && (() => {
                    const d = DRIVERS.find(dr => dr.id === parseInt(subAbsent));
                    return d && <div className="text-[10px] text-gray-500">Route: {d.suburbs.map(s => s.name).join(" · ")}</div>;
                  })()}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Substitute driver</label>
                  <select value={subSub} onChange={e => setSubSub(e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-900 bg-white focus:outline-none appearance-none">
                    <option value="">Select substitute…</option>
                    {DRIVERS.filter(d => d.id !== parseInt(subAbsent)).map(d => (
                      <option key={d.id} value={d.id}>{d.code} — {d.name} ({d.type})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">From</label>
                    <input type="date" value={subFrom} onChange={e => setSubFrom(e.target.value)}
                      className="border border-gray-200 rounded-xl px-3 py-2.5 text-[12px] text-gray-900 focus:outline-none" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">To</label>
                    <input type="date" value={subTo} onChange={e => setSubTo(e.target.value)}
                      className="border border-gray-200 rounded-xl px-3 py-2.5 text-[12px] text-gray-900 focus:outline-none" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => setShowSubForm(false)}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-[13px] text-gray-500 font-medium">Cancel</button>
                  <button onClick={() => { if (subAbsent && subSub && subFrom && subTo) { setShowSubForm(false); setSubSaved(true); } }}
                    className="flex-[2] py-3 bg-ap-red rounded-xl text-white font-semibold text-[13px]">Confirm substitution</button>
                </div>
              </Card>
            )}

            {subSaved && (
              <Card className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon size={12} />
                  </div>
                  <div className="font-semibold text-[13px] text-gray-900">Active substitution</div>
                  <Badge label="Active" variant="active" />
                </div>
                {subAbsent && subSub && (() => {
                  const absent = DRIVERS.find(d => d.id === parseInt(subAbsent));
                  const sub = DRIVERS.find(d => d.id === parseInt(subSub));
                  return (
                    <>
                      <div className="text-[11px] text-gray-600">{sub?.name} covering {absent?.name}'s route</div>
                      <div className="text-[11px] text-gray-500">{subFrom} → {subTo}</div>
                      <div className="text-[10px] text-gray-400 bg-gray-50 rounded-lg p-2 mt-1">
                        Suburbs: {absent?.suburbs.map(s => s.name).join(" · ")}
                      </div>
                    </>
                  );
                })()}
                <button onClick={() => { setSubSaved(false); setSubAbsent(""); setSubSub(""); setSubFrom(""); setSubTo(""); }}
                  className="text-[11px] text-ap-red font-semibold">Remove substitution</button>
              </Card>
            )}

            {!showSubForm && !subSaved && (
              <div className="text-center text-[12px] text-gray-400 py-8">No active substitutions</div>
            )}
          </>
        )}
        <div className="h-4" />
      </div>
    </div>
  );
}

// ── Route Editor ──────────────────────────────────────────────────────────────
function RouteEditor({ driver, onBack }) {
  const [suburbs, setSuburbs] = useState(driver.suburbs.map(s => ({ ...s, mainStreets: [...s.mainStreets], branchStreets: [...s.branchStreets] })));
  const [newStreet, setNewStreet] = useState({});
  const [saved, setSaved] = useState(false);

  const addStreet = (subIdx, type) => {
    const key = `${subIdx}-${type}`;
    const val = newStreet[key]?.trim();
    if (!val) return;
    const updated = [...suburbs];
    if (type === "main") updated[subIdx].mainStreets.push(val);
    else updated[subIdx].branchStreets.push(val);
    setSuburbs(updated);
    setNewStreet(prev => ({ ...prev, [key]: "" }));
  };

  const removeStreet = (subIdx, type, stIdx) => {
    const updated = [...suburbs];
    if (type === "main") updated[subIdx].mainStreets.splice(stIdx, 1);
    else updated[subIdx].branchStreets.splice(stIdx, 1);
    setSuburbs(updated);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="bg-navy px-4 pt-3 pb-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div className="font-semibold text-white text-[15px] flex-1">Edit route — {driver.name}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center text-[12px] text-green-700 font-semibold">✓ Route saved successfully</div>
        )}
        {suburbs.map((sub, si) => (
          <Card key={sub.name} className="overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border-b border-gray-100">
              <MapPinIcon size={12} />
              <span className="font-semibold text-[13px] text-gray-900 flex-1">{sub.name}</span>
            </div>
            <div className="p-3 flex flex-col gap-4">
              {/* Main streets */}
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Main streets</div>
                <div className="flex flex-col gap-1.5">
                  {sub.mainStreets.map((st, sti) => (
                    <div key={sti} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M8 21l4-18 4 18M5 15l14 0M3 21l18 0"/></svg>
                      <span className="text-[12px] text-gray-800 flex-1">{st}</span>
                      <button onClick={() => removeStreet(si, "main", sti)} className="p-1 rounded text-gray-300 active:text-red-500">
                        <TrashIcon size={12} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input placeholder="Add main street…"
                      value={newStreet[`${si}-main`] || ""}
                      onChange={e => setNewStreet(prev => ({ ...prev, [`${si}-main`]: e.target.value }))}
                      onKeyDown={e => e.key === "Enter" && addStreet(si, "main")}
                      className="flex-1 border border-dashed border-gray-300 rounded-lg px-2.5 py-2 text-[12px] focus:outline-none" />
                    <button onClick={() => addStreet(si, "main")}
                      className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <PlusIcon size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Branch streets */}
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Branch / side streets</div>
                <div className="flex flex-col gap-1.5">
                  {sub.branchStreets.map((st, sti) => (
                    <div key={sti} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100 rounded-lg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 21a3 3 0 100-6 3 3 0 000 6zM6 15a6 6 0 0012-6"/></svg>
                      <span className="text-[12px] text-gray-700 flex-1">{st}</span>
                      <button onClick={() => removeStreet(si, "branch", sti)} className="p-1 rounded text-gray-300 active:text-red-500">
                        <TrashIcon size={12} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input placeholder="Add branch street…"
                      value={newStreet[`${si}-branch`] || ""}
                      onChange={e => setNewStreet(prev => ({ ...prev, [`${si}-branch`]: e.target.value }))}
                      onKeyDown={e => e.key === "Enter" && addStreet(si, "branch")}
                      className="flex-1 border border-dashed border-gray-300 rounded-lg px-2.5 py-2 text-[12px] focus:outline-none" />
                    <button onClick={() => addStreet(si, "branch")}
                      className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <PlusIcon size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
        <div className="h-4" />
      </div>

      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <button onClick={() => { setSaved(true); setTimeout(onBack, 1200); }}
          className="w-full bg-ap-red text-white font-semibold text-[15px] py-4 rounded-2xl">
          Save route
        </button>
      </div>
    </div>
  );
}

// ── Inspections ───────────────────────────────────────────────────────────────
function Inspections({ onBack, onStartInspection }) {
  const weeklyVans = WEEKLY_INSPECTION_VANS.map(p => VANS.find(v => v.plate === p)).filter(Boolean);
  const inspectedCount = 42; const totalVans = 60;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="bg-navy px-4 pt-3 pb-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div className="font-semibold text-white text-[15px] flex-1">Van inspections</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        {/* Weekly alert */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <BellIcon size={16} />
            <div>
              <div className="font-semibold text-[13px] text-red-900">Week 21 — inspection due</div>
              <div className="text-[10px] text-red-600 mt-0.5">2 vans selected · Complete by Friday</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            {weeklyVans.map(v => (
              <div key={v.plate} className="bg-white rounded-xl p-2.5">
                <div className="font-bold text-[12px] text-gray-900 font-mono">{v.plate}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{v.make}</div>
                <div className="text-[9px] text-gray-400 mt-1">Last: {formatDate(v.lastInspection)}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onStartInspection(weeklyVans[0])}
            className="w-full bg-ap-red text-white font-semibold text-[13px] py-3 rounded-xl">
            Start inspection checklist
          </button>
        </div>

        {/* Cycle progress */}
        <div>
          <SectionHd>Cycle progress — week 21 of 30</SectionHd>
          <Card className="p-3">
            <div className="h-2 bg-gray-100 rounded-full mb-2">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: `${Math.round(inspectedCount / totalVans * 100)}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>{inspectedCount} of {totalVans} vans inspected this cycle</span>
              <span>{Math.round(inspectedCount / totalVans * 100)}%</span>
            </div>
          </Card>
        </div>

        {/* Recent inspections */}
        <div>
          <SectionHd>Recent inspections</SectionHd>
          <div className="flex flex-col gap-2">
            {INSPECTION_HISTORY.map(h => (
              <Card key={h.id} className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono font-bold text-[13px] text-gray-900">{h.vanPlate}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{formatDate(h.date)} · {h.inspector}</div>
                  </div>
                  <Badge label={h.outcome} variant={h.outcome === "passed" ? "active" : "warning"} />
                </div>
                {h.notes && <div className="text-[10px] text-gray-500 mt-2 pt-2 border-t border-gray-50">{h.notes}</div>}
              </Card>
            ))}
          </div>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}

// ── Inspection Checklist ──────────────────────────────────────────────────────
function InspectionChecklist({ van, onBack, onDone }) {
  const allItems = INSPECTION_CHECKLIST_TEMPLATE.flatMap(s => s.items);
  const [results, setResults] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(results).length;
  const total = allItems.length;
  const pct = Math.round(answered / total * 100);

  const setResult = (item, val) => setResults(prev => ({ ...prev, [item]: val }));

  if (submitted) return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="bg-navy px-4 pt-3 pb-3 flex-shrink-0">
        <div className="font-semibold text-white text-[15px]">Inspection complete</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckIcon size={28} />
        </div>
        <div className="text-[16px] font-semibold text-gray-900 text-center">Inspection submitted</div>
        <div className="text-[13px] text-gray-500 text-center">
          {van?.plate} — {answered} of {total} items recorded.{" "}
          {Object.values(results).some(v => v === "fail") ? "⚠ Failed items flagged for maintenance." : "All clear."}
        </div>
        <button onClick={onDone} className="mt-4 bg-ap-red text-white font-semibold px-8 py-4 rounded-2xl text-[15px]">
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="bg-navy px-4 pt-3 pb-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div className="flex-1">
          <div className="font-semibold text-white text-[15px]">Inspection — {van?.plate}</div>
          <div className="text-[10px] text-white/40">{van?.make} · {new Date().toLocaleDateString("en-AU")}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-2 bg-white border-b border-gray-100 flex-shrink-0">
        <div className="h-1.5 bg-gray-100 rounded-full">
          <div className="h-1.5 bg-ap-red rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-[10px] text-gray-400 text-right mt-1">{answered} of {total} items</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {INSPECTION_CHECKLIST_TEMPLATE.map(section => (
          <Card key={section.section} className="overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border-b border-gray-100">
              <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">{section.section}</span>
            </div>
            {section.items.map((item, i) => {
              const r = results[item];
              return (
                <div key={item} className={`flex items-center gap-3 px-3 py-3 ${i < section.items.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <span className="text-[12px] text-gray-800 flex-1">{item}</span>
                  <div className="flex gap-1.5">
                    {[
                      { val: "pass", label: "Pass", col: "text-green-700 border-green-300", selCol: "bg-green-500 text-white border-green-500" },
                      { val: "note", label: "Note", col: "text-amber-700 border-amber-300", selCol: "bg-amber-500 text-white border-amber-500" },
                      { val: "fail", label: "Fail", col: "text-red-700 border-red-300", selCol: "bg-red-500 text-white border-red-500" },
                    ].map(opt => (
                      <button key={opt.val} onClick={() => setResult(item, opt.val)}
                        className={`text-[9px] font-semibold px-2 py-1 rounded border transition-all ${r === opt.val ? opt.selCol : `bg-white ${opt.col}`}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </Card>
        ))}
        <div className="h-4" />
      </div>

      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <button
          onClick={() => { if (answered > 0) setSubmitted(true); }}
          className={`w-full font-semibold text-[15px] py-4 rounded-2xl transition-all ${answered > 0 ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"}`}>
          Submit inspection
        </button>
      </div>
    </div>
  );
}

// ── Add Driver ────────────────────────────────────────────────────────────────
function AddDriver({ onBack }) {
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const linkCode = "xK9mP2qR7vL";
  const link = `auspostfleet.app/onboard/${linkCode}`;

  const copyLink = () => {
    navigator.clipboard?.writeText(`https://${link}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({ title: "AusPost Fleet — Driver Onboarding", url: `https://${link}` });
    } else copyLink();
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="bg-navy px-4 pt-3 pb-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div className="font-semibold text-white text-[15px]">Add new driver</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">
        <div className="text-[13px] text-gray-500 leading-relaxed">
          Generate a secure onboarding link and share it with the new driver. They fill in their personal details, license info and upload photos — nothing to type here.
        </div>

        {!linkGenerated ? (
          <button onClick={() => setLinkGenerated(true)}
            className="w-full bg-ap-red text-white font-semibold text-[15px] py-4 rounded-2xl">
            Generate onboarding link
          </button>
        ) : (
          <>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckIcon size={12} />
                </div>
                <div className="font-semibold text-[13px] text-green-900">Link generated</div>
              </div>
              <div className="font-mono text-[11px] text-blue-700 bg-blue-50 rounded-xl px-3 py-2.5 break-all border border-blue-100">{link}</div>
              <div className="text-[10px] text-green-700">Expires in 48 hours · Single use only</div>
            </div>

            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Share via</div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "WhatsApp", col: "text-green-600", icon: "💬", action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`Hi! Please fill in your driver onboarding form: https://${link}`)}`) },
                  { label: "Email", col: "text-blue-600", icon: "✉️", action: () => window.open(`mailto:?subject=AusPost Driver Onboarding&body=Please complete your onboarding: https://${link}`) },
                  { label: "SMS", col: "text-gray-600", icon: "💬", action: () => window.open(`sms:?body=Complete your AusPost onboarding: https://${link}`) },
                  { label: copied ? "Copied!" : "Copy link", col: "text-gray-600", icon: "📋", action: copyLink },
                  { label: "Share…", col: "text-gray-600", icon: "⬆️", action: shareLink },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action}
                    className="border border-gray-100 rounded-xl py-3 flex flex-col items-center gap-1.5 bg-white active:bg-gray-50">
                    <span className="text-xl">{btn.icon}</span>
                    <span className={`text-[9px] font-semibold ${btn.col}`}>{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <SectionHd>What the driver fills in</SectionHd>
              <Card className="p-3 flex flex-col gap-2.5">
                {["Full name & contact details", "Home address", "License number, class & expiry", "License photo (front & back)"].map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckIcon size={10} />
                    </div>
                    <span className="text-[12px] text-gray-600">{item}</span>
                  </div>
                ))}
              </Card>
            </div>

            <div>
              <SectionHd>Pending review</SectionHd>
              {ONBOARDING_QUEUE.map(q => (
                <Card key={q.id} className="p-3 flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-[12px] font-semibold text-gray-400">
                    {q.status === "submitted" ? q.name.split(" ").map(n => n[0]).join("") : "—"}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[13px] text-gray-900">{q.name}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {q.status === "submitted" ? "Submitted · awaiting review" : "Link sent · waiting for form"}
                    </div>
                  </div>
                  {q.status === "submitted" ? (
                    <button className="bg-ap-red text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-lg">Review</button>
                  ) : (
                    <Badge label="Waiting" variant="pending" />
                  )}
                </Card>
              ))}
            </div>

            <button onClick={() => { setLinkGenerated(false); setCopied(false); }}
              className="w-full border border-gray-200 text-gray-500 font-semibold text-[13px] py-3 rounded-2xl">
              Generate another link
            </button>
          </>
        )}
      </div>
    </div>
  );
}

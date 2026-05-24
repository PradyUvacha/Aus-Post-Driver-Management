import { useState } from "react";
import { TopBar, ParcelPills, XIcon } from "../components/ui.jsx";
import { DRIVERS, VANS } from "../data/seed.js";

export default function NewDispatch({ onConfirm, onCancel, existingDispatches }) {
  const [driverId, setDriverId] = useState("");
  const [vanPlate, setVanPlate] = useState("");
  const [normal, setNormal] = useState(true);
  const [express, setExpress] = useState(false);
  const [xl, setXl] = useState(false);
  const [normalCount, setNormalCount] = useState("");
  const [expressCount, setExpressCount] = useState("");
  const [xlCount, setXlCount] = useState("");
  const [error, setError] = useState("");

  const dispatchedDriverIds = existingDispatches.map(d => d.driverId);
  const dispatchedVans = existingDispatches.map(d => d.vanPlate);

  const availableDrivers = DRIVERS.filter(d => d.status === "active" && !dispatchedDriverIds.includes(d.id));
  const availableVans = VANS.filter(v => v.status === "active" && !dispatchedVans.includes(v.plate));

  const selectedDriver = DRIVERS.find(d => d.id === parseInt(driverId));
  const total = (normal ? parseInt(normalCount) || 0 : 0) +
                (express ? parseInt(expressCount) || 0 : 0) +
                (xl ? parseInt(xlCount) || 0 : 0);

  function handleConfirm() {
    if (!driverId) { setError("Please select a driver."); return; }
    if (!vanPlate) { setError("Please select a van."); return; }
    if (total === 0) { setError("Please enter at least one parcel count."); return; }
    onConfirm({
      id: Date.now(),
      driverId: parseInt(driverId),
      vanPlate,
      suburbs: selectedDriver?.type === "fixed"
        ? selectedDriver.suburbs.map(s => s.name)
        : ["Floating — TBD"],
      normal: normal ? parseInt(normalCount) || 0 : 0,
      express: express ? parseInt(expressCount) || 0 : 0,
      xl: xl ? parseInt(xlCount) || 0 : 0,
      time: new Date().toTimeString().slice(0, 5),
    });
  }

  const ParcelTypeRow = ({ label, variant, checked, onToggle, count, onCount }) => {
    const pillStyle = variant === "normal" ? "bg-blue-50 text-blue-700" :
                      variant === "express" ? "bg-orange-50 text-orange-700" : "bg-amber-50 text-amber-700";
    const pillLabel = variant === "normal" ? "Standard" : variant === "express" ? "Priority" : "Oversize";
    return (
      <div
        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${checked ? "border-gray-300 bg-gray-50" : "border-gray-100 bg-white"}`}
        onClick={() => onToggle(!checked)}
      >
        <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border-2 transition-all ${checked ? "bg-ap-red border-ap-red" : "border-gray-300"}`}>
          {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
        </div>
        <span className={`text-[13px] font-medium flex-1 ${checked ? "text-gray-900" : "text-gray-400"}`}>{label}</span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${pillStyle}`}>{pillLabel}</span>
        {checked && (
          <input
            type="number" min="0" placeholder="0"
            value={count}
            onChange={e => { e.stopPropagation(); onCount(e.target.value); }}
            onClick={e => e.stopPropagation()}
            className="w-14 text-center border border-gray-200 rounded-lg py-1.5 text-[13px] font-mono font-semibold text-gray-900 bg-white focus:outline-none focus:border-gray-400"
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <div className="bg-navy px-4 pt-3 pb-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10">
          <XIcon size={16} />
        </button>
        <div className="flex-1">
          <div className="font-semibold text-white text-[15px]">New dispatch</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">

        {/* Driver */}
        <div>
          <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">Driver</label>
          <select
            value={driverId}
            onChange={e => { setDriverId(e.target.value); setVanPlate(""); setError(""); }}
            className="w-full border border-gray-200 rounded-xl px-3 py-3 text-[13px] text-gray-900 bg-white focus:outline-none focus:border-gray-400 appearance-none"
          >
            <option value="">Select a driver…</option>
            {availableDrivers.map(d => (
              <option key={d.id} value={d.id}>{d.code} — {d.name}</option>
            ))}
          </select>

          {selectedDriver && (
            <div className="mt-2 flex items-start gap-1.5 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1D6FA5" strokeWidth="2" className="mt-0.5 flex-shrink-0"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4"/></svg>
              <div>
                {selectedDriver.type === "fixed" ? (
                  <span className="text-[10px] text-blue-700 font-medium">
                    Fixed: {selectedDriver.suburbs.map(s => s.name).join(" · ")}
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-700 font-medium">Floating driver — assign suburbs manually</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Van */}
        <div>
          <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">Van registration</label>
          <select
            value={vanPlate}
            onChange={e => { setVanPlate(e.target.value); setError(""); }}
            className="w-full border border-gray-200 rounded-xl px-3 py-3 text-[13px] text-gray-900 bg-white focus:outline-none focus:border-gray-400 appearance-none font-mono"
          >
            <option value="">Select a van…</option>
            {availableVans.map(v => (
              <option key={v.id} value={v.plate}>{v.plate} — {v.make}</option>
            ))}
          </select>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Parcel types */}
        <div>
          <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-3">Parcel types</label>
          <div className="flex flex-col gap-2">
            <ParcelTypeRow label="Normal" variant="normal" checked={normal} onToggle={setNormal} count={normalCount} onCount={setNormalCount} />
            <ParcelTypeRow label="Express" variant="express" checked={express} onToggle={setExpress} count={expressCount} onCount={setExpressCount} />
            <ParcelTypeRow label="XL" variant="xl" checked={xl} onToggle={setXl} count={xlCount} onCount={setXlCount} />
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl">
          <span className="text-[12px] text-gray-500 font-medium">Total parcels</span>
          <span className="text-[20px] font-bold text-gray-900 font-mono">{total}</span>
        </div>

        {error && (
          <div className="text-[12px] text-ap-red font-medium text-center px-2">{error}</div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <button
          onClick={handleConfirm}
          className="w-full bg-ap-red text-white font-semibold text-[15px] py-4 rounded-2xl active:opacity-80 transition-opacity"
        >
          Confirm dispatch
        </button>
      </div>
    </div>
  );
}

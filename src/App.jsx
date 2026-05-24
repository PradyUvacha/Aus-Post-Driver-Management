import { useState } from "react";
import { BottomTab } from "./components/ui.jsx";
import Home from "./pages/Home.jsx";
import NewDispatch from "./pages/NewDispatch.jsx";
import Drivers from "./pages/Drivers.jsx";
import Vans from "./pages/Vans.jsx";
import More from "./pages/More.jsx";
import { TODAY_DISPATCHES, DRIVERS } from "./data/seed.js";

export default function App() {
  const [tab, setTab] = useState("home");
  const [showDispatch, setShowDispatch] = useState(false);
  const [dispatches, setDispatches] = useState(TODAY_DISPATCHES);

  function handleNewDispatch(entry) {
    setDispatches(prev => [...prev, entry]);
    setShowDispatch(false);
    setTab("home");
  }

  if (showDispatch) {
    return (
      <div className="h-screen flex flex-col max-w-md mx-auto overflow-hidden">
        <NewDispatch
          onConfirm={handleNewDispatch}
          onCancel={() => setShowDispatch(false)}
          existingDispatches={dispatches}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col max-w-md mx-auto overflow-hidden bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {tab === "home" && <Home dispatches={dispatches} onNewDispatch={() => setShowDispatch(true)} />}

        {tab === "dispatch" && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="bg-navy px-4 pt-3 pb-3 flex-shrink-0">
              <div className="font-semibold text-white text-[15px]">Dispatch log</div>
              <div className="text-[10px] text-white/40 mt-0.5">Today's records</div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {dispatches.map((d, i) => {
                const driver = DRIVERS.find(dr => dr.id === d.driverId);
                const total = d.normal + d.express + d.xl;
                return (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="font-semibold text-[13px] text-gray-900">{driver?.name}</div>
                      <div className="font-mono text-[11px] bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-700">{d.vanPlate}</div>
                    </div>
                    <div className="text-[10px] text-gray-400 mb-2">{d.suburbs.join(" · ")}</div>
                    <div className="flex gap-1.5 flex-wrap">
                      {d.normal > 0 && <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full">Normal ×{d.normal}</span>}
                      {d.express > 0 && <span className="text-[10px] bg-orange-50 text-orange-700 font-semibold px-2 py-0.5 rounded-full">Express ×{d.express}</span>}
                      {d.xl > 0 && <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full">XL ×{d.xl}</span>}
                      <span className="text-[10px] text-gray-400 ml-auto">{total} total · {d.time}</span>
                    </div>
                  </div>
                );
              })}
              {dispatches.length === 0 && <div className="text-center text-gray-400 text-sm py-12">No dispatches today</div>}
              <button onClick={() => setShowDispatch(true)}
                className="w-full py-3.5 bg-ap-red text-white font-semibold rounded-2xl text-[14px]">
                + New dispatch
              </button>
              <div className="h-4" />
            </div>
          </div>
        )}

        {tab === "drivers" && <Drivers onAddDriver={() => setTab("more")} />}
        {tab === "vans" && <Vans />}
        {tab === "more" && <More />}
      </div>
      <BottomTab active={tab} onChange={setTab} />
    </div>
  );
}

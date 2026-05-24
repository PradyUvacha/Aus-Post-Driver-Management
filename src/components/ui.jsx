// ── Avatar ────────────────────────────────────────────────────────────────────
const AV_COLORS = {
  LN: "bg-ap-red", SO: "bg-blue-600", MB: "bg-teal-700",
  PS: "bg-amber-700", TW: "bg-purple-700",
};
export function Avatar({ initials, size = "md" }) {
  const sz = size === "sm" ? "w-7 h-7 text-xs" : size === "lg" ? "w-12 h-12 text-lg" : "w-9 h-9 text-sm";
  const col = AV_COLORS[initials] || "bg-ap-red";
  return (
    <div className={`${sz} ${col} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
const BADGE_STYLES = {
  fixed:       "bg-blue-100 text-blue-700",
  floating:    "bg-amber-100 text-amber-700",
  active:      "bg-green-100 text-green-700",
  leave:       "bg-amber-100 text-amber-700",
  maintenance: "bg-red-100 text-red-700",
  open:        "bg-red-100 text-red-700",
  closed:      "bg-green-100 text-green-700",
  review:      "bg-purple-100 text-purple-700",
  pending:     "bg-amber-100 text-amber-700",
  dispatched:  "bg-green-100 text-green-700",
  express:     "bg-orange-100 text-orange-700",
  warning:     "bg-red-100 text-red-700",
};
export function Badge({ label, variant }) {
  const style = BADGE_STYLES[variant] || "bg-gray-100 text-gray-600";
  return (
    <span className={`${style} text-[10px] font-semibold px-2 py-0.5 rounded-full`}>
      {label}
    </span>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${onClick ? "cursor-pointer active:scale-[0.98] transition-transform" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
export function SectionHd({ children }) {
  return <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{children}</div>;
}

// ── Stat box ──────────────────────────────────────────────────────────────────
export function StatBox({ label, value, sub, accent }) {
  const col = accent === "red" ? "text-ap-red" : accent === "green" ? "text-green-600" : accent === "amber" ? "text-amber-600" : "text-gray-900";
  return (
    <Card className="p-3">
      <div className={`text-2xl font-semibold ${col} leading-none`}>{value}</div>
      <div className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">{label}</div>
      {sub && <div className="text-[10px] text-gray-400 mt-0.5">{sub}</div>}
    </Card>
  );
}

// ── Parcel pills ──────────────────────────────────────────────────────────────
export function ParcelPills({ normal, express, xl, compact }) {
  return (
    <div className="flex gap-1 flex-wrap">
      {normal > 0 && <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full">{compact ? `N×${normal}` : `Normal ×${normal}`}</span>}
      {express > 0 && <span className="text-[10px] bg-orange-50 text-orange-700 font-semibold px-2 py-0.5 rounded-full">{compact ? `Exp×${express}` : `Express ×${express}`}</span>}
      {xl > 0 && <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full">{compact ? `XL×${xl}` : `XL ×${xl}`}</span>}
    </div>
  );
}

// ── Health bar ────────────────────────────────────────────────────────────────
export function HealthBar({ pct }) {
  const col = pct >= 80 ? "bg-green-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
        <div className={`${col} h-1.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] font-semibold text-gray-500 w-7 text-right">{pct}%</span>
    </div>
  );
}

// ── Top nav bar ───────────────────────────────────────────────────────────────
export function TopBar({ title, subtitle, onBack, action }) {
  return (
    <div className="bg-navy text-white px-4 pt-3 pb-3 flex items-center gap-3 flex-shrink-0">
      {onBack && (
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
      )}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[15px] leading-tight">{title}</div>
        {subtitle && <div className="text-[10px] text-white/40 mt-0.5">{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}

// ── Bottom tab bar ────────────────────────────────────────────────────────────
const TABS = [
  { key: "home", label: "Home", icon: HomeIcon },
  { key: "dispatch", label: "Dispatch", icon: SendIcon },
  { key: "drivers", label: "Drivers", icon: UsersIcon },
  { key: "vans", label: "Vans", icon: TruckIcon },
  { key: "more", label: "More", icon: DotsIcon },
];
export function BottomTab({ active, onChange }) {
  return (
    <div className="bg-white border-t border-gray-100 flex flex-shrink-0 safe-area-bottom">
      {TABS.map(t => (
        <button key={t.key} onClick={() => onChange(t.key)}
          className={`flex-1 flex flex-col items-center pt-2 pb-3 gap-0.5 ${active === t.key ? "text-ap-red" : "text-gray-400"}`}>
          <t.icon active={active === t.key} />
          <span className={`text-[9px] ${active === t.key ? "font-semibold" : ""}`}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────
function Ico({ d, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
}
export function HomeIcon() { return <Ico d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10"/>; }
export function SendIcon() { return <Ico d="M22 2L11 13 M22 2L15 22l-4-9-9-4z"/>; }
export function UsersIcon() { return <Ico d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75"/>; }
export function TruckIcon() { return <Ico d="M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>; }
export function DotsIcon() { return <Ico d="M5 12h.01 M12 12h.01 M19 12h.01"/>; }
export function PlusIcon({ size = 20 }) { return <Ico d="M12 5v14 M5 12h14" size={size}/>; }
export function ChevronRight({ size = 16 }) { return <Ico d="M9 18l6-6-6-6" size={size}/>; }
export function ChevronLeft({ size = 16 }) { return <Ico d="M15 18l-6-6 6-6" size={size}/>; }
export function AlertIcon({ size = 16 }) { return <Ico d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01" size={size}/>; }
export function CheckIcon({ size = 16 }) { return <Ico d="M20 6L9 17l-5-5" size={size}/>; }
export function EditIcon({ size = 16 }) { return <Ico d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" size={size}/>; }
export function TrashIcon({ size = 16 }) { return <Ico d="M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6" size={size}/>; }
export function MapPinIcon({ size = 14 }) { return <Ico d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4" size={size}/>; }
export function BranchIcon({ size = 14 }) { return <Ico d="M6 3v12 M18 9a3 3 0 100-6 3 3 0 000 6z M6 15a3 3 0 100-6 3 3 0 000 6z M18 21a3 3 0 100-6 3 3 0 000 6z M6 15a6 6 0 0012-6" size={size}/>; }
export function CalendarIcon({ size = 14 }) { return <Ico d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z M16 2v4 M8 2v4 M3 10h18" size={size}/>; }
export function ShareIcon({ size = 20 }) { return <Ico d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8 M16 6l-4-4-4 4 M12 2v13" size={size}/>; }
export function CopyIcon({ size = 16 }) { return <Ico d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z" size={size}/>; }
export function BellIcon({ size = 20 }) { return <Ico d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0" size={size}/>; }
export function CameraIcon({ size = 24 }) { return <Ico d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8" size={size}/>; }
export function RoadIcon({ size = 14 }) { return <Ico d="M8 21l4-18 4 18 M5 15l14 0 M3 21l18 0" size={size}/>; }
export function XIcon({ size = 16 }) { return <Ico d="M18 6L6 18 M6 6l12 12" size={size}/>; }

// ── Helpers ───────────────────────────────────────────────────────────────────
export function daysUntil(dateStr) {
  return Math.round((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
}
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}
export function tenure(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  const years = now.getFullYear() - start.getFullYear();
  const months = now.getMonth() - start.getMonth();
  const totalMonths = years * 12 + months;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  return y > 0 ? `${y} yr${y > 1 ? "s" : ""} ${m} mo` : `${m} months`;
}

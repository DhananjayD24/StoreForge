// StatCard.jsx – Premium metric card with color variants and icon support

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-100 text-blue-600",
    dot: "bg-blue-400",
    accent: "text-blue-600",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "bg-emerald-100 text-emerald-600",
    dot: "bg-emerald-400",
    accent: "text-emerald-600",
  },
  violet: {
    bg: "bg-violet-50",
    icon: "bg-violet-100 text-violet-600",
    dot: "bg-violet-400",
    accent: "text-violet-600",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "bg-amber-100 text-amber-600",
    dot: "bg-amber-400",
    accent: "text-amber-600",
  },
  rose: {
    bg: "bg-rose-50",
    icon: "bg-rose-100 text-rose-600",
    dot: "bg-rose-400",
    accent: "text-rose-600",
  },
  slate: {
    bg: "bg-slate-50",
    icon: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
    accent: "text-slate-600",
  },
};

function StatCard({ title, value, subtitle, icon: Icon, color = "blue", change, status, onClick }) {
  const c = colorMap[color] || colorMap.blue;

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-all duration-200 animate-fade-in-up group ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between mb-4">
        {Icon ? (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.icon} transition-transform group-hover:scale-110`}>
            <Icon />
          </div>
        ) : (
          <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${c.dot}`} />
        )}

        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${
            change >= 0 ? "text-emerald-600" : "text-red-500"
          }`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
              className={`w-3 h-3 ${change < 0 ? "rotate-180" : ""}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
            {Math.abs(change)}%
          </div>
        )}

        {status && (
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold ${
            status === "active"
              ? "bg-emerald-100 text-emerald-700"
              : status === "inactive"
              ? "bg-slate-100 text-slate-500"
              : "bg-amber-100 text-amber-700"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              status === "active" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
            }`} />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )}
      </div>

      <p className="text-2xl md:text-3xl font-bold text-slate-900 tabular-nums leading-tight">
        {value}
      </p>
      <p className="text-xs uppercase tracking-widest font-semibold text-slate-400 mt-1.5">
        {title}
      </p>
      {subtitle && (
        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

export default StatCard;

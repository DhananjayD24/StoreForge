import { useTenants } from "../../context/TenantContext";

/* ─── Icons ─── */
const IconBuilding = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconBan = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);
const IconRevenue = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
  </svg>
);

/* ─── Stat Card ─── */
function SuperStatCard({ title, value, icon: Icon, color, change, note }) {
  const colors = {
    violet: {
      bg: "bg-violet-50",
      icon: "bg-violet-100 text-violet-600",
      text: "text-violet-600",
      border: "border-violet-100",
    },
    emerald: {
      bg: "bg-emerald-50",
      icon: "bg-emerald-100 text-emerald-600",
      text: "text-emerald-600",
      border: "border-emerald-100",
    },
    rose: {
      bg: "bg-rose-50",
      icon: "bg-rose-100 text-rose-600",
      text: "text-rose-600",
      border: "border-rose-100",
    },
    amber: {
      bg: "bg-amber-50",
      icon: "bg-amber-100 text-amber-600",
      text: "text-amber-600",
      border: "border-amber-100",
    },
  };
  const c = colors[color] || colors.violet;

  return (
    <div className={`bg-white rounded-2xl border ${c.border} p-5 hover:shadow-md transition-all duration-200 animate-fade-in-up`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.icon}`}>
          <Icon />
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
            <IconArrow />
            {change}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-0.5">{title}</p>
      {note && <p className="text-xs text-slate-400 mt-1">{note}</p>}
    </div>
  );
}

/* ─── Tenant Row ─── */
function TenantRow({ tenant, index }) {
  const isActive = tenant.status === "active";
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {(tenant.storeName || tenant.name || "S")[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{tenant.storeName || tenant.name}</p>
            <p className="text-xs text-slate-400">{tenant.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
          {tenant.plan || "Free"}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
          isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-400"}`} />
          {isActive ? "Active" : "Suspended"}
        </span>
      </td>
    </tr>
  );
}

/* ─── Main ─── */
export default function Dashboard() {
  const { tenants } = useTenants();

  const total = tenants.length;
  const active = tenants.filter((t) => t.status === "active").length;
  const suspended = tenants.filter((t) => t.status === "suspended").length;

  const recentTenants = tenants.slice(0, 5);

  return (
    <div className="space-y-8 stagger">

      {/* Page Header */}
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 rounded-full bg-violet-500" />
          <h1 className="text-2xl font-bold text-slate-900">Platform Dashboard</h1>
        </div>
        <p className="text-slate-500 text-sm ml-3">
          Monitor all tenants and platform health in one place.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        <SuperStatCard
          title="Total Tenants"
          value={total}
          icon={IconBuilding}
          color="violet"
          note="All registered stores"
        />
        <SuperStatCard
          title="Active Stores"
          value={active}
          icon={IconCheck}
          color="emerald"
          change={12}
        />
        <SuperStatCard
          title="Suspended"
          value={suspended}
          icon={IconBan}
          color="rose"
        />
        <SuperStatCard
          title="Platform Revenue"
          value="₹1,24,000"
          icon={IconRevenue}
          color="amber"
          change={8}
          note="Mock data"
        />
      </div>

      {/* Recent Tenants */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Recent Tenants</h2>
            <p className="text-xs text-slate-400 mt-0.5">Latest registered stores</p>
          </div>
          <a href="/admin/tenants" className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition">
            View all →
          </a>
        </div>

        {recentTenants.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <IconBuilding />
            </div>
            <p className="text-sm font-medium text-slate-500">No tenants yet</p>
            <p className="text-xs text-slate-400 mt-1">Create your first tenant to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Store</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTenants.map((t, i) => (
                  <TenantRow key={t.id || t._id || i} tenant={t} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

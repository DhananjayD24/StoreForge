import { useParams, Link } from "react-router-dom";
import { useTenants } from "../../context/TenantContext";

const IconBack = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-3.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500 font-medium w-36 flex-shrink-0">{label}</span>
      <span className="text-sm text-slate-900 font-semibold text-right">{value}</span>
    </div>
  );
}

function MetricCard({ label, value, color }) {
  const colors = {
    blue:   "bg-blue-50 text-blue-700 border-blue-100",
    amber:  "bg-amber-50 text-amber-700 border-amber-100",
    emerald:"bg-emerald-50 text-emerald-700 border-emerald-100",
  };
  return (
    <div className={`rounded-2xl border p-5 ${colors[color]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-semibold mt-1 opacity-70 uppercase tracking-wide">{label}</p>
    </div>
  );
}

export default function TenantDetails() {
  const { id } = useParams();
  const { tenants, toggleTenantStatus } = useTenants();

  const tenant = tenants.find((t) => t.id === Number(id));

  if (!tenant) {
    return (
      <div className="flex flex-col items-center justify-center py-24 animate-fade-in-up">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={1.5} className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-slate-600 font-semibold">Tenant not found</p>
        <Link to="/admin/tenants" className="mt-3 text-sm text-violet-600 hover:underline">
          ← Back to tenants
        </Link>
      </div>
    );
  }

  const isActive = tenant.status === "active";

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in-up">

      {/* Header */}
      <div>
        <Link
          to="/admin/tenants"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition mb-4"
        >
          <IconBack />
          Back to Tenants
        </Link>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 rounded-full bg-violet-500" />
          <h1 className="text-2xl font-bold text-slate-900">Tenant Details</h1>
        </div>
      </div>

      {/* Store identity card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 flex items-center gap-4 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-indigo-50">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {(tenant.storeName || "S")[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-slate-900 truncate">{tenant.storeName}</h2>
            <p className="text-sm text-slate-500 truncate">{tenant.email}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-400"}`} />
              {isActive ? "Active" : "Suspended"}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700">
              {tenant.plan || "Free"}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 py-2">
          <InfoRow label="Store Name" value={tenant.storeName} />
          <InfoRow label="Owner" value={tenant.owner} />
          <InfoRow label="Email" value={tenant.email} />
          <InfoRow label="Plan" value={tenant.plan} />
          <InfoRow label="Status" value={isActive ? "Active" : "Suspended"} />
        </div>
      </div>

      {/* Mock Stats */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Platform Stats (Mock)</p>
        <div className="grid grid-cols-3 gap-4 stagger">
          <MetricCard label="Products" value="24" color="blue" />
          <MetricCard label="Total Orders" value="132" color="amber" />
          <MetricCard label="Revenue" value="₹54,200" color="emerald" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => toggleTenantStatus(tenant.id)}
          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition shadow-sm ${
            isActive
              ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
          }`}
        >
          {isActive ? "Suspend Store" : "Activate Store"}
        </button>
        <Link
          to="/admin/tenants"
          className="flex-1 py-3 text-center rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white transition shadow-sm"
        >
          Back to All Tenants
        </Link>
      </div>
    </div>
  );
}

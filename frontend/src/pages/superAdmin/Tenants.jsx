import { Link } from "react-router-dom";
import { useTenants } from "../../context/TenantContext";

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
const IconToggle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
);
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const planColors = {
  Free: "bg-slate-100 text-slate-600",
  Pro: "bg-blue-100 text-blue-700",
  Enterprise: "bg-violet-100 text-violet-700",
};

export default function Tenants() {
  const { tenants, toggleTenantStatus } = useTenants();

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 rounded-full bg-violet-500" />
            <h1 className="text-2xl font-bold text-slate-900">Tenants</h1>
          </div>
          <p className="text-sm text-slate-500 ml-3">
            {tenants.length} store{tenants.length !== 1 ? "s" : ""} registered on the platform
          </p>
        </div>
        <Link
          to="/admin/create-tenant"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
        >
          <IconPlus />
          Create Tenant
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
        {tenants.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={1.5} className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-600">No tenants yet</p>
            <p className="text-xs text-slate-400 mt-1">Add your first tenant to get started</p>
            <Link
              to="/admin/create-tenant"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-violet-600 text-white text-sm rounded-xl hover:bg-violet-700 transition"
            >
              <IconPlus /> Create Tenant
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Store</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tenants.map((t, i) => {
                  const isActive = t.status === "active";
                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50 transition animate-fade-in-up"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {(t.storeName || "S")[0].toUpperCase()}
                          </div>
                          <p className="text-sm font-semibold text-slate-800">{t.storeName}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <p className="text-sm text-slate-500">{t.email}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${planColors[t.plan] || "bg-slate-100 text-slate-600"}`}>
                          {t.plan}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "bg-emerald-500" : "bg-red-400"}`} />
                          {isActive ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/super-admin/tenant/${t.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                          >
                            <IconEye />
                            View
                          </Link>
                          <button
                            onClick={() => toggleTenantStatus(t.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                              isActive
                                ? "text-red-600 bg-red-50 hover:bg-red-100"
                                : "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                            }`}
                          >
                            <IconToggle />
                            {isActive ? "Suspend" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useTenants } from "../../context/TenantContext";

export default function Tenants() {
  const { tenants, toggleTenantStatus } = useTenants();

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Tenants</h1>

        <Link
          to="/super-admin/create-tenant"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Tenant
        </Link>
      </div>

      <div className="space-y-4">
        {tenants.map((t) => (
          <div
            key={t.id}
            className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{t.storeName}</h2>
              <p className="text-sm text-gray-500">{t.email}</p>
            </div>

            <div className="flex gap-3 items-center">
              <span className="px-2 py-1 text-xs rounded bg-gray-200">
                {t.plan}
              </span>

              <span
                className={`px-2 py-1 text-xs rounded ${
                  t.status === "active"
                    ? "bg-green-200"
                    : "bg-red-200"
                }`}
              >
                {t.status}
              </span>

              <Link
                to={`/super-admin/tenant/${t.id}`}
                className="text-blue-600"
              >
                View
              </Link>

              <button
                onClick={() => toggleTenantStatus(t.id)}
                className="text-sm bg-gray-200 px-3 py-1 rounded"
              >
                Toggle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

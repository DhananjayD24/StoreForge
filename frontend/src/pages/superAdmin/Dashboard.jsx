import { useTenants } from "../../context/TenantContext";

export default function Dashboard() {
  const { tenants } = useTenants();

  const total = tenants.length;
  const active = tenants.filter(t => t.status === "active").length;
  const suspended = tenants.filter(t => t.status === "suspended").length;

  const stats = [
    { title: "Total Tenants", value: total },
    { title: "Active Stores", value: active },
    { title: "Suspended Stores", value: suspended },
    { title: "Platform Revenue", value: "₹1,24,000" }, // mock
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Super Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          >
            <p className="text-gray-500 text-sm">{s.title}</p>
            <h2 className="text-2xl font-bold mt-2">{s.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

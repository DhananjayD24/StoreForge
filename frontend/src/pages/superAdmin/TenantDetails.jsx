import { useParams } from "react-router-dom";
import { useTenants } from "../../context/TenantContext";

export default function TenantDetails() {
  const { id } = useParams();
  const { tenants } = useTenants();

  const tenant = tenants.find(
    (t) => t.id === Number(id)
  );

  if (!tenant) {
    return <div className="p-6">Tenant not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Tenant Details
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
        <p>
          <strong>Store Name:</strong> {tenant.storeName}
        </p>

        <p>
          <strong>Owner:</strong> {tenant.owner}
        </p>

        <p>
          <strong>Email:</strong> {tenant.email}
        </p>

        <p>
          <strong>Plan:</strong> {tenant.plan}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-sm ${
              tenant.status === "active"
                ? "bg-green-200"
                : "bg-red-200"
            }`}
          >
            {tenant.status}
          </span>
        </p>

        {/* mock stats */}
        <div className="pt-4 border-t">
          <p><strong>Products:</strong> 24</p>
          <p><strong>Total Orders:</strong> 132</p>
          <p><strong>Revenue:</strong> ₹54,200</p>
        </div>
      </div>
    </div>
  );
}

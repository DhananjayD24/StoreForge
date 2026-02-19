import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTenants } from "../../context/TenantContext";

export default function CreateTenant() {
  const { addTenant } = useTenants();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    storeName: "",
    owner: "",
    email: "",
    plan: "Free",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTenant(form);
    navigate("/admin/tenants");
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">
        Create New Tenant
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        <input
          name="storeName"
          placeholder="Store Name"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="owner"
          placeholder="Owner Name"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Owner Email"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="plan"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option>Free</option>
          <option>Pro</option>
          <option>Enterprise</option>
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-3 rounded w-full"
        >
          Create Tenant
        </button>
      </form>
    </div>
  );
}

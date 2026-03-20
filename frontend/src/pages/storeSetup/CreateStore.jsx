import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateStore() {

  const { planId } = useParams();
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);

  const createStore = async (e) => {
    e.preventDefault();

    if (!storeName.trim()) {
      alert("Store name is required");
      return;
    }

    try {

      setLoading(true);

      const res = await api.post("/tenants/create-store", {
        storeName,
        planId,
      });

      // Save updated auth + tenant data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("tenantId", res.data.tenantId);
      localStorage.setItem("storeSlug", res.data.storeSlug);
      localStorage.setItem("role", res.data.role);

      alert("Store created successfully!");

      navigate("/store");

    } catch (error) {

      console.error(error);
      alert(error.response?.data?.message || "Error creating store");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={createStore}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
      >

        <h2 className="text-2xl font-bold text-center">
          Create Your Store
        </h2>

        <input
          type="text"
          placeholder="Store Name"
          className="border p-2 w-full rounded"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-green-600 text-white w-full p-2 rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Store"}
        </button>

      </form>

    </div>
  );
}
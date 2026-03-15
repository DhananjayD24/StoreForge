import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateStore() {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState("");

  const createStore = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tenants/create-store", {
        storeName,
        planId,
      });

      alert("Store created!");

      navigate("/store");
    } catch {
      alert("Error creating store");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={createStore} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Create Your Store</h2>

        <input
          type="text"
          placeholder="Store Name"
          className="border p-2 w-full"
          onChange={(e) => setStoreName(e.target.value)}
        />

        <button
          type="submit"
          className="mt-4 bg-green-600 text-white w-full p-2 rounded"
        >
          Create Store
        </button>
      </form>
    </div>
  );
}

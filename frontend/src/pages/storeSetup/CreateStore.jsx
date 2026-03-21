import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateStore() {

  const { planId } = useParams();
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState("");
  const [slugPreview, setSlugPreview] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch selected plan info
  useEffect(() => {

    const fetchPlan = async () => {
      try {
        const res = await api.get("/plans");
        const selected = res.data.find(p => p._id === planId);
        setPlan(selected);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlan();

  }, [planId]);

  // generate slug preview
  useEffect(() => {

    const slug = storeName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    setSlugPreview(slug);

  }, [storeName]);

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

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("tenantId", res.data.tenantId);
      localStorage.setItem("storeSlug", res.data.storeSlug);
      localStorage.setItem("role", res.data.role);

      navigate("/store");

    } catch (error) {

      console.error(error);
      alert(error.response?.data?.message || "Error creating store");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex justify-center py-20 px-4">

      <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition w-full max-w-lg space-y-6">

        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Create Your Store
        </h2>

        {/* Plan Info */}
        {plan && (
          <div className="bg-indigo-50 p-4 rounded-lg text-center">

            <p className="font-semibold">
              Selected Plan: {plan.name}
            </p>

            <p className="text-sm text-gray-600">
              ₹{plan.price} • {plan.productLimit} products
            </p>

          </div>
        )}

        <form onSubmit={createStore} className="space-y-4">

          <input
            type="text"
            placeholder="Store Name"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />

          {/* Store URL Preview */}

          {slugPreview && (

            <div className="bg-gray-100 p-3 rounded text-sm">

              Your store URL will be:

              <p className="font-semibold text-indigo-600">
                storeforge.com/store/{slugPreview}
              </p>

            </div>

          )}

          <button
            type="submit"
            disabled={loading || !storeName.trim()}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Creating Store..." : "Create Store"}
          </button>

        </form>

      </div>

    </div>

  );
}
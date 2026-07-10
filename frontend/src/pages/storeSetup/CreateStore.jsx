import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const IconStore = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-slate-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016 2.993 2.993 0 002.25-1.016 3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72l1.189-1.19A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z" />
  </svg>
);
const IconLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-indigo-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

export default function CreateStore() {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState("");
  const [slugPreview, setSlugPreview] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await api.get("/plans");
        const selected = res.data.find((p) => p._id === planId);
        setPlan(selected);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlan();
  }, [planId]);

  useEffect(() => {
    setSlugPreview(
      storeName.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    );
  }, [storeName]);

  const createStore = async (e) => {
    e.preventDefault();
    if (!storeName.trim()) return;

    try {
      setLoading(true);
      const res = await api.post("/tenants/create-store", { storeName, planId });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("tenantId", res.data.tenantId);
      localStorage.setItem("storeSlug", res.data.storeSlug);
      localStorage.setItem("role", res.data.role);
      navigate("/store");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg animate-fade-in-up">

        {/* Step badge */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold rounded-full uppercase tracking-widest mb-4 backdrop-blur-sm">
            Step 2 of 2
          </span>
          <h1 className="text-3xl font-extrabold text-white">Set Up Your Store</h1>
          <p className="text-slate-400 text-sm mt-1">Choose a name — this will be your store's public identity.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Selected plan banner */}
          {plan && (
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Selected Plan</p>
                <p className="text-white font-bold text-lg">{plan.name}</p>
              </div>
              <div className="text-right">
                <p className="text-white text-xl font-extrabold">₹{plan.price}</p>
                <p className="text-white/60 text-xs">{plan.productLimit} products · {plan.durationDays} days</p>
              </div>
            </div>
          )}

          <form onSubmit={createStore} className="px-6 py-6 space-y-5">

            {/* Store name input */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Store Name</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2"><IconStore /></div>
                <input
                  type="text"
                  placeholder="e.g. Fashion Hub"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Slug preview */}
            {slugPreview && (
              <div className="flex items-start gap-2 px-4 py-3 bg-indigo-50 rounded-xl border border-indigo-100">
                <IconLink />
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Your store URL will be:</p>
                  <p className="text-sm font-bold text-indigo-600 break-all">
                    rentvirtualstores.com/store/<span className="text-indigo-900">{slugPreview}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="text-xs text-slate-400 flex items-start gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              Choose a clear, memorable name — you can always update it later from your dashboard.
            </div>

            <button
              type="submit"
              disabled={loading || !storeName.trim()}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Launching your store...
                </>
              ) : "Launch My Store 🚀"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
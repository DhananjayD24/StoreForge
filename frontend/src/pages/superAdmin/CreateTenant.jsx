import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTenants } from "../../context/TenantContext";

const IconBack = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-slate-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-slate-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);
const IconStore = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-slate-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016 2.993 2.993 0 002.25-1.016 3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72l1.189-1.19A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z" />
  </svg>
);

const plans = ["Free", "Pro", "Enterprise"];

function Field({ label, icon: Icon, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default function CreateTenant() {
  const { addTenant } = useTenants();
  const navigate = useNavigate();

  const [form, setForm] = useState({ storeName: "", owner: "", email: "", plan: "Free" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate async
    addTenant(form);
    navigate("/admin/tenants");
  };

  return (
    <div className="max-w-xl space-y-6 animate-fade-in-up">

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
          <h1 className="text-2xl font-bold text-slate-900">Create Tenant</h1>
        </div>
        <p className="text-sm text-slate-500 ml-3">Onboard a new store to the platform.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <p className="text-sm font-semibold text-slate-700">Store Information</p>
          <p className="text-xs text-slate-400 mt-0.5">Fill in the details for the new tenant.</p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">

          <Field label="Store Name" icon={IconStore}>
            <input
              name="storeName"
              placeholder="e.g. Fashion Hub"
              required
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            />
          </Field>

          <Field label="Owner Name" icon={IconUser}>
            <input
              name="owner"
              placeholder="e.g. Ravi Sharma"
              required
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            />
          </Field>

          <Field label="Owner Email" icon={IconMail}>
            <input
              name="email"
              type="email"
              placeholder="owner@store.com"
              required
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            />
          </Field>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Subscription Plan</label>
            <div className="grid grid-cols-3 gap-3">
              {plans.map((plan) => (
                <button
                  key={plan}
                  type="button"
                  onClick={() => setForm({ ...form, plan })}
                  className={`py-3 rounded-xl text-sm font-semibold border-2 transition ${
                    form.plan === plan
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <Link
              to="/admin/tenants"
              className="flex-1 py-3 text-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition disabled:opacity-60 shadow-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Creating...
                </>
              ) : "Create Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);
const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);
const IconDiamond = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

const planMeta = {
  Free:       { icon: IconZap,    gradient: "from-slate-500 to-slate-600",   ring: "ring-slate-200",   btn: "bg-slate-800 hover:bg-slate-900", popular: false },
  Pro:        { icon: IconStar,   gradient: "from-blue-500 to-indigo-600",   ring: "ring-blue-300",    btn: "bg-blue-600 hover:bg-blue-700",   popular: true  },
  Enterprise: { icon: IconDiamond,gradient: "from-violet-500 to-purple-700", ring: "ring-violet-300",  btn: "bg-violet-600 hover:bg-violet-700",popular: false },
};

function getPlanPerks(plan) {
  return [
    `${plan.productLimit} products`,
    `${plan.durationDays}-day access`,
    plan.price > 0 ? "Analytics dashboard" : "Basic analytics",
    plan.price > 200 ? "Unlimited orders" : "Up to 50 orders/mo",
    plan.price > 500 ? "Priority support" : "Standard support",
  ];
}

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/plans");
        setPlans(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const choosePlan = (plan) => {
    const confirmed = window.confirm(
      `Plan: ${plan.name}\nPrice: ₹${plan.price}\n\nHave you completed the payment?`
    );
    if (!confirmed) return;
    navigate(`/create-store/${plan._id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-16 px-4">

      {/* Header */}
      <div className="text-center mb-14 animate-fade-in-up">
        <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold rounded-full uppercase tracking-widest mb-4 backdrop-blur-sm">
          Step 1 of 2
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          Choose Your Plan
        </h1>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Pick the plan that fits your business. You can upgrade anytime from your dashboard.
        </p>
      </div>

      {/* Plans grid */}
      {loading ? (
        <div className="flex flex-col items-center gap-3 py-16">
          <svg className="animate-spin w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <p className="text-slate-400 text-sm">Loading plans...</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 stagger">
          {plans.map((plan) => {
            const meta = planMeta[plan.name] || planMeta.Free;
            const Icon = meta.icon;
            const perks = getPlanPerks(plan);

            return (
              <div
                key={plan._id}
                className={`relative bg-white rounded-2xl flex flex-col overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 animate-fade-in-up
                  ${meta.popular ? `ring-2 ${meta.ring}` : ""}
                `}
              >
                {meta.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full shadow-lg uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Gradient header */}
                <div className={`bg-gradient-to-br ${meta.gradient} px-6 py-7`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                      <Icon />
                    </div>
                    <h2 className="text-white text-xl font-bold">{plan.name}</h2>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-white text-4xl font-extrabold">₹{plan.price}</span>
                    <span className="text-white/60 text-sm mb-1">/{plan.durationDays}d</span>
                  </div>
                </div>

                {/* Perks */}
                <div className="flex-1 px-6 py-5">
                  <ul className="space-y-3">
                    {perks.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${meta.gradient} text-white flex items-center justify-center flex-shrink-0`}>
                          <IconCheck />
                        </div>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <button
                    onClick={() => choosePlan(plan)}
                    className={`w-full py-3 rounded-xl text-sm font-bold text-white transition shadow-sm ${meta.btn}`}
                  >
                    Select {plan.name} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-center text-slate-500 text-xs mt-10">
        All plans include full access to Rent Virtual Stores features. Upgrade anytime.
      </p>
    </div>
  );
}
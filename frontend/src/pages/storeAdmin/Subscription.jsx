import { useEffect, useState } from "react";
import api from "../../api/api";

/* ─── Icons ─── */
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);
const IconPackage = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);
const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
  </svg>
);
const IconDiamond = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

/* Plan icon & accent mapping */
const planMeta = {
  Free: {
    icon: IconZap,
    gradient: "from-slate-500 to-slate-600",
    light: "bg-slate-100",
    text: "text-slate-700",
    badge: "bg-slate-100 text-slate-600",
    ring: "ring-slate-200",
    btn: "bg-slate-800 hover:bg-slate-900",
  },
  Pro: {
    icon: IconStar,
    gradient: "from-blue-500 to-indigo-600",
    light: "bg-blue-50",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
    ring: "ring-blue-200",
    btn: "bg-blue-600 hover:bg-blue-700",
  },
  Enterprise: {
    icon: IconDiamond,
    gradient: "from-violet-500 to-purple-700",
    light: "bg-violet-50",
    text: "text-violet-700",
    badge: "bg-violet-100 text-violet-700",
    ring: "ring-violet-200",
    btn: "bg-violet-600 hover:bg-violet-700",
  },
};

/* ─── Current Plan Card ─── */
function CurrentPlanCard({ subscription, onUpgrade }) {
  const planName = subscription.planId?.name || "Free";
  const meta = planMeta[planName] || planMeta.Free;
  const Icon = meta.icon;

  const endDate = new Date(subscription.endDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(subscription.endDate) - new Date()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className={`bg-white rounded-2xl border-2 border-slate-200 overflow-hidden animate-fade-in-up`}>
      {/* Gradient header */}
      <div className={`bg-gradient-to-r ${meta.gradient} px-6 py-5`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Icon />
            </div>
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Current Plan</p>
              <h2 className="text-white text-xl font-bold">{planName}</h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-xs">Renewal</p>
            <p className="text-white text-sm font-semibold">{endDate}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
        <div className="px-5 py-4 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">Product Limit</p>
          <p className="text-xl font-bold text-slate-900">{subscription.planId?.productLimit ?? "—"}</p>
        </div>
        <div className="px-5 py-4 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">Days Left</p>
          <p className={`text-xl font-bold ${daysLeft <= 7 ? "text-red-500" : "text-slate-900"}`}>
            {daysLeft}
          </p>
        </div>
        <div className="px-5 py-4 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">Price</p>
          <p className="text-xl font-bold text-slate-900">₹{subscription.planId?.price ?? 0}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-4 flex items-center justify-between gap-4 bg-slate-50">
        <p className="text-xs text-slate-500">
          {daysLeft <= 7
            ? "⚠️ Your plan is expiring soon. Upgrade now."
            : "You're on a great plan. Upgrade anytime."}
        </p>
        <button
          onClick={onUpgrade}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition shadow-sm flex-shrink-0"
        >
          <IconZap />
          Upgrade Plan
        </button>
      </div>
    </div>
  );
}

/* ─── Plan Card ─── */
function PlanCard({ plan, isCurrent, isLower, onBuy, onUpgrade, hasSubscription }) {
  const meta = planMeta[plan.name] || planMeta.Free;
  const Icon = meta.icon;
  const disabled = isLower || isCurrent;

  const perks = [
    `${plan.productLimit} products`,
    `${plan.durationDays}-day access`,
    plan.name === "Enterprise" ? "Priority support" : "Standard support",
    plan.name !== "Free" ? "Advanced analytics" : "Basic analytics",
  ];

  return (
    <div className={`relative bg-white rounded-2xl border-2 flex flex-col overflow-hidden transition-all animate-fade-in-up
      ${isCurrent ? `ring-2 ${meta.ring} border-transparent` : "border-slate-200 hover:border-slate-300 hover:shadow-md"}
    `}>
      {/* Popular badge for Pro */}
      {plan.name === "Pro" && !isCurrent && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className={`px-5 pt-7 pb-5 border-b border-slate-100`}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${meta.gradient} text-white`}>
            <Icon />
          </div>
          <h3 className="font-bold text-slate-900">{plan.name}</h3>
          {isCurrent && (
            <span className={`ml-auto inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${meta.badge}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Current
            </span>
          )}
        </div>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-extrabold text-slate-900">₹{plan.price}</span>
          <span className="text-slate-400 text-sm mb-1">/ {plan.durationDays}d</span>
        </div>
      </div>

      {/* Perks */}
      <div className="px-5 py-4 flex-1">
        <ul className="space-y-2.5">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-sm text-slate-600">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${meta.gradient} text-white`}>
                <IconCheck />
              </div>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <div className="px-5 pb-5">
        <button
          disabled={disabled}
          onClick={() => {
            if (!hasSubscription) onBuy(plan._id);
            else onUpgrade(plan._id);
          }}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition ${
            isCurrent
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : isLower
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : `${meta.btn} text-white shadow-sm`
          }`}
        >
          {isCurrent ? "Current Plan" : isLower ? "Downgrade not available" : "Select Plan"}
        </button>
      </div>
    </div>
  );
}

/* ─── Main ─── */
function Subscription() {
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [showPlans, setShowPlans] = useState(false);
  const [loadingSub, setLoadingSub] = useState(true);

  const fetchSubscription = async () => {
    try {
      setLoadingSub(true);
      const res = await api.get("/subscription/me");
      setSubscription(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSub(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans");
      setPlans(res.data);
      setShowPlans(true);
    } catch (err) {
      console.error(err);
    }
  };

  const buyPlan = async (planId) => {
    if (!window.confirm("Have you completed the payment?")) return;
    try {
      await api.post("/subscription/upgrade", { newPlanId: planId });
      alert("Subscription activated!");
      fetchSubscription();
      setShowPlans(false);
    } catch (error) {
      console.error(error);
    }
  };

  const upgradePlan = async (planId) => {
    try {
      const preview = await api.get(`/subscription/upgrade-preview/${planId}`);
      const amount = preview.data.amountToPay;
      if (!window.confirm(`Upgrade cost: ₹${amount}\n\nHave you completed payment?`)) return;
      await api.post("/subscription/upgrade", { newPlanId: planId });
      alert("Plan upgraded successfully!");
      fetchSubscription();
      setShowPlans(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchSubscription(); }, []);

  if (loadingSub) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <svg className="animate-spin w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="text-sm text-slate-400">Loading subscription...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 rounded-full bg-blue-500" />
          <h1 className="text-2xl font-bold text-slate-900">Subscription</h1>
        </div>
        <p className="text-sm text-slate-500 ml-3">Manage your plan and billing.</p>
      </div>

      {/* Current plan */}
      {subscription && (
        <CurrentPlanCard
          subscription={subscription}
          onUpgrade={fetchPlans}
        />
      )}

      {/* Plan grid */}
      {showPlans && (
        <div className="space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Choose a Plan</h2>
            <button
              onClick={() => setShowPlans(false)}
              className="text-sm text-slate-400 hover:text-slate-600 transition"
            >
              ✕ Dismiss
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6 stagger">
            {plans.map((plan) => {
              const currentPrice = subscription?.planId?.price || 0;
              const isCurrent = plan._id === subscription?.planId?._id;
              const isLower = plan.price < currentPrice;
              return (
                <PlanCard
                  key={plan._id}
                  plan={plan}
                  isCurrent={isCurrent}
                  isLower={isLower}
                  onBuy={buyPlan}
                  onUpgrade={upgradePlan}
                  hasSubscription={!!subscription?.planId}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Subscription;
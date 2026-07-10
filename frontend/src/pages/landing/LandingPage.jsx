import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

/* ─── Feature icons ─── */
const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "Multi-Tenant SaaS",
    desc: "Run multiple independent stores on a shared scalable platform with full tenant isolation.",
    accent: "bg-violet-100 text-violet-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    title: "Subscription Plans",
    desc: "Flexible plans with automated store provisioning and prorated billing upgrades.",
    accent: "bg-blue-100 text-blue-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    title: "Product Management",
    desc: "Add, edit and organize products with images, pricing and stock tracking easily.",
    accent: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    title: "Order Management",
    desc: "Track, manage and fulfil customer orders with real-time notifications.",
    accent: "bg-amber-100 text-amber-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
    title: "Real-Time Notifications",
    desc: "Get instant alerts the moment a customer places an order in your store.",
    accent: "bg-rose-100 text-rose-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Analytics Dashboard",
    desc: "Visualize revenue, orders, and store performance with interactive charts.",
    accent: "bg-indigo-100 text-indigo-600",
  },
];

const steps = [
  { num: "01", title: "Create an account", desc: "Sign up in seconds. No credit card required." },
  { num: "02", title: "Pick a plan", desc: "Choose a subscription plan that fits your business." },
  { num: "03", title: "Launch your store", desc: "Add products and start selling immediately." },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await api.get("/plans");
        const formattedPlans = data.map((plan, index) => {
          const isGrowth = plan.name.toLowerCase().includes("growth") || plan.name.toLowerCase().includes("pro") && index === 1;
          const periodStr = plan.durationDays === 30 ? "/mo" : plan.durationDays === 365 ? "/yr" : `/${plan.durationDays}d`;
          const limitStr = plan.productLimit === -1 ? "Unlimited Products" : `${plan.productLimit} Products`;
          
          return {
            id: plan._id,
            name: plan.name,
            price: `₹${plan.price}`,
            period: periodStr,
            limit: limitStr,
            popular: isGrowth,
            color: isGrowth ? "border-indigo-500" : "border-slate-200"
          };
        });
        setPricingPlans(formattedPlans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="bg-white text-slate-800">

      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white min-h-[92vh] flex flex-col items-center justify-center text-center px-6 py-24">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-20 -translate-x-1/2" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-violet-600 rounded-full filter blur-3xl opacity-20 translate-x-1/2" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm font-medium text-indigo-200 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Multi-Tenant SaaS E-Commerce Platform
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Build Your Online Store{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              in Minutes
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Rent Virtual Stores helps entrepreneurs create, manage and scale their own e-commerce stores effortlessly — no technical knowledge required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-2xl transition hover:scale-105 shadow-xl shadow-indigo-900/40 text-base"
            >
              Start Free →
            </button>
            <a
              href="#features"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 transition text-base backdrop-blur-sm"
            >
              Explore Features
            </a>
          </div>

          {/* Quick demo link */}
          <p className="mt-8 text-sm text-slate-400">
            Already have a store?{" "}
            <button onClick={() => navigate("/login")} className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2 transition">
              Sign in here
            </button>
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 animate-bounce">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section id="features" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-widest mb-3">
              Platform Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Everything you need to sell online
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              A complete toolkit for building, managing, and growing your e-commerce business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 animate-fade-in-up"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.accent}`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-widest mb-3">
              How It Works
            </span>
            <h2 className="text-4xl font-bold text-slate-900">Start selling in 3 steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center group">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-3/4 w-1/2 h-px bg-slate-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition">
                    {s.num}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section id="pricing" className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-full uppercase tracking-widest mb-3">
              Pricing
            </span>
            <h2 className="text-4xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
            <p className="text-slate-500 mt-3">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {loadingPlans ? (
              <div className="col-span-3 text-center py-10">
                <span className="text-slate-500">Loading plans...</span>
              </div>
            ) : pricingPlans.map((plan, i) => (
              <div
                key={plan.id || i}
                className={`relative bg-white rounded-2xl p-7 border-2 ${plan.color} ${plan.popular ? "shadow-xl shadow-indigo-100" : "hover:shadow-lg"} transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-full shadow">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="font-bold text-slate-900 text-lg mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-slate-400 mb-1">{plan.period}</span>
                </div>
                <p className="text-sm text-slate-500 mb-6">{plan.limit}</p>
                <button
                  onClick={() => navigate("/register")}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  Get Started →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-600 to-violet-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Launch Your Store Today</h2>
          <p className="text-indigo-200 mb-10 text-lg">
            Join hundreds of entrepreneurs already selling on Rent Virtual Stores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:scale-105 transition shadow-xl"
            >
              Create Your Free Store
            </button>
            <button
              onClick={() => navigate("/login?role=superAdmin")}
              className="px-8 py-4 bg-white/15 hover:bg-white/25 border border-white/30 font-semibold rounded-2xl transition backdrop-blur-sm"
            >
              Super Admin Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

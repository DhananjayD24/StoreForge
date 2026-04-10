import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

/* ─────────────── Icons ─────────────── */
const IconStore = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016 2.993 2.993 0 002.25-1.016 3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72l1.189-1.19A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);
const IconEye = ({ show }) => show ? (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
) : (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);
const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
  </svg>
);

/* ─────────────────────────────────────
   DEMO CREDENTIALS config
───────────────────────────────────── */
const DEMO = {
  superAdmin: { email: "superadmin@storeforge.com", password: "admin123" },
  storeAdmin: { email: "ABC@gmail.com", password: "123456" },
};

/* ─────────────────────────────────────
   FEATURE LIST for brand panel
───────────────────────────────────── */
const features = [
  "Multi-tenant SaaS architecture",
  "Real-time order & revenue analytics",
  "Subscription plan management",
  "Role-based access control",
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const loginRole = query.get("role") || "storeAdmin";
  const isSuperAdmin = loginRole === "superAdmin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  /* Fill demo credentials */
  const fillDemo = () => {
    const creds = isSuperAdmin ? DEMO.superAdmin : DEMO.storeAdmin;
    setEmail(creds.email);
    setPassword(creds.password);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      const role = localStorage.getItem("role");
      const tenantId = localStorage.getItem("tenantId");

      if (role === "superAdmin") window.location.href = "/admin";
      else if (role === "storeAdmin" && (!tenantId || tenantId === "null")) window.location.href = "/plans";
      else if (role === "storeAdmin") window.location.href = "/store";
      else window.location.href = "/";
    } catch {
      setError("Invalid credentials. Try the demo button below.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Color theme by role ── */
  const theme = isSuperAdmin
    ? {
        accent: "#8b5cf6",
        accentDark: "#7c3aed",
        accentLight: "#ede9fe",
        from: "#1e1b4b",
        via: "#312e81",
        to: "#4c1d95",
        badge: "bg-violet-100 text-violet-700",
        ring: "focus:ring-violet-400",
        btn: "bg-violet-600 hover:bg-violet-700",
        label: "Super Admin",
      }
    : {
        accent: "#3b82f6",
        accentDark: "#2563eb",
        accentLight: "#eff6ff",
        from: "#0f172a",
        via: "#1e3a5f",
        to: "#1e40af",
        badge: "bg-blue-100 text-blue-700",
        ring: "focus:ring-blue-400",
        btn: "bg-blue-600 hover:bg-blue-700",
        label: "Store Admin",
      };

  return (
    <div className="min-h-screen flex">

      {/* ══════════════════════════════
          LEFT – Brand Panel
      ══════════════════════════════ */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] p-12 relative overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${theme.from}, ${theme.via}, ${theme.to})` }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, white, transparent)` }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, white, transparent)` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-5"
          style={{ border: "2px solid white" }} />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">StoreForge</span>
          </div>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
              {isSuperAdmin ? <IconShield /> : <IconStore />}
              {theme.label} Portal
            </span>
            <h1 className="text-4xl font-bold text-white leading-tight">
              {isSuperAdmin
                ? "Platform Control at your fingertips"
                : "Manage your store like a pro"}
            </h1>
            <p className="text-white/60 mt-3 text-base leading-relaxed">
              {isSuperAdmin
                ? "Oversee all tenants, subscriptions and platform health from one unified dashboard."
                : "Track orders, manage products and grow your business with powerful analytics."}
            </p>
          </div>

          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.2)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-white/30 text-xs">
          © 2026 StoreForge · SaaS Platform
        </p>
      </div>

      {/* ══════════════════════════════
          RIGHT – Login Form
      ══════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md animate-fade-in-up">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: theme.accent }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900">StoreForge</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {isSuperAdmin ? "Super Admin Login" : "Welcome back"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {isSuperAdmin
                ? "Access the platform control panel"
                : "Sign in to manage your store"}
            </p>
          </div>

          {/* Role switcher */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
            <Link
              to="/login?role=storeAdmin"
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                !isSuperAdmin
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <IconStore />
              Store Admin
            </Link>
            <Link
              to="/login?role=superAdmin"
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                isSuperAdmin
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <IconShield />
              Super Admin
            </Link>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <IconMail />
                  </div>
                  <input
                    type="email"
                    value={email}
                    required
                    placeholder="you@example.com"
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition bg-gray-50 focus:bg-white`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <IconLock />
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    required
                    placeholder="••••••••"
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition bg-gray-50 focus:bg-white`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    <IconEye show={showPass} />
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{ background: loading ? "#9ca3af" : theme.accent }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <IconArrow />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <span className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">DEMO ACCESS</span>
              <span className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Demo button */}
            <button
              type="button"
              onClick={fillDemo}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all group"
            >
              <span className="text-yellow-500 group-hover:animate-bounce">
                <IconZap />
              </span>
              Fill {theme.label} Demo Credentials
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              Demo:{" "}
              <code className="bg-gray-100 px-1 rounded text-gray-600">
                {isSuperAdmin ? DEMO.superAdmin.email : DEMO.storeAdmin.email}
              </code>
            </p>
          </div>

          {/* Register link */}
          {!isSuperAdmin && (
            <p className="text-sm text-center text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-blue-600 hover:underline">
                Create your store →
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
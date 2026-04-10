import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const IconLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
    <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
    <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
  </svg>
);
const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function PublicLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ══════════ NAVBAR ══════════ */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-sm">
              <IconLogo />
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">StoreForge</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
            >
              Create Store →
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition text-slate-700"
          >
            {mobileOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2 animate-fade-in">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition"
            >
              Create Store →
            </Link>
          </div>
        )}
      </header>

      {/* ══════════ CONTENT ══════════ */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <IconLogo />
                </div>
                <span className="text-white font-bold">StoreForge</span>
              </div>
              <p className="text-sm leading-relaxed">
                The modern multi-tenant SaaS platform for building and scaling e-commerce stores.
              </p>
            </div>
            {/* Links */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">Platform</p>
              <ul className="space-y-2 text-sm">
                <li><a href="/#features" className="hover:text-white transition">Features</a></li>
                <li><a href="/#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><Link to="/register" className="hover:text-white transition">Create Store</Link></li>
              </ul>
            </div>
            {/* Admin */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">Admin</p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/login" className="hover:text-white transition">Store Admin Login</Link></li>
                <li><Link to="/login?role=superAdmin" className="hover:text-white transition">Super Admin Login</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs">© {new Date().getFullYear()} StoreForge. All rights reserved.</p>
            <p className="text-xs">Multi-Tenant SaaS E-Commerce Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
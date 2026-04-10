import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

/* ─────────────────────────────────────
   Icons
───────────────────────────────────── */
const IconDashboard = ({ cls }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={cls}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);
const IconTenants = ({ cls }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={cls}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);
const IconPlus = ({ cls }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={cls}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
  </svg>
);
const IconPlans = ({ cls }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={cls}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 011.875 1.875v1.5a1.875 1.875 0 01-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875v-1.5c0-1.036.84-1.875 1.875-1.875z" />
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

/* ─────────────────────────────────────
   Nav config
───────────────────────────────────── */
const navItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: IconDashboard,
    description: "Overview & metrics",
  },
  {
    name: "Tenants",
    path: "/admin/tenants",
    icon: IconTenants,
    description: "Manage all stores",
  },
  {
    name: "Plans",
    path: "/admin/plans",
    icon: IconPlans,
    description: "Manage subscription plans",
  },
  // {
  //   name: "Create Tenant",
  //   path: "/admin/create-tenant",
  //   icon: IconPlus,
  //   description: "Onboard new store",
  // },
];

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */
function SuperAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login?role=superAdmin");
  };

  const currentPage = navItems.find(
    (n) => location.pathname === n.path || location.pathname.startsWith(n.path + "/")
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ══════════════════════════════
          Overlay (mobile)
      ══════════════════════════════ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══════════════════════════════
          SIDEBAR
      ══════════════════════════════ */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 z-50
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)",
        }}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <IconShield />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">StoreForge</p>
              <p className="text-indigo-300 text-[11px] mt-0.5 font-medium">Super Admin</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white transition"
          >
            <IconClose />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 sidebar-scroll overflow-y-auto">
          <p className="text-[10px] font-semibold text-indigo-300/60 uppercase tracking-widest px-3 mb-3">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                  transition-all duration-150 group
                  ${isActive
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-indigo-200 hover:text-white hover:bg-white/8"}
                `}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition ${
                  isActive ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"
                }`}>
                  <item.icon cls="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="leading-none">{item.name}</p>
                  <p className={`text-[11px] mt-0.5 truncate transition ${
                    isActive ? "text-indigo-200" : "text-indigo-400 group-hover:text-indigo-300"
                  }`}>
                    {item.description}
                  </p>
                </div>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              SA
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">Super Admin</p>
              <p className="text-indigo-300 text-[11px] truncate">Platform Owner</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition text-sm font-medium"
          >
            <IconLogout />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════
          MAIN CONTENT
      ══════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">

        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center px-4 md:px-6 gap-4 shadow-sm">
          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition text-slate-600"
          >
            <IconMenu />
          </button>

          {/* Breadcrumb */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="font-semibold text-indigo-600">Platform</span>
              {currentPage && (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  <span className="font-semibold text-slate-900 truncate">{currentPage.name}</span>
                </>
              )}
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-3">
            {/* Status badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 rounded-full">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-xs font-semibold text-violet-700">Platform Online</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-slate-200 bg-white">
          <p className="text-xs text-slate-400 text-center">
            StoreForge Admin Panel · © 2026 · All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
}

export default SuperAdminLayout;

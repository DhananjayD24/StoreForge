import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useNotifications } from "../context/NotificationContext";
import NotificationDropdown from "../components/ui/NotificationDropdown";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "../components/admin/ProfileDropdown";
import NotificationModal from "../components/ui/NotificationModal";

/* ─────────────────────────────────────
   Icons
───────────────────────────────────── */
const IconDashboard = ({ cls }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={cls}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);
const IconProducts = ({ cls }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={cls}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);
const IconOrders = ({ cls }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={cls}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
  </svg>
);
const IconSubscription = ({ cls }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={cls}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
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
const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);
const IconStore = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016 2.993 2.993 0 002.25-1.016 3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72l1.189-1.19A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z" />
  </svg>
);
const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);
const IconExternal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

/* ─────────────────────────────────────
   Nav items
───────────────────────────────────── */
function buildNavItems(ordersCount) {
  return [
    {
      name: "Dashboard",
      path: "/store",
      icon: IconDashboard,
      description: "Store overview",
      exact: true,
    },
    {
      name: "Products",
      path: "/store/products",
      icon: IconProducts,
      description: "Manage catalogue",
    },
    {
      name: "Orders",
      path: "/store/orders",
      icon: IconOrders,
      description: "View & track orders",
      badge: ordersCount,
    },
    {
      name: "Subscription",
      path: "/store/subscription",
      icon: IconSubscription,
      description: "Plans & billing",
    },
  ];
}

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */
function StoreAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { orders } = useOrder();
  const { unreadCount } = useNotifications();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const storeSlug = localStorage.getItem("storeSlug");
  const navItems = buildNavItems(orders.length);

  const currentPage = navItems.find((n) =>
    n.exact ? location.pathname === n.path : location.pathname.startsWith(n.path)
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
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #1e3a5f 100%)",
        }}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <IconStore />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">StoreForge</p>
              <p className="text-blue-300 text-[11px] mt-0.5 font-medium">Store Admin</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white transition"
          >
            <IconClose />
          </button>
        </div>

        {/* Store link  */}
        {storeSlug && (
          <div className="mx-3 mt-3 px-3 py-2 rounded-xl bg-white/5 border border-white/8">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-0.5">Your Store</p>
            <a
              href={`${window.location.origin}/store/${storeSlug}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-blue-300 hover:text-blue-200 text-xs font-medium truncate transition"
            >
              <span className="truncate">/store/{storeSlug}</span>
              <IconExternal />
            </a>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 sidebar-scroll overflow-y-auto">
          <p className="text-[10px] font-semibold text-slate-400/60 uppercase tracking-widest px-3 mb-3">
            Menu
          </p>
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                  transition-all duration-150 group relative
                  ${isActive
                    ? "bg-blue-600/25 text-white"
                    : "text-slate-300 hover:text-white hover:bg-white/8"}
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-blue-400 rounded-r-full" />
                )}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition ${
                  isActive ? "bg-blue-500" : "bg-white/5 group-hover:bg-white/10"
                }`}>
                  <item.icon cls="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="leading-none">{item.name}</p>
                  <p className={`text-[11px] mt-0.5 truncate transition ${
                    isActive ? "text-blue-300" : "text-slate-500 group-hover:text-slate-400"
                  }`}>
                    {item.description}
                  </p>
                </div>
                {item.badge > 0 && (
                  <span className="ml-auto flex-shrink-0 w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-red-500 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              S
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">
                {storeSlug || "My Store"}
              </p>
              <p className="text-slate-400 text-[11px] truncate">Store Owner</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition text-sm font-medium"
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
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition text-slate-600"
          >
            <IconMenu />
          </button>

          {/* Breadcrumb */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="font-semibold text-blue-600">Store</span>
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

          {/* Header right */}
          <div className="flex items-center gap-2">

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-slate-100 transition text-slate-600"
              >
                <IconBell />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center text-[9px] font-bold bg-red-500 text-white rounded-full">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <NotificationDropdown
                open={showNotifications}
                onClose={() => setShowNotifications(false)}
                onSelect={(notification) => {
                  setSelectedNotification(notification);
                  setShowNotifications(false);
                }}
              />
            </div>

            {/* Profile */}
            <ProfileDropdown />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-slate-200 bg-white">
          <p className="text-xs text-slate-400 text-center">
            StoreForge · Store Dashboard · © 2026
          </p>
        </footer>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
    </div>
  );
}

export default StoreAdminLayout;
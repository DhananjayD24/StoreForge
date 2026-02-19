import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function SuperAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Tenants", path: "/admin/tenants" },
    { name: "Create Tenant", path: "/admin/create-tenant" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* ===== Overlay ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-700
          shadow-lg
          z-50
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Logo Area */}
        <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold tracking-tight">
            StoreForge
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Super Admin
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                <span
                  className={`
                    w-2 h-2 rounded-full
                    ${isActive ? "bg-white" : "bg-gray-400"}
                  `}
                />

                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ===== Main Content ===== */}
      <div className="flex flex-col min-h-screen">

        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-6">

          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <h1 className="font-semibold text-base">
              Platform Control Panel
            </h1>
          </div>

          {/* Right */}
          <button
            onClick={() => alert("Logout later")}
            className="text-sm px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Logout
          </button>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default SuperAdminLayout;

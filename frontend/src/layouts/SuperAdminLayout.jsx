// SuperAdminLayout.jsx
// Responsive layout for Super Admin (Platform Owner).
// Includes mobile drawer and separate visual identity.

import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function SuperAdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40 top-0 left-0 h-full
          w-64 bg-black text-white p-6
          transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300
        `}
      >
        <h2 className="text-xl font-bold mb-6">Super Admin</h2>

        <nav className="space-y-4 text-sm">
          <Link to="/admin/dashboard" className="block hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/admin/tenants" className="block hover:text-gray-300">
            Tenants
          </Link>
          <Link to="/admin/analytics" className="block hover:text-gray-300">
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">

        <header className="bg-white dark:bg-gray-800 shadow px-4 md:px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

          <h1 className="font-semibold text-sm md:text-base">
            Platform Control Panel
          </h1>
        </header>

        <main className="p-4 md:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SuperAdminLayout;

/**
 * StoreAdminLayout.jsx
 *
 * Store Admin main layout.
 *
 * Features:
 * - Slide-in sidebar (all screen sizes)
 * - Overlay close behavior
 * - Notification badge system
 * - Responsive header
 * - Nested route rendering
 *
 * FUTURE:
 * - Notification dropdown
 * - Socket.io live updates
 */

import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useNotifications } from "../context/NotificationContext";
import NotificationDropdown from "../components/ui/NotificationDropdown";

function StoreAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const { orders } = useOrder();
  const { unreadCount } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  /* ===============================
     Navigation Items
  =============================== */
  const navItems = [
    { name: "Dashboard", path: "/store" },
    { name: "Products", path: "/store/products" },
    { name: "Orders", path: "/store/orders", badge: orders.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ===============================
          Overlay
      =============================== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===============================
          Sidebar (Slide Drawer)
      =============================== */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-700
          shadow-lg z-50
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold tracking-tight">StoreForge</h2>
          <p className="text-xs text-gray-500 mt-1">Store Admin</p>
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
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-gray-900 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                {/* Active Indicator */}
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? "bg-white" : "bg-gray-400"
                  }`}
                />

                {item.name}

                {/* Badge */}
                {item.badge > 0 && (
                  <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ===============================
          Main Content
      =============================== */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-4 md:px-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {/* Hamburger */}
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

            <h1 className="font-semibold text-base md:text-lg">Store Admin</h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* ===============================
    Notification Bell
================================ */}
            <div className="relative">
              {/* Clickable Bell */}
              <div
                onClick={() => setShowNotifications((prev) => !prev)}
                className="cursor-pointer relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z"
                  />
                </svg>

                {/* Badge */}
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>

              {/* Dropdown Panel */}
              <NotificationDropdown
                open={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>

            {/* Logout */}
            <button
              onClick={() => alert("Logout logic later")}
              className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StoreAdminLayout;

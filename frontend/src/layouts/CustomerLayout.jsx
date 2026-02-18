// CustomerLayout.jsx
// Responsive layout for customer-facing pages.
// Includes:
// - Mobile hamburger menu
// - Responsive navbar
// - Dark mode toggle
// - Footer
// - Outlet for nested routes

import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function CustomerLayout() {
  const { darkMode, setDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* ===== NAVBAR ===== */}
      <nav className="bg-white dark:bg-gray-800 shadow-md px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            StoreForge
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="hover:text-blue-500">
              Products
            </Link>
            <Link to="/cart" className="hover:text-blue-500">
              Cart
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 flex flex-col gap-4 md:hidden">
            <Link to="/products">Products</Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm w-fit"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>
        )}
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 px-4 md:px-8 py-6">
        <Outlet />
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 text-sm">
        © 2026 StoreForge. All rights reserved.
      </footer>
    </div>
  );
}

export default CustomerLayout;

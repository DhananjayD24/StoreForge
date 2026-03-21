import { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function CustomerLayout() {
  const { darkMode, setDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { slug } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      
      {/* ===== NAVBAR ===== */}
      <nav className="bg-white dark:bg-gray-800 shadow-md px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to={`/store/${slug}`} className="text-xl font-bold">
            StoreForge
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to={`/store/${slug}`}
              className="hover:text-blue-500"
            >
              Home
            </Link>

            <Link
              to={`/store/${slug}/cart`}
              className="hover:text-blue-500"
            >
              Cart
            </Link>

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

            <Link to={`/store/${slug}`}>
              Home
            </Link>

            <Link to={`/store/${slug}/cart`}>
              Cart
            </Link>

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
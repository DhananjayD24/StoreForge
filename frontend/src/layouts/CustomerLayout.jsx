import { useState } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const IconLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
    <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
    <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
  </svg>
);
const IconCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
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

function CustomerLayout() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cartItems?.reduce((sum, i) => sum + (i.quantity || 1), 0) || 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* ══════════ NAVBAR ══════════ */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

          {/* Store brand */}
          <Link to={`/store/${slug}`} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
              <IconLogo />
            </div>
            <span className="font-bold text-slate-900 text-base capitalize tracking-tight">
              {slug?.replace(/-/g, " ") || "Store"}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={`/store/${slug}`}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Home
            </Link>
            <button
              onClick={() => navigate(`/store/${slug}/cart`)}
              className="relative inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition"
            >
              <IconCart />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-rose-500 text-white rounded-full">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => navigate(`/store/${slug}/cart`)}
              className="relative p-2 rounded-lg hover:bg-slate-100 transition text-slate-700"
            >
              <IconCart />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 flex items-center justify-center text-[9px] font-bold bg-rose-500 text-white rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition text-slate-700"
            >
              {mobileOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-2 animate-fade-in">
            <Link
              to={`/store/${slug}`}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition"
            >
              Home
            </Link>
            <Link
              to={`/store/${slug}/cart`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition"
            >
              <IconCart /> Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        )}
      </header>

      {/* ══════════ CONTENT ══════════ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 md:py-10">
        <Outlet />
      </main>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center">
              <IconLogo />
            </div>
            <span className="text-sm text-slate-300 font-medium capitalize">
              {slug?.replace(/-/g, " ") || "Store"}
            </span>
          </div>
          <p className="text-xs">Powered by <span className="text-indigo-400 font-semibold">StoreForge</span> · © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default CustomerLayout;
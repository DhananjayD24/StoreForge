import { Link, Outlet, useNavigate } from "react-router-dom";

export default function PublicLayout() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">

        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
        >
          StoreForge
        </h1>

        <div className="flex items-center gap-6">

          <Link
            to="/login"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Login
          </Link>

          <button
            onClick={() => navigate("/register")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transition"
          >
            Create Store
          </button>

        </div>

      </nav>


      {/* PAGE CONTENT */}
      <main className="grow">
        <Outlet />
      </main>


      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">

        <p className="text-sm">
          © {new Date().getFullYear()} StoreForge — Multi-Tenant SaaS Platform
        </p>

      </footer>

    </div>
  );
}
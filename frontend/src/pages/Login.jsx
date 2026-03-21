import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const loginRole = query.get("role") || "storeAdmin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      await login(email, password);

      const role = localStorage.getItem("role");
      const tenantId = localStorage.getItem("tenantId");

      if (role === "superAdmin") {
        navigate("/admin");
      }

      else if (role === "storeAdmin" && (!tenantId || tenantId === "null")) {
        navigate("/plans");
      }

      else if (role === "storeAdmin") {
        navigate("/store");
      }

      else {
        navigate("/");
      }

    } catch {

      alert("Invalid credentials");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 to-purple-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          {loginRole === "superAdmin" ? "Super Admin Login" : "Store Admin Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 hover:scale-105 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {loginRole !== "superAdmin" && (

          <p className="text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create Store
            </Link>
          </p>

        )}

      </div>

    </div>

  );
}
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      // 1️⃣ Create account
      await api.post("/auth/register", {
        ...form,
        role: "storeAdmin"
      });

      // 2️⃣ Auto login
      await login(form.email, form.password);

      const role = localStorage.getItem("role");
      const tenantId = localStorage.getItem("tenantId");

      // 3️⃣ Redirect
      if (role === "storeAdmin" && (!tenantId || tenantId === "null")) {
        navigate("/plans");
      }

      else if (role === "storeAdmin") {
        navigate("/store");
      }

    } catch (err) {

      alert(err.response?.data?.message || "Registration failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="flex items-center justify-center py-20">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Create Your Store
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 hover:scale-105 transition"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>

      </div>

    </div>
  );
}
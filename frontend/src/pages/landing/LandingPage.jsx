import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Multi-Tenant SaaS",
      desc: "Run multiple independent stores on a shared scalable platform.",
    },
    {
      title: "Subscription Plans",
      desc: "Flexible plans with automated store provisioning.",
    },
    {
      title: "Product Management",
      desc: "Add, edit and organize products easily.",
    },
    {
      title: "Order Management",
      desc: "Track orders and manage customers efficiently.",
    },
    {
      title: "Real-Time Notifications",
      desc: "Get instant alerts when customers place orders.",
    },
    {
      title: "Analytics Dashboard",
      desc: "Visualize store performance with interactive charts.",
    },
  ];

  const plans = [
    { name: "Starter", price: "₹99/mo", limit: "10 Products" },
    { name: "Growth", price: "₹299/mo", limit: "100 Products" },
    { name: "Pro", price: "₹699/mo", limit: "Unlimited Products" },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-600">StoreForge</h1>

        <div className="space-x-6 hidden md:flex">
          <a href="#features" className="hover:text-indigo-600">
            Features
          </a>
          <a href="#pricing" className="hover:text-indigo-600">
            Pricing
          </a>
          <a
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:text-indigo-600"
          >
            Login
          </a>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
        >
          Create Store
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center min-h-[90vh] bg-linear-to-br from-indigo-600 to-purple-700 text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6"
        >
          Build Your Online Store in Minutes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl max-w-2xl"
        >
          StoreForge is a modern SaaS platform that helps entrepreneurs create,
          manage and scale their own e-commerce stores effortlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex gap-4"
        >
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Start Free
          </button>

          <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-600 transition">
            View Demo
          </button>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Powerful Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-100 py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Start Selling in 3 Steps
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto text-center">
          {[
            "Choose a subscription plan",
            "Create your store instantly",
            "Add products and start selling",
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow"
            >
              <div className="text-3xl font-bold text-indigo-600 mb-4">
                {i + 1}
              </div>
              <p className="text-lg">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Simple Transparent Pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>

              <p className="text-3xl font-bold text-indigo-600 mb-4">
                {plan.price}
              </p>

              <p className="mb-6">{plan.limit}</p>

              <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700">
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Launch Your Store Today</h2>

        <p className="mb-8 text-lg">
          Join StoreForge and start building your online business now.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Create Your Store
        </button>
      </section>

      <section className="bg-gray-900 text-white py-10 text-center">

<h3 className="text-lg mb-3">
Platform Administration
</h3>

<button
onClick={() => navigate("/login?role=superAdmin")}
className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition"
>
Super Admin Login
</button>

</section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center">
        <p className="mb-2">
          © {new Date().getFullYear()} StoreForge. All rights reserved.
        </p>

        <p className="text-sm text-gray-400">
          Multi-Tenant SaaS E-Commerce Platform
        </p>
      </footer>
    </div>
  );
}

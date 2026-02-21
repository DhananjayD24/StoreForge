// Dashboard.jsx
// Premium Store Admin Dashboard
// Clean SaaS-style layout with better spacing and visual hierarchy

import useRevenueSimulator from "../../hooks/UseRevenueSimulator";
import StatCard from "../../components/admin/StatCard";
import { products } from "../../data/mockData";
import { useOrder } from "../../context/OrderContext";
import RevenueChart from "../../components/admin/RevenueChart";
import OrdersChart from "../../components/admin/OrdersChart";

function Dashboard() {
  const { revenue, orders } = useOrder();

  const totalOrders = 124;
  const totalCustomers = 89;
  const totalProducts = products.length;

  return (
    <div className="space-y-12">
      {/* ===== PAGE HEADER ===== */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Monitor your store performance in real time.
        </p>
      </div>

      {/* ===== KPI GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹ ${revenue.toLocaleString()}`}
          subtitle="+ Live updates"
        />

        <StatCard title="Total Orders" value={totalOrders} />

        <StatCard title="Customers" value={totalCustomers} />

        <StatCard title="Products" value={totalProducts} />
      </div>

      {/* ===== Analytics Charts ===== */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <RevenueChart />
        <OrdersChart />
      </div>

      {/* ===== RECENT ORDERS ===== */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b dark:border-gray-700 text-gray-500">
                <th className="py-3">Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className="divide-y dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="py-3 font-medium">#12345</td>
                <td>Rohan Sharma</td>
                <td>₹ 4999</td>
                <td>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                    Processing
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="py-3 font-medium">#12346</td>
                <td>Anita Verma</td>
                <td>₹ 2999</td>
                <td>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== LOW STOCK ===== */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
        <h2 className="font-semibold text-red-600 dark:text-red-400">
          ⚠ Low Stock Alert
        </h2>

        <ul className="mt-4 text-sm space-y-2">
          {products
            .filter((product) => product.stock < 5)
            .map((product) => (
              <li key={product.id}>
                {product.name} — Only {product.stock} left
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

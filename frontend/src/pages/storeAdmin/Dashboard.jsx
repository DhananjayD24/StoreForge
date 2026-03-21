import { useEffect, useState } from "react";
import api, { FRONTEND_BASE_URL } from "../../api/api";

import StatCard from "../../components/admin/StatCard";
import RevenueChart from "../../components/admin/RevenueChart";
import OrdersChart from "../../components/admin/OrdersChart";

function Dashboard() {

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);

  const storeSlug = localStorage.getItem("storeSlug");

  // =============================
  // Fetch Dashboard Analytics
  // =============================

  const fetchDashboard = async () => {
    try {

      const res = await api.get("/analytics/dashboard");

      setStats({
        totalRevenue: res.data.totalRevenue,
        totalOrders: res.data.totalOrders,
        totalProducts: res.data.totalProducts
      });

      const revenueData =
      res.data.dailyRevenue.length > 0
        ? res.data.dailyRevenue
        : [
            { date: "Day 1", revenue: 0, orders: 0 },
            { date: "Day 2", revenue: 0, orders: 0 },
            { date: "Day 3", revenue: 0, orders: 0 },
            { date: "Day 4", revenue: 0, orders: 0 },
            { date: "Day 5", revenue: 0, orders: 0 },
          ];

      setDailyRevenue(revenueData);
      setRecentOrders(res.data.recentOrders);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-12">

      {/* ===== PAGE HEADER ===== */}

      <div>

        <h1 className="text-2xl md:text-3xl font-bold">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Monitor your store performance in real time.
        </p>

      </div>

      {/* ===== KPI CARDS ===== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Revenue"
          value={`₹ ${stats.totalRevenue.toLocaleString()}`}
          subtitle="All time"
        />

        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
        />

        <StatCard
          title="Total Products"
          value={stats.totalProducts}
        />

        <StatCard
          title="Store Status"
          value="Active"
        />

      </div>

      {/* ===== STORE LINK ===== */}

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex items-center gap-3">

        <span className="text-sm font-medium">
          Your Store Link:
        </span>

        <a
          href={`${FRONTEND_BASE_URL}/store/${storeSlug}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600"
        >
          {FRONTEND_BASE_URL}/store/{storeSlug}
        </a>

        <button
          onClick={() =>
            navigator.clipboard.writeText(
              `${FRONTEND_BASE_URL}/store/${storeSlug}`
            )
          }
          className="ml-auto bg-gray-200 px-3 py-1 rounded text-sm"
        >
          Copy
        </button>

      </div>

      {/* ===== ANALYTICS CHARTS ===== */}

      <div className="grid lg:grid-cols-2 gap-6"> 

        <RevenueChart data={dailyRevenue} />

        <OrdersChart data={dailyRevenue} />

      </div>

    </div>
  );
}

export default Dashboard;
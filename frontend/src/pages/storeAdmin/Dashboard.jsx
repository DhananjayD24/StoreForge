import { useEffect, useState } from "react";
import api, { FRONTEND_BASE_URL } from "../../api/api";
import StatCard from "../../components/admin/StatCard";
import RevenueChart from "../../components/admin/RevenueChart";
import OrdersChart from "../../components/admin/OrdersChart";

/* ─── Icons ─── */
const IconRevenue = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconOrders = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
  </svg>
);
const IconProducts = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);
const IconStatus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconCopy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>
);
const IconExternal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

function Dashboard() {
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, totalProducts: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [copied, setCopied] = useState(false);

  const storeSlug = localStorage.getItem("storeSlug");
  const storeUrl = `${FRONTEND_BASE_URL}/store/${storeSlug}`;

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/analytics/dashboard");
      setStats({
        totalRevenue: res.data.totalRevenue,
        totalOrders: res.data.totalOrders,
        totalProducts: res.data.totalProducts,
      });
      const revenueData =
        res.data.dailyRevenue?.length > 0
          ? res.data.dailyRevenue
          : [
              { date: "Day 1", revenue: 0, orders: 0 },
              { date: "Day 2", revenue: 0, orders: 0 },
              { date: "Day 3", revenue: 0, orders: 0 },
              { date: "Day 4", revenue: 0, orders: 0 },
              { date: "Day 5", revenue: 0, orders: 0 },
            ];
      setDailyRevenue(revenueData);
      setRecentOrders(res.data.recentOrders || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 rounded-full bg-blue-500" />
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        </div>
        <p className="text-sm text-slate-500 ml-3">Monitor your store performance in real time.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 stagger">
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
          icon={IconRevenue}
          color="emerald"
          change={14}
          subtitle="All time earnings"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={IconOrders}
          color="blue"
          change={7}
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={IconProducts}
          color="violet"
        />
        <StatCard
          title="Store Status"
          value="Active"
          icon={IconStatus}
          color="emerald"
          status="active"
        />
      </div>

      {/* Store Link Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Your Public Store URL</p>
          <p className="text-sm text-blue-600 font-medium truncate">{storeUrl}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={storeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            <IconExternal /> Visit
          </a>
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition ${
              copied
                ? "bg-emerald-100 text-emerald-700"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            <IconCopy />
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 animate-fade-in-up">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm font-bold text-slate-800 mb-4">Revenue Trend</p>
          <RevenueChart data={dailyRevenue} />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm font-bold text-slate-800 mb-4">Orders Trend</p>
          <OrdersChart data={dailyRevenue} />
        </div>
      </div>

      {/* Recent Orders mini-table */}
      {recentOrders.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-800">Recent Orders</p>
              <p className="text-xs text-slate-400 mt-0.5">Latest {recentOrders.length} orders</p>
            </div>
            <a href="/store/orders" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              View all →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.slice(0, 5).map((order, i) => (
                  <tr key={order._id || i} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-mono font-semibold text-slate-700">
                        #{(order._id || "").slice(-6)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-sm text-slate-600">{order.customerName}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-semibold text-emerald-600">
                        ₹{order.totalAmount?.toLocaleString("en-IN")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
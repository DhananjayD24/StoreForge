/**
 * OrdersChart.jsx
 *
 * Shows number of orders per month.
 * Socket.io will later push updates here.
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAnalytics } from "../../context/AnalyticsContext";

export default function OrdersChart() {
    const { ordersData } = useAnalytics();
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-4">
        Orders Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ordersData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />
          <YAxis />

          <Tooltip />

          <Bar dataKey="orders" fill="#22c55e" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

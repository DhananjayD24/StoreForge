import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function OrdersChart({ data }) {

  const hasData = data && data.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">

      <h2 className="text-lg font-semibold mb-6">
        Orders Analytics
      </h2>

      {!hasData ? (

        <div className="h-[300px] flex flex-col items-center justify-center text-gray-400 text-sm">
          📦 No orders yet  
          <span className="text-xs mt-1">
            Orders chart will appear once customers place orders.
          </span>
        </div>

      ) : (

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="orders"
              fill="#22c55e"
              radius={[4,4,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      )}

    </div>
  );
}

export default OrdersChart;
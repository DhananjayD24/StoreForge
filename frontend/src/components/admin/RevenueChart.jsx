import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function RevenueChart({ data }) {

  const hasData = data && data.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">

      <h2 className="text-lg font-semibold mb-6">
        Revenue Overview
      </h2>

      {!hasData ? (

        <div className="h-[300px] flex flex-col items-center justify-center text-gray-400 text-sm">
          📊 No revenue data yet  
          <span className="text-xs mt-1">
            Revenue graph will appear once orders are placed.
          </span>
        </div>

      ) : (

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      )}

    </div>
  );
}

export default RevenueChart;
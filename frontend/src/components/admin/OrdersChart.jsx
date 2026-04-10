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
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">

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
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
            />
            <Bar
              dataKey="orders"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      )}

    </div>
  );
}

export default OrdersChart;
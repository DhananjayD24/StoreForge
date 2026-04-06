import { useOrder } from "../../context/OrderContext";

/* ─── Icons ─── */
const IconEmpty = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth={1.5} className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
  </svg>
);

function Orders() {
  const { orders } = useOrder();

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 rounded-full bg-blue-500" />
            <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          </div>
          <p className="text-sm text-slate-500 ml-3">
            {orders.length} order{orders.length !== 1 ? "s" : ""} received
          </p>
        </div>
        {orders.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5 flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Total Revenue</span>
            <span className="text-lg font-bold text-emerald-700">₹{totalRevenue.toLocaleString("en-IN")}</span>
          </div>
        )}
      </div>

      {/* Empty state */}
      {!orders || orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 py-20 flex flex-col items-center gap-3 animate-fade-in-up">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
            <IconEmpty />
          </div>
          <p className="text-sm font-semibold text-slate-500">No orders yet</p>
          <p className="text-xs text-slate-400">Orders from your store will appear here.</p>
        </div>
      ) : (
        /* Table */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Contact</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Items</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order, i) => (
                  <tr
                    key={order._id}
                    className="hover:bg-slate-50 transition animate-fade-in-up"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    {/* Order ID */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-xs font-semibold text-slate-700">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {(order.customerName || "?")[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate max-w-[120px]">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-slate-400 truncate max-w-[120px] hidden sm:block">
                            {order.customerEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <p className="text-sm text-slate-600">{order.customerPhone}</p>
                      <p className="text-xs text-slate-400 mt-0.5 max-w-[160px] truncate">{order.customerAddress}</p>
                    </td>

                    {/* Items */}
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="space-y-0.5">
                        {order.items.map((item, j) => (
                          <div key={j} className="text-xs text-slate-500">
                            <span className="font-semibold text-slate-700">{item.quantity}×</span>{" "}
                            ₹{item.price}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold text-emerald-600">
                        ₹{order.totalAmount?.toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-xs text-slate-500">{formatDate(order.createdAt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer summary */}
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-400">{orders.length} total orders</span>
            <span className="text-xs font-bold text-slate-700">
              Total: ₹{totalRevenue.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
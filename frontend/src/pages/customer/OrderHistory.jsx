import { useOrder } from "../../context/OrderContext";

function OrderHistory() {
  const { orders } = useOrder();

  if (orders.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center animate-fade-in-up">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl">📋</div>
        <div>
          <p className="font-semibold text-slate-700">No orders yet</p>
          <p className="text-sm text-slate-400 mt-0.5">Your order history will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
        <p className="text-sm text-slate-400 mt-0.5">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
      </div>

      <div className="space-y-4 stagger">
        {orders.map((order, i) => (
          <div
            key={order.id || i}
            className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition animate-fade-in-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 font-mono text-xs font-semibold text-slate-700 rounded-lg">
                  #{String(order.id || i + 1).slice(-6).toUpperCase()}
                </span>
                <p className="text-xs text-slate-400 mt-1">{order.date || "—"}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Delivered
              </span>
            </div>

            <div className="space-y-1 mb-3">
              {(order.items || []).map((item, j) => (
                <div key={j} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{item.name}</span>
                  <span className="font-medium text-slate-700">×{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Total</span>
              <span className="font-extrabold text-slate-900">₹{order.total?.toLocaleString?.("en-IN") ?? order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;

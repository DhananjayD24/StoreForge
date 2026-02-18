// OrderHistory.jsx
// Displays list of previously placed orders

import { useOrder } from "../../context/OrderContext";

function OrderHistory() {
  const { orders } = useOrder();

  if (orders.length === 0) {
    return <p>No orders placed yet.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm"
        >
          <p className="text-sm text-gray-500">
            Order ID: {order.id}
          </p>

          <p className="text-sm mb-2">
            Date: {order.date}
          </p>

          {order.items.map((item) => (
            <p key={item.id} className="text-sm">
              {item.name} x {item.quantity}
            </p>
          ))}

          <p className="mt-2 font-semibold">
            Total: ₹ {order.total}
          </p>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;

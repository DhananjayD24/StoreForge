import { useOrder } from "../../context/OrderContext";

function Orders() {
  const { orders, updateOrderStatus } = useOrder();

  if (orders.length === 0) {
    return (
      <div className="text-gray-500">
        No orders placed yet.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold">
        Orders Management
      </h1>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700 text-left">
              <th className="py-3">Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className="divide-y dark:divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-3 font-medium">
                  #{order.id}
                </td>
                <td>{order.date}</td>
                <td>₹ {order.total}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm dark:bg-gray-700"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm space-y-3"
          >
            <div className="flex justify-between">
              <span className="font-semibold">
                #{order.id}
              </span>
              <span className="text-sm text-gray-500">
                ₹ {order.total}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              {order.date}
            </p>

            <select
              value={order.status}
              onChange={(e) =>
                updateOrderStatus(order.id, e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700"
            >
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Orders;

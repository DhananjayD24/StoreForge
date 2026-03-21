import { useOrder } from "../../context/OrderContext";

function Orders() {
  const { orders } = useOrder();

  if (!orders || orders.length === 0) {
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

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead>
            <tr className="border-b dark:border-gray-700 text-left">
              <th className="py-3">Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody className="divide-y dark:divide-gray-700">

            {orders.map((order) => (

              <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">

                <td className="py-3 font-medium">
                  #{order._id.slice(-6)}
                </td>

                <td>
                  {order.customerName}
                </td>

                <td>
                  {order.customerEmail}
                </td>

                <td>
                  {order.customerPhone}
                </td>

                <td className="max-w-xs">
                  {order.customerAddress}
                </td>

                <td>
                  {order.items.map((item) => (
                    <div key={item.productId}>
                      {item.quantity} × ₹{item.price}
                    </div>
                  ))}
                </td>

                <td>
                  ₹ {order.totalAmount}
                </td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Orders;
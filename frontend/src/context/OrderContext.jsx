// OrderContext.jsx
// Simulates backend order storage.
// Stores completed orders in memory.

import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);

  // Place new order
  const placeOrder = (cartItems, totalPrice) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: totalPrice,
      date: new Date().toLocaleString(),
      status: "Processing",
    };

    setOrders((prev) => [...prev, newOrder]);
    setRevenue((prev) => prev + totalPrice); // 🔥 auto increase revenue
  };

  // Update order status (ADMIN SIDE)
  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  return (
    <OrderContext.Provider
      value={{ orders, placeOrder, updateOrderStatus, revenue }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}

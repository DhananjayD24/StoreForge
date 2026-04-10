import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/api";

const OrderContext = createContext();

export function OrderProvider({ children }) {

  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await api.get("/orders/tenant");
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  }, []);

  useEffect(() => {

    fetchOrders();

  }, []);

  return (
    <OrderContext.Provider value={{ orders, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
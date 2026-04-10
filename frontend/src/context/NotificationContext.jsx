import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useOrder } from "./OrderContext";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { tenantId } = useAuth();
  const { fetchOrders } = useOrder();

  useEffect(() => {
    if (!tenantId) return;

    const socket = io(import.meta.env.VITE_BACKEND_URL);
    
    socket.emit("join-tenant", tenantId);

    socket.on("new-order", (notification) => {
      setNotifications(prev => [notification, ...prev]);
      fetchOrders();
    });

    return () => socket.disconnect();
  }, [tenantId, fetchOrders]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
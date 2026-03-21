import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const socket = io("http://localhost:5000");

    const tenantId = localStorage.getItem("tenantId");

    socket.emit("join-tenant", tenantId);

    socket.on("new-order", (notification) => {

      setNotifications(prev => [notification, ...prev]);

    });

    return () => socket.disconnect();

  }, []);

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
/**
 * NotificationContext.jsx
 *
 * Global notification system.
 *
 * CURRENT:
 * - Simulated notifications
 *
 * FUTURE:
 * - Socket.io pushes real events
 * - Toast UI via Shadcn
 */

import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  // notification list
  const [notifications, setNotifications] = useState([]);

  /**
   * Simulate incoming notifications
   * (Socket.io later replaces this)
   */
  useEffect(() => {
    const interval = setInterval(() => {
      addNotification("New order received!", "success");
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Add new notification
   * (Socket events will call this later)
   */
  const addNotification = (message, type = "info") => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  /**
   * Mark all as read
   */
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAllRead,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

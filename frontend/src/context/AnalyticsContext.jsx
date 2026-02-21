/**
 * AnalyticsContext.jsx
 *
 * Global analytics state for dashboards.
 *
 * CURRENT:
 * - Uses mock data
 *
 * FUTURE:
 * - Data fetched from backend API
 * - Updated live via Socket.io events
 */

import { createContext, useContext, useState, useEffect } from "react";

const AnalyticsContext = createContext();

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider = ({ children }) => {

  /* ===============================
     Analytics State
  =============================== */

  // Revenue analytics
  const [revenueData, setRevenueData] = useState([
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 28000 },
    { month: "Jun", revenue: 32000 },
  ]);

  // Orders analytics
  const [ordersData, setOrdersData] = useState([
    { month: "Jan", orders: 20 },
    { month: "Feb", orders: 35 },
    { month: "Mar", orders: 28 },
    { month: "Apr", orders: 42 },
    { month: "May", orders: 50 },
    { month: "Jun", orders: 61 },
  ]);

  /* ===============================
     Live Update Simulator
     (Socket.io later)
  =============================== */

  useEffect(() => {
    const interval = setInterval(() => {

      setRevenueData(prev =>
        prev.map(item => ({
          ...item,
          revenue: item.revenue + Math.floor(Math.random() * 500),
        }))
      );

      setOrdersData(prev =>
        prev.map(item => ({
          ...item,
          orders: item.orders + Math.floor(Math.random() * 3),
        }))
      );

    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ===============================
     Manual Trigger (Dev Testing)
  =============================== */

  const simulateLiveUpdate = () => {
    setRevenueData(prev =>
      prev.map(item => ({
        ...item,
        revenue: item.revenue + Math.floor(Math.random() * 1000),
      }))
    );
  };

  return (
    <AnalyticsContext.Provider
      value={{
        revenueData,
        ordersData,
        simulateLiveUpdate,
        setRevenueData,
        setOrdersData,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

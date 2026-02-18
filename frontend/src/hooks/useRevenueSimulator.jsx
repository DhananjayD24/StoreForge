// useRevenueSimulator.js
// Simulates live revenue updates using setInterval.
// This replaces real-time Socket.io behavior for now.

import { useEffect, useState } from "react";

function useRevenueSimulator(initialValue = 50000) {
  const [revenue, setRevenue] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIncrease = Math.floor(Math.random() * 500);
      setRevenue((prev) => prev + randomIncrease);
    }, 3000); // update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return revenue;
}

export default useRevenueSimulator;

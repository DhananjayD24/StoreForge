import { createContext, useContext, useState } from "react";

const TenantContext = createContext();

export const useTenants = () => useContext(TenantContext);

export const TenantProvider = ({ children }) => {
  const [tenants, setTenants] = useState([
    {
      id: 1,
      storeName: "TechStore",
      owner: "Ruchir",
      email: "tech@store.com",
      plan: "Pro",
      status: "active",
    },
  ]);

  const addTenant = (tenant) => {
    setTenants((prev) => [
      ...prev,
      { id: Date.now(), status: "active", ...tenant },
    ]);
  };

  const toggleTenantStatus = (id) => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "active" ? "suspended" : "active",
            }
          : t
      )
    );
  };

  // Upgrade tenant subscription plan
const upgradePlan = (id, newPlan) => {
  setTenants((prev) =>
    prev.map((t) =>
      t.id === id ? { ...t, plan: newPlan } : t
    )
  );
};


  return (
    <TenantContext.Provider
      value={{ tenants, addTenant, toggleTenantStatus, upgradePlan }}
    >
      {children}
    </TenantContext.Provider>
  );
};

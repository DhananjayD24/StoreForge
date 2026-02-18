import { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState("customer"); 
  const [currentTenant, setCurrentTenant] = useState("tenant1");

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        currentTenant,
        setCurrentTenant,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}

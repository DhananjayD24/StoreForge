import { createContext, useContext, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [role, setRole] = useState(localStorage.getItem("role"));
  const [tenantId, setTenantId] = useState(localStorage.getItem("tenantId"));

  const login = async (email, password) => {

    const res = await api.post("/auth/login", {
      email,
      password
    });

    const { token, role, tenantId } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("tenantId", tenantId);

    setRole(role);
    setTenantId(tenantId);
  };

  const logout = () => {
    localStorage.clear();
    
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        tenantId,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
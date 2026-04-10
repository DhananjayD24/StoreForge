import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import RoleSwitcher from "./components/ui/RoleSwitcher";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import api from "./api/api";

function App() {
  
  // Background ping to wake up free-tier server quickly
  useEffect(() => {
    api.get("/")
      .catch((_) => {
        // Silently ignore ping errors so it doesn't bother the user
      });
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider>
        <AppRoutes />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
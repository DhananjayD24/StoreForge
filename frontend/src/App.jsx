import AppRoutes from "./routes/AppRoutes";
import RoleSwitcher from "./components/ui/RoleSwitcher";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppRoutes />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
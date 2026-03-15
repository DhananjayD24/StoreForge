import AppRoutes from "./routes/AppRoutes";
import RoleSwitcher from "./components/ui/RoleSwitcher";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      
    </AuthProvider>
  );
}

export default App;
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRole, children }) {

  const { role } = useAuth();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role === allowedRole) {
    return children;
  }

  switch (role) {

    case "storeAdmin":
      return <Navigate to="/store" replace />;

    case "superAdmin":
      return <Navigate to="/admin/dashboard" replace />;

    default:
      return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
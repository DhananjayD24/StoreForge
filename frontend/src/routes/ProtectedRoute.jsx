import { Navigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

function ProtectedRoute({ allowedRole, children }) {
  const { role } = useRole();

  if (role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;

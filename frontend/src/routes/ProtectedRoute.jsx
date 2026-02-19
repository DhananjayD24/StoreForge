/**
 * ProtectedRoute.jsx
 *
 * Restricts route access based on user role.
 * Automatically redirects user to their
 * correct dashboard if access is denied.
 */

import { Navigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

function ProtectedRoute({ allowedRole, children }) {
  const { role } = useRole();

  // If role matches → allow access
  if (role === allowedRole) {
    return children;
  }

  /**
   * Redirect user to THEIR dashboard
   * instead of always going to "/"
   */
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

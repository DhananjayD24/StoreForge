/**
 * RoleSwitcher.jsx
 *
 * Dev-only role simulator.
 * Fixes redirect conflict with ProtectedRoute by
 * navigating AFTER role state updates.
 */

import { useRole } from "../../context/RoleContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function RoleSwitcher() {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  // temporary state to track requested role change
  const [pendingRole, setPendingRole] = useState(null);

  /**
   * Only update role here.
   * Navigation handled later in useEffect.
   */
  const handleChange = (e) => {
    const selectedRole = e.target.value;
    setPendingRole(selectedRole);
    setRole(selectedRole);
  };

  /**
   * Navigate AFTER role successfully updates.
   * Prevents ProtectedRoute redirect conflict.
   */
  useEffect(() => {
    if (!pendingRole) return;

    switch (pendingRole) {
      case "storeAdmin":
        navigate("/store");
        break;

      case "superAdmin":
        navigate("/admin/dashboard");
        break;

      default:
        navigate("/");
    }

    setPendingRole(null);
  }, [role]); // runs AFTER role updates

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg p-4 rounded-xl">
      <p className="text-xs mb-2 font-semibold">Switch Role</p>

      <select
        value={role}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-sm dark:bg-gray-700"
      >
        <option value="customer">Customer</option>
        <option value="storeAdmin">Store Admin</option>
        <option value="superAdmin">Super Admin</option>
      </select>
    </div>
  );
}

export default RoleSwitcher;

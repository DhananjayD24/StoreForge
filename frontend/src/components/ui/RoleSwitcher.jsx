// RoleSwitcher.jsx
// Adds auto-navigation based on selected role

import { useRole } from "../../context/RoleContext";
import { useNavigate } from "react-router-dom";

function RoleSwitcher() {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  const handleChange = (e) => {
  const selectedRole = e.target.value;
  setRole(selectedRole);

  if (selectedRole === "storeAdmin") {
    navigate("/store");
  } else if (selectedRole === "superAdmin") {
    navigate("/admin");
  } else {
    navigate("/");
  }
};

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

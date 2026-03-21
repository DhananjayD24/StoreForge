import { useState, useEffect } from "react";
import api from "../../api/api";

function ProfileDropdown() {

  const [open, setOpen] = useState(false);

  const userName = localStorage.getItem("userName") || "Store Admin";
  const storeName = localStorage.getItem("storeName") || "My Store";
  const [plan, setPlan] = useState("Loading...");

  useEffect(() => {

    const fetchPlan = async () => {
      try {

        const res = await api.get("/subscription/me");

        setPlan(res.data.planId.name || "Free");

      } catch (err) {

        console.error(err);
        setPlan("Free");

      }
    };

    fetchPlan();

  }, []);

  const changeStoreName = () => {

    const newName = prompt(
      "Changing store name will update how it appears to customers.\nYour store link will NOT change.\n\nEnter new store name:"
    );

    if (!newName) return;

    localStorage.setItem("storeName", newName);

    alert("Store name updated successfully");

    window.location.reload();

  };

  return (

    <div className="relative">

      {/* Avatar */}

      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-bold"
      >
        {userName[0]}
      </button>

      {/* Dropdown */}

      {open && (

        <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 space-y-3">

          <div>

            <p className="font-semibold">{userName}</p>

            <p className="text-sm text-gray-500">
              Store: {storeName}
            </p>

            <p className="text-sm text-gray-500">
              Plan: {plan}
            </p>

          </div>

          <hr />

          <button
            onClick={changeStoreName}
            className="w-full text-left text-sm hover:text-blue-600"
          >
            Change Store Name
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="w-full text-left text-sm text-red-500"
          >
            Logout
          </button>

        </div>

      )}

    </div>

  );

}

export default ProfileDropdown;
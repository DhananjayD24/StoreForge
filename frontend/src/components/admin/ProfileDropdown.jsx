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
        className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-sm hover:opacity-90 transition transform hover:scale-105"
      >
        {userName[0].toUpperCase()}
      </button>

      {/* Dropdown */}

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl border border-slate-100 rounded-2xl p-5 space-y-4 z-50">
            <div>
              <p className="font-bold text-slate-900">{userName}</p>
            <p className="text-sm font-medium text-blue-600 mt-1">
              Store: {storeName}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Plan: {plan}
            </p>
          </div>

          <hr className="border-slate-100" />

          <button
            onClick={changeStoreName}
            className="w-full text-left text-sm font-medium text-slate-700 hover:text-blue-600 transition"
          >
            Change Store Name
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="w-full text-left text-sm font-bold text-red-600 hover:text-red-700 transition"
          >
            Logout
          </button>
        </div>
        </>
      )}

    </div>

  );

}

export default ProfileDropdown;
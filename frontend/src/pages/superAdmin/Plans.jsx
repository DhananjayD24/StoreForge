import { useState, useEffect } from "react";
import api from "../../api/api";
import { toast } from "react-hot-toast";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    durationDays: 30,
    productLimit: -1,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/plans");
      setPlans(data);
    } catch (error) {
      toast.error("Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (plan = null) => {
    if (plan) {
      setCurrentPlan(plan);
      setFormData({
        name: plan.name,
        price: plan.price,
        durationDays: plan.durationDays,
        productLimit: plan.productLimit,
      });
    } else {
      setCurrentPlan(null);
      setFormData({
        name: "",
        price: "",
        durationDays: 30,
        productLimit: -1,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPlan(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        price: Number(formData.price),
        durationDays: Number(formData.durationDays),
        productLimit: Number(formData.productLimit),
      };

      if (currentPlan) {
        await api.patch(`/plans/${currentPlan._id}`, payload);
        toast.success("Plan updated successfully");
      } else {
        await api.post("/plans", payload);
        toast.success("Plan created successfully");
      }
      fetchPlans();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this plan?")) return;
    try {
      await api.patch(`/plans/${id}/deactivate`);
      toast.success("Plan deactivated successfully");
      fetchPlans();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subscription Plans</h1>
          <p className="text-sm text-slate-500">Create and manage plans for tenants.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          + Create Plan
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading plans...</div>
        ) : plans.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No active plans found. Add one above.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Price (₹)</th>
                  <th className="px-6 py-4">Duration (Days)</th>
                  <th className="px-6 py-4">Product Limit</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {plans.map((plan) => (
                  <tr key={plan._id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{plan.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{plan.price}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{plan.durationDays}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {plan.productLimit === -1 ? "Unlimited" : plan.productLimit}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => handleOpenModal(plan)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(plan._id)}
                        className="text-sm font-medium text-rose-600 hover:text-rose-800"
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">
                {currentPlan ? "Edit Plan" : "Create New Plan"}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plan Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="e.g. Starter"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    name="durationDays"
                    value={formData.durationDays}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Limit (-1 for Unlimited)</label>
                <input
                  type="number"
                  name="productLimit"
                  value={formData.productLimit}
                  onChange={handleChange}
                  required
                  min="-1"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm"
                >
                  {currentPlan ? "Save Changes" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

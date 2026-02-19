/**
 * UpgradeModal.jsx
 *
 * Displays SaaS subscription plans.
 * Allows store owner to upgrade plan.
 * Updates tenant plan via context (frontend simulation).
 */

import { useTenants } from "../../context/TenantContext";

export default function UpgradeModal({ open, onClose }) {
  const { tenants, upgradePlan } = useTenants();

  // MVP: first tenant = active store
  const tenant = tenants[0];

  if (!open) return null;

  const plans = [
    { name: "Free", price: "₹0", desc: "Basic features" },
    { name: "Pro", price: "₹499/mo", desc: "Unlimited products + analytics" },
    { name: "Enterprise", price: "₹1499/mo", desc: "All features unlocked" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-2xl shadow-xl">

          <h2 className="text-xl font-bold mb-6">
            Upgrade Your Plan
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="border rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {plan.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {plan.desc}
                  </p>

                  <p className="mt-2 font-bold">
                    {plan.price}
                  </p>
                </div>

                <button
                  onClick={() => {
                    upgradePlan(tenant.id, plan.name);
                    onClose();
                  }}
                  className="mt-4 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

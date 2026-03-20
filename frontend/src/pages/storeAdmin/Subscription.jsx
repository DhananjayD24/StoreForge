import { useEffect, useState } from "react";
import api from "../../api/api";

function Subscription() {

  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [showPlans, setShowPlans] = useState(false);

  const fetchSubscription = async () => {
    try {
      const res = await api.get("/subscription/me");
      setSubscription(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans");
      setPlans(res.data);
      setShowPlans(true);
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // BUY PLAN (NEW USER)
  // ===============================

  const buyPlan = async (planId) => {

    const confirmPayment = window.confirm(
      "Have you completed the payment?"
    );

    if (!confirmPayment) return;

    try {

      await api.post("/subscription/upgrade", {
        newPlanId: planId
      });

      alert("Subscription activated!");

      fetchSubscription();
      setShowPlans(false);

    } catch (error) {
      console.error(error);
    }
  };

  // ===============================
  // UPGRADE PLAN
  // ===============================

  const upgradePlan = async (planId) => {

    try {

      const preview = await api.get(
        `/subscription/upgrade-preview/${planId}`
      );

      const amount = preview.data.amountToPay;

      const confirmUpgrade = window.confirm(
        `Upgrade cost: ₹${amount}\n\nHave you completed payment?`
      );

      if (!confirmUpgrade) return;

      await api.post("/subscription/upgrade", {
        newPlanId: planId
      });

      alert("Plan upgraded successfully!");

      fetchSubscription();
      setShowPlans(false);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  if (!subscription) {
    return (
      <div className="p-6">
        <p>Loading subscription...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* ===================== */}
      {/* CURRENT SUBSCRIPTION */}
      {/* ===================== */}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">

        <h2 className="text-xl font-semibold mb-4">
          Current Subscription
        </h2>

        <div className="space-y-2 text-sm">

          <p>
            <strong>Plan:</strong> {subscription.planId?.name}
          </p>

          <p>
            <strong>Product Limit:</strong>{" "}
            {subscription.planId?.productLimit}
          </p>

          <p>
            <strong>Subscription Ends:</strong>{" "}
            {new Date(subscription.endDate)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")}
          </p>

        </div>

        <button
          onClick={fetchPlans}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
        >
          Upgrade Plan
        </button>

      </div>

      {/* ===================== */}
      {/* PLAN SELECTION */}
      {/* ===================== */}

      {showPlans && (

        <div className="grid md:grid-cols-3 gap-6">

          {plans.map((plan) => {

            const currentPrice = subscription.planId?.price || 0;

            const isCurrent =
              plan._id === subscription.planId?._id;

            const isLowerPlan =
              plan.price <= currentPrice;

            return (

              <div
                key={plan._id}
                className={`relative flex flex-col justify-between p-6 rounded-2xl shadow-sm border h-[260px]
                ${
                  isCurrent
                    ? "bg-green-50 border-green-400"
                    : "bg-white dark:bg-gray-800"
                }`}
              >

                {/* Current Plan Badge */}

                {isCurrent && (
                  <span className="absolute top-3 right-3 text-xs bg-green-500 text-white px-2 py-1 rounded">
                    Current
                  </span>
                )}

                <div>

                  <h3 className="text-lg font-semibold">
                    {plan.name}
                  </h3>

                  <p className="text-2xl font-bold mt-2">
                    ₹{plan.price}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Product Limit: {plan.productLimit}
                  </p>

                  <p className="text-sm mt-2">
                    Duration: {plan.durationDays} days
                  </p>

                </div>

                <button
                  disabled={isLowerPlan || isCurrent}
                  onClick={() => {

                    if (!subscription.planId) {
                      buyPlan(plan._id);
                    } else {
                      upgradePlan(plan._id);
                    }

                  }}
                  className={`mt-4 w-full py-2 rounded text-white
                  ${
                    isLowerPlan || isCurrent
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >

                  {isCurrent
                    ? "Current Plan"
                    : "Select Plan"}

                </button>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default Subscription;
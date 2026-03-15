import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Plans() {

  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchPlans = async () => {

      const res = await api.get("/plans");

      setPlans(res.data);

    };

    fetchPlans();

  }, []);

  const choosePlan = (planId) => {

    navigate(`/create-store/${planId}`);

  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-center mb-10">
        Choose Your Store Plan
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {plans.map(plan => (

          <div
            key={plan._id}
            className="bg-white p-6 rounded shadow"
          >

            <h2 className="text-xl font-bold">
              {plan.name}
            </h2>

            <p className="text-gray-600 mt-2">
              ₹{plan.price}
            </p>

            <p className="text-sm mt-2">
              Products: {plan.productLimit}
            </p>

            <button
              onClick={() => choosePlan(plan._id)}
              className="mt-4 w-full bg-blue-600 text-white p-2 rounded"
            >
              Select Plan
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}
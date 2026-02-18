// OrderSuccess.jsx
// Shown after successful order placement

import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="text-center py-20 space-y-6">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Order Placed Successfully!
      </h1>

      <p>Your order is being processed.</p>

      <Link
        to="/orders"
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        View Orders
      </Link>
    </div>
  );
}

export default OrderSuccess;

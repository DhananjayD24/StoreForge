// Checkout.jsx
// Shipping form + payment selection UI
// On submit: saves order + clears cart

import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, totalPrice } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    placeOrder(cartItems, totalPrice);
    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

      {/* Shipping Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm space-y-4"
      >
        <h2 className="text-xl font-semibold">Shipping Details</h2>

        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full border p-3 rounded-lg dark:bg-gray-700"
        />

        <input
          type="text"
          placeholder="Address"
          required
          className="w-full border p-3 rounded-lg dark:bg-gray-700"
        />

        <select
          className="w-full border p-3 rounded-lg dark:bg-gray-700"
        >
          <option>Cash on Delivery</option>
          <option>Credit Card</option>
        </select>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl"
        >
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cartItems.map((item) => (
          <p key={item.id} className="flex justify-between text-sm mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>₹ {item.price * item.quantity}</span>
          </p>
        ))}

        <hr className="my-4" />

        <p className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹ {totalPrice}</span>
        </p>
      </div>
    </div>
  );
}

export default Checkout;

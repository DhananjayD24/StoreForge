// Cart.jsx
// Displays cart items and order summary.

import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return <p className="text-center text-lg">Your cart is empty.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-xl"
            />

            <div className="flex-1 space-y-3">
              <h3 className="font-semibold">{item.name}</h3>
              <p>₹ {item.price}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <p className="flex justify-between">
          <span>Total</span>
          <span>₹ {totalPrice}</span>
        </p>

        <Link to="/checkout">
          <button className="mt-6 w-full bg-black text-white py-3 rounded-xl">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;

import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { slug } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const items = cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      }));

      await api.post("/orders", {
        items,
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        customerAddress: form.address,
        totalAmount: totalPrice,
      });
      alert("Order placed successfully");
      clearCart();

      navigate(`/store/${slug}/`);
    } catch (error) {
      console.error(error);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 space-y-10">
      <h1 className="text-3xl font-bold">Checkout</h1>

      {/* Customer Info */}

      <div className="space-y-4">
        <input
          placeholder="Your Name"
          className="border w-full p-3 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email Address"
          className="border w-full p-3 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Mobile Number"
          className="border w-full p-3 rounded"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Address"
          className="border w-full p-3 rounded"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>

      {/* Order Summary */}

      <div className="bg-gray-100 p-6 rounded-xl space-y-3">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>₹ {item.price * item.quantity}</span>
          </div>
        ))}

        <hr />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹ {totalPrice}</span>
        </div>
      </div>

      {/* Place Order Button */}

      <button
        onClick={placeOrder}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;

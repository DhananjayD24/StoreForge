import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../api/api";

const IconBack = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

function InputField({ label, placeholder, type = "text", onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required
        onChange={onChange}
        className="w-full py-3 px-4 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition"
      />
    </div>
  );
}

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { slug } = useParams();

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const placeOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      setError("Please fill in all fields to continue.");
      return;
    }
    setError("");
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

      clearCart();
      navigate(`/store/${slug}/order-success`);
    } catch (error) {
      console.error(error);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="mb-6">
        <Link
          to={`/store/${slug}/cart`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition mb-4"
        >
          <IconBack /> Back to Cart
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
        <p className="text-sm text-slate-400 mt-0.5">Complete your purchase below.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Customer info form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">1</span>
              Shipping Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Full Name" placeholder="e.g. Ravi Sharma" onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <InputField label="Email Address" placeholder="you@example.com" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <InputField label="Mobile Number" placeholder="+91 9876543210" type="tel" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Delivery Address</label>
                <textarea
                  placeholder="Enter your full delivery address..."
                  required
                  rows={3}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Payment note */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-700">Cash on Delivery</p>
              <p className="text-xs text-amber-600 mt-0.5">Payment is collected at the time of delivery.</p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 sticky top-20 space-y-4">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">2</span>
              Order Summary
            </h2>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    {item.image
                      ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-lg">📦</div>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{item.name}</p>
                    <p className="text-xs text-slate-400">×{item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900 flex-shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-1">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>₹{totalPrice?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Delivery</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between font-extrabold text-slate-900 pt-2 border-t border-slate-100 text-lg">
                <span>Total</span>
                <span>₹{totalPrice?.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Placing Order...
                </>
              ) : "Place Order 🎉"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

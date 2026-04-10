import { useCart } from "../../context/CartContext";
import { useNavigate, useParams, Link } from "react-router-dom";

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);
const IconBack = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();
  const { slug } = useParams();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 text-center animate-fade-in-up">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-4xl">🛒</div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">Your cart is empty</h2>
          <p className="text-slate-500 text-sm">Add some products to get started.</p>
        </div>
        <button
          onClick={() => navigate(`/store/${slug}`)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition"
        >
          <IconBack /> Continue Shopping
        </button>
      </div>
    );
  }

  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="text-sm text-slate-400 mt-0.5">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
        </div>
        <Link
          to={`/store/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition"
        >
          <IconBack /> Shop more
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cartItems.map((item, i) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 hover:shadow-sm transition animate-fade-in-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 truncate">{item.name}</p>
                <p className="text-sm text-slate-500">₹{item.price?.toLocaleString("en-IN")} each</p>
              </div>

              {/* Qty controls */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => updateQuantity(item._id, -1)}
                  className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold transition text-sm"
                >
                  −
                </button>
                <span className="w-6 text-center font-bold text-slate-900 text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, 1)}
                  className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold transition text-sm"
                >
                  +
                </button>
              </div>

              {/* Line total */}
              <p className="font-bold text-slate-900 w-20 text-right flex-shrink-0 text-sm">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition flex-shrink-0"
              >
                <IconTrash />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 sticky top-20 space-y-4">
            <h2 className="font-bold text-slate-900">Order Summary</h2>

            <div className="space-y-2 text-sm">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between text-slate-600">
                  <span className="truncate max-w-[130px]">{item.name} ×{item.quantity}</span>
                  <span className="font-medium">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-extrabold text-xl text-slate-900">₹{totalPrice?.toLocaleString("en-IN")}</span>
            </div>

            <button
              onClick={() => navigate(`/store/${slug}/checkout`)}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition shadow-sm"
            >
              Proceed to Checkout →
            </button>

            <button
              onClick={() => navigate(`/store/${slug}`)}
              className="w-full py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
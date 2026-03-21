import { useCart } from "../../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();
  const { slug } = useParams();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Your Cart is Empty
        </h2>

        <button
          onClick={() => navigate(`/store/${slug}`)}
          className="bg-black text-white px-6 py-2 rounded-xl"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 space-y-10">

      <h1 className="text-3xl font-bold">
        Your Cart
      </h1>

      {/* Cart Items */}

      <div className="space-y-6">

        {cartItems.map((item) => (

          <div
            key={item._id}
            className="flex items-center justify-between bg-white rounded-xl shadow p-4"
          >

            {/* Image */}

            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            {/* Name */}

            <div className="flex-1 px-6">
              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="text-gray-500">
                ₹ {item.price}
              </p>
            </div>

            {/* Quantity Controls */}

            <div className="flex items-center gap-3">

              <button
                onClick={() => updateQuantity(item._id, -1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() => updateQuantity(item._id, 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>

            </div>

            {/* Remove */}

            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 font-semibold ml-6"
            >
              Remove
            </button>

          </div>

        ))}

      </div>

      {/* Cart Summary */}

      <div className="flex justify-between items-center bg-gray-100 p-6 rounded-xl">

        <h2 className="text-xl font-semibold">
          Total: ₹ {totalPrice}
        </h2>

        <button
          onClick={() => navigate(`/store/${slug}/checkout`)}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
        >
          Proceed to Checkout
        </button>

      </div>

    </div>
  );
}

export default Cart;
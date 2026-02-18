// ProductDetails.jsx
// Shows detailed view of selected product.
// Allows adding product to cart.

import { useParams } from "react-router-dom";
import { products } from "../../data/mockData";
import { useCart } from "../../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-2xl shadow-md"
      />

      {/* Product Info */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-xl text-gray-500 dark:text-gray-400">
          ₹ {product.price}
        </p>

        <p className="text-sm text-gray-500">
          Category: {product.category}
        </p>

        {product.stock < 5 && (
          <span className="text-red-500 font-semibold">
            Only {product.stock} left in stock!
          </span>
        )}

        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;

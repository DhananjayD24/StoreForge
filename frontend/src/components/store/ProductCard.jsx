// ProductCard.jsx
// Reusable product card component
// Used across listing pages

import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
      
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          ₹ {product.price}
        </p>

        {/* Stock Badge */}
        {product.stock < 5 && (
          <span className="inline-block text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
            Low Stock
          </span>
        )}

        <Link
          to={`/product/${product.id}`}
          className="block mt-3 text-center bg-black text-white py-2 rounded-xl hover:opacity-90"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductCard({ product }) {

  const [index, setIndex] = useState(0);
  const { slug } = useParams();

  const nextImage = () => {
    if (index < product.images.length - 1) {
      setIndex(index + 1);
    }
  };

  const prevImage = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden">

      {/* Image Container */}
      <div className="relative">

        <img
          src={product.images?.[index]}
          alt={product.name}
          className="h-48 w-full object-cover"
        />

        {/* Left Arrow */}
        {index > 0 && (
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-2 py-1 rounded"
          >
            ◀
          </button>
        )}

        {/* Right Arrow */}
        {product.images && index < product.images.length - 1 && (
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-2 py-1 rounded"
          >
            ▶
          </button>
        )}

      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">

        <h3 className="font-semibold text-lg">
          {product.name}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          ₹ {product.price}
        </p>

        {product.stock < 5 && (
          <span className="inline-block text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
            Low Stock
          </span>
        )}

        <Link
          to={`/store/${slug}/product/${product._id}`}
          className="block mt-3 text-center bg-black text-white py-2 rounded-xl hover:opacity-90"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;
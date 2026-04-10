import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { slug } = useParams();

  const inStock = product.stock > 0;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inStock) return;
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      quantity: 1,
    });
  };

  return (
    <Link
      to={`/store/${slug}/product/${product._id}`}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col animate-fade-in-up"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-slate-300">📦</div>
        )}

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-full border border-slate-200">
              Out of Stock
            </span>
          </div>
        )}

        {/* Stock badge for low stock */}
        {inStock && product.stock <= 5 && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-full shadow">
              Only {product.stock} left
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-extrabold text-slate-900">
            ₹{product.price?.toLocaleString("en-IN")}
          </span>
          <button
            onClick={handleAdd}
            disabled={!inStock}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              inStock
                ? "bg-slate-900 hover:bg-slate-700 text-white"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
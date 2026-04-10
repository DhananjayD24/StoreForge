import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useCart } from "../../context/CartContext";

const IconBack = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);
const IconCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);
const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
  </svg>
);

function ProductDetails() {
  const { addToCart } = useCart();
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <svg className="animate-spin w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="text-slate-400 text-sm">Loading product...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ _id: product._id, name: product.name, price: product.price, image: product.images?.[0], quantity: Number(quantity) });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({ _id: product._id, name: product.name, price: product.price, image: product.images?.[0], quantity: Number(quantity) });
    navigate(`/store/${slug}/checkout`);
  };

  const images = product.images || [];

  return (
    <div className="animate-fade-in-up">
      {/* Back */}
      <Link
        to={`/store/${slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition mb-6"
      >
        <IconBack /> Back to store
      </Link>

      <div className="grid md:grid-cols-2 gap-10">

        {/* ── Images ── */}
        <div className="space-y-3">
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-square">
            {images[imageIndex] ? (
              <img
                src={images[imageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300 text-6xl">📦</div>
            )}
            {/* Prev/Next */}
            {imageIndex > 0 && (
              <button
                onClick={() => setImageIndex(imageIndex - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}
            {imageIndex < images.length - 1 && (
              <button
                onClick={() => setImageIndex(imageIndex + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                    i === imageIndex ? "border-slate-800" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-3xl font-extrabold text-slate-900">₹{product.price?.toLocaleString("en-IN")}</span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                product.stock > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
              }`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>
          </div>

          {product.description && (
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold transition"
              >
                −
              </button>
              <span className="w-12 text-center font-bold text-slate-900 text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
            <span className="text-sm text-slate-500 font-medium">Subtotal ({quantity} item{quantity > 1 ? "s" : ""})</span>
            <span className="font-bold text-slate-900">₹{(product.price * quantity).toLocaleString("en-IN")}</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold border-2 transition ${
                added
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-slate-800 bg-white text-slate-800 hover:bg-slate-50"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <IconCart />
              {added ? "Added! ✓" : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconBolt />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

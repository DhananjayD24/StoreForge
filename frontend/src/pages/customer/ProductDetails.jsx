import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useCart } from "../../context/CartContext";

function ProductDetails() {
  const { addToCart } = useCart();
  const { id, slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();

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
    return <p className="text-center py-20">Loading product...</p>;
  }

  const nextImage = () => {
    if (imageIndex < product.images.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  const prevImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE - PRODUCT IMAGE */}

        <div className="relative">
          <img
            src={product.images?.[imageIndex]}
            alt={product.name}
            className="w-full h-100 object-cover rounded-2xl shadow"
          />

          {imageIndex > 0 && (
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-1 rounded"
            >
              ◀
            </button>
          )}

          {product.images && imageIndex < product.images.length - 1 && (
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-1 rounded"
            >
              ▶
            </button>
          )}
        </div>

        {/* RIGHT SIDE - PRODUCT DETAILS */}

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-semibold text-green-600">
            ₹ {product.price}
          </p>

          <p className="text-gray-600">{product.description}</p>

          {/* Quantity Selector */}

          <div className="flex items-center gap-4">
            <span className="font-semibold">Quantity:</span>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border rounded w-20 p-1 text-center"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-4">
            <button
              onClick={() =>
                addToCart({
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0],
                  quantity,
                })
              }
              className="flex-1 bg-black text-white py-3 rounded-xl hover:opacity-90"
            >
              Add to Cart
            </button>

            <button
              onClick={() =>
                navigate(`/store/${slug}/checkout`, {
                  state: {
                    product,
                    quantity,
                  },
                })
              }
              className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

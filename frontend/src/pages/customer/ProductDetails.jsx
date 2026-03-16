import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useCart } from "../../context/CartContext";

function ProductDetails() {

  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

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

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-2xl shadow-md"
      />

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-xl text-gray-500">
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
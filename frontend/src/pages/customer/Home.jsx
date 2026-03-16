// Home.jsx
// Dynamic Store Home Page

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import ProductCard from "../../components/store/ProductCard";

function Home() {
  const { slug } = useParams();

  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await api.get(`/store/${slug}`);

        setStore({
          name: res.data.storeName,
          tagline: res.data.tagline,
        });

        setProducts(res.data.products);

      } catch (error) {
        console.error("Error loading store:", error);
      }
    };

    fetchStore();
  }, [slug]);

  if (!store) {
    return <p className="text-center py-20">Loading store...</p>;
  }

  return (
    <div className="space-y-16">

      {/* ===== HERO SECTION ===== */}
      <section className="text-center py-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-3xl">

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {store.name}
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          {store.tagline}
        </p>

        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
          Shop Now
        </button>

      </section>

      {/* ===== PRODUCTS ===== */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Products
        </h2>

        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default Home;
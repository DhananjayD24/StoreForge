import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import ProductCard from "../../components/store/ProductCard";

function Home() {
  const { slug } = useParams();
  console.log("Slug:", slug);
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [storeClosed, setStoreClosed] = useState(false);

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
        if (error.response?.data?.storeClosed) {
          setStoreClosed(true);
          return;
        }

        console.error("Error loading store:", error);
      }
    };

    fetchStore();
  }, [slug]);

  // =============================
  // STORE CLOSED UI
  // =============================

  if (storeClosed) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center space-y-6">
        <div className="text-7xl">🏪</div>

        <h1 className="text-3xl font-bold">Store Temporarily Closed</h1>

        <p className="text-gray-500 max-w-md">
          This store is currently unavailable because the subscription has
          expired. Please check back later.
        </p>
      </div>
    );
  }

  if (!store) {
    return <p className="text-center py-20">Loading store...</p>;
  }

  return (
    <div className="space-y-16">
      {/* HERO */}

      <section className="text-center py-20 bg-linear-to-r from-gray-900 to-gray-700 text-white rounded-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{store.name}</h1>

        <p className="text-gray-300 max-w-2xl mx-auto mb-6">{store.tagline}</p>

        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
          Shop Now
        </button>
      </section>

      {/* PRODUCTS */}

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Products</h2>

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

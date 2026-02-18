// Home.jsx
// Customer Store Home Page
// Includes:
// - Hero section
// - Featured products
// - Responsive grid

import { products } from "../../data/mockData";
import ProductCard from "../../components/store/ProductCard";

function Home() {
  return (
    <div className="space-y-16">

      {/* ===== HERO SECTION ===== */}
      <section className="text-center py-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Premium Products
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Shop high-quality fashion and electronics curated just for you.
        </p>

        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
          Shop Now
        </button>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

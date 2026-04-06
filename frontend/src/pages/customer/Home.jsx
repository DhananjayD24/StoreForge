import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import ProductCard from "../../components/store/ProductCard";

const IconShop = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-slate-300">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016 2.993 2.993 0 002.25-1.016 3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72l1.189-1.19A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z" />
  </svg>
);

function Home() {
  const { slug } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [storeClosed, setStoreClosed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await api.get(`/store/${slug}`);
        setStore({ name: res.data.storeName, tagline: res.data.tagline });
        setProducts(res.data.products);
      } catch (error) {
        if (error.response?.data?.storeClosed) {
          setStoreClosed(true);
          return;
        }
        console.error("Error loading store:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [slug]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ── Store Closed ── */
  if (storeClosed) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-5 py-20">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-4xl">
          🔒
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Store Temporarily Closed</h1>
        <p className="text-slate-500 max-w-md text-sm leading-relaxed">
          This store is currently unavailable because the subscription has expired. Please check back later.
        </p>
        <div className="px-5 py-2.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full">
          Subscription Expired
        </div>
      </div>
    );
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <svg className="animate-spin w-8 h-8 text-slate-400" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="text-sm text-slate-400">Loading store...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-20 px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">{store?.name}</h1>
          {store?.tagline && (
            <p className="text-slate-300 max-w-xl mx-auto text-base mb-7">{store.tagline}</p>
          )}
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition hover:scale-105 shadow-lg"
          >
            Shop Now →
          </a>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Our Products</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {products.length} item{products.length !== 1 ? "s" : ""} available
            </p>
          </div>
          {/* Search */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-60 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 py-20 flex flex-col items-center gap-3">
            <IconShop />
            <p className="text-sm font-semibold text-slate-500">
              {search ? "No products match your search" : "No products available yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;

import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
            All Products
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed">
            Discover premium products. Browse our collection and add your favorites to cart effortlessly.
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 bg-slate-700 rounded-2xl flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4V7m8 10v3m0 0l-8 4m8-4l-8-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No products available</h3>
            <p className="text-slate-400">Check back later for new arrivals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_35px_70px_-15px_rgba(0,0,0,0.6)] hover:border-white/40 hover:bg-white/20">
      {/* Image Placeholder - Replace with real image */}
      <div className="relative h-64 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-500">📱</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col h-80">
        {/* Title */}
        <h3 className="mb-4 text-xl font-bold text-white leading-tight line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Price & Stock Badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 text-lg font-bold rounded-2xl border border-emerald-400/40 shadow-lg">
            ₹{product.price.toLocaleString()}
          </span>
          <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-2xl border shadow-lg ${
            product.stock > 10 
              ? 'bg-sky-500/20 text-sky-300 border-sky-400/40' 
              : product.stock > 0 
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 animate-pulse' 
              : 'bg-red-500/20 text-red-300 border-red-400/40'
          }`}>
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
          </span>
        </div>

        {/* Action Button */}
        <button 
          className={`
            flex-1 flex items-center justify-center mt-auto p-4
            text-lg font-bold text-white
            bg-gradient-to-rfrom-cyan-500 via-cyan-600 to-blue-600
            rounded-2xl shadow-xl shadow-cyan-500/30
            transition-all duration-300
            hover:from-cyan-600 hover:via-cyan-700 hover:to-blue-700
            hover:shadow-2xl hover:shadow-cyan-500/50
            hover:-translate-y-1 active:scale-95 active:shadow-xl
            ${product.stock === 0 ? 'opacity-50 cursor-not-allowed bg-gray-600 hover:bg-gray-600' : ''}
          `}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-rfrom-cyan-500/0 via-cyan-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

import { useEffect, useState } from "react"
import API from "../api/axios"

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          All Products
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mb-8">
          Browse and add items to your cart
        </p>

        <div className="flex flex-nowrap gap-6 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [scrollbar-width:thin]">
          {products.map(p => (
            <div
              key={p.id}
              className="group relative flex flex-col flex-shrink-0 w-72 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] hover:border-white/25"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-800/50">
                <img
                  src={`https://picsum.photos/400/300?randomfood=${p.id}`}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 min-h-[2.5rem]">
                  {p.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg text-sm font-medium">
                    ₹{p.price}
                  </span>
                  <span className="inline-flex items-center bg-sky-500/20 text-sky-400 px-2.5 py-1 rounded-lg text-sm font-medium">
                    Stock: {p.stock}
                  </span>
                </div>
                <button className="mt-auto w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 active:scale-[0.98]">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

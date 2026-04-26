import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { moneyINR } from "../../lib/format"
import { useCart } from "../../state/cart"
import { Vegan, Volleyball } from "lucide-react";
import axios from "axios"

function StockPill({ stock }) {
  const cls =
    stock === 0
      ? "border-rose-300/60 bg-rose-100/70 text-rose-600"
      : stock <= 10
        ? "border-amber-300/60 bg-amber-100/70 text-amber-600"
        : "border-blue-300/60 bg-blue-100/70 text-blue-600"
  const label =
    stock === 0 ? "Out of stock" : stock <= 10 ? `Low stock (${stock})` : `In stock (${stock})`
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${cls}`}
    >
      {label}
    </span>
  )
}

export default function BuyerStoreDetail() {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const categoryFilter = searchParams.get("category") || "All"

  const [store, setStore] = useState(null)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchStoreAndProducts()
  }, [storeId])

  const fetchStoreAndProducts = async () => {
    try {
      const [storeRes, productsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/shops/${storeId}`),
        axios.get(`http://localhost:5000/api/products/store/${storeId}`)
      ])
      setStore(storeRes.data)
      setList(productsRes.data)
    } catch (error) {
      console.error("Error fetching store detail:", error)
    } finally {
      setLoading(false)
    }
  }

  const isSportsStore = store?.tags?.includes("Sports") || store?.name?.toLowerCase().includes("devine sports")
  const StoreIcon =  isSportsStore ? Volleyball : Vegan
  const storeIconColor = isSportsStore ? "text-blue-600" : "text-blue-800"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-lime-50">
        <div className="text-slate-500 font-semibold animate-pulse">Loading store details...</div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-lime-50 p-6">
        <div className="rounded-2xl border border-white/70 bg-white/50 backdrop-blur-md shadow-xl shadow-blue-100/40 p-6">
          <div className="text-slate-800 font-extrabold text-lg">Store not found</div>
          <div className="mt-3">
            <Link
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              to="/buyer/stores"
            >
              ← Back to stores
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50/30 to-lime-50 relative">
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-lime-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <div className="relative space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">

        <div className="rounded-2xl border border-white/70 bg-white/50 backdrop-blur-md shadow-xl shadow-blue-100/40 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-blue-600/80 mb-1">
                Store
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {store.name}
              </h1>
              <p className="mt-2 text-slate-500 text-sm">
                {store.distanceKm} km &bull; {store.etaMin} min ETA &bull; ⭐ {store.rating}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {store.tags?.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-blue-200/70 bg-blue-50/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-blue-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">

              <button
                onClick={() => navigate(-1)}
                className="rounded-xl border border-slate-200/70 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-white/80 hover:text-slate-800 transition-all duration-150"
              >
                Back
              </button>
              <button
                onClick={() => navigate("/buyer/cart")}
                className="rounded-xl border border-blue-300/60 bg-blue-500/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200/60 hover:bg-blue-600 transition-all duration-150"
              >
                Cart
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list
            .filter(p => categoryFilter === "All" || p.category === categoryFilter)
            .map((p) => (
            <div
              key={p._id}
              className="group rounded-2xl border border-white/70 bg-white/50 backdrop-blur-md shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-100/60 hover:bg-white/65 transition-all duration-200 p-5 overflow-hidden"
            >
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 border border-slate-100">
                <img 
                  src={p.image || "https://via.placeholder.com/400x300?text=Product"} 
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    to={`/buyer/products/${p._id}`}
                    className="text-lg font-extrabold text-slate-900 hover:text-blue-700 transition-colors leading-tight"
                  >
                    {p.name}
                  </Link>
                  <div className="mt-1 text-xs font-medium text-slate-400 uppercase tracking-wide">
                    {p.category}
                  </div>
                </div>
                <div className="h-12 w-12 flex-shrink-0 rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-100/80 to-blue-100/60 backdrop-blur-sm flex items-center justify-center shadow-inner">
                  {StoreIcon ? <StoreIcon size={22} className={storeIconColor} /> : null}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xl font-extrabold text-slate-900">{moneyINR(p.price)}</div>
                <StockPill stock={p.stock} />
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  disabled={p.stock === 0}
                  onClick={() => addToCart({ 
                    id: p._id, 
                    name: p.name, 
                    price: p.price,
                    seller: p.seller,
                    store: p.store
                  })}
                  className="flex-1 rounded-xl border border-blue-300/60 bg-blue-500/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200/60 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => navigate(`/buyer/products/${p._id}`)}
                  className="rounded-xl border border-slate-200/70 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-white/80 hover:text-slate-800 transition-all duration-150"
                >
                  View
                </button>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="col-span-full py-10 text-center text-slate-500">
              This store hasn't added any products yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { ShoppingCart, Star, Store as StoreIcon } from "lucide-react"
import Card from "../../components/ui/Card"
import Input from "../../components/ui/Input"
import axios from "axios"
import { moneyINR } from "../../lib/format"
import { useCart } from "../../state/cart"

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
      {children}
    </span>
  )
}

function StockPill({ stock }) {
  const cls =
    stock === 0
      ? "border-rose-300/60 bg-rose-100/70 text-rose-600"
      : stock <= 10
        ? "border-amber-300/60 bg-amber-100/70 text-amber-600"
        : "border-blue-300/60 bg-blue-100/70 text-blue-600"
  const label =
    stock === 0 ? "Out of stock" : stock <= 10 ? `Low (${stock})` : `In stock (${stock})`
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm ${cls}`}>
      {label}
    </span>
  )
}

export default function BuyerStores() {
  const [q, setQ] = useState("")
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const categoryFilter = searchParams.get("category") || "All"
  const { addToCart } = useCart()

  const [stores, setStores] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [categoryFilter])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (categoryFilter === "All") {
        const res = await axios.get("http://localhost:5000/api/shops")
        setStores(res.data)
      } else {
        const res = await axios.get(`http://localhost:5000/api/products?category=${categoryFilter}`)
        setProducts(res.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredStores = useMemo(() => {
    const term = q.trim().toLowerCase()
    return stores.filter((s) => s.name.toLowerCase().includes(term))
  }, [q, stores])

  const filteredProducts = useMemo(() => {
    const term = q.trim().toLowerCase()
    return products.filter((p) => p.name.toLowerCase().includes(term))
  }, [q, products])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-slate-600">Buyer</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            {categoryFilter === "All" ? "Discover Stores" : `${categoryFilter} Catalog`}
          </h1>
          <p className="mt-2 text-slate-700">
            {categoryFilter === "All"
              ? "Pick a store to browse products and schedule delivery."
              : `Showing ${categoryFilter} across all nearby stores.`}
          </p>
        </div>

        <div className="w-full sm:w-80">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${categoryFilter === "All" ? "stores" : "products"}…`}
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500 animate-pulse font-semibold">
          Exploring the best {categoryFilter === "All" ? "shops" : categoryFilter} for you...
        </div>
      ) : (
        <>
          {categoryFilter === "All" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredStores.map((s) => (
                <Link key={s._id} to={`/buyer/stores/${s._id}`} className="group">
                  <Card className="p-6 hover:bg-white/[0.06] transition h-full flex flex-col overflow-hidden">
                    <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 border border-slate-100 bg-slate-50 relative">
                      <img
                        src={s.image || "https://via.placeholder.com/400x300?text=Shop"}
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 h-8 w-8 rounded-lg border border-white/50 bg-white/20 backdrop-blur-md flex items-center justify-center shadow-sm">
                        <StoreIcon size={16} className="text-white" />
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-lg font-extrabold text-slate-950 group-hover:text-blue-800 transition">
                          {s.name}
                        </div>

                        <div className="mt-1 text-sm text-slate-600 flex items-center gap-1">
                          {s.distanceKm} km • {s.etaMin} min ETA •
                          <Star size={15} className="text-blue-500 fill-blue-500" />
                          {s.rating}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 mb-auto">
                      {s.tags?.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>

                    <div className="mt-5 text-sm font-extrabold text-blue-800 flex items-center gap-1">
                      Browse Store →
                    </div>
                  </Card>
                </Link>
              ))}
              {filteredStores.length === 0 && (
                <div className="col-span-full py-10 text-center text-slate-600 font-medium">
                  No stores found matching your search.
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p._id}
                  className="group rounded-2xl border border-white/70 bg-white/50 backdrop-blur-md shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-100/60 hover:bg-white/65 transition-all duration-200 p-4 overflow-hidden flex flex-col"
                >
                  <div className="aspect-square w-full rounded-xl overflow-hidden mb-4 border border-slate-100 bg-slate-50 relative">
                    <img
                      src={p.image || "https://via.placeholder.com/400?text=Product"}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <StockPill stock={p.stock} />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <Link
                      to={`/buyer/products/${p._id}`}
                      className="text-base font-extrabold text-slate-900 hover:text-blue-700 transition-colors leading-tight block truncate"
                    >
                      {p.name}
                    </Link>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <StoreIcon size={10} />
                      {p.store?.name || "Market"}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-lg font-black text-slate-900">{moneyINR(p.price)}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">{p.unit}</div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      disabled={p.stock === 0}
                      onClick={() => addToCart({
                        id: p._id,
                        name: p.name,
                        price: p.price,
                        seller: p.seller?._id || p.seller,
                        store: p.store?._id || p.store
                      })}
                      className="flex-1 rounded-xl border border-blue-300/60 bg-blue-500/90 backdrop-blur-sm px-3 py-2 text-xs font-bold text-white shadow-md shadow-blue-200/60 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-1"
                    >
                      <ShoppingCart size={14} />
                      Add
                    </button>
                    <button
                      onClick={() => navigate(`/buyer/products/${p._id}`)}
                      className="rounded-xl border border-slate-200/70 bg-white/60 backdrop-blur-sm px-3 py-2 text-xs font-bold text-slate-600 shadow-sm hover:bg-white/80 hover:text-slate-800 transition-all duration-150"
                    >
                      Info
                    </button>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-10 text-center text-slate-600 font-medium">
                  We couldn't find any {categoryFilter} products at the moment.
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
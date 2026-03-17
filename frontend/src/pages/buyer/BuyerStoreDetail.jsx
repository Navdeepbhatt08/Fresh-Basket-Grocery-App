import { Link, useNavigate, useParams } from "react-router-dom"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { products, stores } from "../../lib/mockData"
import { moneyINR } from "../../lib/format"
import { useCart } from "../../state/cart"

function StockPill({ stock }) {
  const cls =
    stock === 0
      ? "border-rose-400/20 bg-rose-500/10 text-rose-200"
      : stock <= 10
        ? "border-amber-400/20 bg-amber-500/10 text-amber-200"
        : "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
  const label =
    stock === 0 ? "Out of stock" : stock <= 10 ? `Low stock (${stock})` : `In stock (${stock})`
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
      {label}
    </span>
  )
}

export default function BuyerStoreDetail() {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const store = stores.find((s) => s.id === storeId)
  const list = products.filter((p) => p.storeId === storeId)
  const { addToCart } = useCart()

  if (!store) {
    return (
      <Card className="p-6">
        <div className="text-white font-semibold">Store not found</div>
        <div className="mt-3">
          <Link
            className="text-emerald-200 hover:text-emerald-100"
            to="/buyer/stores"
          >
            Back to stores
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-slate-400">Store</div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            {store.name}
          </h1>
          <p className="mt-2 text-slate-300">
            {store.distanceKm} km • {store.etaMin} min ETA • ⭐ {store.rating}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {store.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="subtle" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button onClick={() => navigate("/buyer/cart")}>Cart</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((p) => (
          <Card key={p.id} className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link
                  to={`/buyer/products/${p.id}`}
                  className="text-lg font-semibold text-white hover:text-emerald-200 transition"
                >
                  {p.name}
                </Link>
                <div className="mt-1 text-sm text-slate-400">{p.category}</div>
              </div>
              <div className="h-12 w-12 rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-lime-400/10 flex items-center justify-center text-xl">
                🥬
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xl font-semibold text-white">{moneyINR(p.price)}</div>
              <StockPill stock={p.stock} />
            </div>

            <div className="mt-5 flex gap-2">
              <Button
                className="flex-1"
                disabled={p.stock === 0}
                onClick={() => addToCart({ id: p.id, name: p.name, price: p.price })}
              >
                Add to cart
              </Button>
              <Button
                variant="subtle"
                onClick={() => navigate(`/buyer/products/${p.id}`)}
              >
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


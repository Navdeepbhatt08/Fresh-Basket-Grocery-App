import { Link, useNavigate } from "react-router-dom"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { useCart } from "../../state/cart"
import { clamp, moneyINR } from "../../lib/format"

export default function BuyerCart() {
  const navigate = useNavigate()
  const { items, totals, removeFromCart, setQty, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-xl font-semibold text-white">Your cart is empty</div>
        <div className="mt-2 text-slate-300">
          Add items from stores and checkout in seconds.
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={() => navigate("/buyer/stores")}>Browse stores</Button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Back home
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="p-6 lg:col-span-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-slate-400">Buyer</div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Cart</h1>
            <p className="mt-1 text-slate-300">
              Review items and adjust quantities.
            </p>
          </div>
          <Button variant="danger" onClick={clearCart}>
            Clear
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          {items.map((it) => (
            <div
              key={it.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="font-semibold text-white">{it.name}</div>
                  <div className="mt-1 text-sm text-slate-400">
                    {moneyINR(it.price)} each
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    onClick={() => setQty(it.id, clamp(it.qty - 1, 1, 99))}
                  >
                    −
                  </button>
                  <input
                    className="h-10 w-14 rounded-xl border border-white/10 bg-white/5 text-center text-white"
                    type="number"
                    min={1}
                    max={99}
                    value={it.qty}
                    onChange={(e) => setQty(it.id, clamp(Number(e.target.value || 1), 1, 99))}
                  />
                  <button
                    className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    onClick={() => setQty(it.id, clamp(it.qty + 1, 1, 99))}
                  >
                    +
                  </button>

                  <div className="w-24 text-right font-semibold text-white">
                    {moneyINR(it.qty * it.price)}
                  </div>

                  <button
                    className="h-10 rounded-xl border border-rose-400/20 bg-rose-500/15 px-3 text-sm font-semibold text-rose-100 hover:bg-rose-500/20"
                    onClick={() => removeFromCart(it.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-sm font-semibold text-white">Bill summary</div>
        <div className="mt-4 space-y-2 text-sm">
          <Row label="Subtotal" value={moneyINR(totals.subtotal)} />
          <Row label="Delivery" value={moneyINR(totals.delivery)} />
          <Row label="Taxes" value={moneyINR(totals.taxes)} />
          <div className="my-3 h-px bg-white/10" />
          <Row label="Total" value={moneyINR(totals.total)} strong />
        </div>

        <div className="mt-6 space-y-2">
          <Button className="w-full" onClick={() => navigate("/buyer/checkout")}>
            Checkout
          </Button>
          <Button
            variant="subtle"
            className="w-full"
            onClick={() => navigate("/buyer/stores")}
          >
            Add more items
          </Button>
        </div>
      </Card>
    </div>
  )
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between">
      <div className={strong ? "text-slate-200 font-semibold" : "text-slate-400"}>
        {label}
      </div>
      <div className={strong ? "text-white font-semibold" : "text-slate-200"}>
        {value}
      </div>
    </div>
  )
}


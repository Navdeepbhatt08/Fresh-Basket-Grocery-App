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
        <div className="text-xl font-extrabold text-slate-950">Your cart is empty</div>
        <div className="mt-2 text-slate-700">
          Add items from stores and checkout in seconds.
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={() => navigate("/buyer/stores")}>Browse stores</Button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200/70 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
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
            <div className="text-sm text-slate-600">Buyer</div>
            <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight">Cart</h1>
            <p className="mt-1 text-slate-700">
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
              className="rounded-2xl border border-slate-200/70 bg-white p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="font-extrabold text-slate-950">{it.name}</div>
                  <div className="mt-1 text-sm text-slate-600">
                    {moneyINR(it.price)} each
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="h-10 w-10 rounded-xl border border-slate-200/70 bg-white text-slate-900 hover:bg-slate-50"
                    onClick={() => setQty(it.id, clamp(it.qty - 1, 1, 99))}
                  >
                    −
                  </button>
                  <input
                    className="h-10 w-14 rounded-xl border border-slate-200/70 bg-white text-center text-slate-900"
                    type="number"
                    min={1}
                    max={99}
                    value={it.qty}
                    onChange={(e) => setQty(it.id, clamp(Number(e.target.value || 1), 1, 99))}
                  />
                  <button
                    className="h-10 w-10 rounded-xl border border-slate-200/70 bg-white text-slate-900 hover:bg-slate-50"
                    onClick={() => setQty(it.id, clamp(it.qty + 1, 1, 99))}
                  >
                    +
                  </button>

                  <div className="w-24 text-right font-extrabold text-slate-950">
                    {moneyINR(it.qty * it.price)}
                  </div>

                  <button
                    className="h-10 rounded-xl border border-rose-200 bg-rose-50 px-3 text-sm font-semibold text-rose-700 hover:bg-rose-100"
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
        <div className="text-sm font-extrabold text-slate-950">Bill summary</div>
        <div className="mt-4 space-y-2 text-sm">
          <Row label="Subtotal" value={moneyINR(totals.subtotal)} />
          <Row label="Delivery" value={moneyINR(totals.delivery)} />
          <Row label="CGST (2.5%)" value={moneyINR(totals.cgst)} />
          <Row label="SGST (2.5%)" value={moneyINR(totals.sgst)} />
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
      <div className={strong ? "text-slate-800 font-semibold" : "text-slate-600"}>
        {label}
      </div>
      <div className={strong ? "text-slate-950 font-extrabold" : "text-slate-800"}>
        {value}
      </div>
    </div>
  )
}


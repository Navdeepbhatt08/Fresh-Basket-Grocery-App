import { useMemo, useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { sellerDemo } from "../../lib/storeData"
import { moneyINR } from "../../lib/format"

export default function SellerOrders() {
  const [q, setQ] = useState("")
  const [orders, setOrders] = useState(() =>
    sellerDemo.recentOrders.map((o) => ({ ...o }))
  )

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return orders
    return orders.filter((o) => o.id.toLowerCase().includes(term) || o.buyer.toLowerCase().includes(term))
  }, [q, orders])

  const setStatus = (id, status) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-slate-600">Seller</div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-950 tracking-tight">
            Orders
          </h1>
          <p className="mt-2 text-slate-700">
            Update order status.
          </p>
        </div>
        <div className="w-full sm:w-80">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by order/buyer…" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((o) => (
          <Card key={o.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-slate-950 font-extrabold">{o.id}</div>
                <div className="mt-1 text-sm text-slate-600">
                  Buyer: {o.buyer} • {o.time}
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-950 font-extrabold">{moneyINR(o.total)}</div>
                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {o.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Preparing", "Out for delivery", "Delivered", "Cancelled"].map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={o.status === s ? "primary" : "subtle"}
                  onClick={() => setStatus(o.id, s)}
                  className="w-full"
                >
                  {s}
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


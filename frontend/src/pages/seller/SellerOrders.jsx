import { useEffect, useMemo, useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { useAuth } from "../../state/auth"
import { moneyINR } from "../../lib/format"
import axios from "axios"

export default function SellerOrders() {
  const { user } = useAuth()
  const [q, setQ] = useState("")
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    try {
      if (!user?.id) return
      const res = await axios.get(`http://localhost:5000/api/orders/seller/${user.id}`)
      setOrders(res.data)
    } catch (error) {
      console.error("Error fetching seller orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return orders
    return orders.filter((o) => 
      o.orderId.toLowerCase().includes(term) || 
      o.buyer?.name?.toLowerCase().includes(term) ||
      o.deliveryDetails?.name?.toLowerCase().includes(term)
    )
  }, [q, orders])

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/orders/${id}`, { status })
      setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)))
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-slate-600">Seller</div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-950 tracking-tight">
            Manage Orders
          </h1>
          <p className="mt-2 text-slate-700">
            Process incoming orders and update statuses.
          </p>
        </div>
        <div className="w-full sm:w-80">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by order/buyer…" />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500">Retrieving new orders...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((o) => (
            <Card key={o._id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-slate-950 font-extrabold">{o.orderId}</div>
                  <div className="mt-1 text-sm text-slate-600 font-semibold">
                    Buyer: {o.deliveryDetails?.name || o.buyer?.name || "N/A"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-slate-950 font-extrabold">{moneyINR(o.total)}</div>
                  <div className="mt-1">
                    <StatusPill status={o.status} />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase mb-2">Order Items</div>
                {o.items?.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1 border-b border-slate-200 last:border-0">
                    <span className="text-slate-700">{it.name} × {it.qty}</span>
                    <span className="font-semibold">{moneyINR(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-sm text-slate-600">
                <span className="font-bold">Address:</span> {o.deliveryDetails?.address}
              </div>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Preparing", "Out for delivery", "Delivered", "Cancelled"].map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={o.status === s ? "primary" : "subtle"}
                    onClick={() => updateStatus(o._id, s)}
                    className="w-full !text-[10px] px-1"
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-10 text-center text-slate-600">
              No orders found.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function StatusPill({ status }) {
  const cls =
    status === "Delivered"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : status === "Cancelled"
        ? "border-rose-200 bg-rose-50 text-rose-800"
        : status === "Out for delivery"
          ? "border-blue-200 bg-blue-50 text-blue-800"
          : "border-amber-200 bg-amber-50 text-amber-900"
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
      {status}
    </span>
  )
}

import { useEffect, useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../state/auth"
import { moneyINR } from "../../lib/format"
import axios from "axios"

export default function BuyerOrders() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    try {
      const buyerId = user?.id || "6449f8a3c8e4a5a123456789"
      const res = await axios.get(`http://localhost:5000/api/orders/buyer/${buyerId}`)
      setOrders(res.data)
    } catch (error) {
      console.error("Error fetching buyer orders:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-slate-600">Buyer</div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-950 tracking-tight">
            My Orders
          </h1>
          <p className="mt-2 text-slate-700">
            Track and manage your order history.
          </p>
        </div>
        <Button onClick={() => navigate("/buyer/stores")}>Shop again</Button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading your orders...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {orders.map((o) => (
            <Card key={o._id} className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-slate-950 font-extrabold">{o.orderId}</div>
                  <div className="mt-1 text-sm text-slate-600">
                    {new Date(o.createdAt).toLocaleDateString()} • {o.items?.length} items
                  </div>
                  <div className="mt-1 text-xs text-slate-500 italic">
                    Store: {o.seller?.name || "N/A"}
                  </div>
                </div>
                <Status status={o.status} />
              </div>
              <div className="mt-4 text-2xl font-extrabold text-slate-950">{moneyINR(o.total)}</div>
              
              <div className="mt-4 space-y-1">
                {o.items?.map((it, idx) => (
                  <div key={idx} className="text-xs text-slate-600">
                    {it.name} × {it.qty}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-2">
                <Button variant="subtle">Details</Button>
                <Button variant="subtle">Invoice</Button>
              </div>
            </Card>
          ))}
          {orders.length === 0 && (
            <div className="col-span-full py-10 text-center text-slate-600">
              You haven't placed any orders yet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Status({ status }) {
  const cls =
    status === "Delivered"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : status === "Cancelled"
        ? "border-rose-200 bg-rose-50 text-rose-800"
        : "border-amber-200 bg-amber-50 text-amber-900"
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
      {status}
    </span>
  )
}

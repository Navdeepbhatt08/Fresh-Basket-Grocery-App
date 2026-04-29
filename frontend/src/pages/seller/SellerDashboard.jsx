import { useEffect, useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { moneyINR } from "../../lib/format"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../state/auth"
import axios from "axios"

export default function SellerDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
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
      console.error("Error fetching dashboard orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { label: "Today Orders", value: orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length },
    { label: "Total Revenue", value: orders.reduce((acc, curr) => acc + curr.total, 0) },
    { label: "Active Orders", value: orders.filter(o => o.status !== "Delivered" && o.status !== "Cancelled").length },
    { label: "Avg. Prep Time", value: "15m" },
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-slate-600">Seller</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Seller dashboard
          </h1>
          <p className="mt-2 text-slate-700">
            Track store performance and manage orders.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="subtle" onClick={() => navigate("/seller/products")}>
            Manage products
          </Button>
          <Button onClick={() => navigate("/seller/orders")}>View orders</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((k) => (
          <Card key={k.label} className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {k.label}
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-950">
              {typeof k.value === "number" && (k.label === "Total Revenue" || k.label === "Revenue")
                ? moneyINR(k.value)
                : k.value}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-extrabold text-slate-950">Recent orders</div>
            <div className="mt-1 text-sm text-slate-600">
              Latest activity in your store.
            </div>
          </div>
          <Button variant="subtle" onClick={() => navigate("/seller/orders")}>
            Open all
          </Button>
        </div>

        {loading ? (
          <div className="py-10 text-center text-slate-500 animate-pulse">Loading dashboard...</div>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="py-3">Order</th>
                  <th className="py-3">Buyer</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((o) => (
                  <tr key={o._id} className="border-t border-slate-200/70">
                    <td className="py-4 text-slate-950 font-extrabold">{o.orderId}</td>
                    <td className="py-4 text-slate-700">{o.deliveryDetails?.name || o.buyer?.name || "N/A"}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                        {o.status}
                      </span>
                    </td>
                    <td className="py-4 text-right text-slate-950 font-extrabold">
                      {moneyINR(o.total)}
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">No recent orders.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

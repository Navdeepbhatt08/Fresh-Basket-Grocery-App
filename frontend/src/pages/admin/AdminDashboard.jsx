import { useEffect, useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { moneyINR } from "../../lib/format"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats")
      setData(res.data)
    } catch (error) {
      console.error("Error fetching admin stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 animate-pulse font-semibold">
        Loading system-wide metrics...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-slate-600">Admin</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Admin dashboard
          </h1>
          <p className="mt-2 text-slate-700">
            Monitor users, sellers, and operational alerts.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="subtle" onClick={() => navigate("/admin/users")}>
            Users
          </Button>
          <Button onClick={() => navigate("/admin/reports")}>Reports</Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {k.label}
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-950">
              {k.label.includes("GMV") ? moneyINR(k.value) : k.value}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* System Alerts */}
        <Card className="p-6 lg:col-span-2">
          <div className="text-sm font-extrabold text-slate-950">System health & alerts</div>
          <div className="mt-1 text-sm text-slate-600">
            Real-time operational status 
          </div>
          <div className="mt-5 space-y-3">
            {data?.alerts.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-slate-200/70 bg-white p-4"
              >
                <div className="text-slate-950 font-extrabold">{a.title}</div>
                <div className="mt-1 text-sm text-slate-700">{a.detail}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Admin Actions */}
        <Card className="p-6">
          <div className="text-sm font-extrabold text-slate-950">Admin actions</div>
          <div className="mt-1 text-sm text-slate-600">Common management tasks.</div>
          <div className="mt-5 grid grid-cols-1 gap-2">
            <Button variant="subtle" onClick={() => navigate("/admin/users")}>
              Review users
            </Button>
            <Button variant="subtle" onClick={() => navigate("/admin/sellers")}>
              Manage shops
            </Button>
            <Button variant="subtle" onClick={() => navigate("/admin/reports")}>
              View reports
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Recent Orders for Admin */}
      <Card className="p-6">
        <div className="text-sm font-extrabold text-slate-950 mb-4">Recent system activity (Orders)</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500">
                <th className="py-2">Order ID</th>
                <th className="py-2">Buyer</th>
                <th className="py-2">Shop</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data?.recentOrders.map(o => (
                <tr key={o._id} className="border-t border-slate-100">
                  <td className="py-3 font-bold">{o.orderId}</td>
                  <td className="py-3">{o.buyer?.name || "User"}</td>
                  <td className="py-3">{o.seller?.name || "Shop"}</td>
                  <td className="py-3 text-right font-extrabold">{moneyINR(o.total)}</td>
                </tr>
              ))}
              {data?.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-slate-500">No recent orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

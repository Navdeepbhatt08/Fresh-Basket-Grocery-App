import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { sellerDemo } from "../../lib/mockData"
import { moneyINR } from "../../lib/format"
import { useNavigate } from "react-router-dom"

export default function SellerDashboard() {
  const navigate = useNavigate()

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
        {sellerDemo.kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {k.label}
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-950">
              {typeof k.value === "number" && k.label === "Revenue"
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
              Demo table ready for backend wiring.
            </div>
          </div>
          <Button variant="subtle" onClick={() => navigate("/seller/orders")}>
            Open all
          </Button>
        </div>

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
              {sellerDemo.recentOrders.map((o) => (
                <tr key={o.id} className="border-t border-slate-200/70">
                  <td className="py-4 text-slate-950 font-extrabold">{o.id}</td>
                  <td className="py-4 text-slate-700">{o.buyer}</td>
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
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}


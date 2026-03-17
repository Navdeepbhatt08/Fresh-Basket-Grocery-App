import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"

const demoOrders = [
  { id: "ORD-2041", date: "Today", status: "Delivered", total: 412, items: 6 },
  { id: "ORD-2038", date: "Yesterday", status: "Delivered", total: 289, items: 4 },
  { id: "ORD-2032", date: "Mar 12", status: "Cancelled", total: 156, items: 2 }
]

export default function BuyerOrders() {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-slate-400">Buyer</div>
          <h1 className="mt-1 text-2xl font-semibold text-white tracking-tight">
            Orders
          </h1>
          <p className="mt-2 text-slate-300">
            Order history UI (demo data).
          </p>
        </div>
        <Button onClick={() => navigate("/buyer/stores")}>Shop again</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {demoOrders.map((o) => (
          <Card key={o.id} className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-white font-semibold">{o.id}</div>
                <div className="mt-1 text-sm text-slate-400">
                  {o.date} • {o.items} items
                </div>
              </div>
              <Status status={o.status} />
            </div>
            <div className="mt-4 text-2xl font-semibold text-white">₹{o.total}</div>
            <div className="mt-5 flex gap-2">
              <Button variant="subtle">Details</Button>
              <Button variant="subtle">Invoice</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Status({ status }) {
  const cls =
    status === "Delivered"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
      : status === "Cancelled"
        ? "border-rose-400/20 bg-rose-500/10 text-rose-200"
        : "border-amber-400/20 bg-amber-500/10 text-amber-200"
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
      {status}
    </span>
  )
}


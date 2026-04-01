import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { adminDemo } from "../../lib/storeData"
import { moneyINR } from "../../lib/format"
import { useNavigate } from "react-router-dom"

export default function AdminDashboard() {
  const navigate = useNavigate()
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminDemo.kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {k.label}
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-950">
              {k.label.includes("GMV") ? moneyINR(k.value) : k.value.toLocaleString?.() ?? k.value}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <div className="text-sm font-extrabold text-slate-950">System alerts</div>
          <div className="mt-1 text-sm text-slate-600">
            Operational items needing attention (demo).
          </div>
          <div className="mt-5 space-y-3">
            {adminDemo.alerts.map((a) => (
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

        <Card className="p-6">
          <div className="text-sm font-extrabold text-slate-950">Admin actions</div>
          <div className="mt-1 text-sm text-slate-600">Common management tasks.</div>
          <div className="mt-5 grid grid-cols-1 gap-2">
            <Button variant="subtle" onClick={() => navigate("/admin/users")}>
              Review users
            </Button>
            <Button variant="subtle" onClick={() => navigate("/admin/sellers")}>
              Approve sellers
            </Button>
            <Button variant="subtle" onClick={() => navigate("/admin/reports")}>
              View reports
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}


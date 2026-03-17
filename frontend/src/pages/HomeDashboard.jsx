import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import LineChart from "../components/ui/LineChart"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../state/auth"
import { adminDemo, sellerDemo, stores } from "../lib/mockData"
import { moneyINR } from "../lib/format"
import { downloadReportsPdf } from "../lib/reports/downloadReportsPdf"
import { REPORTS_KPIS, REPORTS_ORDERS_SERIES } from "../lib/reports/reportData"

function Stat({ label, value }) {
  return (
    <Card className="p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-extrabold text-slate-950">{value}</div>
    </Card>
  )
}

export default function HomeDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const kpis =
    user?.role === "admin"
      ? adminDemo.kpis
      : user?.role === "seller"
        ? sellerDemo.kpis
        : [
            { label: "Saved time", value: "42m" },
            { label: "Free delivery", value: "₹599+" },
            { label: "Nearby stores", value: stores.length },
            { label: "Support", value: "24×7" }
          ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-slate-600">Welcome</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            {user?.role === "admin"
              ? "Overview & controls"
              : user?.role === "seller"
                ? "Your store performance"
                : "What do you need today?"}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-700">
            A modern grocery delivery frontend with Buyer/Seller/Admin flows,
            dark theme, and reusable components.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="subtle" onClick={() => navigate("/buyer/stores")}>
            Browse stores
          </Button>
          <Button onClick={() => navigate("/buyer/cart")}>Open cart</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Stat
            key={k.label}
            label={k.label}
            value={
              typeof k.value === "number" && k.label.toLowerCase().includes("revenue")
                ? moneyINR(k.value)
                : k.value
            }
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-extrabold text-slate-950">
                Delivery trends (demo)
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Placeholder chart area (ready to be wired to real analytics).
              </div>
            </div>
            <Button
              variant="subtle"
              onClick={() => {
                const ok = window.confirm("Download Reports PDF?\n\nOK = Download\nCancel = Open Reports page")
                if (ok) {
                  downloadReportsPdf({
                    title: "FreshBasket Reports",
                    ordersSeries: REPORTS_ORDERS_SERIES,
                    kpis: REPORTS_KPIS
                  })
                } else {
                  navigate("/admin/reports")
                }
              }}
            >
              Reports
            </Button>
          </div>
          <LineChart values={[22, 38, 30, 45, 28, 52, 44, 58, 40, 62, 49, 70]} />
        </Card>

        <Card className="p-6">
          <div className="text-sm font-extrabold text-slate-950">Quick actions</div>
          <div className="mt-1 text-sm text-slate-600">
            Jump to common screens.
          </div>
          <div className="mt-5 grid grid-cols-1 gap-2">
            <Button variant="subtle" onClick={() => navigate("/buyer/stores")}>
              Buyer • Stores
            </Button>
            <Button variant="subtle" onClick={() => navigate("/seller/products")}>
              Seller • Products
            </Button>
            <Button variant="subtle" onClick={() => navigate("/seller/orders")}>
              Seller • Orders
            </Button>
            <Button variant="subtle" onClick={() => navigate("/admin/users")}>
              Admin • Users
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}


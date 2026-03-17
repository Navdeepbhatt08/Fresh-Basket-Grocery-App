import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import LineChart from "../../components/ui/LineChart"
import { REPORTS_KPIS, REPORTS_ORDERS_SERIES } from "../../lib/reports/reportData"
import { downloadReportsPdf } from "../../lib/reports/downloadReportsPdf"

export default function AdminReports() {
  const onExport = () => {
    const ok = window.confirm("Download Reports PDF?")
    if (!ok) return
    downloadReportsPdf({
      title: "FreshBasket Reports",
      ordersSeries: REPORTS_ORDERS_SERIES,
      kpis: REPORTS_KPIS
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-slate-600">Admin</div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-950 tracking-tight">
            Reports
          </h1>
          <p className="mt-2 text-slate-700">
            Analytics/reporting UI placeholders (wire to real data later).
          </p>
        </div>
        <Button variant="subtle" onClick={onExport}>Export PDF</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <div className="text-sm font-extrabold text-slate-950">Orders vs time</div>
          <div className="mt-1 text-sm text-slate-600">
            Placeholder chart.
          </div>
          <LineChart values={REPORTS_ORDERS_SERIES} height={200} />
        </Card>

        <Card className="p-6">
          <div className="text-sm font-extrabold text-slate-950">KPIs</div>
          <div className="mt-5 space-y-3 text-sm">
            {REPORTS_KPIS.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <div className="text-slate-600">{k}</div>
                <div className="text-slate-950 font-extrabold">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="subtle" className="w-full">
              Configure metrics
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}


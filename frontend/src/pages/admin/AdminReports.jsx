import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"

export default function AdminReports() {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-slate-400">Admin</div>
          <h1 className="mt-1 text-2xl font-semibold text-white tracking-tight">
            Reports
          </h1>
          <p className="mt-2 text-slate-300">
            Analytics/reporting UI placeholders (wire to real data later).
          </p>
        </div>
        <Button variant="subtle">Export</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <div className="text-sm font-semibold text-white">Orders vs time</div>
          <div className="mt-1 text-sm text-slate-400">
            Placeholder chart.
          </div>
          <div className="mt-6 grid grid-cols-12 gap-2 items-end h-44">
            {[34, 40, 25, 48, 54, 44, 60, 58, 52, 66, 63, 72].map((v, idx) => (
              <div
                key={idx}
                className="col-span-1 rounded-xl bg-gradient-to-t from-indigo-500/40 to-cyan-500/20 border border-white/10"
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-semibold text-white">KPIs</div>
          <div className="mt-5 space-y-3 text-sm">
            {[
              ["On-time delivery", "92%"],
              ["Avg ETA", "21m"],
              ["Refund rate", "1.8%"],
              ["Support tickets", "34"]
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <div className="text-slate-400">{k}</div>
                <div className="text-white font-semibold">{v}</div>
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


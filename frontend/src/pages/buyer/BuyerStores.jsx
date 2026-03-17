import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Card from "../../components/ui/Card"
import Input from "../../components/ui/Input"
import { stores } from "../../lib/mockData"

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
      {children}
    </span>
  )
}

export default function BuyerStores() {
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return stores
    return stores.filter((s) => s.name.toLowerCase().includes(term))
  }, [q])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-slate-400">Buyer</div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Nearby stores
          </h1>
          <p className="mt-2 text-slate-300">
            Pick a store to browse products and schedule delivery.
          </p>
        </div>
        <div className="w-full sm:w-80">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search stores…"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <Link key={s.id} to={`/buyer/stores/${s.id}`} className="group">
            <Card className="p-6 hover:bg-white/[0.06] transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white group-hover:text-cyan-200 transition">
                    {s.name}
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    {s.distanceKm} km • {s.etaMin} min ETA • ⭐ {s.rating}
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 flex items-center justify-center text-xl">
                  🛒
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>

              <div className="mt-5 text-sm font-semibold text-cyan-200">
                Browse →
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


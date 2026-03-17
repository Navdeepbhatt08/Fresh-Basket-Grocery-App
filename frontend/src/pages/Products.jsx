// Legacy page kept for compatibility with older routes.
// The new app uses `src/pages/buyer/*` and dashboards.
import { Link } from "react-router-dom"

export default function Products() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-xl w-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold text-white">Products moved</h1>
        <p className="mt-2 text-slate-300">
          This project now uses the new grocery app UI with Buyer/Seller dashboards.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/buyer/stores"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Browse Stores
          </Link>
        </div>
      </div>
    </div>
  )
}
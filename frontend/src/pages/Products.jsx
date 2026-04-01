import { Link } from "react-router-dom"

export default function Products() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-xl w-full rounded-3xl border border-slate-200/70 bg-white p-8">
        <h1 className="text-2xl font-extrabold text-slate-950">Products moved</h1>
        <p className="mt-2 text-slate-700">
          This project now uses the new grocery app UI with Buyer/Seller dashboards.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-amber-300 px-4 py-2 text-sm font-extrabold text-slate-950 hover:bg-amber-200"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/buyer/stores"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Browse Stores
          </Link>
        </div>
      </div>
    </div>
  )
}
import { useMemo, useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { products as allProducts } from "../../lib/mockData"
import { moneyINR } from "../../lib/format"

export default function SellerProducts() {
  const [q, setQ] = useState("")
  const [rows, setRows] = useState(() =>
    allProducts.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      stock: p.stock,
      active: p.stock > 0
    }))
  )

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return rows
    return rows.filter((r) => r.name.toLowerCase().includes(term))
  }, [q, rows])

  const toggleActive = (id) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)))

  const restock = (id) =>
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, stock: r.stock + 10 } : r))
    )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-slate-600">Seller</div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-950 tracking-tight">
            Products
          </h1>
          <p className="mt-2 text-slate-700">
            Manage catalog (demo UI: edit/toggle/restock).
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-80">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" />
          </div>
          <Button variant="subtle">Add</Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3">Product</th>
                <th className="py-3">Category</th>
                <th className="py-3">Price</th>
                <th className="py-3">Stock</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-slate-200/70">
                  <td className="py-4 text-slate-950 font-extrabold">{r.name}</td>
                  <td className="py-4 text-slate-700">{r.category}</td>
                  <td className="py-4 text-slate-950 font-semibold">{moneyINR(r.price)}</td>
                  <td className="py-4 text-slate-800 font-semibold">{r.stock}</td>
                  <td className="py-4">
                    <span
                      className={[
                        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                        r.active
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-slate-50 text-slate-700"
                      ].join(" ")}
                    >
                      {r.active ? "Active" : "Paused"}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="inline-flex gap-2">
                      <Button size="sm" variant="subtle" onClick={() => restock(r.id)}>
                        Restock
                      </Button>
                      <Button size="sm" variant="subtle" onClick={() => toggleActive(r.id)}>
                        {r.active ? "Pause" : "Activate"}
                      </Button>
                      <Button size="sm" variant="ghost">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td className="py-6 text-slate-600" colSpan={6}>
                    No products matched.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}


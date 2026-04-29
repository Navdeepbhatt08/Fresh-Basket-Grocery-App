import { useEffect, useMemo, useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { moneyINR } from "../../lib/format"
import { useAuth } from "../../state/auth"
import axios from "axios"

export default function SellerProducts() {
  const { user } = useAuth()
  const [q, setQ] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [shops, setShops] = useState([])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    store: "",
    unit: "kg",
    image: ""
  })

  useEffect(() => {
    fetchInitialData()
  }, [user])

  const fetchInitialData = async () => {
    try {
      if (!user?.id) return

      const [shopsRes, productsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/shops/seller/${user.id}`),
        axios.get(`http://localhost:5000/api/products/seller/${user.id}`)
      ])

      setShops(shopsRes.data)
      setRows(productsRes.data)

      if (shopsRes.data.length > 0) {
        setForm(f => ({ ...f, store: shopsRes.data[0]._id }))
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return rows
    return rows.filter((r) => r.name.toLowerCase().includes(term))
  }, [q, rows])

  const toggleActive = async (id, currentStatus) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/products/${id}`, { active: !currentStatus })
      setRows((prev) => prev.map((r) => (r._id === id ? res.data : r)))
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const restock = async (id, currentStock) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/products/${id}`, { stock: currentStock + 10 })
      setRows((prev) => prev.map((r) => (r._id === id ? res.data : r)))
    } catch (error) {
      console.error("Error restocking product:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!user?.id) return
      const payload = {
        ...form,
        seller: user.id,
        price: Number(form.price),
        stock: Number(form.stock),
      }

      const res = await axios.post("http://localhost:5000/api/products", payload)
      // Re-fetch or add to state
      setRows((prev) => [...prev, res.data])

      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        store: shops.length > 0 ? shops[0]._id : "",
        unit: "kg",
        image: ""
      })

      setShowForm(false)
    } catch (error) {
      console.error("Error saving product:", error)
    }
  }

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-slate-600">Seller</div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-950 tracking-tight">
            Products
          </h1>
          <p className="mt-2 text-slate-700">
            Manage catalog.
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-80">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
            />
          </div>

          <Button variant="subtle" onClick={() => setShowForm(true)}>
            Add
          </Button>
        </div>
      </div>

      {/* Add Product */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black/10 z-40"
            onClick={() => setShowForm(false)}
          />

          <div className="fixed top-20 right-20 rounded-2xl w-[380px] bg-white shadow-2xl z-50 p-6 flex flex-col max-h-[80vh] overflow-y-auto">

            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Add Product
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Select Shop</label>
                <select
                  name="store"
                  value={form.store}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>Select a shop</option>
                  {shops.map(s => (
                    <option key={s._id} value={s._id}>{s.name}</option>
                  ))}
                </select>
                {shops.length === 0 && (
                  <p className="text-xs text-amber-600 mt-1">Please add a shop first.</p>
                )}
              </div>

              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
              />

              <Input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                required
              />

              <Input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                required
              />

              <Input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock"
                required
              />

              <Input
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="Unit (kg, L, pack, etc.)"
                required
              />

              <Input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL (optional)"
              />

              <div className="flex gap-2 mt-4">
                <Button type="submit" disabled={shops.length === 0}>
                  Save Product
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>

            </form>
          </div>
        </>
      )}

      {/* Products Table */}
      <Card className="p-6">
        {loading ? (
          <div className="py-10 text-center text-slate-500">Loading products...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="py-3">Product</th>
                  <th className="py-3">Shop</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Stock</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {filtered.map((r) => (
                  <tr key={r._id} className="border-t border-slate-200/70">

                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                          <img
                            src={r.image || "https://via.placeholder.com/100?text=P"}
                            alt={r.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="text-slate-950 font-extrabold">
                          {r.name}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 text-slate-600 italic">
                      {r.store?.name || "N/A"}
                    </td>

                    <td className="py-4 text-slate-700">
                      {r.category}
                    </td>

                    <td className="py-4 text-slate-950 font-semibold">
                      {moneyINR(r.price)}
                    </td>

                    <td className="py-4 text-slate-800 font-semibold">
                      {r.stock} {r.unit}
                    </td>

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

                        <Button
                          size="sm"
                          variant="subtle"
                          onClick={() => restock(r._id, r.stock)}
                        >
                          Restock
                        </Button>

                        <Button
                          size="sm"
                          variant="subtle"
                          onClick={() => toggleActive(r._id, r.active)}
                        >
                          {r.active ? "Pause" : "Activate"}
                        </Button>

                      </div>
                    </td>

                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td className="py-6 text-slate-600" colSpan={7}>
                      No products matched.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          </div>
        )}
      </Card>

    </div>
  )
}
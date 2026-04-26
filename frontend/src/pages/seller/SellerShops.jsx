import { useEffect, useMemo, useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { useAuth } from "../../state/auth"
import axios from "axios"

export default function SellerShops() {
  const { user } = useAuth()
  const [q, setQ] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    name: "",
    description: "",
    tags: "",
    distanceKm: "",
    etaMin: "",
    image: ""
  })

  useEffect(() => {
    fetchShops()
  }, [user])

  const fetchShops = async () => {
    try {
      const sellerId = user?.id || "6449f8a3c8e4a5a123456789"
      const res = await axios.get(`http://localhost:5000/api/shops/seller/${sellerId}`)
      setShops(res.data)
    } catch (error) {
      console.error("Error fetching shops:", error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return shops
    return shops.filter((s) => s.name.toLowerCase().includes(term))
  }, [q, shops])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = (shop) => {
    setEditingId(shop._id)
    setForm({
      name: shop.name,
      description: shop.description,
      tags: shop.tags?.join(", ") || "",
      distanceKm: shop.distanceKm,
      etaMin: shop.etaMin,
      image: shop.image || ""
    })
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingId(null)
    setForm({
      name: "",
      description: "",
      tags: "",
      distanceKm: "",
      etaMin: "",
      image: ""
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const sellerId = user?.id || "6449f8a3c8e4a5a123456789"
      const payload = {
        ...form,
        seller: sellerId,
        tags: form.tags.split(",").map(t => t.trim()),
        distanceKm: Number(form.distanceKm),
        etaMin: Number(form.etaMin)
      }

      if (editingId) {
        const res = await axios.patch(`http://localhost:5000/api/shops/${editingId}`, payload)
        setShops((prev) => prev.map(s => s._id === editingId ? res.data : s))
      } else {
        const res = await axios.post("http://localhost:5000/api/shops", payload)
        setShops((prev) => [...prev, res.data])
      }

      handleCloseForm()
    } catch (error) {
      console.error("Error saving shop:", error)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-slate-600">Seller</div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-950 tracking-tight">
            My Shops
          </h1>
          <p className="mt-2 text-slate-700">
            Manage your store locations.
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-80">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search shops…"
            />
          </div>

          <Button variant="subtle" onClick={() => setShowForm(true)}>
            Add Shop
          </Button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black/10 z-40"
            onClick={handleCloseForm}
          />
          <div className="fixed top-20 right-20 rounded-2xl w-[380px] bg-white shadow-2xl z-50 p-6 flex flex-col max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              {editingId ? "Edit Shop" : "Add New Shop"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Shop Name"
                required
              />
              <Input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
              <Input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Tags (comma separated)"
                required
              />
              <Input
                name="distanceKm"
                type="number"
                value={form.distanceKm}
                onChange={handleChange}
                placeholder="Distance (km)"
                required
              />
              <Input
                name="etaMin"
                type="number"
                value={form.etaMin}
                onChange={handleChange}
                placeholder="ETA (min)"
                required
              />
              <Input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL (optional)"
              />

              <div className="flex gap-2 mt-4">
                <Button type="submit">
                  {editingId ? "Update Shop" : "Save Shop"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCloseForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Shops Table */}
      <Card className="p-6">
        {loading ? (
          <div className="py-10 text-center text-slate-500">Loading shops...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="py-3">Shop</th>
                  <th className="py-3">Tags</th>
                  <th className="py-3">Distance</th>
                  <th className="py-3">ETA</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map((s) => (
                  <tr key={s._id} className="border-t border-slate-200/70">
                    <td className="py-4 font-extrabold">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                          <img 
                            src={s.image || "https://via.placeholder.com/100?text=S"} 
                            alt={s.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="text-slate-950">
                          {s.name}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-700">
                      {s.tags?.join(", ")}
                    </td>
                    <td className="py-4 text-slate-950 font-semibold">
                      {s.distanceKm} km
                    </td>
                    <td className="py-4 text-slate-800 font-semibold">
                      {s.etaMin} min
                    </td>
                    <td className="py-4 text-right">
                      <Button size="sm" variant="subtle" onClick={() => handleEdit(s)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td className="py-6 text-slate-600" colSpan={5}>
                      No shops found. Add one to get started!
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

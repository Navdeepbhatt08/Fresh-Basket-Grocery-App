import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../state/auth"
import { toast } from "react-toastify"

export default function AddAddress() {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    phone: "",
    house: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home"
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!user?.email) {
        toast.error("User email not found. Please log in again.")
        return
      }

      const payload = {
        email: user.email,
        name: form.name,
        phone: form.phone,
        house: form.house,
        area: form.area,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        type: form.type
      }

      await axios.post("http://localhost:5000/api/addresses", payload)

      toast.success("Address saved to your collection!")
      navigate("/buyer/profile")
    } catch (error) {
      console.error("Error adding address:", error)
      toast.error(error.response?.data?.error || "Failed to add address. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-slate-100 to-slate-200 px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6">

        <div className="mb-5">
          <div className="text-sm text-slate-500">FreshBasket</div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Add Address
          </h2>
          <p className="text-sm text-slate-600">
            Enter your delivery details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Navdeep Bhatt"
              className="mt-1 w-full px-4 py-2.5 rounded-xl border bg-white focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="mt-1 w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              House / Flat
            </label>
            <input
              name="house"
              value={form.house}
              onChange={handleChange}
              placeholder="Flat 101"
              className="mt-1 w-full px-4 py-2.5 rounded-xl border"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Area / Street
            </label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="Main Road"
              className="mt-1 w-full px-4 py-2.5 rounded-xl border"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="px-4 py-2.5 rounded-xl border"
              required
            />
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="px-4 py-2.5 rounded-xl border"
              required
            />
          </div>

          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="w-full px-4 py-2.5 rounded-xl border"
            required
          />

          <div>
            <label className="text-sm font-medium text-slate-700">
              Address Type
            </label>

            <div className="flex gap-2 mt-2">
              {["Home", "Work", "Other"].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setForm({ ...form, type })}
                  className={`flex-1 px-3 py-2 rounded-xl border text-sm font-semibold transition ${form.type === type
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-white hover:bg-slate-50"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Address"}
          </button>


          <div className="flex justify-between text-sm pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-slate-600 hover:underline"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => navigate("/buyer/profile")}
              className="text-green-600 font-semibold hover:underline"
            >
              View Addresses
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
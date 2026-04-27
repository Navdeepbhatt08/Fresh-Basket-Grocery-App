import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { useAuth } from "../../state/auth"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { 
  House, 
  User, 
  Mail, 
  Phone, 
  AlignLeft, 
  Calendar,
  ShieldCheck,
  Camera
} from "lucide-react";

export default function BuyerProfile() {
  const { user, login } = useAuth()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    address: ""
  })

  const [addresses, setAddresses] = useState([])
  const [loadingAddresses, setLoadingAddresses] = useState(false)

  // Sync form with user data from DB/Auth
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        address: user.address || ""
      })
      fetchAddresses()
    }
  }, [user])

  const fetchAddresses = async () => {
    if (!user?.email) return
    setLoadingAddresses(true)
    try {
      const res = await axios.get(`http://localhost:5000/api/addresses/${user.email}`)
      setAddresses(res.data)
    } catch (error) {
      console.error("Error fetching addresses:", error)
    } finally {
      setLoadingAddresses(false)
    }
  }

  const deleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addresses/${id}`)
      setAddresses(addresses.filter(a => a._id !== id))
      toast.success("Address removed")
    } catch (error) {
      toast.error("Failed to delete address")
    }
  }
  const navigate = useNavigate()

  const save = async () => {
    if (!user?.id) {
      toast.error("You must be logged in to update your profile.")
      return
    }

    try {
      const res = await axios.patch(`http://localhost:5000/api/users/${user.id}`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        bio: form.bio,
        address: form.address
      })

      login({ 
        ...user,
        ...res.data,
        id: res.data._id || res.data.id // Sync both MongoDB _id and custom id
      })
      
      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message)
      toast.error(error.response?.data?.error || "Failed to update profile. Please try again.")
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Profile Header */}
      <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 shadow-xl">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        <div className="absolute -bottom-5 left-8 flex items-end gap-6">
          <div className="relative group">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl border-4 border-white bg-white shadow-2xl overflow-hidden">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || "User")}&background=f1f5f9&color=3b82f6&size=200&font-size=0.33&bold=true`} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 p-2 rounded-xl bg-white shadow-lg text-blue-600 hover:scale-110 transition-transform">
              <Camera size={18} />
            </button>
          </div>
          <div className="mb-20">
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {form.name || "Set your name"}
            </h1>
            <p className="text-white/80 font-medium flex items-center gap-1.5">
              <ShieldCheck size={16} /> Verified Buyer
            </p>
          </div>
        </div>
      </div>

      <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 shadow-2xl shadow-slate-200/50 border-slate-100/80">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Full Name" icon={<User size={16} />}>
                <Input
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </Field>
              <Field label="Email Address" icon={<Mail size={16} />}>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </Field>
              <Field label="Phone Number" icon={<Phone size={16} />}>
                <Input
                  placeholder="+91 00000 00000"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </Field>
              <Field label="Join Date" icon={<Calendar size={16} />}>
                <div className="w-full rounded-2xl border border-slate-200/70 bg-slate-50/50 px-4 py-3 text-sm text-slate-500 font-medium cursor-not-allowed">
                  April 26, 2026
                </div>
              </Field>
              <Field label="Full Address" icon={<House size={16} />} className="md:col-span-2">
                <Input
                  placeholder="House no, street, landmark, city, state"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Bio" icon={<AlignLeft size={16} />}>
                <textarea
                  placeholder="Tell us a bit about yourself..."
                  className="w-full min-h-[120px] rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:border-blue-400 transition-all resize-none"
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                />
              </Field>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <Button 
                onClick={save}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200"
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-8 shadow-2xl shadow-slate-200/50 border-slate-100/80">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <House size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Saved Addresses</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              {loadingAddresses ? (
                <div className="text-center py-4 text-xs font-bold text-slate-400 animate-pulse">
                  Loading addresses...
                </div>
              ) : addresses.length > 0 ? (
                addresses.map((addr) => (
                  <div key={addr._id} className="group relative rounded-2xl border border-slate-200/70 bg-white p-5 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <House size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-bold text-slate-900">{addr.type} Address</div>
                          <button 
                            onClick={() => deleteAddress(addr._id)}
                            className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed italic">
                          {addr.fullAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="group relative rounded-2xl border border-slate-200/70 bg-white p-5 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <House size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Primary Address</div>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed italic">
                        {user?.address || "No primary address set yet"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate("/buyer/add-address")}
                className="w-full mt-4 group flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border-2 border-dashed border-slate-200 text-sm font-bold text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
              >
                <div className="p-1 rounded-md bg-slate-100 group-hover:bg-blue-100 transition-colors">
                  <User size={14} />
                </div>
                Add New Address
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Field({ label, icon, children, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
        {icon}
        {label}
      </label>
      {children}
    </div>
  )
}


import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { useAuth } from "../../state/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function BuyerProfile() {
  const { user, login } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || "Demo User",
    email: user?.email || "demo@freshbasket.app"
  })
  const navigate = useNavigate()


  const save = () => {
    login({ name: form.name, email: form.email, role: user?.role })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="p-6 lg:col-span-2">
        <div className="text-sm text-slate-600">Buyer</div>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-950 tracking-tight">
          Profile
        </h1>
        <p className="mt-2 text-slate-700">
          Update details (frontend demo; stored in localStorage).
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Name">
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </Field>
          <Field label="Email">
            <Input
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </Field>
        </div>

        <div className="mt-6">
          <Button onClick={save}>Save changes</Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-sm font-extrabold text-slate-950">Addresses</div>
        <div className="mt-2 text-sm text-slate-600">
          Add address management UI here.
        </div>
        <div className="mt-5 space-y-2">
          <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
            <div className="text-sm font-extrabold text-slate-950">Home</div>
            <div className="mt-1 text-sm text-slate-600">
              Rishikesh , Dehradun ~ India
            </div>
          </div>
          <button
            onClick={() => navigate("/buyer/add-address")}
            className="w-full mt-4 px-4 py-3 rounded-xl border text-sm font-semibold hover:bg-slate-100"
          >
            Add new address
          </button>
        </div>
      </Card>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-slate-800">{label}</div>
      {children}
    </div>
  )
}


import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import { useAuth } from "../state/auth"

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
    terms: false
  })

  const [loading, setLoading] = useState(false)

  const canSubmit = useMemo(() => {
    return (
      form.name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.address.trim() &&
      form.password.trim() &&
      form.confirmPassword.trim() &&
      form.password === form.confirmPassword &&
      form.terms &&
      !loading
    )
  }, [form, loading])

  const register = async () => {
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 500))

      login({
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        role: form.role,
        token: "demo-token"
      })

      navigate("/", { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-emerald-50 to-slate-100">
      <div className="w-full max-w-2xl">

        <div className="text-center mb-8">
          <div className="text-sm text-emerald-700 font-semibold tracking-wide">
            FreshBasket
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900">
            Create your account
          </h1>

          <p className="mt-2 text-slate-600">
            Join FreshBasket and start buying fresh groceries 
          </p>
        </div>

        <Card className="p-8 shadow-xl rounded-2xl bg-white">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field label="Full Name">
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder=" Enter name here"
              />
            </Field>

            <Field label="Email">
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Phone Number">
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="09xx-xxx-xxx"
              />
            </Field>

            <Field label="Role">
              <select
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={form.role}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value }))
                }
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="seller">Admin</option>
              </select>
            </Field>

            <div className="md:col-span-2">
              <Field label="Address">
                <Input
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  placeholder="Your delivery address"
                />
              </Field>
            </div>

            <Field label="Password">
              <Input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                placeholder="••••••••"
              />
            </Field>

            <Field label="Confirm Password">
              <Input
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((f) => ({ ...f, confirmPassword: e.target.value }))
                }
                placeholder="Re-enter password"
              />
            </Field>

          </div>

          <div className="flex items-center gap-2 mt-4 text-sm">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) =>
                setForm((f) => ({ ...f, terms: e.target.checked }))
              }
            />
            <span className="text-slate-700">
              I agree to the Terms & Conditions
            </span>
          </div>

          <div className="mt-6">
            <Button
              className="w-full py-3 text-lg"
              disabled={!canSubmit}
              onClick={register}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm mt-5">
            <Link
              to="/login"
              className="text-emerald-700 font-semibold hover:text-emerald-900"
            >
              Back to login
            </Link>

            <Link
              to="/"
              className="text-slate-600 hover:text-slate-900"
            >
              Skip
            </Link>
          </div>

        </Card>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-semibold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  )
}
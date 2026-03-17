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
    password: ""
  })
  const [loading, setLoading] = useState(false)

  const canSubmit = useMemo(() => {
    return form.name.trim() && form.email.trim() && form.password.trim() && !loading
  }, [form, loading])

  const register = async () => {
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 450))
      login({ name: form.name, email: form.email, role: "buyer", token: "demo-token" })
      navigate("/", { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <div className="text-sm text-slate-400">FreshBasket</div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Create account
          </h1>
          <p className="mt-2 text-slate-300">
            Demo registration (frontend only).
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <Field label="Full name">
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your name"
              />
            </Field>
            <Field label="Email">
              <Input
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Password">
              <Input
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                type="password"
                placeholder="••••••••"
              />
            </Field>

            <div className="pt-2">
              <Button className="w-full" disabled={!canSubmit} onClick={register}>
                {loading ? "Creating…" : "Create account"}
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link to="/login" className="text-cyan-200 hover:text-cyan-100 font-semibold">
                Back to login
              </Link>
              <Link to="/" className="text-slate-300 hover:text-white">
                Skip
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-slate-200">{label}</div>
      {children}
    </div>
  )
}

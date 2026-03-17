import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import { useAuth } from "../state/auth"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("demo@freshbasket.app")
  const [password, setPassword] = useState("password")
  const [role, setRole] = useState("buyer")
  const [loading, setLoading] = useState(false)

  const canSubmit = useMemo(() => email.trim() && password.trim() && !loading, [email, password, loading])

  const onLogin = async () => {
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 350))
      login({ name: "Demo User", email, role, token: "demo-token" })
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
            Sign in
          </h1>
          <p className="mt-2 text-slate-300">
            Choose a role to preview Buyer/Seller/Admin flows.
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <Field label="Email">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </Field>
            <Field label="Password">
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
            </Field>
            <Field label="Role">
              <div className="grid grid-cols-3 gap-2">
                {["buyer", "seller", "admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={[
                      "rounded-2xl border px-3 py-3 text-sm font-semibold transition",
                      role === r ? "border-cyan-400/30 bg-cyan-500/10 text-white" : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                    ].join(" ")}
                  >
                    {r[0].toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </Field>

            <div className="pt-2">
              <Button className="w-full" disabled={!canSubmit} onClick={onLogin}>
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link to="/" className="text-slate-300 hover:text-white">
                Continue as guest
              </Link>
              <Link to="/register" className="text-cyan-200 hover:text-cyan-100 font-semibold">
                Create account
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
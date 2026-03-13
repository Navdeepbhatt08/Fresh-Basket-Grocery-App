import { useState } from "react"
import API from "../api/axios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)
    try {
      const res = await API.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      alert("Logged In")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative  via-slate-900 to-slate-950 px-4"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div />
      <div />

      <div className="relative w-full max-w-md p-10 rounded-3xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-2xl shadow-black/40
        transition-all duration-500"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Welcome Back 👋
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Sign in to continue to Fresh-Basket
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-cyan-500/40
                focus:border-cyan-400
                transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-cyan-500/40
                focus:border-cyan-400
                transition-all duration-300"
            />
            <div className="text-right mt-2">
              <a
                href="#"
                className="text-xs text-cyan-400 hover:text-cyan-300 transition"
              >
                Forgot password?
              </a>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full mt-8 py-3.5 rounded-xl
            bg-gradient-to-rfrom-cyan-500 to-blue-500
            hover:from-cyan-400 hover:to-blue-400
            text-black font-semibold text-lg
            transition-all duration-300
            shadow-lg shadow-cyan-500/20
            active:scale-95
            disabled:opacity-60 disabled:pointer-events-none"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-cyan-400 hover:text-cyan-300 font-medium transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
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
      className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="absolute " />
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 " />
      <div
        className="absolute inset-0 opacity-[0.03]"
      />

      <div
        className="relative z-10 w-full max-w-105 p-8 sm:p-10 rounded-2xl
          bg-white/6 backdrop-blur-2xl
          border border-white/8
          shadow-[0_0_60px_-12px_rgba(34,211,238,0.2),0_25px_50px_-12px_rgba(0,0,0,0.5)]
          transition-all duration-500 hover:border-white/12 "
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-slate-400 text-sm mt-1.5">
            Sign in to continue
          </p>
        </div>
        <div className="space-y-5">
          <div className="group">
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl
                  bg-white/6 border border-white/8
                  text-white placeholder-slate-500
                  focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20
                  transition-all duration-200"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl
                  bg-white/6 border border-white/8
                  text-white placeholder-slate-500
                  focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20
                  transition-all duration-200"
              />
            </div>
            <a href="#" className="inline-block text-xs text-cyan-400 hover:text-cyan-300 mt-2 transition-colors">
              Forgot password ?
            </a>
          </div>
        </div>

        <button
          onClick={login}
          disabled={loading}
          className="w-full mt-8 py-3.5 rounded-xl
            bg-linear-to-r from-cyan-500 to-cyan-600
            hover:from-cyan-400 hover:to-cyan-500
            text-black text-lg font-bold tracking-wide
            transition-all duration-300
            shadow-lg shadow-cyan-500/25
             active:scale-[0.98]
            disabled:opacity-70 disabled:pointer-events-none disabled:hover:scale-100"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-center text-slate-500 text-sm mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            Sign up
          </a>
        </p>

      </div>
    </div>
  )
}

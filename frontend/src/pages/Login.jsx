import { useState } from "react"
import API from "../api/axios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    const res = await API.post("/auth/login", { email, password })
    localStorage.setItem("token", res.data.token)
    alert("Logged In")
  }

  return (
 <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden">

  <div className="absolute `w-[500px]` `h-[500px]` bg-cyan-500/20 rounded-full blur-[120px] -top-40 -left-40"></div>
  <div className="absolute `w-[400px]` `h-[400px]` bg-purple-600/20 rounded-full blur-[120px] bottom-0 right-0"></div>

  <div className="relative z-10 `w-[580px]` p-8 rounded-2xl
    bg-white/5 backdrop-blur-xl 
    border border-white/10 
    shadow-[0_0_40px_rgba(0,255,255,0.15)]">

    <h2 className="text-3xl font-semibold text-white mb-8 tracking-wide">
      Sign In
    </h2>

    <div className="mb-6">
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        className="w-full bg-transparent border-b border-gray-600
        text-white placeholder-gray-500
        py-3 focus:outline-none
        focus:border-cyan-400
        transition duration-300"
      />
    </div>

    {/* Password */}
    <div className="mb-8">
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        className="w-full bg-transparent border-b border-gray-600
        text-white placeholder-gray-500
        py-3 focus:outline-none
        focus:border-cyan-400
        transition duration-300"
      />
    </div>

    {/* Button */}
    <button
      onClick={login}
      className="w-full py-3 rounded-lg 
      bg-gradient-to-r from-cyan-500 to-blue-600
      hover:from-cyan-400 hover:to-blue-500
      text-white font-medium tracking-wide
      transition duration-300
      shadow-lg shadow-cyan-500/20
      hover:shadow-cyan-500/40"
    >
      Login →
    </button>

  </div>
</div>


  )
}

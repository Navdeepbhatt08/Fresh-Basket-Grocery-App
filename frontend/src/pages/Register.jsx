import { useState } from "react"
import API from "../api/axios"

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const register = async () => {
    await API.post("/auth/register", form)
    alert("Registered Successfully")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120] relative overflow-hidden">

  {/* Background glow elements */}
  <div className="absolute w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[120px] -top-40 -right-40"></div>
  <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] bottom-0 -left-40"></div>

  {/* Glass Card */}
  <div className="relative z-10 w-[400px] px-10 py-12 
    bg-white/5 backdrop-blur-2xl 
    border border-white/10 
    rounded-2xl shadow-[0_0_60px_rgba(0,255,255,0.08)]">

    <h2 className="text-3xl font-semibold text-white mb-10 tracking-wide">
      Create Account
    </h2>

    {/* Name */}
    <div className="mb-7">
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full bg-transparent border-b border-gray-600
        text-white placeholder-gray-500
        py-3 focus:outline-none
        focus:border-indigo-400
        transition duration-300"
      />
    </div>

    {/* Email */}
    <div className="mb-7">
      <input
        name="email"
        placeholder="Email Address"
        onChange={handleChange}
        className="w-full bg-transparent border-b border-gray-600
        text-white placeholder-gray-500
        py-3 focus:outline-none
        focus:border-indigo-400
        transition duration-300"
      />
    </div>

    {/* Password */}
    <div className="mb-10">
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full bg-transparent border-b border-gray-600
        text-white placeholder-gray-500
        py-3 focus:outline-none
        focus:border-indigo-400
        transition duration-300"
      />
    </div>

    {/* Button */}
    <button
      onClick={register}
      className="w-full py-3 rounded-lg bg-indigo-900
      hover:from-indigo-400 hover:to-cyan-400
      text-white font-medium tracking-wide
      transition duration-300
      shadow-lg shadow-indigo-500/20
      hover:shadow-indigo-500/40
      transform hover:scale-[1.02]">
      Create Account →
    </button>

  </div>
</div>

  )
}

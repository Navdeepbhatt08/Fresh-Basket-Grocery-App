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
    <div className=" bg-gray-200 rounded-lg w-[100%]  drop-shadow-black justify-center grid ">
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /> <br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/>
      <button className=" bg-cyan-700 text-white rounded " onClick={login}>Login</button>
    </div>
  )
}

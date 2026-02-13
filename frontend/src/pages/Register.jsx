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
    <div className="form">
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={register}>Register</button>
    </div>
  )
}

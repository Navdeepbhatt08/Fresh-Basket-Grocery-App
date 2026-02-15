import { Routes, Route, Link } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Products from "./pages/Products"

function App() {
  const logout = () => {
    localStorage.removeItem("token")
    alert("Logged Out")
  }

  return (
    <div className=" bg-[#0f172a] ">
      <nav className="navbar">
        <h2 className="logo">Grocery SaaS</h2>

        <div className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

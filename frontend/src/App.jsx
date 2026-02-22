import { Routes, Route, Link } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Products from "./pages/Products"
import { ToastContainer } from "react-toastify"

function App() {
  const logout = () => {
    localStorage.removeItem("token")
    alert("Logged Out")
  }

  return (
    <div className=" bg-[#0f172a] ">
      <nav className="navbar">
        <h2 className="logo text-xl font-black ">Fresh-Basket</h2>

        <div className="nav-links">
          <Link to="/products">Products</Link>
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
        <ToastContainer />
      </div>
      <footer className="w-full mt-16 border-t border-white/10 bg-gradient-to-brfrom-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between ">
          <h3 className="text-slate-300 text-sm sm:text-base font-medium tracking-wide hover:text-cyan-400 transition-colors duration-300">
            Fresh-Basket — Your Daily Grocery App
          </h3>
          <h3 className="text-slate-400 text-sm hover:text-cyan-400 transition-colors duration-300">
            © 2026 FreshBasket Team
          </h3>
        </div>
      </footer>
    </div>
  )
}

export default App

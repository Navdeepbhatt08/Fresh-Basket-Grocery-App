import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import { useAuth } from "../state/auth"
import { useCart } from "../state/cart"
import Button from "../components/ui/Button"

function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

const navSections = [
  {
    label: "buyer",
    items: [
      { to: "/buyer/stores", label: "Stores" },
      { to: "/buyer/cart", label: "Cart" },
      { to: "/buyer/orders", label: "Orders" },
      { to: "/buyer/profile", label: "Profile" }
    ]
  },
  {
    label: "seller",
    items: [
      { to: "/seller", label: "Dashboard" },
      { to: "/seller/products", label: "Products" },
      { to: "/seller/orders", label: "Orders" }
    ]
  },
  {
    label: "admin",
    items: [
      { to: "/admin", label: "Dashboard" },
      { to: "/admin/users", label: "Users" },
      { to: "/admin/sellers", label: "Sellers" },
      { to: "/admin/reports", label: "Reports" }
    ]
  }
]

export default function AppShell() {
  const { user, setRole, logout } = useAuth()
  const { totals } = useCart()
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)

  const currentNav = useMemo(() => {
    return navSections.find(
      (section) => section.label === (user?.role || "buyer")
    )
  }, [user?.role])

  const handleRoleChange = (role) => {
    setRole(role)

    if (role === "buyer") navigate("/buyer/stores")
    else if (role === "seller") navigate("/seller")
    else if (role === "admin") navigate("/admin")
  }

  const onLogout = () => {
    logout()
    navigate("/login")
  }

  return (
  <div className="min-h-screen flex flex-col bg-slate-100"  >

      {/* 🔷 Navbar */}
      <header className="sticky top-0 z-50 mx-5 mt-3 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between px-6 py-4">

          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-lg border border-slate-300"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              ☰
            </button>

            <div>
              <div className="text-xl font-extrabold text-slate-900">
                FreshBasket
              </div>
              <div className="text-xs text-slate-500">(Your daily store)</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-3">
            {currentNav?.items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cx(
                    "px-3 py-2 rounded-lg text-sm font-semibold transition",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-700 hover:bg-slate-100"
                  )
                }
              >
                {it.label}
              </NavLink>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">

            {/* Role Dropdown */}
            <select
              value={user?.role || "buyer"}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="hidden sm:block px-3 py-2 rounded-lg border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>

            {/* Cart */}
            <Button onClick={() => navigate("/buyer/cart")}>
              Cart • {totals.itemsCount}
            </Button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 border border-red-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 🔽 Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 border-t border-slate-200">

            {/* Role */}
            <div className="mt-3">
              <select
                value={user?.role || "buyer"}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-semibold"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Nav Links */}
            <div className="mt-3 flex flex-col gap-2">
              {currentNav?.items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cx(
                      "px-4 py-2 rounded-lg text-sm font-semibold",
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-slate-700 hover:bg-slate-100"
                    )
                  }
                >
                  {it.label}
                </NavLink>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-2">
              <Button onClick={() => navigate("/buyer/cart")}>
                Cart • {totals.itemsCount}
              </Button>

              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold border border-red-200"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 🔷 Content */}
      <main className="flex-1 px-6 py-6">
        <div className="mb-4">
          <div className="text-sm text-slate-600">
            10–20 min delivery • Fresh picks
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            {user?.role === "seller"
              ? "Seller Center"
              : user?.role === "admin"
              ? "Admin Console"
              : "Buyer App"}
          </div>
        </div>

        <Outlet />
      </main>

      {/* 🔷 Footer */}
      <footer className="border-t border-slate-200 px-6 py-4 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-slate-600">
          <div className="font-semibold">
            FreshBasket — Team (@Navdeep @Divyansh @Neeraj)
          </div>
          <div>© 2026</div>
        </div>
      </footer>
    </div>
  )
}
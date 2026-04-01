import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useMemo ,useState} from "react"
import { useAuth } from "../state/auth"
import { useCart } from "../state/cart"
import Button from "../components/ui/Button"

function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

const navSections = [
  {
    label: "Buyer",
    items: [
      { to: "/buyer/stores", label: "Stores" },
      { to: "/buyer/cart", label: "Cart" },
      { to: "/buyer/orders", label: "Orders" },
      { to: "/buyer/profile", label: "Profile" }
    ]
  },
  {
    label: "Seller",
    items: [
      { to: "/seller", label: "Dashboard" },
      { to: "/seller/products", label: "Products" },
      { to: "/seller/orders", label: "Orders" }
    ]
  },
  {
    label: "Admin",
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totals } = useCart()
  const navigate = useNavigate()

  const roleLabel = useMemo(() => {
    if (!user?.role) return "Guest"
    return user.role[0].toUpperCase() + user.role.slice(1)
  }, [user?.role])

  const onLogout = () => {
    logout()
    navigate("/login")
  }

  const currentNav = navSections.find(
  (section) => section.label.toLowerCase() === user?.role
  
)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 ">

  
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-green-50 shadow-sm rounded-2xl mt-3 mx-5">
        <div className="flex items-center justify-between px-6 py-4">

          <div className="flex items-center gap-6">
            <div>
              <div className="text-xl font-extrabold text-slate-900">
                FreshBasket
              </div>
              <div className="text-xs text-slate-500">(Your daily store)</div>
            </div>

           <nav className="hidden md:flex items-center gap-4">
  {currentNav?.items.map((it) => (
    <NavLink
      key={it.to}
      to={it.to}
      className={({ isActive }) =>
        cx(
          "text-sm font-semibold px-3 py-2 rounded-lg transition",
          isActive
            ? "bg-blue-100 text-blue-700"
            : "text-slate-700 hover:bg-slate-100"
        )
      }
    >
      {it.label}
      
    </NavLink>
  ))}

  {/* Mobile Menu Button */}
<button
  className="md:hidden p-2 rounded-lg border border-slate-300"
  onClick={() => setMobileOpen(!mobileOpen)}
>
  ☰
</button>
</nav>
          </div>

          {/* Right: Role + Cart + Logout */}
          <div className="flex items-center gap-3">

            {/* Role Switch */}
            <div className="hidden sm:flex gap-2">
              {["buyer", "seller", "admin"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cx(
                    "px-3 py-1 rounded-lg text-xs font-semibold transition",
                    user?.role === r
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>

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
      </header>
{mobileOpen && (
  <div className="md:hidden px-4 pb-4">
    
    {/* Role Select */}
    <div className="mb-3">
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
    <div className="flex flex-col gap-2">
      {currentNav?.items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            cx(
              "px-4 py-2 rounded-lg text-sm font-semibold transition",
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

      <main className="flex-1 px-16 py-6 ">
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
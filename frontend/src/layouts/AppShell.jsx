import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import { useAuth } from "../state/auth"
import { useCart } from "../state/cart"

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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [topMenuOpen, setTopMenuOpen] = useState(false)
  const { user, setRole, logout } = useAuth()
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

  return (
    <div className="min-h-screen">
      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="rounded-[28px] border border-slate-200/70 bg-white/70 backdrop-blur-xl shadow-[0_20px_70px_-30px_rgba(2,6,23,0.25)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] min-h-[calc(100vh-3rem)]">
            {/* Sidebar */}
            <aside
              className={cx(
                "border-r border-slate-200/70 bg-gradient-to-b from-white to-amber-50/50",
                "lg:block lg:static",
                "fixed inset-y-0 left-0 z-50 w-[320px] max-w-[85vw] overflow-y-auto",
                sidebarOpen ? "block" : "hidden"
              )}
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
             
                    <div className="text-2xl font-extrabold tracking-tight text-slate-950">
                   FreshBasket 
                    </div>
                    <div className=" text-sm font-bold">(Your daily store)</div>
                  </div>
                  <button
                    className="lg:hidden inline-flex items-center justify-center rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Close
                  </button>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-500">Signed in as</div>
                      <div className="text-sm font-semibold text-slate-950">
                        {user?.name || "Demo User"}
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                      {roleLabel}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["buyer", "seller", "admin"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRole(r)}
                        className={cx(
                          "rounded-xl px-2 py-2 text-xs font-semibold transition",
                          user?.role === r
                            ? "bg-slate-900 text-white border border-slate-900"
                            : "bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200/70"
                        )}
                      >
                        {r[0].toUpperCase() + r.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="flex-1 rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={onLogout}
                      className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 border border-rose-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  {navSections.map((section) => (
                    <div key={section.label}>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {section.label}
                      </div>
                      <div className="mt-2 space-y-1">
                        {section.items.map((it) => (
                          <NavLink
                            key={it.to}
                            to={it.to}
                            className={({ isActive }) =>
                              cx(
                                "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition",
                                isActive
                                  ? "bg-amber-100 text-slate-950 border border-amber-200"
                                  : "text-slate-800 hover:bg-slate-50 border border-transparent"
                              )
                            }
                            onClick={() => setSidebarOpen(false)}
                          >
                            <span>{it.label}</span>
                            {it.to === "/buyer/cart" ? (
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
                                ₹{totals.subtotal.toLocaleString()}
                              </span>
                            ) : null}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl border border-slate-200/70 bg-gradient-to-br from-amber-50 to-white p-4">
                  <div className="text-sm font-semibold text-slate-950">
                    Quick tip
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Switch roles above to preview Buyer/Seller/Admin dashboards.
                  </div>
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="min-w-0">
              <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <button
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        onClick={() => setTopMenuOpen((v) => !v)}
                      >
                        Menu
                      </button>
                      {topMenuOpen ? (
                        <div className="absolute left-0 mt-2 w-[320px] rounded-2xl border border-slate-200/70 bg-white backdrop-blur-xl shadow-2xl overflow-hidden">
                          <div className="p-3">
                            <button
                              className="w-full text-left rounded-xl px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-50"
                              onClick={() => {
                                setTopMenuOpen(false)
                                navigate("/dashboard")
                              }}
                            >
                              Dashboard
                            </button>
                          </div>
                          {navSections.map((section) => (
                            <div key={section.label} className="border-t border-slate-200/70">
                              <div className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                {section.label}
                              </div>
                              <div className="px-3 pb-3 grid grid-cols-2 gap-2">
                                {section.items.map((it) => (
                                  <NavLink
                                    key={it.to}
                                    to={it.to}
                                    className={({ isActive }) =>
                                      cx(
                                        "rounded-xl px-3 py-2 text-sm font-semibold transition border",
                                        isActive
                                          ? "bg-amber-100 text-slate-950 border-amber-200"
                                          : "bg-white text-slate-900 border-slate-200/70 hover:bg-slate-50"
                                      )
                                    }
                                    onClick={() => setTopMenuOpen(false)}
                                  >
                                    {it.label}
                                  </NavLink>
                                ))}
                              </div>
                            </div>
                          ))}
                          <div className="border-t border-slate-200/70 p-3 flex gap-2">
                            <button
                              className="flex-1 rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                setTopMenuOpen(false)
                                setSidebarOpen(true)
                              }}
                            >
                              Open sidebar
                            </button>
                            <button
                              className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 border border-rose-200"
                              onClick={() => {
                                setTopMenuOpen(false)
                                onLogout()
                              }}
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">
                        10–20 min delivery • Fresh picks
                      </div>
                      <div className="text-lg font-extrabold text-slate-950">
                        {user?.role === "seller"
                          ? "Seller Center"
                          : user?.role === "admin"
                            ? "Admin Console"
                            : "Buyer App"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate("/buyer/stores")}
                      className="hidden sm:inline-flex items-center justify-center rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      Browse
                    </button>
                    <button
                      onClick={() => navigate("/buyer/cart")}
                      className="inline-flex items-center justify-center rounded-xl bg-amber-300 px-4 py-2 text-sm font-extrabold text-slate-950 hover:bg-amber-200"
                    >
                      Cart • {totals.itemsCount}
                    </button>
                  </div>
                </div>
              </header>

              <div className="px-6 py-6">
                <Outlet />
              </div>

              <footer className="border-t border-slate-200/70 px-6 py-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-600">
                    FreshBasket — Team (@Navdeep @Divyansh @Neeraj)
                  </div>
                  <div className="text-sm text-slate-500">© 2026</div>
                </div>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}


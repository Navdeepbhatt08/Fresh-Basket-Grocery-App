import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useMemo, useState, useRef, useEffect } from "react"
import { useAuth } from "../state/auth"
import { useCart } from "../state/cart"
import { useClerk } from "@clerk/clerk-react"

import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
  CubeIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  HomeIcon,
  PuzzlePieceIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BuildingStorefrontIcon
} from "@heroicons/react/24/outline"

function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

const navSections = [
  {
    label: "buyer",
    items: [
      { to: "/buyer/stores", label: "Stores" },
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

const categories = [
  { label: "All", icon: ShoppingBagIcon },
  { label: "Home", icon: HomeIcon },
  { label: "Toys", icon: PuzzlePieceIcon },
  { label: "Electronics", icon: DeviceTabletIcon },
  { label: "Mobiles", icon: DevicePhoneMobileIcon },
  { label: "Fashion", icon: SparklesIcon }
]

export default function AppShell() {

  const { user, setRole } = useAuth()
  const { totals } = useCart()
  const navigate = useNavigate()
  const { signOut } = useClerk()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [profileOpen, setProfileOpen] = useState(false)

  const profileRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentNav = useMemo(() => {
    return navSections.find(
      (section) => section.label === (user?.role || "buyer")
    )
  }, [user?.role])

  const handleRoleChange = (role) => {
    setRole(role)
    setProfileOpen(false)

    if (role === "buyer") navigate("/buyer/stores")
    else if (role === "seller") navigate("/seller")
    else if (role === "admin") navigate("/admin")
  }

  const handleLogout = async () => {
    await signOut()
    navigate("/")
  }

  const onCart = () => navigate("/buyer/cart")

  const currentRole = user?.role || "buyer"

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-sky-50/40 to-lime-50">

      {/* HEADER */}

      <header className="sticky top-0 z-50 mx-2 md:mx-5 mt-2 md:mt-3 rounded-xl md:rounded-2xl border border-white/70 bg-white/50 backdrop-blur-xl shadow-sm">

        <div className="flex items-center justify-between px-3 md:px-6 py-3">

          {/* LEFT */}

          <div className="flex items-center gap-3">

            <button
              className="md:hidden p-2 rounded-lg border"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Bars3Icon className="w-5 h-5" />
            </button>

            <div className="text-xl font-bold">
              <span className="text-slate-800">Fresh</span>
              <span className="text-blue-600">Basket</span>
            </div>

          </div>

          {/* NAV */}

          <nav className="hidden md:flex items-center gap-1">

            {currentNav?.items.map((it) => (

              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cx(
                    "px-3 py-1.5 rounded-lg text-sm font-medium",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-500 hover:text-slate-800"
                  )
                }
              >
                {it.label}
              </NavLink>

            ))}

          </nav>

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            {/* CART */}

            <button
              onClick={onCart}
              className="relative flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <span className="hidden sm:inline">
                {totals.itemsCount}
              </span>
            </button>

            {/* PROFILE */}

            <div className="relative" ref={profileRef}>

              <img
                src={user?.imageUrl}
                alt="avatar"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-full border cursor-pointer"
              />

              {profileOpen && (

                <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-xl w-64">

                  {/* USER INFO */}

                  <div className="px-4 py-4 border-b">

                    <p className="text-sm font-semibold">
                      {user?.name || "User"}
                    </p>

                    <p className="text-xs text-slate-400">
                      {user?.email}
                    </p>

                  </div>

                  {/* LINKS */}

                  <div>

                    <button
                      onClick={() => navigate("/buyer/profile")}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50"
                    >
                      <UserIcon className="w-4 h-4" />
                      My Profile
                      <ChevronRightIcon className="w-4 h-4 ml-auto" />
                    </button>

                    <button
                      onClick={() => navigate("/buyer/orders")}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50"
                    >
                      <CubeIcon className="w-4 h-4" />
                      My Orders
                      <ChevronRightIcon className="w-4 h-4 ml-auto" />
                    </button>

                    <button
                      onClick={() => navigate("/buyer/cart")}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50"
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                      My Cart
                      <ChevronRightIcon className="w-4 h-4 ml-auto" />
                    </button>

                  </div>

                  {/* ROLE SWITCHER */}

                  <div className="px-4 py-3 border-t">

                    <p className="text-xs text-slate-400 mb-3">
                      Switch Role
                    </p>

                    <div className="space-y-2">

                      {/* BUYER */}

                      <button
                        onClick={() => handleRoleChange("buyer")}
                        className={cx(
                          "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm",
                          currentRole === "buyer"
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-slate-100"
                        )}
                      >
                        <UserIcon className="w-4 h-4" />
                        Buyer
                        <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          Shop
                        </span>
                      </button>

                      {/* SELLER */}

                      <button
                        onClick={() => handleRoleChange("seller")}
                        className={cx(
                          "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm",
                          currentRole === "seller"
                            ? "bg-green-100 text-green-700"
                            : "hover:bg-slate-100"
                        )}
                      >
                        <BuildingStorefrontIcon className="w-4 h-4" />
                        Seller
                        <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          Store
                        </span>
                      </button>

                      {/* ADMIN PANEL */}

                      <button
                        onClick={() => handleRoleChange("admin")}
                        className={cx(
                          "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm",
                          currentRole === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "hover:bg-slate-100"
                        )}
                      >
                        <ShieldCheckIcon className="w-4 h-4" />
                        Admin Panel
                        <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                          Control
                        </span>
                      </button>

                    </div>

                  </div>

                  {/* LOGOUT */}

                  <div className="px-4 py-3 border-t">

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4" />
                      Sign out
                    </button>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </header>

      {/* CATEGORY BAR */}

      <div className="sticky top-[72px] z-40 mx-2 md:mx-5 mt-1.5 bg-blue-50/50 backdrop-blur-xl rounded-xl shadow">

        <div className="px-3 md:px-5 py-2 overflow-x-auto">

          <div className="flex items-center gap-2 min-w-max">

            {categories.map((cat) => {

              const Icon = cat.icon

              return (

                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={cx(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium",
                    activeCategory === cat.label
                      ? "text-blue-700 bg-blue-100"
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >

                  <Icon className="w-4 h-4" />
                  {cat.label}

                </button>

              )

            })}

          </div>

        </div>

      </div>

      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>

      {/* FOOTER */}

      <footer className="mx-2 md:mx-5 mb-3 rounded-xl border border-blue-100 bg-white/90 backdrop-blur-xl">

        <div className="px-6 py-4 flex justify-between items-center text-sm">

          <span className="font-bold">
            <span className="text-slate-800">Fresh</span>
            <span className="text-blue-600">Basket</span>
          </span>

          <span className="text-slate-400">
            © 2026 FreshBasket
          </span>

        </div>

      </footer>

    </div>
  )
}
import { NavLink, Outlet, useNavigate, useSearchParams } from "react-router-dom"
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
  SparklesIcon,
  BuildingStorefrontIcon,
  BoltIcon,
  CakeIcon,
  GiftIcon,
  PuzzlePieceIcon
} from "@heroicons/react/24/outline"

function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

function getUserInitials(name) {
  if (!name) return "NB"
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("")
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
      { to: "/seller/shops", label: "Shops" },
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
  { label: "Vegetables", icon: BoltIcon },
  { label: "Fruits", icon: SparklesIcon },
  { label: "Dairy", icon: CakeIcon },
  { label: "Bakery", icon: GiftIcon },
  { label: "Gears", icon: PuzzlePieceIcon }
]

export default function AppShell() {
  const { user, logout } = useAuth()
  const clerk = useClerk()
  const { totals } = useCart()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [mobileOpen, setMobileOpen] = useState(false)
  const activeCategory = searchParams.get("category") || "All"

  const setCategory = (cat) => {
    if (cat === "All") {
      searchParams.delete("category")
    } else {
      searchParams.set("category", cat)
    }
    setSearchParams(searchParams)
  }

  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const [isBarVisible, setIsBarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY <= 0) {
        setIsBarVisible(true)
      } else if (currentScrollY < lastScrollY) {

        setIsBarVisible(false)
      } else {
        setIsBarVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

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

  const handleLogout = async () => {
    try {
      // 1. Clear local state first so UI updates immediately if possible
      logout()
      
      // 2. Sign out from Clerk and let it handle the redirect
      // This is more reliable in production as it ensures session is dead before landing on /login
      await clerk.signOut({ redirectUrl: '/login' })
    } catch (err) {
      console.error("Clerk signout failed", err)
      // Fallback: force a hard reload to /login if anything goes wrong
      window.location.href = "/login"
    }
  }

  const onCart = () => navigate("/buyer/cart")

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 via-sky-50/40 to-lime-50">
      {/* HEADER */}
      <header className="sticky top-0 z-50 mx-2 md:mx-5 mt-2 md:mt-3 rounded-xl md:rounded-2xl border border-white/70 bg-white/50 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-3 md:px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg border bg-white/80 text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Bars3Icon className="w-5 h-5" />
            </button>

            <div className="text-base md:text-xl font-bold">
              <span className="text-slate-800">Fresh</span>
              <span className="text-blue-600">Basket</span>
            </div>
          </div>

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

          <div className="flex items-center gap-3">
            {user?.role === "buyer" && (
              <button
                onClick={onCart}
                className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors shadow-sm"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                {totals.itemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in">
                    {totals.itemsCount}
                  </span>
                )}
              </button>
            )}

            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-100 text-sm font-bold text-slate-900 shadow-md hover:bg-blue-200 transition-all"
              >
                {getUserInitials(user?.name)}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-100 w-64 overflow-hidden">
                  <div className="px-4 py-4 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-900">{user?.name || "User"}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{user?.role} Account</p>
                    <p className="text-xs text-slate-500 truncate mt-1">{user?.email}</p>
                  </div>

                  <div className="py-2">
                    {user?.role === "buyer" && (
                      <>
                        <button onClick={() => { navigate("/buyer/profile"); setProfileOpen(false) }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                          <UserIcon className="w-4 h-4" /> My Profile
                        </button>
                        <button onClick={() => { navigate("/buyer/orders"); setProfileOpen(false) }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                          <CubeIcon className="w-4 h-4" /> My Orders
                        </button>
                      </>
                    )}
                    {user?.role === "seller" && (
                      <button onClick={() => { navigate("/seller/shops"); setProfileOpen(false) }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                        <BuildingStorefrontIcon className="w-4 h-4" /> My Shops
                      </button>
                    )}
                  </div>

                  <div className="px-3 py-3 border-t border-slate-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-600 text-sm font-bold hover:bg-rose-100 transition-colors"
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

        {mobileOpen && (
          <div className="md:hidden border-t px-4 py-2 flex flex-col gap-1 bg-white/50 backdrop-blur-md">
            {currentNav?.items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cx(
                    "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                {it.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* CATEGORY BAR (Only for buyers) */}
      {user?.role === "buyer" && (
        <div className={cx(
          "sticky top-[72px] z-40 mx-2 md:mx-5 mt-1.5 bg-white/40 backdrop-blur-xl rounded-xl shadow-sm border border-white/60 transition-all duration-300",
          isBarVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}>
          <div className="px-3 md:px-5 py-2 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 min-w-max">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.label}
                    onClick={() => setCategory(cat.label)}
                    className={cx(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200",
                      activeCategory === cat.label
                        ? "text-blue-700 bg-white shadow-sm scale-105"
                        : "text-slate-400 hover:text-slate-700"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>

      <footer className="mx-2 md:mx-5 mb-3 rounded-xl border border-blue-100 bg-white/90 backdrop-blur-xl">
        <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
          <div className="font-bold text-slate-900">
            <span className="text-slate-800">Fresh</span>
            <span className="text-blue-600">Basket</span>
          </div>
          <div className="flex items-center gap-6 text-slate-500 font-semibold">
            <NavLink to="/about" className="hover:text-blue-600 transition">About</NavLink>
            <NavLink to="/contact" className="hover:text-blue-600 transition">Contact</NavLink>
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 FreshBasket Team</div>
        </div>
      </footer>
    </div>
  )
}
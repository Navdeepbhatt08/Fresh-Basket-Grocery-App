import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useMemo, useState, useRef, useEffect } from "react"
import { useAuth } from "../state/auth"
import { useCart } from "../state/cart"
import Button from "../components/ui/Button"
import { useClerk } from "@clerk/clerk-react";

class TrieNode {
  constructor() {
    this.children = {}
    this.isEnd = false
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  insert(word) {
    let node = this.root
    for (let char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode()
      }
      node = node.children[char]
    }
    node.isEnd = true
  }

  searchPrefix(prefix) {
    let node = this.root
    for (let char of prefix.toLowerCase()) {
      if (!node.children[char]) return []
      node = node.children[char]
    }
    let results = []
    this._dfs(node, prefix.toLowerCase(), results)
    return results
  }

  _dfs(node, prefix, results) {
    if (node.isEnd) results.push(prefix)
    for (let char in node.children) {
      this._dfs(node.children[char], prefix + char, results)
    }
  }
}

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
  { label: "All", icon: "🛍️" },
  { label: "Cafe", icon: "☕" },
  { label: "Home", icon: "🪴" },
  { label: "Toys", icon: "🧸" },
  { label: "Fresh", icon: "🍓" },
  { label: "Electronics", icon: "🎧" },
  { label: "Mobiles", icon: "📱" },
  { label: "Beauty", icon: "💄" },
  { label: "Fashion", icon: "👔" },
]

const roleColors = {
  buyer: "bg-blue-100/80 text-blue-700 border border-blue-300/60",
  seller: "bg-blue-100/80 text-blue-700 border border-blue-300/60",
  admin: "bg-amber-100/80 text-amber-700 border border-amber-300/60",
}

const roleGlow = {
  buyer: "shadow-blue-300/40",
  seller: "shadow-blue-300/40",
  admin: "shadow-amber-300/40",
}

export default function AppShell() {
  const { user, setRole } = useAuth()
  const { totals } = useCart()
  const navigate = useNavigate()
  const { signOut } = useClerk()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
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

  const trie = useMemo(() => {
    const t = new Trie()
    const data = ["apple", "banana", "milk", "bread", "butter", "cheese"]
    data.forEach(item => t.insert(item))
    return t
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
    else navigate("/admin")
  }

  const handleSearch = (value) => {
    setQuery(value)
    if (!value) return setResults([])
    setResults(trie.searchPrefix(value))
  }

  const handleLogout = async () => {
    await signOut()
    navigate("/")
  }

  const onCart = () => navigate("/buyer/cart")

  const getInitials = () => {
    if (!user) return "U"
    const name = user.name || user.email || ""
    return name.slice(0, 2).toUpperCase()
  }

  const currentRole = user?.role || "buyer"

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-sky-50/40 to-lime-50 relative">

      {/* Soft decorative blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-lime-200/35 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full bg-blue-100/30 blur-3xl" />
      </div>

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 mx-2 md:mx-5 mt-2 md:mt-3 rounded-xl md:rounded-2xl border border-white/70 bg-white/50 backdrop-blur-2xl shadow-xl shadow-blue-100/50">
        <div className="flex items-center justify-between px-3 md:px-6 py-2.5 md:py-4">

          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="md:hidden p-2 rounded-lg border border-slate-200/70 bg-white/60 text-slate-500 hover:text-slate-800 hover:border-slate-300/70 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              ☰
            </button>
            <div>
              <div className="text-sm sm:text-sm md:text-xl font-bold leading-tight">
                <span className="text-slate-800">Fresh</span>
                <span className="text-blue-600">Basket</span>
              </div>
              <div className="hidden sm:block text-[10px] md:text-xs text-slate-400">
                Your daily store
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {currentNav?.items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cx(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-100/80 text-blue-700 border border-blue-300/60 backdrop-blur-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
                  )
                }
              >
                {it.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Search */}
            <div className="relative hidden md:block">
              <input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search..."
                className="px-3 py-1.5 rounded-lg border border-slate-200/70 bg-white/60 backdrop-blur-sm text-slate-700 placeholder-slate-400 text-sm w-40 focus:outline-none focus:border-blue-400/60 focus:bg-white/80 transition-all"
              />
              {results.length > 0 && (
                <div className="absolute top-10 w-48 bg-white/80 backdrop-blur-xl border border-white/70 rounded-xl shadow-xl shadow-blue-100/60 overflow-hidden">
                  {results.map((item, i) => (
                    <div
                      key={i}
                      className="px-3 py-2.5 text-sm text-slate-600 hover:bg-blue-50/80 hover:text-blue-800 cursor-pointer transition-colors"
                      onClick={() => { setQuery(item); setResults([]) }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={onCart}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100/80 border border-blue-300/60 text-blue-700 text-sm font-medium hover:bg-blue-200/70 hover:border-blue-400/60 backdrop-blur-sm transition-all duration-200"
            >
              🛒
              <span className="hidden sm:inline">{totals.itemsCount}</span>
              {totals.itemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center sm:hidden">
                  {totals.itemsCount}
                </span>
              )}
            </button>

            {/* Profile avatar */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={cx(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200",
                  "bg-gradient-to-br from-blue-400 to-teal-500 text-white shadow-lg",
                  profileOpen
                    ? "ring-2 ring-blue-400/60 scale-95"
                    : "hover:ring-2 hover:ring-blue-400/50 hover:scale-105",
                  roleGlow[currentRole]
                )}
              >
                {getInitials()}
              </button>

              {/* Profile dropdown */}
              {profileOpen && (
                <div
                  className="absolute right-0 mt-2.5 bg-white/70 backdrop-blur-2xl border border-white/70 rounded-2xl shadow-2xl shadow-blue-100/60 z-50 overflow-hidden"
                  style={{ width: "260px" }}
                >
                  {/* User info */}
                  <div className="px-4 py-4 bg-gradient-to-br from-blue-50/80 to-teal-50/60 border-b border-white/60">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 text-white flex items-center justify-center text-base font-bold shadow-lg shadow-blue-200/60">
                        {getInitials()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {user?.email || ""}
                        </p>
                        <span className={cx("inline-block mt-1.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize", roleColors[currentRole])}>
                          {currentRole}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Switch Role */}
                  <div className="px-4 py-3 border-b border-slate-100/70">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Switch Role</p>
                    <div className="flex gap-1.5">
                      {["buyer", "seller", "admin"].map((role) => (
                        <button
                          key={role}
                          onClick={() => handleRoleChange(role)}
                          className={cx(
                            "flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200",
                            currentRole === role
                              ? roleColors[role]
                              : "bg-slate-100/70 text-slate-500 hover:bg-slate-200/70 hover:text-slate-700 border border-slate-200/50"
                          )}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-1.5">
                    {[
                      { icon: "👤", label: "My Profile", path: "/buyer/profile" },
                      { icon: "📦", label: "My Orders", path: "/buyer/orders" },
                      { icon: "🛒", label: "My Cart", path: "/buyer/cart" },
                    ].map(({ icon, label, path }) => (
                      <button
                        key={path}
                        onClick={() => { navigate(path); setProfileOpen(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-500 hover:text-slate-900 hover:bg-blue-50/60 transition-all duration-150"
                      >
                        <span className="text-base w-5 text-center">{icon}</span>
                        {label}
                        <span className="ml-auto text-slate-300">›</span>
                      </button>
                    ))}
                  </div>

                  {/* Logout */}
                  <div className="px-4 py-3 border-t border-slate-100/70">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-50/80 border border-rose-200/60 text-rose-500 text-sm font-medium hover:bg-rose-100/80 hover:text-rose-600 hover:border-rose-300/60 backdrop-blur-sm transition-all duration-200"
                    >
                      <span>🚪</span> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden px-3 pb-4 border-t border-slate-100/60">
            <input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search..."
              className="w-full mt-3 px-3 py-2 rounded-lg border border-slate-200/70 bg-white/60 backdrop-blur-sm text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400/60 transition-all"
            />
            <div className="mt-3 flex flex-col gap-1">
              {currentNav?.items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-white/60 transition-colors"
                >
                  {it.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── CATEGORY BAR ── */}
      <div className="sticky top-[72px] z-40 mx-2 md:mx-5 mt-1.5">
          <p className=" text-sm pb-1 mx-5 mt-2">Categories</p>
        <div className="rounded-xl  px-3 md:px-5 py-2 overflow-x-auto">
     
          <div className="flex items-center gap-0.5 min-w-max">
            
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={cx(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  activeCategory === cat.label
                    ? "text-blue-700 bg-blue-100/80 border border-blue-300/60 shadow-sm shadow-blue-200/40 backdrop-blur-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/70"
                )}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                {cat.label}
                {activeCategory === cat.label && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <main className="flex-1 px-3 sm:px-4 md:px-6 py-4 md:py-6 relative z-10">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="mx-2 md:mx-5 mb-2 md:mb-3 rounded-xl border border-white/70 bg-white/50 backdrop-blur-xl shadow-lg shadow-blue-100/30">
        <div className="px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <h2 className="font-bold text-sm">
            <span className="text-slate-800">Fresh</span>
            <span className="text-blue-600">Basket</span>
          </h2>
          <div className="flex gap-5 text-xs">
            <NavLink to="/buyer/stores" className="text-slate-400 hover:text-blue-600 transition-colors">Stores</NavLink>
            <NavLink to="/buyer/profile" className="text-slate-400 hover:text-blue-600 transition-colors">Profile</NavLink>
            <span className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">Support</span>
          </div>
          <span className="text-xs text-slate-400 text-center sm:text-right">© 2026 FreshBasket</span>
        </div>
      </footer>
    </div>
  )
}
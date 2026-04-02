import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import { useAuth } from "../state/auth"
import { useCart } from "../state/cart"
import Button from "../components/ui/Button"

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
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

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
    if (role === "buyer") navigate("/buyer/stores")
    else if (role === "seller") navigate("/seller")
    else navigate("/admin")
  }

  const handleSearch = (value) => {
    setQuery(value)
    if (!value) return setResults([])
    setResults(trie.searchPrefix(value))
  }

  const onLogout = () => {
    logout()
    navigate("/login")
  }

  const onCart = () => {
  navigate("/buyer/cart")
}

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <header className="sticky top-0 z-50 mx-2 md:mx-5 mt-2 md:mt-3 rounded-xl md:rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-sm">

        <div className="flex items-center justify-between px-3 md:px-6 py-2.5 md:py-4">

          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="md:hidden p-2 rounded-lg border border-slate-300"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              ☰
            </button>
    
            <div>
              <div className="text-sm sm:text-sm md:text-xl font-bold text-slate-900 leading-tight">
                FreshBasket
              </div>
              <div className="hidden sm:block text-[10px] md:text-xs text-slate-500">
                Your daily store
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {currentNav?.items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cx(
                    "px-3 py-1.5 rounded-lg text-sm font-medium",
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

       
          <div className="flex items-center gap-2 md:gap-3">

            <div className="relative hidden md:block">
              <input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search..."
                className="px-3 py-1.5 rounded-lg border text-sm w-40"
              />
              {results.length > 0 && (
                <div className="absolute top-10 w-48 bg-white border rounded-lg shadow">
                  {results.map((item, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer"
                      onClick={() => {
                        setQuery(item)
                        setResults([])
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <select
              value={user?.role || "buyer"}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="hidden sm:block px-2 py-1.5 rounded-lg border text-sm"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>

            <Button onClick={onCart} className="px-2 py-1.5 text-sm">
              🛒 {totals.itemsCount}
            </Button>
            <button
              onClick={onLogout}
              className="text-red-500 text-sm px-2 py-1.5"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden text-sm  ">Logout</span>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-3 pb-4 border-t">

            {/* Search */}
            <input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search..."
              className="w-full mt-3 px-3 py-2 rounded-lg border"
            />

            {/* Links */}
            <div className="mt-3 flex flex-col gap-2">
              {currentNav?.items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm hover:bg-slate-100"
                >
                  {it.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 px-3 sm:px-4 md:px-6 py-4 md:py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className=" px-10 py-3 bg-white text-xs sm:text-sm text-slate-600 flex justify-between">
        <div>FreshBasket - Team </div>
        <div>© 2026</div>
      </footer>
    </div>
  )
}
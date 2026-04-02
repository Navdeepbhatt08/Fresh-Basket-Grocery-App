import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import { useAuth } from "../state/auth"
import { useCart } from "../state/cart"
import Button from "../components/ui/Button"
import { useEffect } from "react"

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


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

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
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

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
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-2 py-1.5 rounded-lg border text-sm"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-3 pb-4 border-t">
            <input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search..."
              className="w-full mt-3 px-3 py-2 rounded-lg border"
            />

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

      <footer className="   mx-2 md:mx-5 mb-2 md:mb-3 rounded-xl md:rounded-2xl border border-white/40 bg-black text-white backdrop-blur-xl shadow-sm">
        <div className="px-4 text-white md:px-8 py-6 md:py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm ">


          <div>
            <h2 className="text-lg font-bold text-white">FreshBasket</h2>
            <p className="mt-2 text-xs text-white-500">
              Your daily grocery partner. Fresh, fast, and reliable delivery at your doorstep.
            </p>

          </div>

          <div>
            <h3 className="font-semibold text-white-900 mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><NavLink to="/buyer/stores" className="hover:text-blue-600">Stores</NavLink></li>
              <li><NavLink to="/buyer/profile" className="hover:text-blue-600">Profile</NavLink></li>
            </ul>
          </div>


          <div>
            <h3 className="font-semibold text-white-900 mb-2">Support</h3>
            <ul className="space-y-1">
              <li className="hover:text-blue-600 cursor-pointer">Help Center</li>
              <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
            </ul>
          </div>


          <div>
            <h3 className="font-semibold text-white-900 mb-2">Stay Updated</h3>
            <p className="text-xs text-slate-500 mb-3">
              Get offers & updates directly in your inbox.
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none"
              />
              <button className="px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 md:px-8 py-3 flex flex-col sm:flex-row justify-between items-center text-xs text-white-500">
          <span>© 2026 FreshBasket. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">Made with ❤️ by Team FreshBasket</span>
        </div>
      </footer>
    </div>
  )
}
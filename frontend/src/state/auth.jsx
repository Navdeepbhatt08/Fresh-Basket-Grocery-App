import { createContext, useContext, useEffect, useMemo, useState } from "react"

const AuthContext = createContext(null)

const LS_USER = "fb_user"
const LS_TOKEN = "token"

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(LS_USER)
    const parsed = raw ? safeJsonParse(raw, null) : null
    return parsed || { name: "blue Bhatt", email: "blue@freshbasket.app", role: "buyer" }
  })

  useEffect(() => {
    localStorage.setItem(LS_USER, JSON.stringify(user))
  }, [user])

  const login = ({ name, email, role, token }) => {
    if (token) localStorage.setItem(LS_TOKEN, token)
    setUser({
      name: name || "Navdeep Bhatt",
      email: email || "Navdeep@freshbasket.app",
      role: role || "buyer"
    })
  }

  const logout = () => {
    localStorage.removeItem(LS_TOKEN)
    localStorage.removeItem(LS_USER)
    setUser({ name: "Navdeep Bhatt", email: "Navdeep@freshbasket.app", role: "buyer" })
  }

  const setRole = (role) => setUser((u) => ({ ...u, role }))

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      setRole
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}


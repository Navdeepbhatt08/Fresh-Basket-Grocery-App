import { createContext, useContext, useMemo, useReducer } from "react"

const CartContext = createContext(null)

function calcTotals(items) {
  const itemsCount = items.reduce((sum, it) => sum + it.qty, 0)
  const subtotal = items.reduce((sum, it) => sum + it.qty * it.price, 0)
  // Delivery charge: 30 if subtotal < 100 and items present, else 0
  const delivery = (subtotal > 0 && subtotal < 100) ? 30 : 0
  
  // Calculate GST (5% total - split into 2.5% CGST and 2.5% SGST)
  const cgst = Math.round(subtotal * 0.025)
  const sgst = Math.round(subtotal * 0.025)
  
  const total = subtotal + delivery + cgst + sgst
  
  return { itemsCount, subtotal, delivery, cgst, sgst, total }
}

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((x) => x.id === action.item.id)
      const items = existing
        ? state.items.map((x) =>
          x.id === action.item.id ? { ...x, qty: x.qty + 1 } : x
        )
        : [...state.items, { ...action.item, qty: 1 }]
      return { ...state, items }
    }
    case "remove": {
      const items = state.items.filter((x) => x.id !== action.id)
      return { ...state, items }
    }
    case "qty": {
      const items = state.items
        .map((x) =>
          x.id === action.id ? { ...x, qty: Math.max(1, action.qty) } : x
        )
        .filter((x) => x.qty > 0)
      return { ...state, items }
    }
    case "clear":
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const totals = useMemo(() => calcTotals(state.items), [state.items])

  const api = useMemo(
    () => ({
      items: state.items,
      totals,
      addToCart: (item) => dispatch({ type: "add", item }),
      removeFromCart: (id) => dispatch({ type: "remove", id }),
      setQty: (id, qty) => dispatch({ type: "qty", id, qty }),
      clearCart: () => dispatch({ type: "clear" })
    }),
    [state.items, totals]
  )

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}


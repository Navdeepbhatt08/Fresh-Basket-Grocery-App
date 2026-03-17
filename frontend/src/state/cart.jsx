/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useReducer } from "react"

const CartContext = createContext(null)

function calcTotals(items) {
  const itemsCount = items.reduce((sum, it) => sum + it.qty, 0)
  const subtotal = items.reduce((sum, it) => sum + it.qty * it.price, 0)
  const delivery = subtotal === 0 ? 0 : subtotal >= 599 ? 0 : 39
  const taxes = Math.round(subtotal * 0.02)
  const total = subtotal + delivery + taxes
  return { itemsCount, subtotal, delivery, taxes, total }
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


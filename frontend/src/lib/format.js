export function moneyINR(amount) {
  const value = Number(amount || 0)
  return `₹${value.toLocaleString("en-IN")}`
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}


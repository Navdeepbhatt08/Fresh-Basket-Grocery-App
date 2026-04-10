function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-in-out rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400 shadow-md",

    subtle:
      "bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 focus:ring-slate-300",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400 shadow-md",

    ghost:
      "text-slate-700 hover:bg-slate-100 focus:ring-slate-300"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }

  return (
    <button
      className={cx(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    />
  )
}
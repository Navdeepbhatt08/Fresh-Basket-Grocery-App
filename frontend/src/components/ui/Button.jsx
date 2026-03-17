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
    "inline-flex items-center justify-center font-semibold transition select-none active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none"

  const variants = {
    primary:
      "rounded-2xl bg-amber-300 text-slate-950 hover:bg-amber-200 shadow-lg shadow-amber-400/30",
    subtle:
      "rounded-2xl border border-slate-200/70 bg-white text-slate-900 hover:bg-slate-50",
    danger:
      "rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
    ghost: "rounded-2xl text-slate-700 hover:bg-slate-100"
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base"
  }

  return (
    <button
      className={cx(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    />
  )
}


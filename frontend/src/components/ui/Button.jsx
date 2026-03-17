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
      "rounded-2xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20",
    subtle:
      "rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10",
    danger:
      "rounded-2xl border border-rose-400/20 bg-rose-500/15 text-rose-100 hover:bg-rose-500/20",
    ghost: "rounded-2xl text-slate-200 hover:bg-white/10"
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


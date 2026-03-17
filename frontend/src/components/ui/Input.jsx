function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={cx(
        "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500",
        "focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/40",
        className
      )}
      {...props}
    />
  )
}


function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={cx(
        "w-full rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400",
        "focus:outline-none focus:ring-2 focus:ring-amber-300/50 focus:border-amber-300",
        className
      )}
      {...props}
    />
  )
}


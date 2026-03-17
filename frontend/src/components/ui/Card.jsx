export default function Card({ className = "", children }) {
  return (
    <div
      className={[
        "rounded-3xl border border-slate-200/70 bg-white",
        "shadow-[0_18px_50px_-35px_rgba(2,6,23,0.25)]",
        className
      ].join(" ")}
    >
      {children}
    </div>
  )
}


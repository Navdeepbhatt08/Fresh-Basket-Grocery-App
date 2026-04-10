export default function Card({ className = "", children }) {
  return (
    <div
      className={[
        "rounded-3xl border border-slate-200/70 bg-white",
        "shadow-[0_18px_50px_-35px_rgba(2,6,23,0.25)]",
        "transform-gpu transition duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-xl",
        className
      ].join(" ")}
    >
      {children}
    </div>
  )
}


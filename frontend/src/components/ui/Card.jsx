export default function Card({ className = "", children }) {
  return (
    <div
      className={[
        "rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl",
        "shadow-[0_18px_60px_-30px_rgba(0,0,0,0.9)]",
        className
      ].join(" ")}
    >
      {children}
    </div>
  )
}


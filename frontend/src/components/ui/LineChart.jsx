function extent(values) {
  let min = Infinity
  let max = -Infinity
  for (const v of values) {
    if (v < min) min = v
    if (v > max) max = v
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return { min: 0, max: 1 }
  if (min === max) return { min: min - 1, max: max + 1 }
  return { min, max }
}

function toPoints(values, width, height, padding) {
  const { min, max } = extent(values)
  const w = Math.max(1, width - padding * 2)
  const h = Math.max(1, height - padding * 2)
  const last = Math.max(1, values.length - 1)

  return values.map((v, i) => {
    const x = padding + (w * i) / last
    const t = (v - min) / (max - min)
    const y = padding + (1 - t) * h
    return { x, y }
  })
}

export default function LineChart({
  values,
  height = 180,
  stroke = "#16a34a",
  fill = "rgba(34,197,94,0.10)"
}) {
  const width = 640
  const padding = 14
  const pts = toPoints(values, width, height, padding)

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ")
  const area = `${padding},${height - padding} ${polyline} ${width - padding},${height - padding}`

  return (
    <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white p-3">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-[180px]"
        role="img"
        aria-label="Trend line chart"
      >
        <defs>
          <linearGradient id="fbLineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} />
            <stop offset="100%" stopColor="rgba(34,197,94,0)" />
          </linearGradient>
        </defs>

        {/* grid */}
        {[0.2, 0.4, 0.6, 0.8].map((t) => (
          <line
            key={t}
            x1={padding}
            x2={width - padding}
            y1={padding + (height - padding * 2) * t}
            y2={padding + (height - padding * 2) * t}
            stroke="rgba(15,23,42,0.08)"
            strokeWidth="1"
          />
        ))}

        <polygon points={area} fill="url(#fbLineFill)" />
        <polyline
          points={polyline}
          fill="none"
          stroke={stroke}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {pts.map((p, idx) => (
          <circle
            key={idx}
            cx={p.x}
            cy={p.y}
            r="5"
            fill="#fff"
            stroke={stroke}
            strokeWidth="3"
          />
        ))}
      </svg>
    </div>
  )
}


import { jsPDF } from "jspdf"

function nowStamp() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  const hh = String(d.getHours()).padStart(2, "0")
  const mi = String(d.getMinutes()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}_${hh}-${mi}`
}

function stats(values) {
  const nums = values.map((v) => Number(v)).filter((v) => Number.isFinite(v))
  if (!nums.length) return { min: 0, max: 0, avg: 0 }
  const min = Math.min(...nums)
  const max = Math.max(...nums)
  const avg = Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10
  return { min, max, avg }
}

function drawKeyValueRows(doc, x, y, rows, opts = {}) {
  const lineH = opts.lineH ?? 7
  const keyW = opts.keyW ?? 62
  const valW = opts.valW ?? 110
  const maxLines = opts.maxLines ?? 200
  let lines = 0

  for (const [k, v] of rows) {
    if (lines >= maxLines) break
    doc.setTextColor(30, 41, 59)
    doc.setFont("helvetica", "bold")
    doc.text(String(k), x, y)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(15, 23, 42)
    doc.text(String(v), x + keyW, y, { maxWidth: valW })
    y += lineH
    lines += 1
  }
  return y
}

export function downloadReportsPdf({ title, ordersSeries, kpis }) {
  const doc = new jsPDF({ unit: "pt", format: "a4" })

  const pageW = doc.internal.pageSize.getWidth()
  const margin = 44
  let y = 56

  // Header
  doc.setFillColor(250, 204, 21) // amber
  doc.roundedRect(margin, 32, pageW - margin * 2, 44, 12, 12, "F")
  doc.setTextColor(15, 23, 42)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(16)
  doc.text(title || "Reports", margin + 14, 60)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(71, 85, 105)
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin + 14, 74)

  y = 104

  // KPI block
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.setTextColor(15, 23, 42)
  doc.text("KPIs", margin, y)
  y += 14

  y = drawKeyValueRows(doc, margin, y, kpis, { keyW: 120, valW: pageW - margin * 2 - 120 })
  y += 10

  // Orders series block
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.setTextColor(15, 23, 42)
  doc.text("Orders vs time (series)", margin, y)
  y += 14

  const s = stats(ordersSeries)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(71, 85, 105)
  doc.text(`Count: ${ordersSeries.length} • Min: ${s.min} • Avg: ${s.avg} • Max: ${s.max}`, margin, y)
  y += 14

  doc.setTextColor(15, 23, 42)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(String(ordersSeries.join(", ")), margin, y, { maxWidth: pageW - margin * 2 })
  y += 24

  // Footer
  doc.setDrawColor(226, 232, 240)
  doc.line(margin, doc.internal.pageSize.getHeight() - 72, pageW - margin, doc.internal.pageSize.getHeight() - 72)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(100, 116, 139)
  doc.text("FreshBasket • Blinkit-style grocery UI • Frontend demo export", margin, doc.internal.pageSize.getHeight() - 52)

  doc.save(`freshbasket_reports_${nowStamp()}.pdf`)
}


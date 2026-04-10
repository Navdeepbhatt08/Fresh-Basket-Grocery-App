import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { useCart } from "../../state/cart"
import { moneyINR } from "../../lib/format"

export default function BuyerCheckout() {
  const navigate = useNavigate()
  const { items, totals, clearCart } = useCart()

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "Navdeep Bhatt",
    phone: "9999999999",
    address: "Lane no. 6, Rishikesh",
    payment: "upi"
  })

  const canPlace = useMemo(() => {
    return items.length > 0 && !loading
  }, [items.length, loading])

  const placeOrder = async () => {
    setLoading(true)

    try {
      await new Promise((r) => setTimeout(r, 800))
      clearCart()
      
      navigate("/buyer/track-order", { replace: true })

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

      {/* //checkout form */}
      <Card className="p-6 lg:col-span-2">

        <div className="text-sm text-slate-600">Buyer</div>

        <h1 className="mt-1 text-2xl font-extrabold text-slate-950 tracking-tight">
          Checkout
        </h1>

        <p className="mt-2 text-slate-700">
          Enter delivery details and place order.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Field label="Full name">
            <Input
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="Your name"
            />
          </Field>

          <Field label="Phone">
            <Input
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              placeholder="10-digit phone"
            />
          </Field>

          <Field label="Address" className="sm:col-span-2">
            <Input
              value={form.address}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
              placeholder="House no, street, city"
            />
          </Field>

          <Field label="Payment method" className="sm:col-span-2">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

              <PayOpt
                active={form.payment === "cod"}
                title="Cash on delivery"
                desc="Pay at doorstep"
                logos={[
                  { label: "₹ Cash", bg: "bg-emerald-600", text: "text-white" }
                ]}
                onClick={() =>
                  setForm((f) => ({ ...f, payment: "cod" }))
                }
              />

              <PayOpt
                active={form.payment === "upi"}
                title="UPI"
                desc="Fast & secure"
                logos={[
                  { label: "UPI", bg: "bg-slate-900", text: "text-white" },
                  { label: "GPay", bg: "bg-white", text: "text-slate-900", ring: true },
                  { label: "PhonePe", bg: "bg-[#5f259f]", text: "text-white" },
                  { label: "Paytm", bg: "bg-[#00baf2]", text: "text-white" }
                ]}
                onClick={() =>
                  setForm((f) => ({ ...f, payment: "upi" }))
                }
              />

            </div>
          </Field>

        </div>

        <div className="mt-8 flex flex-wrap gap-2">

          <Button
            variant="subtle"
            onClick={() => navigate("/buyer/cart")}
          >
            Back to cart
          </Button>

          <Button
            disabled={!canPlace}
            onClick={placeOrder}
          >
            {loading ? "Placing…" : "Place order"}
          </Button>

        </div>

      </Card>

      {/* Order Summary */}
      <Card className="p-6">

        <div className="text-sm font-extrabold text-slate-950">
          Order summary
        </div>

        <div className="mt-4 space-y-2">

          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center justify-between text-sm"
            >

              <div className="text-slate-700">
                {it.name}
                <span className="text-slate-500"> × {it.qty}</span>
              </div>

              <div className="text-slate-950 font-extrabold">
                {moneyINR(it.price * it.qty)}
              </div>

            </div>
          ))}

        </div>

        <div className="my-4 h-px bg-white/10" />

        <div className="space-y-2 text-sm">

          <Row label="Subtotal" value={moneyINR(totals.subtotal)} />
          <Row label="Delivery" value={moneyINR(totals.delivery)} />
          <Row label="Taxes" value={moneyINR(totals.taxes)} />
          <Row label="Total" value={moneyINR(totals.total)} strong />

        </div>

      </Card>

    </div>
  )
}

function Field({ label, className = "", children }) {
  return (
    <div className={className}>
      <div className="mb-2 text-sm font-semibold text-slate-800">
        {label}
      </div>
      {children}
    </div>
  )
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between">

      <div className={strong
        ? "text-slate-800 font-semibold"
        : "text-slate-600"}
      >
        {label}
      </div>

      <div className={strong
        ? "text-slate-950 font-extrabold"
        : "text-slate-800"}
      >
        {value}
      </div>

    </div>
  )
}

function PayOpt({ active, title, desc, logos = [], onClick }) {

  return (
    <button
      onClick={onClick}
      type="button"
      className={[
        "rounded-2xl border p-4 text-left transition",
        active
          ? "border-emerald-400/30 bg-emerald-500/10"
          : "border-slate-200/70 bg-white hover:bg-slate-50"
      ].join(" ")}
    >

      <div className="flex items-start justify-between gap-3">

        <div>
          <div className="text-sm font-extrabold text-slate-950">
            {title}
          </div>

          <div className="mt-1 text-sm text-slate-600">
            {desc}
          </div>
        </div>

        {logos.length ? (
          <div className="flex flex-wrap items-center justify-end gap-2">

            {logos.map((l) => (
              <span
                key={l.label}
                className={[
                  "inline-flex items-center justify-center rounded-xl px-2.5 py-1 text-[11px] font-extrabold",
                  l.ring ? "ring-1 ring-slate-200" : "",
                  l.bg,
                  l.text
                ].join(" ")}
              >
                {l.label}
              </span>
            ))}

          </div>
        ) : null}

      </div>

    </button>
  )
}
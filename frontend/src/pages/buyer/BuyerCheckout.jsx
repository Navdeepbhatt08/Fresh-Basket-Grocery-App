import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { useCart } from "../../state/cart"
import { useAuth } from "../../state/auth"
import { moneyINR } from "../../lib/format"
import axios from "axios"

export default function BuyerCheckout() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, totals, clearCart } = useCart()

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    payment: "upi"
  })

  const [savedAddresses, setSavedAddresses] = useState([])
  const [loadingAddresses, setLoadingAddresses] = useState(false)

  useMemo(() => {
    if (user?.email) {
      const fetchAddresses = async () => {
        setLoadingAddresses(true)
        try {
          const res = await axios.get(`http://localhost:5000/api/addresses/${user.email}`)
          setSavedAddresses(res.data)
        } catch (error) {
          console.error("Error fetching addresses:", error)
        } finally {
          setLoadingAddresses(false)
        }
      }
      fetchAddresses()
    }
  }, [user?.email])

  const canPlace = useMemo(() => {
    return items.length > 0 && !loading
  }, [items.length, loading])

  const placeOrder = async () => {
    if (!canPlace) return
    setLoading(true)

    try {
      const buyerId = user?.id || "6449f8a3c8e4a5a123456789"
      // Assume all items from same seller for now, or pick the first one's seller
      const sellerId = items[0]?.seller || "6449f8a3c8e4a5a123456789"

      const payload = {
        buyer: buyerId,
        seller: sellerId,
        items: items.map(it => ({
          product: it.id,
          name: it.name,
          price: it.price,
          qty: it.qty
        })),
        total: totals.total,
        subtotal: totals.subtotal,
        deliveryCharge: totals.delivery,
        cgst: totals.cgst,
        sgst: totals.sgst,
        deliveryDetails: {
          name: form.name,
          phone: form.phone,
          address: form.address
        },
        paymentMethod: form.payment
      }

      await axios.post("http://localhost:5000/api/orders", payload)
      
      clearCart()
      
      toast.success(
        <div className="flex flex-col gap-1 px-10 py-5 m-5">
          <span className="font-bold">Order Placed!</span>
          <button 
            onClick={() => navigate("/buyer/track-order")}
            className="text-emerald-600 text-sm font-extrabold hover:underline text-left"
          >
            Track Order 
          </button>
        </div>,
        {
          position: "bottom-right",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      )


      setTimeout(() => {
        navigate("/buyer/orders")
      }, 2000)

    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.")
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

            {savedAddresses.length > 0 && (
              <div className="mt-3">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Select Saved Address
                </div>
                <div className="flex flex-wrap gap-2">
                  {savedAddresses.map((addr) => (
                    <button
                      key={addr._id}
                      type="button"
                      onClick={() => setForm(f => ({ 
                        ...f, 
                        address: addr.fullAddress,
                        name: addr.name || f.name,
                        phone: addr.phone || f.phone
                      }))}
                      className={[
                        "text-xs px-3 py-2 rounded-xl border transition-all text-left max-w-[200px]",
                        form.address === addr.fullAddress
                          ? "border-emerald-400 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400/20"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      ].join(" ")}
                    >
                      <div className="font-bold truncate">{addr.type}</div>
                      <div className="mt-0.5 line-clamp-1 opacity-70">{addr.fullAddress}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
          <Row label="CGST (2.5%)" value={moneyINR(totals.cgst)} />
          <Row label="SGST (2.5%)" value={moneyINR(totals.sgst)} />
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
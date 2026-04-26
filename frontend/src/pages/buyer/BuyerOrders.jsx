import { useEffect, useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../state/auth"
import { moneyINR } from "../../lib/format"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Receipt, 
  Clock, 
  MapPin, 
  Phone,
  Printer,
  ChevronRight,
  Download
} from "lucide-react"
import axios from "axios"

export default function BuyerOrders() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewDetails, setViewDetails] = useState(null)
  const [viewInvoice, setViewInvoice] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    try {
      const buyerId = user?.id || "6449f8a3c8e4a5a123456789"
      const res = await axios.get(`http://localhost:5000/api/orders/buyer/${buyerId}`)
      setOrders(res.data)
    } catch (error) {
      console.error("Error fetching buyer orders:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-blue-600 mb-1">Buyer Account</div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order History</h1>
          <p className="mt-1 text-slate-500 font-medium">Track your deliveries and view past purchases.</p>
        </div>
        <Button 
          variant="subtle" 
          onClick={() => navigate("/buyer/stores")}
          className="rounded-xl shadow-lg shadow-blue-100 border-blue-200"
        >
          Explore More Stores
        </Button>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 font-bold animate-pulse">Syncing your orders...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {orders.map((o) => (
            <Card key={o._id} className="p-0 overflow-hidden hover:shadow-2xl transition-all duration-300 border-slate-100">
              <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm">
                    <Package size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">{o.orderId}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(o.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </div>
                  </div>
                </div>
                <Status status={o.status} />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">From Store</div>
                    <div className="text-base font-bold text-slate-800">{o.seller?.name || "Premium Store"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Amount</div>
                    <div className="text-xl font-black text-blue-600">{moneyINR(o.total)}</div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {o.items?.slice(0, 2).map((it, idx) => (
                    <div key={idx} className="flex justify-between text-sm font-bold text-slate-600">
                      <span className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        {it.name}
                      </span>
                      <span>× {it.qty}</span>
                    </div>
                  ))}
                  {o.items?.length > 2 && (
                    <div className="text-xs font-bold text-blue-500 mt-2">
                      + {o.items.length - 2} more items
                    </div>
                  )}
                </div>

                <div className="flex gap-3 border-t border-slate-100 pt-5 mt-auto">
                  <button 
                    onClick={() => setViewDetails(o)}
                    className="flex-1 rounded-xl bg-slate-900 text-white py-2.5 text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <ChevronRight size={14} />
                    View Details
                  </button>
                  <button 
                    onClick={() => setViewInvoice(o)}
                    className="flex-1 rounded-xl bg-white border border-slate-200 text-slate-700 py-2.5 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Receipt size={14} />
                    Invoice
                  </button>
                </div>
              </div>
            </Card>
          ))}

          {orders.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <div className="h-20 w-20 bg-slate-50 border border-dashed border-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Package size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No orders yet</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">Looks like you haven't placed any orders. Start shopping at your local stores!</p>
              <Button 
                onClick={() => navigate("/buyer/stores")}
                className="mt-8"
              >
                Start Shopping
              </Button>
            </div>
          )}
        </div>
      )}

      {/* DETAIL MODAL */}
      {viewDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setViewDetails(null)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-xl font-black text-slate-900">Order Details</h2>
                <p className="text-xs font-bold text-slate-400 mt-1">{viewDetails.orderId}</p>
              </div>
              <button onClick={() => setViewDetails(null)} className="h-10 w-10 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400">
                <XCircle size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Order Status Stepper */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100" />
                <div className="space-y-8">
                  <Step active={true} icon={Clock} label="Order Placed" date={new Date(viewDetails.createdAt).toLocaleString()} />
                  <Step active={viewDetails.status !== "Preparing"} icon={Truck} label="Out for Delivery" />
                  <Step active={viewDetails.status === "Delivered"} icon={CheckCircle} label="Delivered" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-3">
                    <MapPin size={12} /> Shipping To
                  </div>
                  <p className="text-sm font-bold text-slate-900">{viewDetails.deliveryDetails?.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{viewDetails.deliveryDetails?.address}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mt-3">
                    <Phone size={12} /> {viewDetails.deliveryDetails?.phone}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                   <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-3">
                    <Package size={12} /> Items Summary
                  </div>
                  <div className="space-y-2">
                    {viewDetails.items?.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-xs font-bold">
                        <span className="text-slate-600">{it.name} × {it.qty}</span>
                        <span className="text-slate-900">{moneyINR(it.price * it.qty)}</span>
                      </div>
                    ))}
                    <div className="border-t border-slate-200 pt-2 space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Subtotal</span>
                        <span>{moneyINR(viewDetails.subtotal || viewDetails.total)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Delivery</span>
                        <span>{moneyINR(viewDetails.deliveryCharge || 0)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>GST (CGST + SGST)</span>
                        <span>{moneyINR((viewDetails.cgst || 0) + (viewDetails.sgst || 0))}</span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-blue-600 pt-1">
                        <span>Total</span>
                        <span>{moneyINR(viewDetails.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex gap-3">
               <Button className="flex-1" onClick={() => setViewDetails(null)}>Close View</Button>
            </div>
          </div>
        </div>
      )}

      {/* INVOICE MODAL */}
      {viewInvoice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={() => setViewInvoice(null)} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-8 bg-slate-900 text-white flex justify-between items-start">
              <div>
                <div className="text-xl font-black italic tracking-tighter">FreshBasket</div>
                <div className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Official Invoice</div>
                <div className="text-2xl font-black mt-1">{viewInvoice.orderId}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date</div>
                <div className="text-sm font-bold">{new Date(viewInvoice.createdAt).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
              <div className="flex justify-between mb-8">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Billed To</div>
                  <div className="text-sm font-bold text-slate-900">{viewInvoice.deliveryDetails?.name}</div>
                  <div className="text-xs text-slate-500 max-w-[200px] mt-1">{viewInvoice.deliveryDetails?.address}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Sold By</div>
                  <div className="text-sm font-bold text-slate-900">{viewInvoice.seller?.name || "FreshBasket Partner"}</div>
                </div>
              </div>

              <table className="w-full text-left">
                <thead className="border-b-2 border-slate-100">
                  <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <th className="py-3">Item</th>
                    <th className="py-3 text-center">Qty</th>
                    <th className="py-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {viewInvoice.items?.map((it, idx) => (
                    <tr key={idx} className="text-sm font-bold">
                      <td className="py-4 text-slate-800">{it.name}</td>
                      <td className="py-4 text-center text-slate-500">{it.qty}</td>
                      <td className="py-4 text-right text-slate-900">{moneyINR(it.price * it.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 border-t-2 border-slate-100 pt-6 space-y-2">
                <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>Subtotal</span>
                  <span>{moneyINR(viewInvoice.subtotal || viewInvoice.total)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>Delivery Fee</span>
                  <span>{moneyINR(viewInvoice.deliveryCharge || 0)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>CGST (2.5%)</span>
                  <span>{moneyINR(viewInvoice.cgst || 0)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>SGST (2.5%)</span>
                  <span>{moneyINR(viewInvoice.sgst || 0)}</span>
                </div>
                <div className="flex justify-between text-xl font-black text-slate-900 pt-2">
                  <span>Total</span>
                  <span>{moneyINR(viewInvoice.total)}</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button 
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white py-3 text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                onClick={() => window.print()}
              >
                <Printer size={16} /> Print Invoice
              </button>
              <button 
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
                onClick={() => setViewInvoice(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Status({ status }) {
  const isCancelled = status === "Cancelled"
  const isDelivered = status === "Delivered"
  const isPending = !isCancelled && !isDelivered

  const cls = isDelivered
      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
      : isCancelled
        ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
        : "bg-amber-500/10 text-amber-600 border-amber-500/20"

  const Icon = isDelivered ? CheckCircle : isCancelled ? XCircle : Clock

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${cls}`}>
      <Icon size={12} />
      {status}
    </span>
  )
}

function Step({ active, icon: Icon, label, date }) {
  return (
    <div className="relative flex items-start gap-6">
      <div className={`h-12 w-12 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 z-10 transition-colors ${active ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-slate-100 text-slate-300'}`}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className={`text-sm font-black ${active ? 'text-slate-900' : 'text-slate-400'}`}>{label}</h4>
        {date && <p className="text-xs font-bold text-blue-500 mt-0.5">{date}</p>}
        {!date && <p className="text-xs font-bold text-slate-300 mt-0.5">{active ? 'Completed' : 'Pending'}</p>}
      </div>
    </div>
  )
}

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { moneyINR } from "../../lib/format"
import { useCart } from "../../state/cart"
import { ShoppingBasket } from "lucide-react";
import axios from "axios"

export default function BuyerProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      // We can fetch the product directly, it should have the store populated if we updated the backend
      // Or we can fetch and then fetch store
      const res = await axios.get(`http://localhost:5000/api/products`)
      const found = res.data.find(p => p._id === productId)
      setProduct(found)
    } catch (error) {
      console.error("Error fetching product detail:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500 animate-pulse">Loading product details...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <Card className="p-6">
        <div className="text-slate-950 font-extrabold">Product not found</div>
        <div className="mt-3">
          <Link
            className="text-blue-700 hover:text-blue-800 font-semibold"
            to="/buyer/stores"
          >
            Back to stores
          </Link>
        </div>
      </Card>
    )
  }

  const store = product.store

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-slate-600">Product</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            {product.name}
          </h1>
          <p className="mt-2 text-slate-700">
            Category: {product.category} • Unit: {product.unit}
          </p>
          {store ? (
            <p className="mt-2 text-slate-600 text-sm">
              Sold by{" "}
              <Link
                to={`/buyer/stores/${store._id}`}
                className="text-blue-700 hover:text-blue-800 font-semibold"
              >
                {store.name}
              </Link>
            </p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button variant="subtle" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button onClick={() => navigate("/buyer/cart")}>Cart</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2 space-y-6">
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50">
            <img 
              src={product.image || "https://via.placeholder.com/800x600?text=Product+Image"} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-slate-600">Details</div>
              <div className="mt-2 text-slate-950 font-extrabold">
                {product.description || "Fresh, carefully packed, and delivered fast."}
              </div>
            </div>
            <div className="h-14 w-14 rounded-2xl border border-slate-200/70 bg-gradient-to-br from-blue-500/15 to-sky-400/10 flex items-center justify-center">
              <ShoppingBasket size={28} className="text-blue-600" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Stock", value: `${product.stock} ${product.unit}` },
              { label: "Delivery", value: "12–30m" },
              { label: "Returns", value: "Easy" },
              { label: "Quality", value: "Verified" }
            ].map((it) => (
              <div
                key={it.label}
                className="rounded-2xl border border-slate-200/70 bg-white p-4"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {it.label}
                </div>
                <div className="mt-2 text-lg font-extrabold text-slate-950">{it.value}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-slate-600">Price</div>
          <div className="mt-2 text-3xl font-extrabold text-slate-950">
            {moneyINR(product.price)}
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Free delivery above ₹199 
          </div>

          <div className="mt-6 space-y-2">
            <Button
              disabled={product.stock === 0}
              onClick={() =>
                addToCart({ 
                  id: product._id, 
                  name: product.name, 
                  price: product.price,
                  seller: product.seller?._id || product.seller,
                  store: product.store?._id || product.store
                })
              }
              className="w-full"
            >
              Add to cart
            </Button>
            <Button
              variant="subtle"
              className="w-full"
              onClick={() => navigate("/buyer/checkout")}
            >
              Buy now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

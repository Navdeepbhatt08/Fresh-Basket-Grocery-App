import { Link, useNavigate, useParams } from "react-router-dom"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { products, stores } from "../../lib/storeData"
import { moneyINR } from "../../lib/format"
import { useCart } from "../../state/cart"

export default function BuyerProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = products.find((p) => p.id === productId)
  const store = product ? stores.find((s) => s.id === product.storeId) : null

  if (!product) {
    return (
      <Card className="p-6">
        <div className="text-slate-950 font-extrabold">Product not found</div>
        <div className="mt-3">
          <Link
            className="text-emerald-700 hover:text-emerald-800 font-semibold"
            to="/buyer/stores"
          >
            Back to stores
          </Link>
        </div>
      </Card>
    )
  }

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
                to={`/buyer/stores/${store.id}`}
                className="text-emerald-700 hover:text-emerald-800 font-semibold"
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
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-slate-600">Details</div>
              <div className="mt-2 text-slate-950 font-extrabold">
                Fresh, carefully packed, and delivered fast.
              </div>
              <div className="mt-2 text-slate-700">
                This is a frontend demo card. Replace with real product description, images,
                nutrition info, and reviews from your API.
              </div>
            </div>
            <div className="h-14 w-14 rounded-2xl border border-slate-200/70 bg-gradient-to-br from-emerald-500/15 to-lime-400/10 flex items-center justify-center text-2xl">
              🧺
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Stock", value: product.stock },
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
            Free delivery above ₹599 (demo rule).
          </div>

          <div className="mt-6 space-y-2">
            <Button
              disabled={product.stock === 0}
              onClick={() =>
                addToCart({ id: product.id, name: product.name, price: product.price })
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


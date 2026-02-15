import { useEffect, useState } from "react"
import API from "../api/axios"

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-brfrom-slate-900 via-slate-800 to-slate-900 p-10 flex justify-center">
      <h2 className=" text-3xl text-white font-bold">All Products</h2>
      <br />
      {products.map(p => (
        <div
          key={p.id}
          className="
   gap-4 h-110  p-3    group relative rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <img
            src={`https://picsum.photos/400/300?randomfood=${p.id}`}
            alt="product"
            className=" rounded-2xl w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
          />

          <h2 className="text-xl font-bold mb-3 text-white">{p.name}</h2>
          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
            ₹{p.price}
          </span>
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
            Stock: {p.stock}

          </span>
          <button className="
      mt-6 w-full bg-cyan-700 hover:bg-white/30 transition py-2 rounded-xl font-semibold backdrop-blur-lg text-white"> Add to Cart </button>
        </div>

      ))}
    </div>
  )
}

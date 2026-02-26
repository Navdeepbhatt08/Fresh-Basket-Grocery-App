import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div 
      className="
        min-h-screen
        px-4 py-10
        bg-gradient-to-brfrom-slate-900 via-slate-800 to-slate-900
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
        "
      >
        <h2
          className="
            mb-2
            text-3xl font-bold text-white tracking-tight
            sm:text-4xl
          "
        >
          All Products
        </h2>
        <p
          className="
            mb-8
            text-slate-400 text-sm
            sm:text-base
          "
        >
          Browse and add items to your cart
        </p>
        <div
          className="
            grid grid-cols-1
            gap-6
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="
                flex flex-col overflow-hidden
                bg-white/10
                rounded-2xl border border-white/15
                shadow-xl transition-all
                group relative backdrop-blur-xl duration-300 hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] hover:border-white/25
              "
            >
              <div
                className="
                  overflow-hidden
                  bg-slate-800/50
                  relative
                "
              >
                <div
                  className="
                    w-3xs
                    bg-gradient-to-tfrom-black/40 via-transparent to-transparent
                    opacity-0 transition-opacity
                    absolute inset-0 group-hover:opacity-100 duration-300
                  "
                />
              </div>

              <div
                className="
                  flex flex-col flex-1
                  p-5
                "
              >
                <h3
                  className="
                    mb-3
                    text-lg font-semibold text-white
                    line-clamp-2 `min-h-[2.5rem]` justify-center
                  "
                >
                  {p.name}
                </h3>
                <div
                  className="
                    flex flex-wrap
                    mb-4
                    gap-2
                  "
                >
                  <span
                    className="
                      inline-flex
                      px-2.5 py-1
                      text-emerald-400 text-sm font-medium
                      bg-emerald-500/20
                      rounded-lg
                      items-center
                    "
                  >
                    ₹{p.price}
                  </span>
                  <span
                    className="
                      inline-flex
                      px-2.5 py-1
                      text-sky-400 text-sm font-medium
                      bg-sky-500/20
                      rounded-lg
                      items-center
                    "
                  >
                    Stock: {p.stock}
                  </span>
                </div>
                <button
                  className="
                    w-full
                    mt-auto py-3
                    text-white font-semibold
                    bg-cyan-600
                    rounded-xl
                    transition-colors shadow-lg shadow-cyan-500/20
                    hover:bg-cyan-500 duration-200 hover:shadow-cyan-500/30 active:scale-[0.98]
                  "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

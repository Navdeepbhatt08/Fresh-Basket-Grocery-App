import { useEffect, useState } from "react"
import API from "../api/axios"

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data))
  }, [])

  return (
    <div>
      <h2>All Products</h2>
      <br />
      {products.map(p => (
        <div key={p.id} className="product-card">
          <h3>{p.name}</h3>
          <p>Price: ₹{p.price}</p>
          <p>Stock: {p.stock}</p>
        </div>
      ))}
    </div>
  )
}

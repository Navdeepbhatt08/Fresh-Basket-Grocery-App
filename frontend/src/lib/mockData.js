export const stores = [
  {
    id: "store_1",
    name: "GreenMart",
    etaMin: 18,
    rating: 4.6,
    tags: ["Fresh", "Vegetables", "Daily"],
    distanceKm: 2.1
  },
  {
    id: "store_2",
    name: "Dairy & More",
    etaMin: 25,
    rating: 4.4,
    tags: ["Dairy", "Bakery"],
    distanceKm: 3.8
  },
  {
    id: "store_3",
    name: "QuickGrocer",
    etaMin: 12,
    rating: 4.2,
    tags: ["Fast", "Snacks", "Beverages"],
    distanceKm: 1.4
  }
]

export const products = [
  {
    id: "prod_1",
    storeId: "store_1",
    name: "Tomatoes (1 kg)",
    price: 48,
    stock: 62,
    category: "Vegetables",
    unit: "kg"
  },
  {
    id: "prod_2",
    storeId: "store_1",
    name: "Potatoes (1 kg)",
    price: 36,
    stock: 91,
    category: "Vegetables",
    unit: "kg"
  },
  {
    id: "prod_3",
    storeId: "store_2",
    name: "Milk (1 L)",
    price: 62,
    stock: 34,
    category: "Dairy",
    unit: "L"
  },
  {
    id: "prod_4",
    storeId: "store_2",
    name: "Brown Bread",
    price: 42,
    stock: 18,
    category: "Bakery",
    unit: "pack"
  },
  {
    id: "prod_5",
    storeId: "store_3",
    name: "Bananas (12 pcs)",
    price: 58,
    stock: 9,
    category: "Fruits",
    unit: "dozen"
  },
  {
    id: "prod_6",
    storeId: "store_3",
    name: "Cold Drink (750 ml)",
    price: 40,
    stock: 0,
    category: "Beverages",
    unit: "bottle"
  }
]

export const sellerDemo = {
  kpis: [
    { label: "Today Orders", value: 18 },
    { label: "Revenue", value: 12480 },
    { label: "Avg. Rating", value: 4.7 },
    { label: "Avg. Prep Time", value: "12m" }
  ],
  recentOrders: [
    { id: "ord_101", buyer: "Navdeep", total: 412, status: "Preparing", time: "10:12 AM" },
    { id: "ord_102", buyer: "Aman", total: 289, status: "Out for delivery", time: "10:34 AM" },
    { id: "ord_103", buyer: "Simran", total: 156, status: "Delivered", time: "11:05 AM" }
  ]
}

export const adminDemo = {
  kpis: [
    { label: "Active Buyers", value: 1284 },
    { label: "Active Sellers", value: 72 },
    { label: "Orders (24h)", value: 963 },
    { label: "GMV (24h)", value: 241980 }
  ],
  alerts: [
    { id: "al_1", title: "Stock issue", detail: "12 products low stock across 5 sellers." },
    { id: "al_2", title: "Delivery delays", detail: "Avg ETA increased by 6 minutes in Zone B." }
  ]
}


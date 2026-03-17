import { Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Login from "./pages/Login"
import Register from "./pages/Register"

import AppShell from "./layouts/AppShell"
import BuyerStores from "./pages/buyer/BuyerStores"
import BuyerStoreDetail from "./pages/buyer/BuyerStoreDetail"
import BuyerProductDetail from "./pages/buyer/BuyerProductDetail"
import BuyerCart from "./pages/buyer/BuyerCart"
import BuyerCheckout from "./pages/buyer/BuyerCheckout"
import BuyerOrders from "./pages/buyer/BuyerOrders"
import BuyerProfile from "./pages/buyer/BuyerProfile"

import HomeDashboard from "./pages/HomeDashboard"

import SellerDashboard from "./pages/seller/SellerDashboard"
import SellerProducts from "./pages/seller/SellerProducts"
import SellerOrders from "./pages/seller/SellerOrders"

import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminSellers from "./pages/admin/AdminSellers"
import AdminReports from "./pages/admin/AdminReports"

import ProductsLegacy from "./pages/Products"

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_700px_at_20%_-10%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(900px_600px_at_80%_0%,rgba(99,102,241,0.18),transparent_52%),linear-gradient(to_bottom,rgba(2,6,23,1),rgba(2,6,23,1))]">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AppShell />}>
          <Route path="/" element={<HomeDashboard />} />

          {/* Buyer */}
          <Route path="/buyer/stores" element={<BuyerStores />} />
          <Route path="/buyer/stores/:storeId" element={<BuyerStoreDetail />} />
          <Route path="/buyer/products/:productId" element={<BuyerProductDetail />} />
          <Route path="/buyer/cart" element={<BuyerCart />} />
          <Route path="/buyer/checkout" element={<BuyerCheckout />} />
          <Route path="/buyer/orders" element={<BuyerOrders />} />
          <Route path="/buyer/profile" element={<BuyerProfile />} />

          {/* Seller */}
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/seller/orders" element={<SellerOrders />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/sellers" element={<AdminSellers />} />
          <Route path="/admin/reports" element={<AdminReports />} />

          {/* Legacy */}
          <Route path="/products" element={<ProductsLegacy />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <ToastContainer
        theme="dark"
        position="bottom-right"
        toastClassName={() =>
          "bg-slate-900/90 text-slate-100 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl"
        }
      />
    </div>
  )
}

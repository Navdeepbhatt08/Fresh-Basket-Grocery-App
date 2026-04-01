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
    <div className="min-h-screen bg-[radial-gradient(1200px_700px_at_20%_-10%,rgba(250,204,21,0.35),transparent_55%),radial-gradient(900px_600px_at_85%_0%,rgba(34,197,94,0.18),transparent_52%),linear-gradient(to_bottom,rgba(246,247,249,1),rgba(246,247,249,1))]">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AppShell />}>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<HomeDashboard />} />


          <Route path="/buyer/stores" element={<BuyerStores />} />
          <Route path="/buyer/stores/:storeId" element={<BuyerStoreDetail />} />
          <Route path="/buyer/products/:productId" element={<BuyerProductDetail />} />
          <Route path="/buyer/cart" element={<BuyerCart />} />
          <Route path="/buyer/checkout" element={<BuyerCheckout />} />
          <Route path="/buyer/orders" element={<BuyerOrders />} />
          <Route path="/buyer/profile" element={<BuyerProfile />} />


          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/seller/orders" element={<SellerOrders />} />


          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/sellers" element={<AdminSellers />} />
          <Route path="/admin/reports" element={<AdminReports />} />


          <Route path="/products" element={<ProductsLegacy />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <ToastContainer
        theme="light"
        position="bottom-right"
        toastClassName={() =>
          "bg-white text-slate-900 border border-slate-200/70 backdrop-blur-xl rounded-2xl shadow-2xl"
        }
      />
    </div>
  )
}

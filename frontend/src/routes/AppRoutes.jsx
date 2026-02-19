// AppRoutes.jsx
// Central routing configuration for the application

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CustomerLayout from "../layouts/CustomerLayout";
import StoreAdminLayout from "../layouts/StoreAdminLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import Home from "../pages/customer/Home";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/cart";
import Checkout from "../pages/customer/Checkout";
import OrderSuccess from "../pages/customer/OrderSuccess";
import OrderHistory from "../pages/customer/OrderHistory";
import StoreDashboard from "../pages/storeAdmin/Dashboard";
import Products from "../pages/storeAdmin/Products";
import Orders from "../pages/storeAdmin/Orders";
import Tenants from "../pages/superAdmin/Tenants";
import CreateTenant from "../pages/superAdmin/CreateTenant";
import TenantDetails from "../pages/superAdmin/TenantDetails";
import Dashboard from "../pages/superAdmin/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* ===== Customer Routes ===== */}
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="orders" element={<OrderHistory />} />
      </Route>

      {/* ===== Store Admin Routes ===== */}
      <Route
        path="/store"
        element={
          <ProtectedRoute allowedRole="storeAdmin">
            <StoreAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StoreDashboard />} />
        <Route path="dashboard" element={<StoreDashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      {/* ===== Super Admin Routes ===== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="superAdmin">
            <SuperAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="create-tenant" element={<CreateTenant />} />
        <Route path="tenant/:id" element={<TenantDetails />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

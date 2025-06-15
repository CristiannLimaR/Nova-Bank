import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import NewTransaction from "./pages/NewTransaction";
import Contacts from "./pages/Contacts";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Conversion from "./pages/Conversion";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import ReportsPage from "./pages/admin/ReportsPage";
import ProductsPage from "./pages/admin/ProductsPage";
import TransactionsPage from "./pages/admin/TransactionsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";
import ForgotPassword from "./pages/ForgotPassword";
import AccountAdminPage from "./pages/admin/AccountPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/2fa" element={<TwoFactorAuth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/new-transaction" element={<ProtectedRoute><NewTransaction /></ProtectedRoute>} />
          <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/conversion" element={<ProtectedRoute><Conversion /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN_ROLE']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['ADMIN_ROLE']}><UsersPage /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['ADMIN_ROLE']}><ReportsPage /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute allowedRoles={['ADMIN_ROLE']}><ProductsPage /></ProtectedRoute>} />
          <Route path="/admin/transactions" element={<ProtectedRoute allowedRoles={['ADMIN_ROLE']}><TransactionsPage /></ProtectedRoute>} />
          <Route path="/admin/accounts" element={<ProtectedRoute allowedRoles={['ADMIN_ROLE']}><AccountAdminPage /></ProtectedRoute>} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

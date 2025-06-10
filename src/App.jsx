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
import AdminLayout from "./layouts/AdminLayout";
import UsersPage from "./pages/admin/UsersPage";
import ReportsPage from "./pages/admin/ReportsPage";
import ProductsPage from "./pages/admin/ProductsPage";
import TransactionsPage from "./pages/admin/TransactionsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="new-transaction" element={<NewTransaction />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="payments" element={<Products />} />
          <Route path="settings" element={<Settings />} />
          <Route path="conversion" element={<Conversion />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UsersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </Router>
  );
}

export default App;

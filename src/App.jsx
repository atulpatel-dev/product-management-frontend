import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Products from "./pages/Products/Products";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
}



import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import AdminRoute from "./components/AdminRoute/AdminRoute";
import AdminUsers from "./pages/AdminUsers/AdminUsers";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/AddProduct/AddProduct";
import EditProduct from "./pages/EditProduct/EditProduct";

export default function App() {
    return (
        <MainLayout>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

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

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-product"
                    element={
                        <ProtectedRoute>
                            <AddProduct />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-product/:id"
                    element={
                        <ProtectedRoute>
                            <EditProduct />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <AdminUsers />
                        </AdminRoute>
                    }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </MainLayout>
    );
}
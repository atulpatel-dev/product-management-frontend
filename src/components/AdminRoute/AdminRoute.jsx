import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/Context";

export default function AdminRoute({ children }) {

    const {
        isLoggedIn,
        user,
        authLoading,
    } = useAuth();

    if (authLoading) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                Loading...
            </div>
        );
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (!user || user.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
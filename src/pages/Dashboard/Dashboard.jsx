import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProfile } from "../../api/userApi";

import "./Dashboard.css";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getProfile();

                if (data.success) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Failed to load dashboard", error);

                setError(
                    error.message || "Failed to load dashboard."
                );
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-state">
                <div className="loading-spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-state">
                <div className="state-icon error-icon">!</div>
                <h2>Unable to load dashboard</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="dashboard">

            {/* Header */}

            <section className="dashboard-header">
                <div>
                    <p className="dashboard-eyebrow">
                        Dashboard
                    </p>

                    <h1>
                        Welcome back, {user.name} 👋
                    </h1>

                    <p className="dashboard-subtitle">
                        Manage your products and account from one place.
                    </p>
                </div>

                <Link
                    to="/add-product"
                    className="dashboard-primary-button"
                >
                    + Add Product
                </Link>
            </section>

            {/* Stats */}

            <section className="dashboard-stats">

                <div className="dashboard-stat-card">
                    <div className="stat-icon blue">
                        📦
                    </div>

                    <div>
                        <p className="stat-label">
                            Products
                        </p>

                        <h2>
                            Manage
                        </h2>

                        <Link to="/products">
                            View products →
                        </Link>
                    </div>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-icon green">
                        👤
                    </div>

                    <div>
                        <p className="stat-label">
                            Account
                        </p>

                        <h2>
                            Active
                        </h2>

                        <Link to="/profile">
                            View profile →
                        </Link>
                    </div>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-icon purple">
                        🛡️
                    </div>

                    <div>
                        <p className="stat-label">
                            Role
                        </p>

                        <h2>
                            {user.role}
                        </h2>

                        <span>
                            Account access
                        </span>
                    </div>
                </div>

            </section>

            {/* Quick actions */}

            <section className="dashboard-section">

                <div className="section-heading">
                    <div>
                        <h2>Quick actions</h2>

                        <p>
                            Common actions for managing your account.
                        </p>
                    </div>
                </div>

                <div className="quick-actions">

                    <Link
                        to="/products"
                        className="quick-action-card"
                    >
                        <div className="quick-action-icon">
                            📦
                        </div>

                        <div>
                            <h3>Manage Products</h3>

                            <p>
                                View, edit and delete your products.
                            </p>
                        </div>

                        <span className="action-arrow">
                            →
                        </span>
                    </Link>

                    <Link
                        to="/add-product"
                        className="quick-action-card"
                    >
                        <div className="quick-action-icon">
                            ➕
                        </div>

                        <div>
                            <h3>Add Product</h3>

                            <p>
                                Create a new product and upload an image.
                            </p>
                        </div>

                        <span className="action-arrow">
                            →
                        </span>
                    </Link>

                    <Link
                        to="/profile"
                        className="quick-action-card"
                    >
                        <div className="quick-action-icon">
                            ⚙️
                        </div>

                        <div>
                            <h3>My Profile</h3>

                            <p>
                                View your account information.
                            </p>
                        </div>

                        <span className="action-arrow">
                            →
                        </span>
                    </Link>

                </div>

            </section>

            {/* Account overview */}

            <section className="account-overview">

                <div className="section-heading">
                    <div>
                        <h2>Account overview</h2>

                        <p>
                            Your current account information.
                        </p>
                    </div>
                </div>

                <div className="account-details">

                    <div className="account-detail">
                        <span>Name</span>
                        <strong>{user.name}</strong>
                    </div>

                    <div className="account-detail">
                        <span>Email</span>
                        <strong>{user.email}</strong>
                    </div>

                    <div className="account-detail">
                        <span>Role</span>
                        <strong>{user.role}</strong>
                    </div>

                </div>

            </section>

        </div>
    );
}
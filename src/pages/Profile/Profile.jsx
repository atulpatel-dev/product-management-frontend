import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProfile } from "../../api/userApi";

import "./Profile.css";

export default function Profile() {
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
                console.error("Failed to load profile", error);

                setError(
                    error.message || "Failed to load profile."
                );
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="profile-state">
                <div className="profile-spinner"></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-state">
                <div className="profile-error-icon">!</div>
                <h2>Unable to load profile</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="profile-page">

            <section className="profile-header">
                <div>
                    <p className="profile-eyebrow">
                        Account
                    </p>

                    <h1>My Profile</h1>

                    <p>
                        View your account information.
                    </p>
                </div>

                <Link
                    to="/dashboard"
                    className="profile-back-button"
                >
                    ← Dashboard
                </Link>
            </section>

            <section className="profile-card">

                <div className="profile-top">

                    <div className="profile-avatar">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="profile-identity">
                        <h2>{user.name}</h2>

                        <p>{user.email}</p>

                        <span className="profile-role">
                            {user.role}
                        </span>
                    </div>

                </div>

                <div className="profile-divider"></div>

                <div className="profile-information">

                    <div className="profile-info-item">
                        <span>Full Name</span>
                        <strong>{user.name}</strong>
                    </div>

                    <div className="profile-info-item">
                        <span>Email Address</span>
                        <strong>{user.email}</strong>
                    </div>

                    <div className="profile-info-item">
                        <span>Account Role</span>
                        <strong>{user.role}</strong>
                    </div>

                    <div className="profile-info-item">
                        <span>Account Status</span>
                        <strong className="status-active">
                            Active
                        </strong>
                    </div>

                </div>

            </section>

            <section className="profile-actions">

                <div>
                    <h2>Quick actions</h2>

                    <p>
                        Continue managing your account and products.
                    </p>
                </div>

                <div className="profile-action-buttons">

                    <Link
                        to="/products"
                        className="profile-secondary-button"
                    >
                        View Products
                    </Link>

                    <Link
                        to="/add-product"
                        className="profile-primary-button"
                    >
                        + Add Product
                    </Link>

                </div>

            </section>

        </div>
    );
}
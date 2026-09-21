import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/userApi";
import "./AdminUsers.css";

export default function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadUsers() {

            try {
                setLoading(true);
                setError("");

                const data = await getAllUsers();

                setUsers(data.users || []);

            } catch (error) {
                setError(
                    error.message || "Failed to load users"
                );
            } finally {
                setLoading(false);
            }
        }

        loadUsers();

    }, []);

    if (loading) {
        return (
            <section className="admin-users-page">

                <div className="admin-users-header">
                    <div>
                        <p className="admin-users-eyebrow">
                            Administration
                        </p>

                        <h1>User Management</h1>

                        <p>
                            Manage registered users and their roles.
                        </p>
                    </div>
                </div>

                <div className="admin-users-loading">
                    Loading users...
                </div>

            </section>
        );
    }

    return (
        <section className="admin-users-page">

            <div className="admin-users-header">

                <div>
                    <p className="admin-users-eyebrow">
                        Administration
                    </p>

                    <h1>User Management</h1>

                    <p>
                        View registered users and their account roles.
                    </p>
                </div>

                <div className="admin-users-count">
                    <span>{users.length}</span>
                    <small>Total Users</small>
                </div>

            </div>

            {error ? (
                <div className="admin-users-error">
                    <h2>Unable to load users</h2>
                    <p>{error}</p>
                </div>
            ) : users.length === 0 ? (
                <div className="admin-users-empty">
                    <div className="admin-users-empty-icon">
                        👥
                    </div>

                    <h2>No users found</h2>

                    <p>
                        There are currently no registered users.
                    </p>
                </div>
            ) : (
                <div className="admin-users-table-wrapper">

                    <table className="admin-users-table">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((currentUser) => (

                                <tr key={currentUser._id}>

                                    <td>
                                        <div className="admin-user-name">
                                            <div className="admin-user-avatar">
                                                {currentUser.name
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <strong>
                                                {currentUser.name}
                                            </strong>
                                        </div>
                                    </td>

                                    <td>
                                        <span className="admin-user-email">
                                            {currentUser.email}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`admin-role-badge ${
                                                currentUser.role === "admin"
                                                    ? "admin"
                                                    : "user"
                                            }`}
                                        >
                                            {currentUser.role}
                                        </span>
                                    </td>

                                    <td>
                                        {new Date(
                                            currentUser.createdAt
                                        ).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>

                                </tr>

                            ))}
                        </tbody>

                    </table>

                </div>
            )}

        </section>
    );
}
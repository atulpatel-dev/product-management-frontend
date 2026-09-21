import { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Context";
import "./Navbar.css";

export default function Navbar() {
    const { isLoggedIn, user, logout } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    function getNavLinkClass({ isActive }) {
        return isActive ? "nav-link active" : "nav-link";
    }

    return (
        <header className="navbar">
            <div className="navbar-container">

                <Link to="/" className="navbar-brand">
                    Product<span>Hub</span>
                </Link>

                <button
                    className="menu-toggle"
                    type="button"
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((current) => !current)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>

                    {isLoggedIn ? (
                        <>
                            <NavLink
                                to="/dashboard"
                                className={getNavLinkClass}
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/products"
                                className={getNavLinkClass}
                            >
                                Products
                            </NavLink>

                            <NavLink
                                to="/profile"
                                className={getNavLinkClass}
                            >
                                Profile
                            </NavLink>
                            {user?.role === "admin" && (
                                <NavLink
                                    to="/admin/users"
                                    className={getNavLinkClass}
                                >
                                    Users
                                </NavLink>
                            )}

                            <button
                                type="button"
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={getNavLinkClass}
                            >
                                Login
                            </NavLink>

                            <Link
                                to="/register"
                                className="register-button"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </nav>
            </div>
        </header>
    );
}
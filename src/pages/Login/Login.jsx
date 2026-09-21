import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/Context";
import { loginUser } from "../../api/userApi";

import AuthLayout from "../../components/AuthLayout/AuthLayout";
import "../../components/AuthLayout/AuthLayout.css";

export default function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        setError("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const data = await loginUser({
                email,
                password
            });

            console.log(data);


            await login(data.token);
            navigate("/dashboard");

        } catch (error) {
            console.error("Login failed", error);

            setError(
                error.message || "Unable to login. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Login to manage your products."
            footerText="Don't have an account?"
            footerLinkText="Create account"
            footerLink="/register"
        >
            <form
                className="auth-form"
                onSubmit={handleLogin}
            >

                <div className="auth-field">
                    <label htmlFor="login-email">
                        Email
                    </label>

                    <input
                        id="login-email"
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        autoComplete="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="login-password">
                        Password
                    </label>

                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                    />
                </div>

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <button
                    className="auth-submit"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>
        </AuthLayout>
    );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../api/userApi";

import AuthLayout from "../../components/AuthLayout/AuthLayout";
import "../../components/AuthLayout/AuthLayout.css";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleRegister(e) {
        e.preventDefault();

        setError("");

        if (!name.trim() || !email.trim() || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            const data = await registerUser({
                name,
                email,
                password
            });

            console.log(data);

            if (data.success) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Registration failed", error);

            setError(
                error.message ||
                "Unable to create account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Start managing your products today."
            footerText="Already have an account?"
            footerLinkText="Login"
            footerLink="/login"
        >
            <form
                className="auth-form"
                onSubmit={handleRegister}
            >

                <div className="auth-field">
                    <label htmlFor="register-name">
                        Full Name
                    </label>

                    <input
                        id="register-name"
                        type="text"
                        value={name}
                        placeholder="Enter your name"
                        autoComplete="name"
                        onChange={(e) => {
                            setName(e.target.value);
                            setError("");
                        }}
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="register-email">
                        Email
                    </label>

                    <input
                        id="register-email"
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
                    <label htmlFor="register-password">
                        Password
                    </label>

                    <input
                        id="register-password"
                        type="password"
                        value={password}
                        placeholder="Create a password"
                        autoComplete="new-password"
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
                    {loading
                        ? "Creating account..."
                        : "Create Account"}
                </button>

            </form>
        </AuthLayout>
    );
}
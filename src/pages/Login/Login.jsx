import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/Context"
import { loginUser } from "../../api/userApi";

export default function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")


    async function handleLogin(e) {
        e.preventDefault();

        try {
            const data = await loginUser({
                email,
                password
            });

            console.log(data);

            if (data.success) {
                login(data.token);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login failed", error);
            alert(error.message || "Login failed");
        }
    }

    function updateEmail(e) {
        setEmail(e.target.value);
    };

    function updatePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={updateEmail}
                />
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={updatePassword}
                />
                <button type="submit">Login</button>
            </form>
        </>
    )

} 
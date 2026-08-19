import { useState } from "react";
import { useNavigate } from "react-router-dom"
import {useAuth} from "../../context/Context"


export default function Login() {
    
    const navigate = useNavigate();
    const {login} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")


    async function handleLogin(e) {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        console.log(data);

        if(data.success){
           login(data.token)
            navigate("/dashboard");
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
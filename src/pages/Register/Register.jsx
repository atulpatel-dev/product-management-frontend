import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/userApi";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function updateName(e) {
        setName(e.target.value)
    };

    function updateEmail(e) {
        setEmail(e.target.value)
    };

    function updatePassword(e) {
        setPassword(e.target.value)
    };
    async function handleRagister(e) {
        e.preventDefault();

        try {
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
            setError(error.message || "Registration failed");
        }
    }


    return (
        <>
            <h1>Ragister page</h1>

            <form onSubmit={handleRagister} >
                <br />
                <input
                    type="text"
                    value={name}
                    onChange={updateName}
                />

                <br />
                <br />
                <input
                    type="email"
                    value={email}
                    onChange={updateEmail}
                />
                {error && <p>{error}</p>}
                <br />
                <br />


                <input
                    type="password"
                    value={password}
                    onChange={updatePassword}
                />
                <br /> <br />
                <button type="submit"> Register </button>

            </form>
        </>


    )
}
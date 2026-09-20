import { useEffect, useState } from "react"
import { getProfile } from "../../api/userApi";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getUserProfile() {
            try {
                const data = await getProfile();

                console.log(data);

                if (data.success) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Failed to load dashboard", error);
                setError(error.message || "Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        }

        getUserProfile();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }


    return (
        <>
            <h1>Dashboard page</h1>
            <br /><br />
            <h2>Welcome: {user.name} </h2>
            <p>Email: {user.email} </p>
            <p>Role: {user.role}</p>

        </>
    )
}
import { useEffect, useState } from "react";
import { getProfile } from "../../api/userApi";


export default function Profile() {
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
                console.error("Failed to load profile", error);
                setError(error.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        }

        getUserProfile();
    }, []);
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <>
            <h2>Name: {user.name} </h2> <br />
            <p>Email: <b>{user.email}</b> </p> <br />
            <p>Role: <b>{user.role}</b>  </p> <br />
        </>
    )
}
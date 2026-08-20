import { useEffect, useState } from "react"

export default function Dashboard() {
    const [user, setUser] = useState(null);
   
    useEffect(() => {

        async function getProfile() {
            const token = await localStorage.getItem("token");

            const response = await fetch("http://localhost:8080/users/profile", {
                headers: {
                    authorization: ` Bearer ${token}`
                }
            })
            const data = await response.json();
            console.log(data);
            if (data.success) {
                setUser(data.user);
            }
        }
        getProfile();
    }, []);

    if (!user) {
        return (
            <h1>Loading...</h1>
        )
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
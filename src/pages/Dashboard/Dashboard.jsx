import { useEffect ,useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
    const [user , setUser] = useState(null);
    const navigate = useNavigate();
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
            if(data.success){
                setUser(data.user);
            }
        }
        getProfile();
    } ,[]);

    if(!user){
        return(
            <h1>Loading...</h1>
        )
    };
    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/login")
    }

    return (
        <>
        <h1>Dashboard page</h1>
        <br /><br />
        <h2>Welcom: {user.name} </h2>
        <p>Email: {user.email} </p>
        <p>Role: {user.role}</p>
        <br />
        <button onClick={handleLogout}>logout</button>
        </>
    )
}
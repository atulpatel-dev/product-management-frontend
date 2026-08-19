import {useAuth} from "../../context/Context"
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
   const {isLoggedIn , logout} = useAuth()
    const navigate = useNavigate();

    function handleLogout() {
      logout()
        navigate("/login");
    }

    return (
        <nav>
            {
                isLoggedIn ? (
                    <>
                        <Link to="/dashboard" >Dashboard</Link> &nbsp; 
                        <Link to="/products" >Products</Link> &nbsp; 
                        <button onClick={handleLogout} >Logout</button> &nbsp; 
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link> &nbsp; 
                        <Link to="/register">Register</Link> &nbsp; 
                    </>
                )
            }

        </nav>
    )
}
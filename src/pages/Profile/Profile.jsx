import { useEffect, useState } from "react";


export default function Profile(){
    const [user , setUser] = useState(null);

    useEffect(()=>{

        async function getProfile(){
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/users/profile",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
                
            })
            const data = await response.json();
            if(data.success){
                setUser(data.user);
            }
        }
        getProfile();
    },[])
    if(!user){
        return (<h2>Loading...</h2>)
    }


    return(
        <>
            <h2>Name: {user.name} </h2> <br />
            <p>Email: {user.email}</p> <br />
            <p>Role{user.role} </p> <br />
        </>
    )
}
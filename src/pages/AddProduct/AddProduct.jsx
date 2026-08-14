import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !price) {
            alert("Please fill all field");
            return
        }

        try {
            setLoading(true)

            const token = await localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/products", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    price
                })
            });
            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                alert(data.message);
                return
            }
            setTitle("");
            setDescription("");
            setPrice("");

            navigate("/products");
        } catch (error) {
            console.error("Failed to create product", error);
            alert("Something went wrong , Please try again")

        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h2>Add Product </h2>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />
                <br /><br />
                <textarea value={description} placeholder="Description..." onChange={(e) => setDescription(e.target.value)} />
                <br /><br />
                <input type="number" value={price} placeholder="Price..." onChange={(e) => setPrice(e.target.value)} />
                <br /><br />
                <button type="submit" disabled={loading} >{loading ? "loading..." : "Add Product"}</button>
            </form>
        </>
    )

}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !price || !image) {
            alert("Please fill all field");
            return
        }

        try {
            setLoading(true)

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);

            if (image) {
                formData.append("image", image);
            }

            const token = await localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/products", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData

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

            setImage(null)

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

                <input type="file" accept="image/*" onChange={(e) =>setImage(e.target.files[0])} />
                <br /><br />
                <button type="submit" disabled={loading} >{loading ? "loading..." : "Add Product"}</button>
            </form>
        </>
    )

}
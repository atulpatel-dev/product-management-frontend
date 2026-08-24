import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("");

    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [loading, setLoading] = useState("");


    useEffect(() => {
        async function getProduct() {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(`http://localhost:8080/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json()
                if (!response.ok) {

                    if (response.status === 403) {
                        alert("You are not allowed to edit this product.");
                        navigate("/products");
                        return;
                    }

                    alert(data.message);
                    navigate("/products");
                    return;
                }
                setTitle(data.title);
                setDescription(data.description);
                setPrice(data.price);

                if (data.image) {
                    setExistingImage(data.image)
                }
            } catch (error) {
                console.error("failed to get product", error);
                alert("something went wrong , please try again");
                navigate("/products")

            }
        }
        getProduct();
    }, [id])

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !price) {
            alert("Please fill all field");
            return;
        }
        try {

            setLoading(true)

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            if (image) {
                formData.append("image", image)
            }

            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/products/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });
            const data = await response.json();

            if (!response.ok) {

                if (response.status === 403) {
                    alert("You are not allowed to edit this product.");
                    return;
                }

                alert(data.message);
                return;
            }

            if (data.success) {
                navigate("/products")
            }

        } catch (error) {
            console.log("Failed to update product", error);
            alert("Something went wrong , Please try again")

        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            <h1>Edit page</h1>
            <form onSubmit={handleSubmit} >
                <br /> <br />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br /> <br />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                <br /> <br />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                <br /> <br />
                {existingImage?.url && (
                    <div>
                        <p>Current Image:</p>

                        <img src={existingImage.url} alt={title} width="200" />
                    </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                <br /> <br />
                <button type="submit" disabled={loading} >
                    {loading ? "Updating..." : "Update Product"}
                </button>
                <button type="submit" onClick={()=> navigate("/products")} disabled={loading} >Cancel</button>
            </form>
        </>

    )
}
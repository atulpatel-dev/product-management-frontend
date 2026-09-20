import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { deleteProduct, getProducts } from "../../api/productApi";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();

                console.log(data);

                if (data.success) {
                    setProducts(data.data);
                }
            } catch (error) {
                console.error("Failed to load products", error);
                alert(error.message || "Failed to load products");
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setDeleteId(id);

            const data = await deleteProduct(id);

            console.log(data);

            if (data.success) {
                setProducts((currentProducts) =>
                    currentProducts.filter((product) => product._id !== id)
                );
            }
        } catch (error) {
            console.error("Failed to delete product", error);
            alert(error.message || "Failed to delete product");
        } finally {
            setDeleteId(null);
        }
    }

    return (
        <>
            <h1>Product Page</h1>

            <br />
            <br />

            <button onClick={() => navigate("/add-product")}>
                Add Product
            </button>

            <br />
            <br />

            {loading ? (
                <h2>Loading...</h2>
            ) : products.length === 0 ? (
                <h2>No products found</h2>
            ) : (
                products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onDelete={handleDelete}
                        deleteId={deleteId}
                    />
                ))
            )}
        </>
    );
}
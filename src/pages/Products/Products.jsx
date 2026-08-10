import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {

        async function getProducts() {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8080/products", {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data)
            if (data.success) {
                setProducts(data.data)
            }
        }
        getProducts();

    }, []);


    return (
        <>
            <h1> Product Page </h1>

            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                />

            ))}
        </>

    );
}


import { Link } from "react-router-dom";

export default function ProductTab({ product, onDelete, deleteId }) {
    return (
        <div>
            <h2>{product.title}</h2>

            <p>{product.description}</p>

            <strong>₹{product.price}</strong>

            <div>
                <Link to={`/edit-product/${product._id}`}>
                    Edit
                </Link>

                <button
                    onClick={() => onDelete(product._id)}
                    disabled={deleteId === product._id}
                >
                    {deleteId === product._id
                        ? "Deleting..."
                        : "Delete"}
                </button>
            </div>
        </div>
    );
}
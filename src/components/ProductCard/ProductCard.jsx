import { Link } from "react-router-dom";

export default function ProductCard({
    product,
    onDelete,
    deleteId
}) {
    const imageUrl = product.image?.url;

    return (
        <article className="product-card">

            {/* Image */}

            <div className="product-image-wrapper">

                {imageUrl ? (
                    <img
                        className="product-image"
                        src={imageUrl}
                        alt={product.title}
                    />
                ) : (
                    <div className="product-image-placeholder">
                        📦
                    </div>
                )}

            </div>

            {/* Content */}

            <div className="product-card-body">

                <h2 className="product-card-title">
                    {product.title}
                </h2>

                <p className="product-card-description">
                    {product.description}
                </p>

                <div className="product-card-footer">

                    <strong className="product-price">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                    </strong>

                    <div className="product-actions">

                        <Link
                            className="product-edit-button"
                            to={`/edit-product/${product._id}`}
                        >
                            Edit
                        </Link>

                        <button
                            type="button"
                            className="product-delete-button"
                            onClick={() => onDelete(product._id)}
                            disabled={deleteId === product._id}
                        >
                            {deleteId === product._id
                                ? "Deleting..."
                                : "Delete"}
                        </button>

                    </div>

                </div>

            </div>

        </article>
    );
}
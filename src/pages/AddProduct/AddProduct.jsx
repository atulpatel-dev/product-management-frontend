import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createProduct } from "../../api/productApi";

import "./AddProduct.css";

export default function AddProduct() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleImageChange(e) {
        const selectedImage = e.target.files?.[0];

        if (!selectedImage) {
            return;
        }

        setImage(selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
        setError("");
    }

    function removeImage() {
        setImage(null);
        setImagePreview("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        if (!title.trim()) {
            setError("Please enter a product title.");
            return;
        }

        if (!description.trim()) {
            setError("Please enter a product description.");
            return;
        }

        if (!price) {
            setError("Please enter a product price.");
            return;
        }

        if (!image) {
            setError("Please select a product image.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("image", image);

            const data = await createProduct(formData);

            if (data.success) {
                navigate("/products");
            }
        } catch (error) {
            console.error("Failed to create product", error);

            setError(
                error.message ||
                "Unable to create product. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="product-form-page">

            <div className="product-form-header">

                <div>
                    <p className="product-form-eyebrow">
                        Inventory
                    </p>

                    <h1>Add Product</h1>

                    <p>
                        Create a new product and add it to your inventory.
                    </p>
                </div>

            </div>

            <form
                className="product-form-card"
                onSubmit={handleSubmit}
            >

                <div className="product-form-section">

                    <div className="product-form-section-header">
                        <h2>Product Information</h2>
                        <p>
                            Enter the basic details of your product.
                        </p>
                    </div>

                    <div className="product-form-grid">

                        <div className="product-form-field full-width">

                            <label htmlFor="product-title">
                                Product Title
                            </label>

                            <input
                                id="product-title"
                                type="text"
                                value={title}
                                placeholder="Enter product title"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setError("");
                                }}
                                disabled={loading}
                            />

                        </div>

                        <div className="product-form-field full-width">

                            <label htmlFor="product-description">
                                Description
                            </label>

                            <textarea
                                id="product-description"
                                value={description}
                                placeholder="Describe your product..."
                                rows="5"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setError("");
                                }}
                                disabled={loading}
                            />

                        </div>

                        <div className="product-form-field">

                            <label htmlFor="product-price">
                                Price
                            </label>

                            <div className="price-input-wrapper">
                                <span>₹</span>

                                <input
                                    id="product-price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={price}
                                    placeholder="0.00"
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                        setError("");
                                    }}
                                    disabled={loading}
                                />
                            </div>

                        </div>

                    </div>

                </div>

                <div className="product-form-divider"></div>

                <div className="product-form-section">

                    <div className="product-form-section-header">
                        <h2>Product Image</h2>
                        <p>
                            Upload an image that represents your product.
                        </p>
                    </div>

                    {imagePreview ? (
                        <div className="image-preview-container">

                            <div className="image-preview-wrapper">
                                <img
                                    src={imagePreview}
                                    alt="Product preview"
                                    className="image-preview"
                                />
                            </div>

                            <div className="image-preview-info">
                                <p>
                                    {image?.name}
                                </p>

                                <button
                                    type="button"
                                    className="remove-image-button"
                                    onClick={removeImage}
                                    disabled={loading}
                                >
                                    Remove Image
                                </button>
                            </div>

                        </div>
                    ) : (
                        <label
                            htmlFor="product-image"
                            className="image-upload-area"
                        >

                            <div className="image-upload-icon">
                                ↑
                            </div>

                            <strong>
                                Click to upload an image
                            </strong>

                            <span>
                                PNG, JPG or JPEG
                            </span>

                            <input
                                id="product-image"
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={handleImageChange}
                                disabled={loading}
                            />

                        </label>
                    )}

                </div>

                {error && (
                    <div className="product-form-error">
                        <span>!</span>
                        <p>{error}</p>
                    </div>
                )}

                <div className="product-form-actions">

                    <button
                        type="button"
                        className="product-cancel-button"
                        onClick={() => navigate("/products")}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="product-submit-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Product..."
                            : "Create Product"}
                    </button>

                </div>

            </form>

        </div>
    );
}
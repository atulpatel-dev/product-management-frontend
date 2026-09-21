import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getProductById,
    updateProduct
} from "../../api/productApi";

import "./EditProduct.css";
import "../AddProduct/AddProduct.css";

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProduct() {
            try {
                setLoading(true);
                setError("");

                const data = await getProductById(id);

                const product = data.data || data;

                setTitle(product.title || "");
                setDescription(product.description || "");
                setPrice(product.price ?? "");

                if (product.image) {
                    setExistingImage(product.image);
                }
            } catch (error) {
                console.error(
                    "Failed to load product",
                    error
                );

                if (error.status === 403) {
                    setError(
                        "You are not allowed to edit this product."
                    );
                    return;
                }

                setError(
                    error.message ||
                    "Unable to load product. Please try again."
                );
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [id]);

    function handleImageChange(e) {
        const selectedImage = e.target.files?.[0];

        if (!selectedImage) {
            return;
        }

        setImage(selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
        setError("");
    }

    function removeNewImage() {
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

        try {
            setSaving(true);

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);

            if (image) {
                formData.append("image", image);
            }

            const data = await updateProduct(id, formData);

            if (data.success) {
                navigate("/products");
            }
        } catch (error) {
            console.error(
                "Failed to update product",
                error
            );

            if (error.status === 403) {
                setError(
                    "You are not allowed to update this product."
                );
                return;
            }

            setError(
                error.message ||
                "Unable to update product. Please try again."
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="edit-product-loading">
                <div className="edit-product-spinner"></div>

                <p>
                    Loading product...
                </p>
            </div>
        );
    }

    if (error && !title && !description) {
        return (
            <div className="edit-product-error-state">

                <div className="edit-product-error-icon">
                    !
                </div>

                <h2>
                    Unable to load product
                </h2>

                <p>
                    {error}
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/products")}
                >
                    Back to Products
                </button>

            </div>
        );
    }

    return (
        <div className="product-form-page">

            <div className="product-form-header">

                <div>
                    <p className="product-form-eyebrow">
                        Inventory
                    </p>

                    <h1>Edit Product</h1>

                    <p>
                        Update your product information and image.
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
                            Update the details of your product.
                        </p>
                    </div>

                    <div className="product-form-grid">

                        <div className="product-form-field full-width">

                            <label htmlFor="edit-product-title">
                                Product Title
                            </label>

                            <input
                                id="edit-product-title"
                                type="text"
                                value={title}
                                placeholder="Enter product title"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setError("");
                                }}
                                disabled={saving}
                            />

                        </div>

                        <div className="product-form-field full-width">

                            <label htmlFor="edit-product-description">
                                Description
                            </label>

                            <textarea
                                id="edit-product-description"
                                value={description}
                                placeholder="Describe your product..."
                                rows="5"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setError("");
                                }}
                                disabled={saving}
                            />

                        </div>

                        <div className="product-form-field">

                            <label htmlFor="edit-product-price">
                                Price
                            </label>

                            <div className="price-input-wrapper">

                                <span>₹</span>

                                <input
                                    id="edit-product-price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={price}
                                    placeholder="0.00"
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                        setError("");
                                    }}
                                    disabled={saving}
                                />

                            </div>

                        </div>

                    </div>

                </div>

                <div className="product-form-divider"></div>

                <div className="product-form-section">

                    <div className="product-form-section-header">

                        <h2>
                            Product Image
                        </h2>

                        <p>
                            Keep the current image or upload a new one.
                        </p>

                    </div>

                    {imagePreview ? (
                        <div className="image-preview-container">

                            <div className="image-preview-wrapper">

                                <img
                                    src={imagePreview}
                                    alt="New product preview"
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
                                    onClick={removeNewImage}
                                    disabled={saving}
                                >
                                    Remove New Image
                                </button>

                            </div>

                        </div>
                    ) : existingImage?.url ? (
                        <div className="image-preview-container">

                            <div className="image-preview-wrapper">

                                <img
                                    src={existingImage.url}
                                    alt={title}
                                    className="image-preview"
                                />

                            </div>

                            <div className="image-preview-info">

                                <p>
                                    Current product image
                                </p>

                                <label
                                    htmlFor="edit-product-image"
                                    className="change-image-button"
                                >
                                    Change Image
                                </label>

                                <input
                                    id="edit-product-image"
                                    className="hidden-file-input"
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={handleImageChange}
                                    disabled={saving}
                                />

                            </div>

                        </div>
                    ) : (
                        <label
                            htmlFor="edit-product-image"
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
                                id="edit-product-image"
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={handleImageChange}
                                disabled={saving}
                            />

                        </label>
                    )}

                </div>

                {error && (
                    <div className="product-form-error">
                        <span>!</span>

                        <p>
                            {error}
                        </p>
                    </div>
                )}

                <div className="product-form-actions">

                    <button
                        type="button"
                        className="product-cancel-button"
                        onClick={() => navigate("/products")}
                        disabled={saving}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="product-submit-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving Changes..."
                            : "Save Changes"}
                    </button>

                </div>

            </form>

        </div>
    );
}
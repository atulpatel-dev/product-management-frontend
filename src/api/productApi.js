import { apiClient } from "./apiClient";

export async function getProducts(params = {}) {
    const query = new URLSearchParams();

    if (params.search) {
        query.set("search", params.search);
    }

    if (params.page) {
        query.set("page", params.page);
    }

    if (params.limit) {
        query.set("limit", params.limit);
    }

    if (params.sort) {
        query.set("sort", params.sort);
    }

    if (
        params.minPrice !== undefined &&
        params.minPrice !== ""
    ) {
        query.set("minPrice", params.minPrice);
    }

    if (
        params.maxPrice !== undefined &&
        params.maxPrice !== ""
    ) {
        query.set("maxPrice", params.maxPrice);
    }

    const queryString = query.toString();

    return await apiClient(
        `/products${queryString ? `?${queryString}` : ""}`
    );
}

export async function deleteProduct(id) {
    return await apiClient(`/products/${id}`, {
        method: "DELETE",
    });
}

export async function createProduct(formData) {
    return await apiClient("/products", {
        method: "POST",
        body: formData,
    });
}

export async function getProductById(id) {
    return await apiClient(`/products/${id}`);
}

export async function updateProduct(id, formData) {
    return await apiClient(`/products/${id}`, {
        method: "PUT",
        body: formData,
    });
}
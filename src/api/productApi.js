import { apiClient } from "./apiClient";

export async function getProducts() {
  return await apiClient("/products")
}

export async function deleteProduct(id) {
    return await apiClient(`/products/${id}`, {
        method: "DELETE",
    })
};

export async function createProduct(formData) {
    return await apiClient(`/products`, {
        method: "POST",
        body: formData
    })
};


export async function getProductById(id) {
    return await apiClient(`/products/${id}`)
}

// Update product

export async function updateProduct(id, formData) {
    return await apiClient(`/products/${id}`, {
        method: "PUT",
        body: formData
    })
 
}
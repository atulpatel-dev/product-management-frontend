import { apiClient } from "./apiClient";

export async function loginUser(credentials) {
    return await apiClient("/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
}

export async function registerUser(userData) {
    return await apiClient("/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
}

export async function getProfile() {
    return await apiClient("/users/profile");
}
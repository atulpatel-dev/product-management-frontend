import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { getProfile } from "../api/userApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("token"))
    );

    const [user, setUser] = useState(null);

    const [authLoading, setAuthLoading] = useState(true);

    async function loadUser() {

        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            setIsLoggedIn(false);
            return;
        }

        try {

            const data = await getProfile();

            setUser(data.user);
            setIsLoggedIn(true);

        } catch (error) {

            localStorage.removeItem("token");

            setUser(null);
            setIsLoggedIn(false);

        }
    }

    useEffect(() => {

        async function initializeAuth() {

            try {
                await loadUser();
            } finally {
                setAuthLoading(false);
            }

        }

        initializeAuth();

    }, []);

    async function login(token) {

        localStorage.setItem("token", token);

        setIsLoggedIn(true);

        try {

            const data = await getProfile();

            setUser(data.user);

        } catch (error) {

            localStorage.removeItem("token");

            setUser(null);
            setIsLoggedIn(false);

            throw error;
        }
    }

    function logout() {

        localStorage.removeItem("token");

        setIsLoggedIn(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                authLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
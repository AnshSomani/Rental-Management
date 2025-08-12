import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const AppContext = createContext();

// Create a custom hook to use the app context
export const useApp = () => {
    return useContext(AppContext);
};

// Create the provider component
export const AppProvider = ({ children }) => {
    // --- STATE MANAGEMENT ---
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- EFFECTS ---
    // Load user from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // --- API FUNCTIONS ---
    // User login
    const login = async (email, password, role) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/users/login', { email, password, role }, config);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        }
    };

    // User logout
    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };
    
    // Fetch all products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/products');
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Could not fetch products');
            setLoading(false);
        }
    };

    // --- CART & WISHLIST FUNCTIONS ---
    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    };
    
    const addToWishlist = (product) => {
        setWishlist(prevWishlist => [...prevWishlist, product]);
    };

    // --- CONTEXT VALUE ---
    const value = {
        user,
        products,
        cart,
        wishlist,
        loading,
        error,
        login,
        logout,
        fetchProducts,
        addToCart,
        addToWishlist,
    };

    return (
        <AppContext.Provider value={value}>
            {!loading && children}
        </AppContext.Provider>
    );
};
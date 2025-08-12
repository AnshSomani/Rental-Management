import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const AppContext = createContext();

// Create a custom hook to use the app context
export const useApp = () => {
    return useContext(AppContext);
};

// Helper to set/remove Authorization header
const setAxiosAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Create the provider component
export const AppProvider = ({ children }) => {
    // --- STATE MANAGEMENT ---
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [customerQuotations, setCustomerQuotations] = useState([]);
    const [lenderQuotations, setLenderQuotations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- EFFECTS ---
    // Load user from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setAxiosAuthHeader(parsed.token);
        }
        setLoading(false);
    }, []);

    // --- API FUNCTIONS ---
    // User login
    const login = async (email, password, role) => {
        try {
            const payload = role ? { email, password, role } : { email, password };
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/users/login', payload, config);
            setUser(data);
            setAxiosAuthHeader(data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        }
    };

    // User register
    const register = async ({ name, email, phone, password, role = 'customer' }) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/users', { name, email, phone, password, role }, config);
            setUser(data);
            setAxiosAuthHeader(data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        }
    };

    // User logout
    const logout = () => {
        localStorage.removeItem('userInfo');
        setAxiosAuthHeader(null);
        setUser(null);
        setCart([]);
        setWishlist([]);
        setCustomerQuotations([]);
        setLenderQuotations([]);
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

    const fetchProductById = async (id) => {
        const { data } = await axios.get(`/api/products/${id}`);
        return data;
    };

    const fetchMyProducts = async () => {
        const { data } = await axios.get('/api/products/myproducts');
        setMyProducts(data);
        return data;
    };

    // Quotations
    const fetchMyQuotations = async () => {
        const { data } = await axios.get('/api/quotations/myquotations');
        setCustomerQuotations(data);
        return data;
    };

    const fetchLenderQuotations = async () => {
        const { data } = await axios.get('/api/quotations/lender');
        setLenderQuotations(data);
        return data;
    };

    const updateQuotationStatus = async (id, status) => {
        const { data } = await axios.put(`/api/quotations/${id}/status`, { status });
        // Refresh lender quotations after update
        await fetchLenderQuotations();
        return data;
    };

    const requestQuotation = async ({ productsPayload, totals, delivery }) => {
        // productsPayload: [{ product: productId, quantity, price }]
        // totals: { totalPrice, tax, deliveryCharge, finalAmount }
        // delivery: { deliveryMethod, rentalPeriod, deliveryAddress, invoiceAddress, pickupAddress }
        const { data } = await axios.post('/api/quotations', {
            products: productsPayload,
            ...totals,
            ...delivery,
        });
        return data;
    };

    const fetchQuotationById = async (id) => {
        const { data } = await axios.get(`/api/quotations/${id}`);
        return data;
    };

    // Profile
    const updateUser = async ({ name, phone, password }) => {
        const { data } = await axios.put('/api/users/profile', { name, phone, password });
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    };

    // --- CART & WISHLIST FUNCTIONS ---
    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existing = prevCart.find(item => (item.product._id || item.product.id) === (product._id || product.id));
            if (existing) {
                return prevCart.map(item => (item.product._id || item.product.id) === (product._id || product.id)
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                );
            }
            return [...prevCart, { product, quantity }];
        });
    };

    const updateCartQuantity = (productId, nextQty) => {
        setCart(prevCart => prevCart.map(item => (item.product._id || item.product.id) === productId ? { ...item, quantity: nextQty } : item));
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => (item.product._id || item.product.id) !== productId));
    };
    
    const addToWishlist = (product) => {
        setWishlist(prevWishlist => [...prevWishlist, product]);
    };

    // --- CONTEXT VALUE ---
    const value = {
        user,
        products,
        myProducts,
        cart,
        wishlist,
        customerQuotations,
        lenderQuotations,
        loading,
        error,
        login,
        logout,
        register,
        fetchProducts,
        fetchProductById,
        fetchMyProducts,
        fetchMyQuotations,
        fetchLenderQuotations,
        updateQuotationStatus,
        requestQuotation,
        fetchQuotationById,
        updateUser,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        addToWishlist,
    };

    return (
        <AppContext.Provider value={value}>
            {!loading && children}
        </AppContext.Provider>
    );
};
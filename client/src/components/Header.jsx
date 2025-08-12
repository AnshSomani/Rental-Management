import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, ShoppingCartIcon, HeartIcon, UserIcon, ChevronDownIcon } from '../assets/icons.jsx';
// import { useApp } from '../context/AppContext'; // This will be used later

const Header = () => {
    // const { user, logout, cart } = useApp(); // This will be replaced by context
    const user = { name: 'Adam', role: 'customer' }; // Placeholder for now
    const cart = []; // Placeholder for now
    const navigate = useNavigate();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const handleLogout = () => {
        // logout(); // This will be enabled later
        navigate('/login');
    };

    return (
        <header className="bg-gray-800 border-b border-gray-600 p-4 flex justify-between items-center text-white sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <Link to="/" className="p-2 rounded-md hover:bg-gray-700">
                    <HomeIcon />
                </Link>
                <Link to="/" className="px-4 py-2 rounded-md hover:bg-gray-700">
                    Rental Shop
                </Link>
                {user && (
                    <>
                        <Link to="/wishlist" className="px-4 py-2 rounded-md hover:bg-gray-700">Wishlist</Link>
                        <Link to="/my-orders" className="px-4 py-2 rounded-md hover:bg-gray-700">My Orders</Link>
                    </>
                )}
            </div>
            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <Link to="/cart" className="relative p-2 rounded-md hover:bg-gray-700">
                            <ShoppingCartIcon />
                            {cart && cart.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            )}
                        </Link>
                        <div className="relative">
                            <button onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700">
                                <UserIcon />
                                <span>{user?.name}</span>
                                <ChevronDownIcon className="h-4 w-4"/>
                            </button>
                            {showProfileDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1">
                                    <Link to="/profile" className="w-full text-left block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600" onClick={() => setShowProfileDropdown(false)}>
                                        Edit Details
                                    </Link>
                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
                        Login / Register
                    </Link>
                )}
                <Link to="/contact" className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500">
                    Contact Us
                </Link>
            </div>
        </header>
    );
};

export default Header;

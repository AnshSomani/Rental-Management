import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    FiShoppingBag, 
    FiHome,
    FiUser,
    FiLogOut
 } from 'react-icons/fi';

const Header = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check localStorage for user info on initial render
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo);
            // This assumes your userInfo object has a 'user' property
            setUser(parsedUser.user); 
            setIsLoggedIn(true);
        } else {
            setUser(null);
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]); // Added isLoggedIn to the dependency array

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        // Setting state to false will trigger the useEffect and re-render the component
        setIsLoggedIn(false); 
        navigate('/login');
    };

    return (
        <header className="bg-white text-gray-800 shadow-md">
            <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
                {/* Left side: Website Name */}
                <div>
                    <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-indigo-600">
                        <FiShoppingBag className="w-7 h-7" />
                        <span>Rent It</span>
                    </Link>
                </div>
                
                {/* Right side: All other links and buttons */}
                <div className="flex items-center space-x-6 font-medium">
                    <Link to="/rental-shop" className="text-gray-600 hover:text-indigo-600 transition-colors">
                        Products
                    </Link>
                    <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">
                        Contact Us
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                Dashboard
                            </Link>
                            {user && user.role === 'admin' && (
                                <Link to="/admin" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    Admin
                                </Link>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-indigo-600">{user?.name}</span>
                                <button onClick={handleLogout} className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    <FiLogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                <span className="flex items-center gap-2"><FiUser />Login</span>
                            </Link>
                            <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;

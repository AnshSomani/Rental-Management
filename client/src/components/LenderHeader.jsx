import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, ChevronDownIcon } from '../assets/icons.jsx';
import { useApp } from '../context/AppContext';

const LenderHeader = () => {
    const { user, logout } = useApp();
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const NavButton = ({ to, label }) => {
        const isActive = location.pathname === to;
        return (
            <Link to={to} className={`px-4 py-2 rounded-md ${isActive ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}>{label}</Link>
        );
    };

    return (
        <header className="bg-gray-800 border-b border-gray-600 p-4 flex justify-between items-center text-white sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <Link to="/dashboard" className="p-2 rounded-md hover:bg-gray-700">
                    <HomeIcon />
                </Link>
                <NavButton to="/dashboard" label="Dashboard" />
                <NavButton to="/lender/rentals" label="Rental" />
                <NavButton to="/lender/orders" label="Order" />
                <NavButton to="/lender/products" label="Products" />
            </div>
            <div className="flex items-center gap-6">
                <div className="relative">
                    <button onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700">
                        <UserIcon />
                        <span>{user?.name}</span>
                        <ChevronDownIcon className="h-4 w-4" />
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
            </div>
        </header>
    );
};

export default LenderHeader;

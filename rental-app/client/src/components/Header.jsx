import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo);
            setUser(parsedUser.user);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        setIsLoggedIn(false);
        navigate('/login');
        window.location.reload();
    };

    return (
        <header>
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#333', color: 'white' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>RentalApp</Link>
                <div>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Products</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Dashboard</Link>
                            {user && user.role === 'admin' && (
                                <Link to="/admin" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Admin</Link>
                            )}
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Login</Link>
                            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
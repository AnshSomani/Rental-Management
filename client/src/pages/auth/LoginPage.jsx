import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const LoginPage = () => {
    const { login, user } = useApp();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            navigate(user.role === 'lender' ? '/dashboard' : '/');
        }
    }, [user, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await login(email, password, role);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };
    
    // Pre-fill credentials based on role for easier testing
    useEffect(() => {
        if (role === 'lender') {
            setEmail('lender@example.com');
            setPassword('password123');
        } else {
            setEmail('adam@example.com');
            setPassword('password123');
        }
    }, [role]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                <h1 className="text-3xl font-bold text-center text-white mb-6">Sign In</h1>
                
                <div className="flex bg-gray-700 rounded-md p-1 mb-4">
                    <button 
                        onClick={() => setRole('customer')} 
                        className={`w-1/2 py-2 rounded transition-colors ${role === 'customer' ? 'bg-indigo-600' : 'hover:bg-gray-600'}`}
                    >
                        Customer
                    </button>
                    <button 
                        onClick={() => setRole('lender')} 
                        className={`w-1/2 py-2 rounded transition-colors ${role === 'lender' ? 'bg-indigo-600' : 'hover:bg-gray-600'}`}
                    >
                        Lender
                    </button>
                </div>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            required 
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 py-2.5 rounded-lg hover:bg-indigo-500 font-semibold transition-colors"
                    >
                        SIGN IN
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link to="/register" className="text-indigo-400 hover:underline">
                        Don't have an account? Register
                    </Link>
                </div>
                 <div className="text-center mt-2">
                    <Link to="/forgot-password" className="text-sm text-indigo-400 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

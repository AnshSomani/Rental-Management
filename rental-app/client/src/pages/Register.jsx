import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiShield,
} from 'react-icons/fi';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Post registration data to backend
      const { data } = await axios.post('/api/auth/register', formData);

      // Store the JWT token and user data in local storage
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Auto-login successful, redirect to the rental shop
      navigate('/rental-shop');
      window.location.reload(); // Force a full page reload to update the auth state

    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed. Please try again.';
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #d8b4fe 0%, transparent 50%), 
                              radial-gradient(circle at 75% 75%, #a5b4fc 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/90 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700 rounded-t-2xl" />

          <div className="text-center mb-6">
            <div className="mx-auto w-14 h-14 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg flex items-center justify-center mb-3 shadow-lg">
              <FiShield className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-800 to-purple-900 bg-clip-text text-transparent mb-1">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-purple-800 hover:text-purple-700 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={onChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-100 border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  placeholder="email@example.com"
                  className="w-full bg-slate-100 border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={onChange}
                  required
                  placeholder="Enter a strong password"
                  className="w-full bg-slate-100 border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700 transition"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                isLoading
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-800 to-purple-900 hover:from-indigo-900 hover:to-purple-900 hover:scale-[1.02] shadow-lg shadow-purple-400/50 active:scale-[0.98]'
              }`}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-xs">
            By registering, you agree to our Terms & Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );
}
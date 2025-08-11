import React, { useState } from 'react';
import { FiMail, FiUser, FiMessageSquare, FiArrowRight, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        // Simulate a backend API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            if (formData.name && formData.email && formData.message) {
                setSuccessMessage('Thank you for your message! We will get back to you shortly.');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setErrorMessage('Please fill out all fields.');
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #d8b4fe 0%, transparent 50%), 
                                      radial-gradient(circle at 75% 75%, #a5b4fc 0%, transparent 50%)`
                }}></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* MODIFICATION: Adjusted padding for smaller screens (p-6) and larger screens (sm:p-8) */}
                <div className="bg-white/80 backdrop-blur-xl border border-gray-200/90 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700 rounded-t-2xl"></div>
                    
                    {/* MODIFICATION: Adjusted margin-bottom for responsiveness */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                            <FiPhone className="text-white text-2xl" />
                        </div>
                        {/* MODIFICATION: Adjusted font size for responsiveness (text-2xl on small, text-3xl on larger) */}
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-800 to-purple-900 bg-clip-text text-transparent mb-2">
                            Reach Out to Us
                        </h1>
                        <p className="text-gray-500 text-sm">We're here to help! Fill out the form to get in touch.</p>
                    </div>

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 text-sm text-center">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm text-center">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={onChange}
                                    required
                                    placeholder="Enter your name"
                                    className="w-full bg-slate-100 border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700 transition"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={onChange}
                                    required
                                    placeholder="Enter your email"
                                    className="w-full bg-slate-100 border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700 transition"
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Message
                            </label>
                            <div className="relative">
                                <FiMessageSquare className="absolute left-3 top-4 text-gray-400 text-lg" />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={onChange}
                                    required
                                    rows="5"
                                    placeholder="Your message..."
                                    className="w-full bg-slate-100 border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700 transition"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 focus:ring-offset-white ${
                                isLoading
                                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-indigo-800 to-purple-900 hover:from-indigo-900 hover:to-purple-900 hover:scale-[1.02] shadow-lg shadow-purple-400/50 active:scale-[0.98]'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                    Sending...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    Send Message
                                    <FiArrowRight className="ml-2 text-lg" />
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-500 text-xs mt-6">
                    You can also find us on our main platform.
                </p>
            </div>
        </div>
    );
};

export default ContactUs;

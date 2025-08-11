import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiGrid, FiList, FiFilter, FiChevronDown, FiSearch, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const RentalShop = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [view, setView] = useState('card'); // 'card' or 'list'

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products from your backend API
                const { data } = await axios.get('/api/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const renderCardView = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
                <div key={product._id} className="bg-[#191c2a]/90 backdrop-blur-xl border border-[#2d3748]/60 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.01]">
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-200">{product.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">{product.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xl font-bold text-white">₹{product.pricing[0]?.rate || 'N/A'}</span>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 rounded-full bg-[#23253c] text-gray-400 hover:text-red-400 hover:bg-red-900/30 transition-colors">
                                    <FiHeart />
                                </button>
                                <button className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
                                    <FiShoppingBag />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderListView = () => (
        <div className="space-y-4">
            {products.map(product => (
                <div key={product._id} className="bg-[#191c2a]/90 backdrop-blur-xl border border-[#2d3748]/60 rounded-xl shadow-lg p-4 flex items-center justify-between transition-transform transform hover:scale-[1.01]">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-200">{product.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">{product.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-xl font-bold text-white">₹{product.pricing[0]?.rate || 'N/A'}</span>
                        <button className="p-2 rounded-full bg-[#23253c] text-gray-400 hover:text-red-400 hover:bg-red-900/30 transition-colors">
                            <FiHeart />
                        </button>
                        <button className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
                            <FiShoppingBag />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-300">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-300">
                <p>An error occurred while fetching products. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#131622] to-[#1a1d2e] text-white pt-24 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filter */}
                <aside className="lg:col-span-1 bg-[#191c2a]/90 backdrop-blur-xl border border-[#2d3748]/60 rounded-xl shadow-2xl p-6 h-fit sticky top-24">
                    <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                        <FiFilter className="text-indigo-400" />
                        <span>Filters</span>
                    </h2>
                    
                    {/* Filter categories */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-gray-300 font-medium mb-2">Categories</h3>
                            <div className="space-y-1 text-sm text-gray-400">
                                {/* Sample Categories */}
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded bg-[#23253c] border-[#2d3748] text-indigo-500 focus:ring-indigo-500" />
                                    <span>Category 1</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded bg-[#23253c] border-[#2d3748] text-indigo-500 focus:ring-indigo-500" />
                                    <span>Category 2</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded bg-[#23253c] border-[#2d3748] text-indigo-500 focus:ring-indigo-500" />
                                    <span>Category 3</span>
                                </label>
                            </div>
                        </div>
                        {/* Price range filter */}
                        <div>
                            <h3 className="text-gray-300 font-medium mb-2">Price Range</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                                <input type="number" placeholder="Min" className="w-full bg-[#23253c] border border-[#2d3748] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                                <span>-</span>
                                <input type="number" placeholder="Max" className="w-full bg-[#23253c] border border-[#2d3748] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Display */}
                <div className="lg:col-span-3">
                    {/* Toolbar for view and sort options */}
                    <div className="flex items-center justify-between mb-6 p-4 bg-[#191c2a]/90 backdrop-blur-xl border border-[#2d3748]/60 rounded-xl">
                        <div className="relative">
                            <select className="bg-[#23253c] border border-[#2d3748] rounded-xl px-4 py-2 text-sm text-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500">
                                <option>Price List</option>
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-400 text-sm">Sort by:</span>
                            <div className="relative">
                                <select className="bg-[#23253c] border border-[#2d3748] rounded-xl px-4 py-2 text-sm text-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500">
                                    <option>Name (A-Z)</option>
                                    <option>Price (Low to High)</option>
                                    <option>Price (High to Low)</option>
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => setView('card')} className={`p-2 rounded-lg transition-colors ${view === 'card' ? 'bg-indigo-500 text-white' : 'bg-[#23253c] text-gray-400 hover:text-white'}`}>
                                    <FiGrid />
                                </button>
                                <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-indigo-500 text-white' : 'bg-[#23253c] text-gray-400 hover:text-white'}`}>
                                    <FiList />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Render products based on the selected view */}
                    {view === 'card' ? renderCardView() : renderListView()}
                </div>
            </div>
        </div>
    );
};

export default RentalShop;

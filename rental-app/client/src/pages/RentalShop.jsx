import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiGrid, FiList, FiFilter, FiChevronDown, FiSearch, FiHeart, FiShoppingBag, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const RentalShop = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [view, setView] = useState('card'); // 'card' or 'list'

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // MODIFICATION: Switched back to fetching dynamic data from the API
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
                <div key={product._id} className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-full h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                        <img 
                            src={product.images && product.images[0] ? product.images[0] : 'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="font-bold text-gray-800 text-md mb-1 truncate w-full">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden">{product.description}</p>
                    <div className="mt-auto w-full flex items-center justify-between">
                        <span className="text-xl font-bold text-purple-800">₹{product.pricing[0]?.rate || 'N/A'}</span>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 rounded-lg bg-gray-200 text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors">
                                <FiHeart size={18}/>
                            </button>
                            <button className="p-2 rounded-lg bg-gradient-to-r from-indigo-800 to-purple-900 text-white hover:opacity-90 transition-opacity">
                                <FiShoppingBag size={18}/>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderListView = () => (
        <div className="space-y-4">
            {products.map(product => (
                <div key={product._id} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center space-x-6 shadow-sm w-full hover:shadow-md hover:border-purple-300 transition-all">
                    <div className="w-24 h-24 rounded-xl flex-shrink-0 overflow-hidden bg-gray-200">
                        <img 
                            src={product.images && product.images[0] ? product.images[0] : 'https://placehold.co/200x200/e2e8f0/64748b?text=No+Image'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                    </div>
                    <div className="flex items-center space-x-4 flex-shrink-0">
                        <span className="text-xl font-bold text-purple-800">₹{product.pricing[0]?.rate || 'N/A'}</span>
                        <button className="p-2 rounded-lg bg-gray-200 text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors">
                            <FiHeart />
                        </button>
                        <button className="p-2 rounded-lg bg-gradient-to-r from-indigo-800 to-purple-900 text-white hover:opacity-90 transition-opacity">
                            <FiShoppingBag />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-700">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                <p>An error occurred while fetching products. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 pt-8 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filter */}
                <aside className="lg:col-span-1 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-fit sticky top-8">
                    <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                        <FiFilter className="text-purple-800" />
                        <span>Filters</span>
                    </h2>
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-gray-800 font-semibold mb-3">Categories</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                                    <span>Category 1</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                                    <span>Category 2</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                                    <span>Category 3</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-800 font-semibold mb-3">Price Range</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <input type="number" placeholder="Min" className="w-full bg-gray-100 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                                <span>-</span>
                                <input type="number" placeholder="Max" className="w-full bg-gray-100 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Display */}
                <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-6 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div className="relative">
                            <select className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500">
                                <option>Price List</option>
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600 text-sm font-medium">Sort by:</span>
                            <div className="relative">
                                <select className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500">
                                    <option>Name (A-Z)</option>
                                    <option>Price (Low to High)</option>
                                    <option>Price (High to Low)</option>
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="flex items-center space-x-1 bg-gray-200 p-1 rounded-lg">
                                <button onClick={() => setView('card')} className={`p-2 rounded-md transition-colors ${view === 'card' ? 'bg-white shadow' : 'bg-transparent text-gray-500 hover:bg-white'}`}>
                                    <FiGrid className={view === 'card' ? 'text-purple-800' : ''} />
                                </button>
                                <button onClick={() => setView('list')} className={`p-2 rounded-md transition-colors ${view === 'list' ? 'bg-white shadow' : 'bg-transparent text-gray-500 hover:bg-white'}`}>
                                    <FiList className={view === 'list' ? 'text-purple-800' : ''} />
                                </button>
                                <Link to="/dashboard" className="p-2 rounded-md transition-colors bg-transparent text-gray-500 hover:bg-white hover:text-purple-800">
                                    <FiShoppingCart />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {view === 'card' ? renderCardView() : renderListView()}
                </div>
            </div>
        </div>
    );
};

export default RentalShop;

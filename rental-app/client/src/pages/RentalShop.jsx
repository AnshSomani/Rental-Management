import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiGrid, FiList, FiFilter, FiChevronDown, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const RentalShop = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [view, setView] = useState('card');

    useEffect(() => {
        const fetchProducts = async () => {
          try {
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
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );

    const renderListView = () => (
        <div className="space-y-4">
            {products.map(product => (
                <Link to={`/products/${product._id}`} key={product._id} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center space-x-6 shadow-sm w-full hover:shadow-md hover:border-purple-300 transition-all">
                    <div className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">🛍</div>
                    <div className="flex-grow">
                        <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                    </div>
                    <div className="flex items-center space-x-4 flex-shrink-0">
                        <span className="text-xl font-bold text-purple-800">₹{product.pricing[0]?.rate || 'N/A'}</span>
                        <button className="p-2 rounded-lg bg-gradient-to-r from-indigo-800 to-purple-900 text-white hover:opacity-90 transition-opacity">Rent</button>
                    </div>
                </Link>
            ))}
        </div>
    );

    if (isLoading) return (<div className="min-h-screen flex items-center justify-center text-gray-700">Loading products...</div>);
    if (isError) return (<div className="min-h-screen flex items-center justify-center text-red-600">Failed to load products.</div>);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 pt-8 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-fit sticky top-8">
                    <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                        <FiFilter className="text-purple-800" />
                        <span>Filters</span>
                    </h2>
                </aside>
                <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-6 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div className="relative">
                            <select className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 appearance-none">
                                <option>Price List</option>
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600 text-sm font-medium">Sort by:</span>
                            <div className="flex items-center space-x-1 bg-gray-200 p-1 rounded-lg">
                                <button onClick={() => setView('card')} className={`p-2 rounded-md ${view === 'card' ? 'bg-white shadow' : 'bg-transparent text-gray-500 hover:bg-white'}`}>
                                    <FiGrid className={view === 'card' ? 'text-purple-800' : ''} />
                                </button>
                                <button onClick={() => setView('list')} className={`p-2 rounded-md ${view === 'list' ? 'bg-white shadow' : 'bg-transparent text-gray-500 hover:bg-white'}`}>
                                    <FiList className={view === 'list' ? 'text-purple-800' : ''} />
                                </button>
                                <Link to="/dashboard" className="p-2 rounded-md bg-transparent text-gray-500 hover:bg-white hover:text-purple-800"><FiShoppingCart /></Link>
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

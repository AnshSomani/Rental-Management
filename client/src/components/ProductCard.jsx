import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, StarIcon } from '../assets/icons.jsx';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
    const { addToCart, addToWishlist } = useApp();

    const handleAction = (action) => {
        action();
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col justify-between text-white shadow-lg hover:shadow-indigo-500/20 transition-shadow duration-300">
            <Link to={`/product/${product._id || product.id}`}>
                <img 
                    src={product.imageUrl || 'https://placehold.co/600x400/111827/7C8B9A?text=No+Image'} 
                    alt={product.name || 'Product'} 
                    className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer" 
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/111827/7C8B9A?text=No+Image'; }}
                />
                <h3 className="text-lg font-semibold mb-2 truncate" title={product.name || 'Product'}>{product.name || 'Unnamed Product'}</h3>
            </Link>
            <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold text-indigo-400">
                    ₹{(product.priceList?.day ?? 0)}
                    <span className="text-sm font-normal text-gray-400">/day</span>
                </p>
                <div className="flex items-center gap-1 text-yellow-400">
                    <StarIcon filled={true} className="w-5 h-5"/> 
                    <span>{product.rating || 4.5}</span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <button 
                    onClick={() => handleAction(() => addToCart(product))} 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-500 transition-colors"
                >
                    Add to Cart
                </button>
                <button 
                    onClick={() => handleAction(() => addToWishlist(product))} 
                    className={`p-2 rounded-full hover:bg-gray-700`}
                >
                    <HeartIcon filled={false} />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

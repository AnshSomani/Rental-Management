import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, StarIcon } from '../assets/icons.jsx'; // Assuming you have these icons
import { useApp } from '../context/AppContext'; // Assuming you have this context

// --- IMPORTANT ---
// Your server needs to be configured to serve static files.
// If your images are in a folder named 'uploads' in your server's root,
// you would add this line to your main server file (e.g., server.js):
// app.use('/uploads', express.static('uploads'));
// This makes the images accessible at http://<your_server_address>/uploads/<image_name>

const ProductCard = ({ product }) => {
    const { addToCart, addToWishlist } = useApp();

    // Get the server's base URL from environment variables, with a fallback for development
    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

    // Construct the full, absolute URL for the product image
    // This handles cases where the path might use backslashes (e.g., from Windows)
    const imageUrl = product.imageUrl
        ? `${API_URL}/${product.imageUrl.replace(/\\/g, '/')}`
        : 'https://placehold.co/600x400/111827/7C8B9A?text=No+Image';

    const handleAction = (action) => {
        action();
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col justify-between text-white shadow-lg hover:shadow-indigo-500/20 transition-shadow duration-300">
            <Link to={`/product/${product._id || product.id}`}>
                <img 
                    src={imageUrl} 
                    alt={product.name || 'Product'} 
                    className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer" 
                    // Fallback in case the constructed URL fails to load
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/111827/7C8B9A?text=No+Image'; }}
                />
                <h3 className="text-lg font-semibold mb-2 truncate" title={product.name || 'Product'}>{product.name || 'Unnamed Product'}</h3>
            </Link>
            <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold text-indigo-400">
                    {/* Using optional chaining for safety in case priceList or day is missing */}
                    ₹{product.priceList?.day ?? 0}
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

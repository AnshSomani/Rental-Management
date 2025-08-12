import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { StarIcon, HeartIcon } from '../../assets/icons.jsx';
import QuantityInput from '../../components/QuantityInput.jsx';
import { useApp } from '../../context/AppContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchProductById, addToCart, addToWishlist } = useApp();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleAction = (action) => {
        action();
    };

    if (loading) {
        return <div className="p-8 text-center text-white">Loading...</div>;
    }

    if (!product) {
        return <div className="p-8 text-center text-white">Product not found.</div>;
    }

    return (
        <div className="p-8 text-white">
            <div className="text-sm text-gray-400 mb-6">
                <Link to="/" className="hover:text-white">All Products</Link> / <span>{product.name}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <img 
                        src={product.imageUrl || 'https://placehold.co/600x400/111827/7C8B9A?text=No+Image'} 
                        alt={product.name || 'Product'} 
                        className="w-full h-auto object-cover rounded-lg shadow-lg mb-6"
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/111827/7C8B9A?text=No+Image'; }}
                    />
                    <button 
                        onClick={() => handleAction(() => addToWishlist(product))} 
                        className={`w-full py-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-colors border-gray-600 hover:bg-gray-700`}
                    >
                        <HeartIcon filled={false} /> Add to Wishlist
                    </button>
                </div>
                <div>
                    <span className="text-indigo-400 font-semibold">{product.category}</span>
                    <h1 className="text-4xl font-bold my-2">{product.name}</h1>
                    <div className="flex items-center gap-2 mb-4">
                        <StarIcon filled={true} className="text-yellow-400"/> 
                        <span className="text-lg">{product.rating || 4.5} ({product.purchaseCount || 0} rentals)</span>
                    </div>
                    <p className="text-3xl font-bold mb-4">
                        ₹{(product.priceList?.day ?? 0)} <span className="text-lg font-normal text-gray-400">/ per day</span>
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm mb-1">From:</label>
                            <input type="date" className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                        </div>
                        <div>
                            <label className="block text-sm mb-1">To:</label>
                            <input type="date" className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Quantity:</label>
                        <QuantityInput 
                            quantity={quantity} 
                            onDecrease={() => setQuantity(q => Math.max(1, q - 1))} 
                            onIncrease={() => setQuantity(q => q + 1)} 
                        />
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => handleAction(() => addToCart(product, quantity))} 
                            className="w-full bg-indigo-600 py-3 rounded-lg hover:bg-indigo-500 font-semibold transition-colors"
                        >
                            Add to Cart
                        </button>
                        <button 
                            onClick={() => handleAction(() => navigate('/cart'))} 
                            className="w-full bg-green-600 py-3 rounded-lg hover:bg-green-500 font-semibold transition-colors"
                        >
                            Request to Buy
                        </button>
                    </div>
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold">Terms & Conditions</h4>
                        <p className="text-sm text-gray-400">{product.terms}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;

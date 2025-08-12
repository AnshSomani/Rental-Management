import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard.jsx';
import { useApp } from '../../context/AppContext';

const WishlistPage = () => {
    const { wishlist } = useApp();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-white">My Wishlist</h1>
            {wishlist.length === 0 ? (
                <div className="text-center text-gray-400">
                    <p>Your wishlist is empty.</p>
                    <Link to="/" className="text-indigo-400 hover:underline mt-4 inline-block">
                        Explore products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map(product => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;

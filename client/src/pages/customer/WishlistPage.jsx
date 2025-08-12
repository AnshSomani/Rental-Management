import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard.jsx';
// import { useApp } from '../../context/AppContext'; // This will be used later

const WishlistPage = () => {
    // const { wishlist } = useApp(); // This will be replaced by context
    
    // Placeholder data until context is fully wired
    const wishlist = [
        { id: '3', name: 'Electric Mountain Bike', category: 'Sports Equipment', priceList: { day: 80 }, rating: 4.9, purchaseCount: 95, imageUrl: 'https://images.unsplash.com/photo-1575585252319-38ABC17c5147?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
    ];

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
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { FiHome, FiShoppingBag, FiHeart, FiUser, FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi';

// --- Placeholder Components (for a complete preview) ---

// A simple Navbar placeholder matching the established theme
const Navbar = () => (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center space-x-8">
                    <h1 className="text-2xl font-bold text-gray-800">Real Meerkat</h1>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-purple-800">
                            <FiHome size={20} />
                            <span>Home</span>
                        </Link>
                        <Link to="/rental-shop" className="flex items-center space-x-2 text-gray-600 hover:text-purple-800">
                            <FiShoppingBag size={20} />
                            <span>Rental Shop</span>
                        </Link>
                        <Link to="/wishlist" className="flex items-center space-x-2 text-gray-600 hover:text-purple-800">
                            <FiHeart size={20} />
                            <span>Wishlist</span>
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button className="flex items-center space-x-2 p-2 bg-gray-100 rounded-full">
                            <FiUser size={20} className="text-purple-800" />
                            <span className="font-semibold text-gray-700">Adam</span>
                        </button>
                    </div>
                    <Link to="/contact" className="hidden sm:flex items-center justify-center space-x-2 bg-indigo-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-900 transition-colors">
                        <FiPhone size={20} />
                        <span>Contact us</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
);

// A simple ProductCard placeholder for the "Related Products" section
const ProductCard = ({ product }) => (
    <div className="group bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative w-full h-48 mb-4">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-xl" />
            <div className="absolute top-2 left-2 bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                {product.category}
            </div>
        </div>
        <h3 className="font-bold text-gray-800 text-md mb-1 truncate w-full">{product.name}</h3>
        <p className="text-gray-500 mb-3">${product.price.toFixed(2)} / day</p>
        <button className="w-full bg-gradient-to-r from-indigo-800 to-purple-900 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
            View Item
        </button>
    </div>
);


// --- Main Page Data ---
const product = {
    id: 1,
    name: 'Pro Camera Lens - 24-70mm f/2.8',
    category: 'Electronics',
    description:
        'A versatile, high-performance zoom lens, perfect for professional photography and videography. Captures stunningly sharp images with beautiful bokeh. Ideal for events, portraits, and landscape shots.',
    price: 45.0,
    rating: 4.9,
    reviews: 124,
    lender: {
        name: 'Adam Smith',
        avatarUrl: 'https://placehold.co/100x100/c7d2fe/3730a3?text=A', // Light theme avatar
        rating: 4.8,
    },
    images: [
        'https://placehold.co/800x600/e2e8f0/64748b?text=Main+View',
        'https://placehold.co/400x400/e2e8f0/64748b?text=Side+View',
        'https://placehold.co/400x400/e2e8f0/64748b?text=Angled+View',
        'https://placehold.co/400x400/e2e8f0/64748b?text=In+Use',
    ],
};

const relatedProducts = [
    {
        id: 2,
        name: 'Mountain Bike',
        price: 75.0,
        category: 'Sports',
        imageUrl: 'https://placehold.co/400x400/e2e8f0/64748b?text=Bike',
    },
    {
        id: 3,
        name: 'Camping Tent',
        price: 35.0,
        category: 'Outdoors',
        imageUrl: 'https://placehold.co/400x400/e2e8f0/64748b?text=Tent',
    },
    {
        id: 4,
        name: 'Electric Drill',
        price: 25.0,
        category: 'Tools',
        imageUrl: 'https://placehold.co/400x400/e2e8f0/64748b?text=Drill',
    },
];

// --- Main Product Detail Page Component ---
const ProductDetailPage = () => {
    const [activeImage, setActiveImage] = useState(product.images[0]);

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr] lg:gap-12">
                    {/* Left Column: Image Gallery and Description */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                            <img
                                src={activeImage}
                                alt={product.name}
                                className="w-full h-[450px] object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-full h-[100px] object-cover rounded-lg border-2 cursor-pointer transition-colors ${
                                        activeImage === img
                                            ? 'border-purple-600'
                                            : 'border-gray-200 hover:border-purple-600'
                                    }`}
                                    onClick={() => setActiveImage(img)}
                                />
                            ))}
                        </div>
                        <p className="text-gray-600 text-base leading-7 mt-6">
                            {product.description}
                        </p>
                    </div>

                    {/* Right Column: Product Info and Rental Box */}
                    <div>
                        <div className="mb-6">
                            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                                {product.category}
                            </span>
                            <h1 className="text-4xl font-bold text-gray-900 mt-2">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-2 mt-2">
                                <Star className="h-5 w-5 text-amber-400" fill="currentColor" />
                                <span className="font-bold text-gray-900">{product.rating}</span>
                                <span className="text-gray-500">
                                    ({product.reviews} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Rental Box */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                            <p>
                                <span className="text-4xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-base font-medium text-gray-500 ml-1">
                                    / day
                                </span>
                            </p>

                            <div className="mt-6">
                                <label className="block font-medium mb-2 text-gray-700">
                                    Select Rental Dates
                                </label>
                                <div className="flex gap-4">
                                    <input
                                        type="date"
                                        className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                    <input
                                        type="date"
                                        className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                            </div>

                            <button className="w-full bg-gradient-to-r from-indigo-800 to-purple-900 hover:opacity-90 text-white font-semibold py-3 rounded-lg border-none cursor-pointer transition-opacity mt-6">
                                Rent Now
                            </button>

                            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                                <img
                                    src={product.lender.avatarUrl}
                                    alt={product.lender.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Lent by {product.lender.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Lender Rating: {product.lender.rating} ★
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <section className="py-16 border-t border-gray-200 mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">
                        You might also like
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetailPage;

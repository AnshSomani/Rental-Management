import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../../components/ProductCard.jsx';
import { GridIcon, ListIcon, SearchIcon } from '../../assets/icons.jsx';
import useDebounce from '../../hooks/useDebounce.js';
import { useApp } from '../../context/AppContext';

// A new component for the list view item, can be moved to its own file if preferred
const ProductListItem = ({ product }) => {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <div className="flex items-center gap-4 w-full sm:w-1/2">
                <img src={product.imageUrl || 'https://placehold.co/600x400/111827/7C8B9A?text=No+Image'} alt={product.name || 'Product'} className="w-24 h-24 object-cover rounded-md" />
                <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{product.name || 'Unnamed Product'}</h3>
                    <p className="text-gray-400 text-sm">{product.category || 'Other'}</p>
                </div>
            </div>
            <p className="text-xl font-bold text-indigo-400">₹{(product.priceList?.day ?? 0)}<span className="text-sm font-normal text-gray-400">/day</span></p>
            <div className="flex items-center gap-4">
                <button onClick={() => alert(`Use the product card to add to cart`)} className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition-colors">Add to Cart</button>
            </div>
        </div>
    );
};


const ShopPage = () => {
    const { products, fetchProducts } = useApp();
    const [isLoading, setIsLoading] = useState(false);
    
    const categories = ['All', 'Electronics', 'Outdoor Gear', 'Sports Equipment', 'Tools'];


    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('rating');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const productsPerPage = viewMode === 'grid' ? 6 : 4;

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                setIsLoading(true);
                await fetchProducts();
            } finally {
                if (isMounted) setIsLoading(false);
            }
        })();
        return () => { isMounted = false; };
    }, []);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products || [];
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }
        if (debouncedSearchQuery) {
            filtered = filtered.filter(p => (p.name || '').toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
        }
        return [...filtered].sort((a, b) => {
            switch (sortOption) {
                case 'rating': return (b.rating || 0) - (a.rating || 0);
                case 'purchases': return (b.purchaseCount || 0) - (a.purchaseCount || 0);
                case 'price-lh': return (a.priceList?.day ?? 0) - (b.priceList?.day ?? 0);
                case 'price-hl': return (b.priceList?.day ?? 0) - (a.priceList?.day ?? 0);
                default: return 0;
            }
        });
    }, [debouncedSearchQuery, sortOption, selectedCategory, products]);
    
    const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage) || 1;
    const paginatedProducts = filteredAndSortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    return (
        <div className="p-8">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }} 
                        className={`flex-shrink-0 px-4 py-2 rounded-md ${selectedCategory === cat ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4">
                    <h3 className="text-xl font-semibold mb-4 text-white">Filters</h3>
                    {/* Add filter components here later */}
                </aside>
                <main className="w-full md:w-3/4">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                        <div className="relative w-full sm:w-auto">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                value={searchQuery} 
                                onChange={e => setSearchQuery(e.target.value)} 
                                className="bg-gray-700 border-gray-600 rounded-md pl-10 p-2 w-full sm:w-64 text-white" 
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <select value={sortOption} onChange={e => setSortOption(e.target.value)} className="bg-gray-700 border-gray-600 rounded-md p-2 text-white">
                                <option value="rating">Sort by: High Rating</option>
                                <option value="purchases">Sort by: Popularity</option>
                                <option value="price-lh">Sort by: Price Low to High</option>
                                <option value="price-hl">Sort by: Price High to Low</option>
                            </select>
                            <div className="flex border border-gray-600 rounded-md text-white">
                                <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-indigo-600' : ''}`}><GridIcon /></button>
                                <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-indigo-600' : ''}`}><ListIcon /></button>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="text-center text-gray-400">Loading products...</div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedProducts.map(p => <ProductCard key={p._id || p.id} product={p} />)}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {paginatedProducts.map(p => <ProductListItem key={p._id || p.id} product={p} />)}
                        </div>
                    )}
                    
                    <div className="flex justify-center items-center mt-8 gap-2">
                         {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                             <button 
                                key={page} 
                                onClick={() => setCurrentPage(page)} 
                                className={`px-4 py-2 rounded-md text-white ${currentPage === page ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                                 {page}
                             </button>
                         ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ShopPage;

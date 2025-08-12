import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { ProductCard } from '../components/rentals/ProductCard';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import '../styles/HomePage.css';
// Placeholder data
const featuredProducts = [
  { id: 1, name: 'Pro Camera Lens', price: 45.00, category: 'Electronics', imageUrl: 'https://placehold.co/400x400/1e293b/94a3b8?text=Lens' },
  { id: 2, name: 'Mountain Bike', price: 75.00, category: 'Sports', imageUrl: 'https://placehold.co/400x400/1e293b/94a3b8?text=Bike' },
  { id: 3, name: 'Camping Tent', price: 35.00, category: 'Outdoors', imageUrl: 'https://placehold.co/400x400/1e293b/94a3b8?text=Tent' },
  { id: 4, name: 'Electric Drill', price: 25.00, category: 'Tools', imageUrl: 'https://placehold.co/400x400/1e293b/94a3b8?text=Drill' },
];
const allProducts = [...featuredProducts, { id: 5, name: 'Projector', price: 50.00, category: 'Electronics', imageUrl: 'https://placehold.co/400x400/1e293b/94a3b8?text=Projector' }];
const categories = ['Electronics', 'Sports', 'Outdoors', 'Tools', 'Events', 'Garden'];

export const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <Navbar />
      
      <section className="hero-section">
        <h1 className="hero-title">Rent Anything, Anytime</h1>
        <p className="hero-subtitle">From party equipment to professional tools, find what you need from lenders in your community.</p>
        <div className="hero-actions">
            <button className="hero-button primary">
                Explore Rentals <ArrowRight height={20} width={20} />
            </button>
            <button className="hero-button secondary">Become a Lender</button>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Featured Items</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="main-content-area">
        <div className="content-section" style={{paddingTop: 0, paddingBottom: 0}}>
            <div className="main-flex-container">
                <aside className="sidebar">
                    <h3 className="sidebar-title"><SlidersHorizontal /> Filter Options</h3>
                    <div className="filter-group">
                        <label htmlFor="category-select" className="filter-label">Category</label>
                        <select id="category-select" className="custom-select">
                            <option>All Categories</option>
                            {categories.map(cat => <option key={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="price-range" className="filter-label">Price Range</label>
                        <input type="range" id="price-range" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </aside>
                <div className="main-grid-container">
                    <div className="results-header">
                        <p className="results-text">Showing <span>{allProducts.length}</span> results</p>
                        <select className="custom-select" style={{width: 'auto'}}>
                            <option>Sort by: Popularity</option>
                        </select>
                    </div>
                    <div className="product-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
                        {allProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { ProductCard } from '../components/rentals/ProductCard';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import '../styles/HomePage.css';
import { useAuth } from '../context/AuthContext';

interface ProductDto {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  description: string;
}

export const HomePage: React.FC = () => {
  const { api } = useAuth();
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [api]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

  const featured = products.slice(0, 4);

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
          {loading && <p>Loading...</p>}
          {!loading && featured.map((product) => <ProductCard key={product.id} product={product as any} />)}
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
                        <p className="results-text">Showing <span>{products.length}</span> results</p>
                        <select className="custom-select" style={{width: 'auto'}}>
                            <option>Sort by: Newest</option>
                        </select>
                    </div>
                    <div className="product-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
                        {products.map((product) => <ProductCard key={product.id} product={product as any} />)}
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

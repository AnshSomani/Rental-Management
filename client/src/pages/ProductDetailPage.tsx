import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { ProductCard } from '../components/rentals/ProductCard';
import { Star } from 'lucide-react';
import '../styles/ProductDetailPage.css';
import { useAuth } from '../context/AuthContext';

interface ProductDto {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { api } = useAuth();
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [all, setAll] = useState<ProductDto[]>([]);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const [{ data: detail }, { data: list }] = await Promise.all([
        api.get(`/products/${id}`),
        api.get('/products'),
      ]);
      setProduct(detail);
      setAll(list);
      setActiveImage(detail.imageUrl || 'https://placehold.co/800x600/1e293b/94a3b8?text=Image');
    };
    load();
  }, [api, id]);

  const related = useMemo(() => all.filter((p) => p.id !== id).slice(0, 3), [all, id]);

  if (!product) return (
    <div className="product-detail-page">
      <Navbar />
      <div className="product-detail-container"><p>Loading...</p></div>
    </div>
  );

  return (
    <div className="product-detail-page">
      <Navbar />
      <div className="product-detail-container">
        <div className="product-grid-layout">
          {/* Left Column: Image Gallery & Description */}
          <div className="image-gallery">
            <div className="main-image-container">
              <img src={activeImage || ''} alt={product.name} className="main-image" />
            </div>
            <div className="thumbnail-grid">
              {[product.imageUrl].filter(Boolean).map((img, index) => (
                <img
                  key={index}
                  src={img as string}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail-image ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img as string)}
                />
              ))}
            </div>
            <p className="product-description">{product.description}</p>
          </div>

          {/* Right Column: Info and Booking */}
          <div>
            <div className="product-info-header">
              <span className="product-category-badge">{product.category}</span>
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating">
                <Star className="h-5 w-5 text-amber-400" fill="currentColor" />
                <span className="font-bold text-white">4.8</span>
                <span className="text-slate-400">(123 reviews)</span>
              </div>
            </div>
            
            <div className="rental-box">
              <p>
                <span className="rental-price">${product.price.toFixed(2)}</span>
                <span className="rental-price-unit">/ day</span>
              </p>
              <div className="date-picker-container">
                <label className="date-label">Select Rental Dates</label>
                <div className="date-inputs">
                  <input type="date" className="date-input" />
                  <input type="date" className="date-input" />
                </div>
              </div>
              <button className="rent-button">Rent Now</button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="related-products-section">
            <h2 className="section-title" style={{textAlign: 'left', marginBottom: '1.5rem'}}>You might also like</h2>
            <div className="product-grid">
                {related.map(p => <ProductCard key={p.id} product={p as any} />)}
            </div>
        </section>
      </div>
    </div>
  );
};

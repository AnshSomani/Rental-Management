import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { ProductCard } from '../components/rentals/ProductCard';
import { Star, Calendar } from 'lucide-react';
import '../styles/ProductDetailPage.css';

// --- Placeholder Data ---
const product = {
  id: 1,
  name: 'Pro Camera Lens - 24-70mm f/2.8',
  category: 'Electronics',
  description: 'A versatile, high-performance zoom lens, perfect for professional photography and videography. Captures stunningly sharp images with beautiful bokeh. Ideal for events, portraits, and landscape shots.',
  price: 45.00,
  rating: 4.9,
  reviews: 124,
  lender: {
    name: 'Adam Smith',
    avatarUrl: 'https://placehold.co/100x100/4f46e5/ffffff?text=A',
    rating: 4.8,
  },
  images: [
    'https://placehold.co/800x600/1e293b/94a3b8?text=Main+View',
    'https://placehold.co/400x400/1e293b/94a3b8?text=Side+View',
    'https://placehold.co/400x400/1e293b/94a3b8?text=Angled+View',
    'https://placehold.co/400x400/1e293b/94a3b8?text=In+Use',
  ]
};

const relatedProducts = [
  { id: 2, name: 'Mountain Bike', price: 75.00, category: 'Sports', imageUrl: 'https://placehold.co/400x400/1e293b/94a3b8?text=Bike' },
  { id: 3, name: 'Camping Tent', price: 35.00, category: 'Outdoors', imageUrl: 'https://placehold.co/400x400/1e293b/94a3b8?text=Tent' },
  { id: 4, name: 'Electric Drill', price: 25.00, category: 'Tools', imageUrl: 'https://placehold.co/400x400/1e293b/94a3b8?text=Drill' },
];


// --- Main Product Detail Page Component ---
export const ProductDetailPage: React.FC = () => {
  const [activeImage, setActiveImage] = useState(product.images[0]);

  return (
    <div className="product-detail-page">
      <Navbar />
      <div className="product-detail-container">
        <div className="product-grid-layout">
          
          {/* Left Column: Image Gallery & Description */}
          <div className="image-gallery">
            <div className="main-image-container">
              <img src={activeImage} alt={product.name} className="main-image" />
            </div>
            <div className="thumbnail-grid">
              {product.images.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail-image ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
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
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-slate-400">({product.reviews} reviews)</span>
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
              <div className="lender-info">
                <img src={product.lender.avatarUrl} alt={product.lender.name} className="lender-avatar" />
                <div>
                  <p className="lender-name">Lent by {product.lender.name}</p>
                  <p className="lender-rating">Lender Rating: {product.lender.rating} ★</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="related-products-section">
            <h2 className="section-title" style={{textAlign: 'left', marginBottom: '1.5rem'}}>You might also like</h2>
            <div className="product-grid">
                {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </section>
      </div>
    </div>
  );
};

import React from 'react';
import { Star } from 'lucide-react';
import './ProductCard.css'; // Import the new CSS file

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-image"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/1e293b/94a3b8?text=Image+Error'; }}
        />
        <div className="product-card-category">
          {product.category}
        </div>
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>
        <div className="product-card-details">
            <div>
                <p className="product-card-price-label">Starting from</p>
                <p className="product-card-price">
                    ${product.price.toFixed(2)}
                    <span className="product-card-price-unit">/day</span>
                </p>
            </div>
            <div className="product-card-rating">
                <Star className="product-card-star-icon" />
                <span className="product-card-rating-text">4.8</span>
            </div>
        </div>
        <button className="product-card-button">
          Rent Now
        </button>
      </div>
    </div>
  );
};

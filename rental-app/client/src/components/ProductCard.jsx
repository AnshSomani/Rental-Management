// client/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', borderRadius: '8px' }}>
      <img src={product.images[0] || 'https://placehold.co/200x200'} alt={product.name} style={{ width: '100%', height: 'auto' }} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <Link to={`/products/${product._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

export default ProductCard;
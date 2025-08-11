import React from "react";
import { Star } from "lucide-react";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const imageUrl = product.images?.[0] || 'https://placehold.co/400x300/e2e8f0/64748b?text=Product';
  const minRate = product.pricing && product.pricing.length ? Math.min(...product.pricing.map(p => p.rate)) : null;
  const unit = product.pricing && product.pricing.length ? product.pricing.find(p => p.rate === minRate)?.duration : 'day';

  return (
    <Link to={`/products/${product._id}`} className="group bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block">
      <div className="relative">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image'; }}
        />
        <div className="absolute top-0 left-0 bg-indigo-600 text-white px-3 py-1 text-xs font-bold rounded-br-lg">
          {product.category}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
        <div className="flex items-center justify-between text-slate-600">
          <div>
            <p className="text-xs">Starting from</p>
            <p className="text-xl font-bold text-indigo-700">
              {minRate !== null ? `₹${minRate}` : 'N/A'}
              <span className="text-sm font-normal text-slate-500">/{unit}</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-400 fill-current" />
            <span className="font-bold text-gray-900">4.8</span>
          </div>
        </div>
        <button className="w-full mt-4 bg-slate-800 text-white font-semibold py-2.5 rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          View Details
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
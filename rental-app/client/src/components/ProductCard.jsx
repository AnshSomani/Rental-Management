import React from "react";
import { Star } from "lucide-react";

// The TypeScript interfaces have been removed.

const ProductCard = ({ product }) => {
  return (
    // The "group" class is needed for the hover effect on the button
    <div className="group bg-slate-800 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/400x400/1e293b/94a3b8?text=Image+Error";
          }}
        />
        <div className="absolute top-0 left-0 bg-indigo-600 text-white px-3 py-1 text-xs font-bold rounded-br-lg">
          {product.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 truncate">
          {product.name}
        </h3>

        {/* Price & Rating */}
        <div className="flex items-center justify-between text-slate-400">
          <div>
            <p className="text-xs">Starting from</p>
            <p className="text-xl font-bold text-indigo-400">
              ${product.price.toFixed(2)}
              <span className="text-sm font-normal text-slate-500">/day</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-400 fill-current" />
            <span className="font-bold text-white">4.8</span>
          </div>
        </div>

        {/* Rent Button */}
        <button className="w-full mt-4 bg-slate-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 ease-in-out opacity-0 translate-y-2 hover:bg-indigo-600 group-hover:opacity-100 group-hover:translate-y-0">
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
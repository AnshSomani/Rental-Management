import React from 'react';
import { ShoppingCart, Heart, Box } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border border-gray-700 bg-gray-800 rounded-lg p-4 flex flex-col justify-between hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex-grow">
        <div className="bg-gray-700 aspect-square rounded-md flex items-center justify-center mb-4">
          <Box className="h-16 w-16 text-gray-500" />
        </div>
        <h3 className="font-semibold mb-1">{product.name}</h3>
        <p className="text-indigo-400 font-bold mb-4">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between text-sm">
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
          <Heart className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

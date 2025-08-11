import React from 'react';
import { Home, ShoppingBag, Heart, User, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="#" className="flex items-center space-x-2 text-xl font-bold">
            <ShoppingBag className="h-7 w-7 text-indigo-400" />
            <span>Rental Shop</span>
          </a>
          <div className="hidden md:flex items-center space-x-2 bg-gray-700/50 p-1 rounded-lg">
            <a href="#" className="flex items-center px-3 py-1 bg-gray-600 rounded-md"><Home className="mr-2 h-4 w-4"/>Home</a>
            <a href="#" className="flex items-center px-3 py-1 hover:bg-gray-600 rounded-md"><ShoppingBag className="mr-2 h-4 w-4"/>Rental Shop</a>
            <a href="#" className="flex items-center px-3 py-1 hover:bg-gray-600 rounded-md"><Heart className="mr-2 h-4 w-4"/>Wishlist</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
           <div className="hidden md:flex items-center space-x-2 bg-gray-700/50 p-1 rounded-lg">
             <a href="#" className="flex items-center px-3 py-1 hover:bg-gray-600 rounded-md"><User className="mr-2 h-4 w-4"/>adam</a>
             <a href="#" className="flex items-center px-3 py-1 hover:bg-gray-600 rounded-md"><Phone className="mr-2 h-4 w-4"/>Contact us</a>
           </div>
           <button className="md:hidden p-2 rounded-md hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
           </button>
        </div>
      </nav>
    </header>
  );
};

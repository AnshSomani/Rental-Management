import React from 'react';
import './../index.css'
import { Navbar } from '../components/layout/Navbar';
import { ProductCard } from '../components/rentals/ProductCard';
import { Filter, List, Search, ChevronDown, SlidersHorizontal } from 'lucide-react';

// Placeholder data - we will fetch this from the backend later
const products = [
  { id: 1, name: 'Product Name', price: 20.00 },
  { id: 2, name: 'Product Name', price: 20.00 },
  { id: 3, name: 'Product Name', price: 20.00 },
  { id: 4, name: 'Product Name', price: 20.00 },
  { id: 5, name: 'Product Name', price: 20.00 },
  { id: 6, name: 'Product Name', price: 20.00 },
  { id: 7, name: 'Product Name', price: 20.00 },
  { id: 8, name: 'Product Name', price: 20.00 },
];

const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
const priceRanges = ['Under $25', '$25 to $50', '$50 to $100', '$100 to $200', 'Above $200'];


export const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-8 flex-wrap">
          {categories.map((category) => (
            <button key={category} className="px-4 py-2 my-1 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-sm">
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <h2 className="text-xl font-semibold mb-4 flex items-center"><SlidersHorizontal className="mr-2 h-5 w-5"/> Product attributes</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Colors</h3>
                <ul className="space-y-1 text-gray-400">
                  {colors.map(color => <li key={color} className="cursor-pointer hover:text-white">{color}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Price range</h3>
                <ul className="space-y-1 text-gray-400">
                  {priceRanges.map(range => <li key={range} className="cursor-pointer hover:text-white">{range}</li>)}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {/* Search and Sort Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center border border-gray-600 rounded-lg w-full md:w-auto mb-2 md:mb-0">
                 <div className="flex items-center pl-3 pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                 </div>
                 <select className="bg-transparent pl-2 pr-8 py-2 appearance-none focus:outline-none">
                    <option className="bg-gray-800">Price List</option>
                 </select>
              </div>
              <div className="relative w-full md:w-1/2 mx-4">
                <input type="text" placeholder="Search..." className="bg-gray-700 border border-gray-600 rounded-lg w-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-600 rounded-lg">
                    <select className="bg-transparent pl-3 pr-8 py-2 appearance-none focus:outline-none">
                        <option className="bg-gray-800">Sort by</option>
                    </select>
                </div>
                <button className="p-2 border border-gray-600 rounded-lg hover:bg-gray-700">
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button className="px-4 py-2 bg-indigo-600 rounded-lg">1</button>
              <button className="px-4 py-2 hover:bg-gray-700 rounded-lg">2</button>
              <button className="px-4 py-2 hover:bg-gray-700 rounded-lg">3</button>
              <button className="px-4 py-2 hover:bg-gray-700 rounded-lg">4</button>
              <span>...</span>
              <button className="px-4 py-2 hover:bg-gray-700 rounded-lg">10</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default HomePage;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const LenderProductsPage = () => {
    const { myProducts, fetchMyProducts } = useApp();

    useEffect(() => {
        fetchMyProducts();
    }, []);

    return (
        <div className="p-8 text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Products</h1>
                <Link 
                    to="/lender/products/new" 
                    className="bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors font-semibold"
                >
                    Add New Product
                </Link>
            </div>
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-700 bg-gray-900/50">
                        <tr>
                            <th className="p-4">Product Name</th>
                            <th>Category</th>
                            <th>Price/Day</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!myProducts || myProducts.length === 0) ? (
                            <tr>
                                <td colSpan="5" className="text-center p-8 text-gray-400">
                                    You have not listed any products yet.
                                </td>
                            </tr>
                        ) : (
                            myProducts.map(p => (
                                <tr key={p._id || p.id} className="border-b border-gray-700 last:border-b-0">
                                    <td className="p-4">{p.name}</td>
                                    <td>{p.category}</td>
                                    <td>₹{p.priceList?.day}</td>
                                    <td>
                                        <span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                                            Active
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button className="text-indigo-400 hover:underline font-semibold">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LenderProductsPage;

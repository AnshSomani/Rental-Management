import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-indigo-500">404</h1>
                <p className="text-2xl md:text-3xl font-light text-gray-300 mt-4">
                    Oops! Page Not Found.
                </p>
                <p className="mt-4 text-gray-400">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link 
                    to="/" 
                    className="mt-8 inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-500 transition-colors"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;

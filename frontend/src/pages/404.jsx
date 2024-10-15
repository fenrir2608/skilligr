import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-8xl font-bold text-red-600">404</h1>
            <p className="text-3xl mt-4">Oops! Page Not Found</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
import React from 'react';
import { Link } from 'react-router-dom';

function NoPage() {
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NoPage;


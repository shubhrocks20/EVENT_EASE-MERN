// Loading.js
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-600 mb-2" /> {/* Loading spinner */}
        <p className="text-gray-600">Loading...</p>
      </div>
  );
};

export default Loading;

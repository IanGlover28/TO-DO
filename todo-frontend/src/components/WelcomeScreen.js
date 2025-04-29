import React from 'react';
import { Link } from 'react-router-dom';

function WelcomeScreen() {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('/your-background-image.jpg')` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Todo App</h1>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default WelcomeScreen;

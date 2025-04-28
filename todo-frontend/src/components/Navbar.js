import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
        <Link to="/" className="text-2xl font-bold">Todo App</Link>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-indigo-200 transition-colors">Todos</Link>
          <Link to="/create" className="hover:text-indigo-200 transition-colors">Create Todo</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          Coco Bubble Tea
        </h1>

        <nav className="space-x-6">
          <button onClick={() => navigate('/menu')} className="hover:text-yellow-400 transition-colors">
            Menu
          </button>
          <button onClick={() => navigate('/order-online')} className="hover:text-yellow-400 transition-colors">
            Order Online
          </button>
          <button onClick={() => navigate('/about')} className="hover:text-yellow-400 transition-colors">
            About
          </button>
          <button onClick={() => navigate('/contact')} className="hover:text-yellow-400 transition-colors">
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

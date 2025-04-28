import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import

function HeroSection() {
  const navigate = useNavigate(); // ✅ Correct hook

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: "url('/images/hero-bubble-tea.jpg')",
      }}
    >
      {/* Main Hero Content */}
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to Coco's Bubble Tea!
        </h1>
        <p className="text-xl mb-6 drop-shadow-md">
          Sip the Fun – Dive into Deliciousness!
        </p>
        <button
          onClick={() => navigate('/menu')} // ✅ navigate to /menu route
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-full transition duration-300 cursor-pointer"
        >
          Explore Our Menu
        </button>
      </div>
    </section>
  );
}

export default HeroSection;

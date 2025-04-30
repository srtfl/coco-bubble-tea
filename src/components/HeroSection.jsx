import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full h-[600px] bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: "url('/images/hero-bubble-tea.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Hero Content */}
      <div className="relative text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase">
          Spark Up Every Moment!
        </h1>
        <p className="text-xl mb-8 drop-shadow-md max-w-2xl">
          Sip the Fun – Dive into Deliciousness!
        </p>
        <button
          onClick={() => navigate('/menu')}
          className="bg-coco-yellow hover:bg-coco-orange text-black font-bold py-3 px-8 rounded-full shadow-lg transition-colors"
        >
          Order Now
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
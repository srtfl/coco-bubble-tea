import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true });
  }, [location]);

  return (
    <div className="pt-24 bg-gray-50 min-h-screen font-poppins">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1627308595333-1c27f4b7250d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        }}
        onError={(e) => {
          e.target.style.backgroundImage = "url('/images/bubble-tea-shop.jpg')";
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold uppercase mb-4" data-aos="fade-up">
            About Us
          </h1>
          <p className="text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Discover the story behind Coco's Bubble Tea and our passion for bringing joy through delicious drinks.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-semibold text-gray-800 mb-6 capitalize">
              Our Story
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Founded in 2025, Coco's Bubble Tea started as a small family business with a big dream: to share the joy of authentic bubble tea with the world. Inspired by the vibrant flavors of traditional Taiwanese bubble tea, we set out to create a space where friends and families can gather, laugh, and make memories over a refreshing drink. Today, we’re proud to offer a wide range of bubble teas, milkshakes, and English sweets, all crafted with love and the finest ingredients.
            </p>
          </div>
          <div className="relative" data-aos="fade-left">
            <img
              src="https://images.unsplash.com/photo-1595436149918-7a8d2e971d70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Bubble Tea Preparation"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
              onError={(e) => (e.target.src = '/images/bubble-tea-preparation.jpg')}
            />
            <div className="absolute -bottom-4 left-4 bg-white text-cocos-orange border border-cocos-orange font-semibold py-2 px-4 rounded-full shadow" data-aos="fade-up">
              💬 Crafting Happiness, One Sip at a Time
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6 capitalize" data-aos="fade-up">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            At Coco's Bubble Tea, our mission is to spark joy in every sip. We strive to create a welcoming environment where everyone feels at home, offering innovative drinks that celebrate diversity and creativity. From sourcing the best ingredients to crafting each drink with care, we’re committed to delivering an unforgettable experience that keeps you coming back for more.
          </p>

          {/* Icons Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12" data-aos="fade-up" data-aos-delay="200">
            {[
              { icon: '🍃', label: 'Fresh Ingredients' },
              { icon: '🥤', label: 'Handcrafted With Love' },
              { icon: '💛', label: 'Loved by the Community' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="font-medium text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10" data-aos="fade-up" data-aos-delay="300">
            <a
              href="/menu"
              className="bg-cocos-orange hover:bg-cocos-yellow text-white font-semibold py-3 px-6 rounded-full transition-colors"
            >
              Explore Our Menu
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

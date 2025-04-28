import React from 'react';

function AboutSection() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-yellow-400 mb-8">About Us</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          At Coco's Bubble Tea, we are passionate about bringing you the best bubble tea experience.
          Our drinks are crafted with love, using the freshest ingredients and a blend of exciting flavors.
          Whether you're a fan of classic milk teas or adventurous fruit blends, there's something for everyone.
          Come sip the fun and dive into deliciousness with us!
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
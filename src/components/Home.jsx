import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch featured products from Firebase (assuming a "featured" field or similar)
  useEffect(() => {
    const productsCollection = collection(db, 'products');
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const liveProducts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Filter for featured products (adjust based on your Firebase data structure)
      const featured = liveProducts.filter((product) => product.featured === true).slice(0, 3);
      setFeaturedProducts(featured);
    }, (error) => {
      console.error('Error fetching products:', error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Drinks Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative inline-block mb-4">
            <h2 className="text-5xl font-extrabold text-black uppercase">
              Featured Drinks
            </h2>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-t-2 border-coco-orange w-1/2"></div>
          </div>
          <p className="text-center text-coco-gray text-sm mb-12">
            Try some of our most popular bubble tea creations, loved by our customers worldwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center text-center px-2"
              >
                <div className="w-48 h-48 overflow-hidden mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/192?text=Image+Not+Found')}
                  />
                </div>
                <h3 className="text-lg font-bold text-black uppercase mb-3">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 min-h-[60px]">
                  {product.description || 'No description available.'}
                </p>
                <p className="text-sm text-gray-500">
                  {product.calories ? `${product.calories} cal.` : 'N/A cal.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="relative py-16">
        <img
          src="https://via.placeholder.com/1920x400?text=Promotional+Banner"
          alt="Promotional Banner"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase drop-shadow-lg mb-4">
            Try Our New Seasonal Drink
          </h2>
          <p className="text-lg text-white mb-8 max-w-xl">
            Introducing our limited-edition Mango Passionfruit Tea – a burst of tropical flavors in every sip!
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-coco-yellow hover:bg-coco-orange text-black font-bold py-3 px-8 rounded-full shadow-lg transition"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Floating Order Now Button */}
      <button
        onClick={() => navigate('/order-online')}
        className="fixed bottom-4 right-4 bg-coco-yellow hover:bg-coco-orange text-black font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition"
      >
        Order Now
      </button>
    </div>
  );
}

export default Home;
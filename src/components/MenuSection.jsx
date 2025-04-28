// src/components/MenuSection.jsx
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { useCart } from '../contexts/CartContext';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'milk-teas', label: 'Milk Teas' },
  { key: 'fruit-teas', label: 'Fruit Teas' },
  { key: 'special-teas', label: 'Special Teas' },
  { key: 'milkshakes', label: 'Milkshakes' },
  { key: 'fruity-shakes', label: 'Fruity Twist Shakes' },
  { key: 'sundaes', label: 'Bubble Fruity Sundaes' },
  { key: 'frappes', label: 'Frappes' },
];

function MenuSection() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selection, setSelection] = useState({});

  useEffect(() => {
    const productsCollection = collection(db, "products");

    // 🔥 Real-time listener
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const liveProducts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(liveProducts);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const handleSelectSize = (productName, size) => {
    setSelection((prev) => ({
      ...prev,
      [productName]: {
        ...prev[productName],
        size,
      },
    }));
  };

  const handleQuantityChange = (productName, delta) => {
    setSelection((prev) => ({
      ...prev,
      [productName]: {
        ...prev[productName],
        quantity: Math.max(1, (prev[productName]?.quantity || 1) + delta),
      },
    }));
  };

  const handleAddToCart = (product) => {
    const { size = 'reg', quantity = 1 } = selection[product.name] || {};
    const price = size === 'reg' ? product.priceReg : product.priceLrg;

    const item = {
      name: product.name,
      size,
      image: product.image,
      quantity: quantity,
      price,
      category: product.category,
    };

    addToCart(item);

    setSelection((prev) => ({
      ...prev,
      [product.name]: {},
    }));
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="menu" className="py-16 bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="md:w-1/4">
          <h3 className="text-2xl font-bold mb-6">Categories</h3>
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`cursor-pointer hover:text-yellow-400 ${selectedCategory === cat.key ? 'text-yellow-400 font-bold' : ''}`}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Products */}
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const selected = selection[product.name] || {};
              return (
                <div key={product.id} className="p-4 bg-gray-800 rounded-lg flex flex-col items-center shadow-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <p className="font-semibold text-center mb-2">{product.name}</p>

                  {/* Size Buttons */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => handleSelectSize(product.name, 'reg')}
                      className={`px-3 py-1 rounded text-sm font-bold ${selected.size === 'reg' ? 'bg-red-500' : 'bg-red-400 hover:bg-red-500'} text-white`}
                    >
                      Reg £{product.priceReg?.toFixed(2) || 'N/A'}
                    </button>
                    <button
                      onClick={() => handleSelectSize(product.name, 'lrg')}
                      className={`px-3 py-1 rounded text-sm font-bold ${selected.size === 'lrg' ? 'bg-green-500' : 'bg-green-400 hover:bg-green-500'} text-white`}
                    >
                      Lrg £{product.priceLrg?.toFixed(2) || 'N/A'}
                    </button>
                  </div>

                  {/* Quantity Buttons */}
                  <div className="flex items-center mb-4">
                    <button
                      onClick={() => handleQuantityChange(product.name, -1)}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-l text-white"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-gray-700">{selected.quantity || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(product.name, 1)}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-r text-white"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuSection;

import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

function ProductModal({ product, onClose, onAddToCart }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState('reg'); // Default to regular
  const [quantity, setQuantity] = useState(1);

  // Define prices based on size (adjust these values based on your data)
  const prices = {
    reg: product?.price || 4.99, // Default price for regular
    lrg: (product?.price || 4.99) + 1, // Large is £1 more
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      size,
      price: prices[size], // Add the price based on selected size
      quantity,
    };
    addToCart(itemToAdd);
    // Pass the item details back to the parent component
    onAddToCart(itemToAdd);
    onClose();
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover mb-6"
          />
          <h2 className="text-2xl font-bold text-black mb-2">{product.name}</h2>
          <p className="text-sm text-gray-600 mb-6">{product.description || 'No description available'}</p>

          {/* Size selection */}
          <div className="flex space-x-4 mb-6">
            <button
              className={`py-2 px-4 rounded-full border ${
                size === 'reg' ? 'bg-coco-yellow text-black' : 'border-gray-300'
              }`}
              onClick={() => setSize('reg')}
            >
              Regular (£{prices.reg.toFixed(2)})
            </button>
            <button
              className={`py-2 px-4 rounded-full border ${
                size === 'lrg' ? 'bg-coco-yellow text-black' : 'border-gray-300'
              }`}
              onClick={() => setSize('lrg')}
            >
              Large (£{prices.lrg.toFixed(2)})
            </button>
          </div>

          {/* Quantity selection */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            >
              -
            </button>
            <span className="px-6 py-2 bg-gray-100 text-black font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            >
              +
            </button>
          </div>

          {/* Confirm button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-coco-yellow hover:bg-coco-orange text-black font-bold py-3 rounded-full mb-4"
          >
            Add {quantity} to Basket
          </button>

          {/* Cancel button */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
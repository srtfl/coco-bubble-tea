import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function FloatingOrderButton() {
  const { cartItems, calculateTotal } = useCart();
  const navigate = useNavigate();
  const [pulse, setPulse] = useState(false);
  const [shake, setShake] = useState(false);

  const subtotal = calculateTotal(true).toFixed(2);
  const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  useEffect(() => {
    if (cartItems.length > 0) {
      setPulse(true);
      const timeout = setTimeout(() => setPulse(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cartItems]);

  const handleClick = () => {
    if (itemCount > 0) {
      navigate('/order-online');
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all flex items-center
        ${pulse ? 'scale-110 ring-4 ring-yellow-400' : ''}
        ${shake ? 'animate-shake' : ''}`}
    >
      <FaShoppingCart className="mr-2" />
      {itemCount > 0 ? `View Basket (${itemCount} items - £${subtotal})` : 'Order Now'}
    </button>
  );
}

export default FloatingOrderButton;

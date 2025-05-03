import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function SuccessPage() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart(); // Clear cart once on mount
  }, [clearCart]);

  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-gray-600">Thank you for your order. We've received your payment.</p>
      <button
        onClick={() => navigate('/menu')}
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
      >
        Back to Menu
      </button>
    </div>
  );
}

export default SuccessPage;
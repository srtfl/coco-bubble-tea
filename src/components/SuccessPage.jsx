import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

function SuccessPage() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // ✅ Clear the cart after success
  useEffect(() => {
    clearCart(); // also removes from localStorage
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-green-50 rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-coco-gray mb-6">Thank you for your order. We've received your payment.</p>
        <button
          onClick={() => navigate('/menu')}
          className="bg-coco-yellow hover:bg-coco-orange text-black font-bold py-2 px-6 rounded-full shadow transition"
        >
          Back to Menu
        </button>
      </motion.div>
    </div>
  );
}

export default SuccessPage;

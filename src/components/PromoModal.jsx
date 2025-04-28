import React from 'react';
import { useCart } from '../contexts/CartContext';

function PromoModal() {
  const { promotions } = useCart();

  const closeModal = () => {
    document.getElementById('promo-modal').classList.add('hidden');
  };

  if (promotions.length === 0) {
    return null;
  }

  return (
    <div
      id="promo-modal"
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-30 hidden"
    >
      <div
        id="promo-content"
        className="bg-gray-800 p-6 rounded-lg max-w-md w-full text-center relative"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white text-2xl hover:text-yellow-400"
        >
          ✖
        </button>
        <h2 className="text-3xl font-bold mb-4 text-yellow-400">Special Promotions!</h2>
        {promotions.map((promo) => (
          <p key={promo.id} className="text-lg text-gray-300 mb-4">
            🎉 {promo.title}: {promo.description} ({promo.size === 'reg' ? 'Regular' : 'Large'}, £{(promo.size === 'reg' ? promo.priceReg : promo.priceLrg).toFixed(2)})
            🎉
          </p>
        ))}
        <button
          onClick={closeModal}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

export default PromoModal;
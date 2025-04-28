import React from 'react';
import { useCart } from '../contexts/CartContext';
import { XIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function CartModal({ isOpen, onClose }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotal,
    promotionDiscount
  } = useCart();

  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-400"
        >
          <XIcon className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">Your Basket</h2>

        {/* Cart Items */}
        <div className="space-y-4 max-h-[50vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-gray-400">Your basket is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id + item.size} className="flex justify-between items-center bg-gray-800 p-4 rounded-md">
                <div>
                  <p className="font-semibold">{item.title} ({item.size.toUpperCase()})</p>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Quantity Controls */}
                  <button
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                    className="bg-gray-700 hover:bg-gray-600 text-white rounded px-2"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                    className="bg-gray-700 hover:bg-gray-600 text-white rounded px-2"
                  >
                    +
                  </button>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>£{calculateTotal(false).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-400 text-sm">
              <span>Promotion Discount:</span>
              <span>-£{promotionDiscount.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-xl">
              <span>Total:</span>
              <span>£{calculateTotal(true).toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-2 justify-between">
          {/* Clear Basket */}
          <button
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Clear Basket
          </button>

          {/* Continue Shopping */}
          <button
            onClick={() => {
              onClose();
              navigate('/menu');
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Continue Shopping
          </button>

          {/* Checkout */}
          <button
            onClick={() => {
              onClose();
              navigate('/order-online');
            }}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded"
          >
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
}

export default CartModal;

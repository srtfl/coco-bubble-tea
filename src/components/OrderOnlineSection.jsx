import React from 'react';
import { useCart } from '../contexts/CartContext';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function OrderOnlineSection() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotal,
    calculatePromoDiscount
  } = useCart();

  const navigate = useNavigate();

  const promoDiscount = calculatePromoDiscount();

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 min-h-screen bg-gray-900 text-white">
      {/* Left side - Cart Items */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6">Your Order</h2>

        {cartItems.length === 0 ? (
          <div className="text-gray-400">
            Your basket is empty. 
            <button 
              onClick={() => navigate('/menu')}
              className="text-yellow-400 hover:underline ml-2"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.name + item.size} className="flex justify-between items-center bg-gray-800 p-4 rounded-md">
                <div>
                  <p className="font-semibold">{item.title} ({item.size.toUpperCase()})</p>
                  <div className="flex items-center space-x-2 mt-2">
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
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <p className="font-semibold text-lg">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:text-red-400 mt-2"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Clear Basket Button */}
            <button
              onClick={clearCart}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Clear Basket
            </button>
          </div>
        )}
      </div>

      {/* Right side - Order Summary */}
      <div className="w-full md:w-1/3">
        <h2 className="text-3xl font-bold mb-6">Order Summary</h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>£{calculateTotal(false).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-400 text-sm">
            <span>Promotion Discount:</span>
            <span>-£{promoDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t border-gray-700 pt-2">
            <span>Total:</span>
            <span>£{calculateTotal(true).toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={() => navigate('/menu')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded"
          >
            Continue Shopping
          </button>

          {cartItems.length > 0 && (
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded"
            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderOnlineSection;

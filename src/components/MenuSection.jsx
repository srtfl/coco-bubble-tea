import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe with your test publishable key
const stripePromise = loadStripe('pk_test_51RJdtSFZmDqqR2xX7akXUxT2lS7ySehkgy9zc79wXAs84sQbHX0q3kzAXkUqBqhbuh8FwnEbLWIG18K1FnXpKvGq00alUzv5o2'); // Replace with your Stripe test publishable key

function CheckoutForm({ totalAmount, cartItems, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe has not loaded. Please try again.');
      setProcessing(false);
      return;
    }

    try {
      // Call your backend to create a payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount, metadata: { cartItems: JSON.stringify(cartItems) } }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      const { clientSecret } = data;

      if (!clientSecret) {
        throw new Error('No client secret returned from server');
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else if (result.paymentIntent.status === 'succeeded') {
        onSuccess(result.paymentIntent);
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <CardElement className="border rounded p-3 bg-gray-100" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-coco-yellow hover:bg-coco-orange text-black font-bold py-2 rounded-full"
      >
        {processing ? 'Processing...' : `Pay £${totalAmount.toFixed(2)}`}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="block w-full text-sm text-gray-500 hover:text-gray-700 mt-2"
      >
        Cancel
      </button>
    </form>
  );
}

function MenuSection() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [modalProduct, setModalProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('reg');
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);

  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const productsCollection = collection(db, 'products');

    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const liveProducts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Remove duplicates by product name (case-insensitive)
      const uniqueProducts = Array.from(
        new Map(liveProducts.map(p => [p.name.trim().toLowerCase(), p])).values()
      );

      setProducts(uniqueProducts);

      const uniqueCategories = [
        'All',
        ...new Set(uniqueProducts.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    }, (error) => {
      console.error('Error fetching products:', error);
    });

    return () => unsubscribe();
  }, []);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const handleAddToCartClick = (product, size) => {
    setModalProduct(product);
    setSelectedSize(size);
    setQuantity(1);
  };

  const handleConfirmAdd = () => {
    if (modalProduct) {
      const itemToAdd = {
        id: modalProduct.id,
        name: modalProduct.name,
        size: selectedSize,
        price: selectedSize === 'reg' ? modalProduct.priceReg : modalProduct.priceLrg,
        quantity,
        category: modalProduct.category,
      };
      addToCart(itemToAdd);
      setSelectedItems((prev) => ({
        ...prev,
        [modalProduct.id]: {
          size: selectedSize,
          price: selectedSize === 'reg' ? modalProduct.priceReg : modalProduct.priceLrg,
          quantity,
        },
      }));
      setModalProduct(null);
    }
  };

  const handleOrderNow = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowCheckout(true);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <section id="menu" className="pt-20 py-16 bg-white relative">
      <div className="max-w-[1280px] mx-auto px-2 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="relative text-center mb-8">
          <h2 className="text-5xl font-extrabold text-black uppercase mb-2">
            Our Menu
          </h2>
          <div className="w-24 h-1 bg-coco-orange mx-auto rounded-full"></div>
          <p className="text-coco-gray text-sm mt-4">
            This product catalog represents all potential items served in store. Availability may vary by location.
          </p>
        </div>

        {/* Category Filters */}
        <div className="sticky top-16 z-30 bg-white py-4 shadow-md flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`py-1 px-4 rounded-full font-semibold text-sm transition-colors duration-200
                ${selectedCategory === category
                  ? 'bg-coco-yellow text-black shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const selectedItem = selectedItems[product.id] || {};
            return (
              <div
                key={product.id}
                className="border rounded-xl p-4 flex flex-col items-center text-center shadow hover:shadow-lg transition duration-300 bg-white"
              >
                <div className="w-32 h-32 mb-4 overflow-hidden rounded-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                  />
                </div>

                <h3 className="text-md font-semibold text-black capitalize mb-1">
                  {product.name}
                </h3>

                <div className="flex flex-col items-center text-sm text-gray-700 gap-1 mb-2">
                  <div className="flex items-center justify-between gap-2">
                    <span>REG £{product.priceReg.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCartClick(product, 'reg')}
                      className="text-coco-yellow hover:text-coco-orange transition-transform hover:scale-110"
                      title="Add REG to basket"
                    >
                      <FaShoppingCart size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>LRG £{product.priceLrg.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCartClick(product, 'lrg')}
                      className="text-coco-yellow hover:text-coco-orange transition-transform hover:scale-110"
                      title="Add LRG to basket"
                    >
                      <FaShoppingCart size={18} />
                    </button>
                  </div>
                </div>

                {selectedItem.quantity ? (
                  <div className="text-xs text-gray-600 mb-2">
                    <p>Size: {selectedItem.size === 'reg' ? 'Regular' : 'Large'}</p>
                    <p>Price: £{selectedItem.price.toFixed(2)}</p>
                    <p>Qty: {selectedItem.quantity}</p>
                  </div>
                ) : null}

                <p className="text-xs text-gray-400">
                  {product.calories ? `${product.calories} cal.` : 'N/A cal.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Order Now Button */}
      <button
        onClick={handleOrderNow}
        className="fixed bottom-4 right-4 bg-coco-yellow hover:bg-coco-orange text-black font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition"
      >
        Order Now
      </button>

      {/* Modal for Adding to Cart */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl animate-fade-in">
            <h2 className="text-xl font-bold mb-4 text-black">{modalProduct.name}</h2>

            <div className="flex justify-center items-center mb-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full"
              >
                -
              </button>
              <span className="w-12 h-12 flex items-center justify-center text-xl font-semibold text-black bg-white border border-gray-300 rounded-full shadow-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full"
              >
                +
              </button>
            </div>

            <button
              onClick={handleConfirmAdd}
              className="w-full bg-coco-yellow hover:bg-coco-orange text-black font-bold py-2 rounded-full mb-3"
            >
              Add {quantity} to Basket
            </button>

            <button
              onClick={() => setModalProduct(null)}
              className="block w-full text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl animate-fade-in">
            <h2 className="text-xl font-bold mb-4 text-black">Checkout</h2>
            <p className="mb-4">Total: £{calculateTotal().toFixed(2)}</p>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                totalAmount={calculateTotal()}
                cartItems={cart}
                onSuccess={(paymentIntent) => {
                  alert('Payment successful! Payment ID: ' + paymentIntent.id);
                  setShowCheckout(false);
                  navigate('/order-confirmation');
                }}
                onCancel={() => setShowCheckout(false)}
              />
            </Elements>
          </div>
        </div>
      )}
    </section>
  );
}

export default MenuSection;
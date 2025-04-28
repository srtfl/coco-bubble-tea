import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [promotionDiscount, setPromotionDiscount] = useState(0);

  useEffect(() => {
    const promotionsCollection = collection(db, 'promotions');
    const unsubscribe = onSnapshot(promotionsCollection, (snapshot) => {
      const activePromos = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((promo) => promo.active || promo.Active);
      setPromotions(activePromos);
    }, (error) => {
      console.error('Error fetching promotions:', error);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (item) => {
    const promotion = promotions.find(
      (promo) => (promo.category || promo.Category) === item.category && (promo.size || promo.Size) === item.size
    );
    setCartItems((prevItems) => {
      const updated = [...prevItems];
      const existingIndex = updated.findIndex(
        (i) => i.name === item.name && i.size === item.size
      );
      if (existingIndex !== -1) {
        updated[existingIndex].quantity += item.quantity;
      } else {
        updated.push({ ...item, promotion: promotion || null });
      }
      return updated;
    });
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.name === itemToRemove.name && item.size === itemToRemove.size)
      )
    );
  };

  const increaseQuantity = (index) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (index) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  const updateQuantity = (item, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) => {
        if (cartItem.name === item.name && cartItem.size === item.size) {
          return { ...cartItem, quantity: Math.max(1, newQuantity) };
        }
        return cartItem;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const calculatePromoDiscount = () => {
    let discount = 0;
    cartItems.forEach((item) => {
      if (item.promotion) {
        discount += (item.price * item.quantity) - (item.promotion.price * item.quantity);
      }
    });
    return Number.isFinite(discount) ? discount : 0;
  };

  const calculateTotal = (includeDiscount = true) => {
    const subtotal = getSubtotal();
    const discount = calculatePromoDiscount();
    return includeDiscount ? subtotal - discount : subtotal;
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        getSubtotal,
        calculatePromoDiscount,
        calculateTotal,
        getTotalItems,
        promotions,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

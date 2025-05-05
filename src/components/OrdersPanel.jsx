import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import OrderCard from './OrderCard';

function OrdersPanel() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To capture any errors

  // Check authentication and admin status
  useEffect(() => {
    if (!user) {
      console.log('User not logged in, redirecting to login...');
      navigate('/login');
    } else if (!isAdmin) {
      console.log('User is not admin, redirecting to home...');
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  // Fetch orders from Firestore
  useEffect(() => {
    if (!user || !isAdmin) return;

    const ordersCollection = collection(db, 'orders');
    const unsubscribe = onSnapshot(
      ordersCollection,
      (snapshot) => {
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log('Fetched orders from Firestore:', fetchedOrders); // Log fetched orders for debugging

        setOrders(fetchedOrders);
        setLoading(false); // Set loading to false after data is fetched
      },
      (err) => {
        console.error('Error fetching orders:', err); // Capture any errors
        setError('Error fetching orders. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, isAdmin]);

  if (loading) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl">Loading Orders...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <h1 className="text-2xl">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="p-8 pt-24 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-black">Orders Dashboard</h1>

      {orders.length === 0 ? (
        <p className="text-gray-700">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPanel;

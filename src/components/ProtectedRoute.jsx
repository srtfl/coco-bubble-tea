import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../App';

function ProtectedRoute({ children }) {
  const { user, isAdmin } = useAuth();

  if (!user) {
    // Not logged in → Redirect to login page
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    // Logged in but not admin → Redirect to home
    return <Navigate to="/" />;
  }

  return children; // Admin user → allow access
}

export default ProtectedRoute;

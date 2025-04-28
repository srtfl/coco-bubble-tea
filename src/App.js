import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Routes, Route, Navigate } from 'react-router-dom';

import { auth } from './firebase';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import OrderOnlineSection from './components/OrderOnlineSection';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import FloatingOrderButton from './components/FloatingOrderButton';
import Footer from './components/Footer';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function ProtectedRoute({ children }) {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        setIsAdmin(!!idTokenResult.claims.admin);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin }}>
      <div className="font-inter font-sans bg-gray-900 text-white min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<HeroSection />} />
            <Route path="/menu" element={<MenuSection />} />
            <Route path="/order-online" element={<OrderOnlineSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/contact" element={<ContactSection />} />

            {/* Authentication Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <FloatingOrderButton />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;

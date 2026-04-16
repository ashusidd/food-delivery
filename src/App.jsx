import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Sabhi components ko import kiya
import { CartProvider } from './Components/CartContext';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Login from './Components/Login';

function App() {
  // 1. Check karna ki user pehle se login hai ya nahi
  const [user, setUser] = useState(localStorage.getItem('userName'));

  // 2. useEffect taaki jab bhi localStorage badle, App ko pata chale
  useEffect(() => {
    const savedUser = localStorage.getItem('userName');
    setUser(savedUser);
  }, []);

  return (
    <CartProvider>
      <Router>
        {/* Navbar hamesha upar dikhega */}
        <Navbar />

        <div style={{ minHeight: '85vh', background: '#f8f9fa' }}>
          <Routes>
            {/* 3. HOME ROUTE: Agar login hai toh Home dikhao, nahi toh Login par dhaklo */}
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />

            {/* 4. LOGIN ROUTE: Yahan user apna naam dalega */}
            <Route path="/login" element={<Login />} />

            {/* 5. CART ROUTE: Agar login hai toh Cart dikhao, warna Login */}
            <Route
              path="/cart"
              element={user ? <Cart /> : <Navigate to="/login" />}
            />

            {/* 6. Achanak koi galat URL dale toh wapas Home par bhej do */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {/* Chota sa Footer gaon ke restaurant ke liye */}
        <footer style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          © 2026 Gaon Swad Restaurant | Lucknow, UP
        </footer>
      </Router>
    </CartProvider>
  );
}

export default App;
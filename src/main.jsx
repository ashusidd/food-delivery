// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CartProvider } from './Components/CartContext'
import './App.css'; // <-- YE LINE ADD KAREIN

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
)
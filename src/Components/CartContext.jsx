import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. Current logged-in user ka phone number nikalna
    const userPhone = localStorage.getItem('userPhone');

    // 2. Sirf is user ka specific cart load karna
    const [cart, setCart] = useState(() => {
        if (!userPhone) return []; // Agar login nahi hai toh khali cart
        const saved = localStorage.getItem(`cart_${userPhone}`);
        return saved ? JSON.parse(saved) : [];
    });

    // 3. Jab bhi user ya cart badle, sirf us user ke liye save karein
    useEffect(() => {
        if (userPhone) {
            localStorage.setItem(`cart_${userPhone}`, JSON.stringify(cart));
        }
    }, [cart, userPhone]);

    // 4. Jab user login kare, uska cart refresh karne ke liye function
    const loadUserCart = () => {
        const phone = localStorage.getItem('userPhone');
        if (phone) {
            const saved = localStorage.getItem(`cart_${phone}`);
            setCart(saved ? JSON.parse(saved) : []);
        } else {
            setCart([]);
        }
    };

    const viber = (ms) => { if (navigator.vibrate) navigator.vibrate(ms); };

    const addToCart = (item) => {
        viber(20);
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        viber(15);
        setCart((prev) => {
            const item = prev.find((i) => i.id === itemId);
            if (item && item.quantity > 1) {
                return prev.map((i) => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prev.filter((i) => i.id !== itemId);
        });
    };

    const deleteItem = (itemId) => {
        viber(35);
        setCart(cart.filter(i => i.id !== itemId));
    };

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, deleteItem,
            cartCount, totalPrice, loadUserCart,
            clearCart: () => setCart([])
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
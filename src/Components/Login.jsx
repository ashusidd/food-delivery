import React, { useState } from 'react';
import { useCart } from './CartContext'; // Context ko import kiya

function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // loadUserCart function ko extract kiya
    const { loadUserCart } = useCart();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Data save karna (Phone number unique key banega)
        localStorage.setItem('userName', name);
        localStorage.setItem('userPhone', phone);

        // 2. User-specific cart load karna
        loadUserCart();

        // 3. Haptic feedback (Vibration)
        if (navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
        }

        // 4. Home page par bhej dena
        // Note: window.location.href use karne se page refresh hota hai aur Context naya data fetch kar leta hai
        window.location.href = "/";
    };

    return (
        <div className="login-container">
            <div className="login-glass">
                <div className="login-header">
                    <h1 className="logo" style={{ fontSize: '36px', marginBottom: '10px' }}>Gaon Swad</h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '30px' }}>
                        {isSignup ? "Apna naya account banayein" : "Khane ki duniya mein wapas swagat hai!"}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Pura Naam"
                            required
                            className="input-cool"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="tel"
                            placeholder="WhatsApp Mobile No"
                            required
                            className="input-cool"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="login-submit-btn">
                        {isSignup ? "Create Account" : "Login Karein"}
                    </button>
                </form>

                <div style={{ margin: '25px 0', borderTop: '1px solid rgba(255,255,255,0.2)' }}></div>

                <p style={{ color: 'white', fontSize: '14px' }}>
                    {isSignup ? "Pehle se grahak hain?" : "Naye grahak hain?"}
                    <span
                        onClick={() => setIsSignup(!isSignup)}
                        className="toggle-link"
                    >
                        {isSignup ? " Login" : " Signup"}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
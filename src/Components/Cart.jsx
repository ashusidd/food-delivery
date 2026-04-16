import React, { useState } from 'react';
import { useCart } from './CartContext';

function Cart() {
    const { cart, totalPrice, addToCart, removeFromCart, deleteItem, clearCart } = useCart();
    const [address, setAddress] = useState("");

    const handleOrder = (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert("Cart is Empty!");

        const itemsMsg = cart.map(i => `${i.name} (x${i.quantity}) - ₹${i.price * i.quantity}`).join('%0A');
        const msg = `*New Order!*%0A%0A*Items:*%0A${itemsMsg}%0A%0A*Total:* ₹${totalPrice}%0A*Address:* ${address}`;

        window.open(`https://api.whatsapp.com/send?phone=91XXXXXXXXXX&text=${msg}`, '_blank');
        clearCart();
    };

    if (cart.length === 0) return <div className="page-container"><h2>Cart is Empty! 🛒</h2></div>;

    return (
        <div className="page-container">
            <div className="cart-layout">
                <div className="items-list">
                    <h3>Items in Cart</h3>
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item-row">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <img src={item.img} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                                <div>
                                    <h4 style={{ margin: 0 }}>{item.name}</h4>
                                    <small>₹{item.price} x {item.quantity}</small>
                                </div>
                            </div>

                            <div className="qty-controls-small">
                                <button onClick={() => removeFromCart(item.id)} className="qty-btn-s">-</button>
                                <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                                <button onClick={() => addToCart(item)} className="qty-btn-s">+</button>
                                <button onClick={() => deleteItem(item.id)} style={{ marginLeft: '15px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
                            </div>
                        </div>
                    ))}
                    <h2 style={{ textAlign: 'right', marginTop: '20px' }}>Total: ₹{totalPrice}</h2>
                </div>

                <div className="form-section">
                    <h3>Delivery Address</h3>
                    <form onSubmit={handleOrder}>
                        <textarea placeholder="Full Address with landmark" required className="input-cool" onChange={(e) => setAddress(e.target.value)} />
                        <button type="submit" className="add-btn">Order on WhatsApp</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cart;
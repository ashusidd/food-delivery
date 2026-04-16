import { useCart } from './CartContext';

function FoodCard({ item }) {
    const { cart, addToCart, removeFromCart } = useCart();
    const cartItem = cart.find((i) => i.id === item.id);

    return (
        <div className="food-card">
            <img
                src={item.img}
                alt={item.name}
                className="food-img"
                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"}
            />
            <div className="food-info">
                <h3>{item.name}</h3>
                <p className="price-tag">₹{item.price}</p>

                {cartItem ? (
                    <div className="qty-controls">
                        <button className="qty-btn" onClick={() => removeFromCart(item.id)}>-</button>
                        <span className="qty-num">{cartItem.quantity}</span>
                        <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    </div>
                ) : (
                    <button className="add-btn" onClick={() => addToCart(item)}>
                        Order Now
                    </button>
                )}
            </div>
        </div>
    );
}

export default FoodCard;
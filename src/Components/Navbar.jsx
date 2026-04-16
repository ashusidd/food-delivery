import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

function Navbar() {
    const { cartCount } = useCart();
    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        localStorage.removeItem('userName');
        window.location.href = "/login";
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">Gaon Swad</Link>

            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>

                <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <div className="cart-button">
                        🛒 {cartCount > 0 && <span>{cartCount}</span>}
                    </div>
                </Link>

                {userName ? (
                    <div className="profile-container">
                        <span style={{ color: '#2f3542', fontWeight: '600', fontSize: '14px' }}>
                            Hi, {userName}
                        </span>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="nav-link" style={{ color: '#ff4757' }}>Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
import React from 'react';
import { useSelector } from 'react-redux';


const Navbar = ({ onNavigate }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => onNavigate('landing')}>
        <span style={{ fontSize: '1.8rem' }}>🌿</span>
        <div>
          <h1>Paradise Nursery</h1>
          <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>Where Green Meets Serenity</p>
        </div>
      </div>

      <div className="nav-links">
        <button className="nav-link" onClick={() => onNavigate('landing')}>Home</button>
        <button className="nav-link" onClick={() => onNavigate('products')}>Plants</button>
        <button className="nav-link" onClick={() => onNavigate('contact')}>Contact Us</button>
        <div className="cart-icon-container" onClick={() => onNavigate('cart')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="cart-badge">{totalQuantity}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
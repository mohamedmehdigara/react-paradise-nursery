import React from 'react';


const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <span style={{ fontSize: '1.6rem' }}>🌿</span>
          <div>
            <h3>Paradise Nursery</h3>
            <p>Bringing nature closer to your living space with care and serenity.</p>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <button onClick={() => onNavigate('landing')}>Home</button>
          <button onClick={() => onNavigate('products')}>Plant Catalog</button>
          <button onClick={() => onNavigate('contact')}>Contact Us</button>
          <button onClick={() => onNavigate('cart')}>Shopping Cart</button>
        </div>

        <div className="footer-info">
          <h4>Customer Care</h4>
          <p>🌱 100% Organic Houseplants</p>
          <p>🚚 Fast & Safe Delivery</p>
          <p>💬 24/7 Plant Expert Support</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Paradise Nursery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import CheckoutModal from './CheckoutModal';

const CartItem = ({ onNavigate }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const parseCost = (costString) => {
    return parseFloat(costString.replace('$', '')) || 0;
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + parseCost(item.cost) * item.quantity;
    }, 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  return (
    <div>
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
          <div className="cart-icon-container" onClick={() => onNavigate('cart')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-badge">{totalQuantity}</span>
          </div>
        </div>
      </nav>

      <div className="cart-container">
        <h2 className="cart-header">Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is currently empty.</p>
            <button className="continue-shopping-btn" onClick={() => onNavigate('products')}>
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="total-amount">
              Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => {
                const itemTotal = parseCost(item.cost) * item.quantity;
                return (
                  <div className="cart-item" key={item.name}>
                    <div className="cart-item-details">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p className="cart-item-cost">Unit Price: {item.cost}</p>
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button className="quantity-btn" onClick={() => handleDecrement(item)}>-</button>
                        <span>{item.quantity}</span>
                        <button className="quantity-btn" onClick={() => handleIncrement(item)}>+</button>
                      </div>
                      <span className="item-total-cost">${itemTotal.toFixed(2)}</span>
                      <button className="delete-btn" onClick={() => handleRemove(item.name)} title="Remove Item">
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-navigation">
              <button className="continue-shopping-btn" onClick={() => onNavigate('products')}>
                Continue Shopping
              </button>
              <button className="checkout-btn" onClick={() => setIsModalOpen(true)}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        totalAmount={calculateTotalAmount()} 
        onNavigate={onNavigate} 
      />
    </div>
  );
};

export default CartItem;
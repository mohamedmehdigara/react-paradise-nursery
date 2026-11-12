import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import CheckoutModal from './CheckoutModal';
import Navbar from './Navbar';
import Footer from './Footer';

const CartItem = ({ onNavigate }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="page-wrapper">
      <Navbar onNavigate={onNavigate} />

      <main className="main-content">
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
      </main>

      <Footer onNavigate={onNavigate} />

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
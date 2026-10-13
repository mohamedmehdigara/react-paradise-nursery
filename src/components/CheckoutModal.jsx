import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from './CartSlice';

const CheckoutModal = ({ isOpen, onClose, totalAmount, onNavigate }) => {
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    dispatch(clearCart());
  };

  const handleFinish = () => {
    setIsSubmitted(false);
    onClose();
    onNavigate('products');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {!isSubmitted ? (
          <>
            <h2>Complete Your Plant Order</h2>
            <p className="modal-subtotal">Order Total: <strong>${totalAmount.toFixed(2)}</strong></p>
            
            <form onSubmit={handleSubmit} className="checkout-form">
              <input 
                type="text" 
                name="fullName" 
                placeholder="Full Name" 
                value={formData.fullName} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="text" 
                name="address" 
                placeholder="Shipping Street Address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
              />
              <div className="form-row">
                <input 
                  type="text" 
                  name="city" 
                  placeholder="City" 
                  value={formData.city} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="text" 
                  name="zipCode" 
                  placeholder="ZIP Code" 
                  value={formData.zipCode} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="submit-order-btn">
                  Place Order (${totalAmount.toFixed(2)})
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="order-success">
            <span className="success-icon">🌱</span>
            <h2>Thank You for Your Order!</h2>
            <p>Your plants are being prepared with care and will ship soon to <strong>{formData.address}</strong>.</p>
            <p className="confirmation-email">A confirmation email was sent to <em>{formData.email}</em>.</p>
            <button className="continue-shopping-btn" onClick={handleFinish}>
              Back to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
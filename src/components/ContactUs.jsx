import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactUs = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-wrapper">
      <Navbar onNavigate={onNavigate} />

      <main className="main-content">
        {/* Contact Content */}
        <div className="contact-container">
          <h2 className="contact-header">Get in Touch with Our Plant Experts</h2>
          <p className="contact-subtitle">
            Have a question about plant care, shipping, or your recent order? Fill out the form below and our team will get back to you shortly!
          </p>

          {submitted ? (
            <div className="contact-success-box">
              <span style={{ fontSize: '3rem' }}>💌</span>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you, <strong>{formData.name}</strong>. We have received your message and will respond to <em>{formData.email}</em> within 24 hours.</p>
              <button className="continue-shopping-btn" onClick={() => setSubmitted(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Jane Doe" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="jane@example.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="e.g., Plant Care Question / Shipping Inquiry" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea 
                  name="message" 
                  rows="5" 
                  placeholder="Tell us how we can help your indoor garden..." 
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-order-btn" style={{ width: '100%', padding: '1rem' }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default ContactUs;
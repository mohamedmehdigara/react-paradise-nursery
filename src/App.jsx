import React, { useState } from 'react';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleGetStarted = () => {
    setCurrentPage('products');
  };

  return (
    <div className="app-container">
      {currentPage === 'landing' ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1 className="title">Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <AboutUs />
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      ) : currentPage === 'products' ? (
        <ProductList onNavigate={setCurrentPage} />
      ) : (
        <CartItem onNavigate={setCurrentPage} />
      )}
    </div>
  );
};

export default App;
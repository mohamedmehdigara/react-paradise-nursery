import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './App.css';

const ProductList = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedNodes, setAddedNodes] = useState({});

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?auto=format&fit=crop&w=400&q=80", description: "Produces oxygen at night, improves air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=400&q=80", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=400&q=80", description: "Removes mold spores and purifies indoor air.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80", description: "Adds humidity and purifies air naturally.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=400&q=80", description: "Broad leaves trap pollutants easily.", cost: "$22" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80", description: "Purifies air and yields soothing gel.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=400&q=80", description: "Calming aroma that promotes deep sleep.", cost: "$20" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=400&q=80", description: "Refreshing scent and great for culinary use.", cost: "$8" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=400&q=80", description: "Invigorating fragrance and delicious seasoning.", cost: "$15" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80", description: "Crisp scent that clears airways.", cost: "$25" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80", description: "Sweet floral scent that eases anxiety.", cost: "$19" },
        { name: "Scented Geranium", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80", description: "Delightful citrusy and floral aroma.", cost: "$14" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=400&q=80", description: "Thrives on neglect and low lighting.", cost: "$24" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80", description: "Fast-growing vine, highly adaptable.", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=400&q=80", description: "Extremely resilient to dim conditions.", cost: "$28" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80", description: "Classic succulent requiring minimal watering.", cost: "$16" },
        { name: "Succulent Trio", image: "https://images.unsplash.com/photo-1520302638584-89b500c763f9?auto=format&fit=crop&w=400&q=80", description: "Drought tolerant and easy to arrange.", cost: "$18" },
        { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=400&q=80", description: "Tolerates poor light and dry indoor air.", cost: "$21" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedNodes((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const isAlreadyInCart = (plantName) => {
    return addedNodes[plantName] || cartItems.some((item) => item.name === plantName);
  };

  return (
    <div>
      {/* Navbar */}
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

      {/* Product List Content */}
      <div className="product-grid-container">
        {plantsArray.map((categoryObj, idx) => (
          <div key={idx}>
            <h2 className="category-title">{categoryObj.category}</h2>
            <div className="plant-grid">
              {categoryObj.plants.map((plant, plantIdx) => {
                const added = isAlreadyInCart(plant.name);
                return (
                  <div className="plant-card" key={plantIdx}>
                    <img src={plant.image} alt={plant.name} />
                    <div className="plant-card-body">
                      <h3 className="plant-title">{plant.name}</h3>
                      <p className="plant-price">{plant.cost}</p>
                      <p className="plant-description">{plant.description}</p>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(plant)}
                        disabled={added}
                      >
                        {added ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
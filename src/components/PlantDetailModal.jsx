import React from 'react';

const PlantDetailModal = ({ plant, isOpen, onClose, onAddToCart, isAdded }) => {
  if (!isOpen || !plant) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="plant-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>
          ✕
        </button>

        <div className="plant-modal-header">
          <img src={plant.image} alt={plant.name} className="plant-modal-img" />
          <div className="plant-modal-info">
            <h2>{plant.name}</h2>
            <p className="plant-modal-price">{plant.cost}</p>
            <p className="plant-modal-desc">{plant.description}</p>
          </div>
        </div>

        <div className="care-instructions-container">
          <h3>Care Instructions</h3>
          
          <div className="care-card">
            <span className="care-icon">☀️</span>
            <div>
              <strong>Light Requirements</strong>
              <p>{plant.care?.light || "Thrives in bright, indirect sunlight."}</p>
            </div>
          </div>

          <div className="care-card">
            <span className="care-icon">💧</span>
            <div>
              <strong>Watering Instructions</strong>
              <p>{plant.care?.water || "Water when the top inch of soil feels dry."}</p>
            </div>
          </div>

          <div className="care-card">
            <span className="care-icon">🌡️</span>
            <div>
              <strong>Ideal Temperature</strong>
              <p>{plant.care?.temp || "65°F - 80°F (18°C - 27°C)"}</p>
            </div>
          </div>
        </div>

        <div className="plant-modal-actions">
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(plant)}
            disabled={isAdded}
          >
            {isAdded ? "Added to Cart" : `Add to Cart - ${plant.cost}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailModal;
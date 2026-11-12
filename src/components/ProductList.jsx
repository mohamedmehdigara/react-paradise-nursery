import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import PlantDetailModal from './PlantDetailModal';
import SearchAndFilter from './SearchAndFilter';
import Navbar from './Navbar';
import Footer from './Footer';

const ProductList = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedNodes, setAddedNodes] = useState({});

  // Modal State
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?auto=format&fit=crop&w=400&q=80",
          description: "Produces oxygen at night, improves air quality.",
          cost: "$15",
          care: {
            light: "Bright, indirect light, but tolerates low light conditions well.",
            water: "Allow soil to dry completely between waterings. Water sparingly in winter.",
            temp: "60°F - 85°F (15°C - 29°C)"
          }
        },
        {
          name: "Spider Plant",
          image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=400&q=80",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
          care: {
            light: "Medium to bright indirect light.",
            water: "Keep soil slightly moist; water when top inch is dry.",
            temp: "55°F - 80°F (13°C - 27°C)"
          }
        },
        {
          name: "Peace Lily",
          image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=400&q=80",
          description: "Removes mold spores and purifies indoor air.",
          cost: "$18",
          care: {
            light: "Medium, indirect sunlight to shade.",
            water: "Water weekly; droops noticeably when thirsty.",
            temp: "65°F - 80°F (18°C - 27°C)"
          }
        }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=400&q=80",
          description: "Calming aroma that promotes deep sleep.",
          cost: "$20",
          care: {
            light: "Full sun; requires at least 6 hours of direct light daily.",
            water: "Water deeply when soil is completely dry.",
            temp: "60°F - 75°F (15°C - 24°C)"
          }
        },
        {
          name: "Mint",
          image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=400&q=80",
          description: "Refreshing scent and great for culinary use.",
          cost: "$8",
          care: {
            light: "Partial sun to full indirect light.",
            water: "Keep soil consistently damp.",
            temp: "55°F - 70°F (13°C - 21°C)"
          }
        }
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

  const handleOpenCareModal = (plant) => {
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  // Extract category names and filter plants dynamically
  const allCategories = plantsArray.map((item) => item.category);

  const filteredCategories = plantsArray
    .filter((categoryObj) => selectedCategory === 'All' || categoryObj.category === selectedCategory)
    .map((categoryObj) => ({
      ...categoryObj,
      plants: categoryObj.plants.filter(
        (plant) =>
          plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plant.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((categoryObj) => categoryObj.plants.length > 0);

  return (
    <div className="page-wrapper">
      <Navbar onNavigate={onNavigate} />

      <main className="main-content">
        <div className="product-grid-container">
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={allCategories}
          />

          {filteredCategories.length === 0 ? (
            <div className="no-results-message">
              <p>No plants matched your search criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            filteredCategories.map((categoryObj, idx) => (
              <div key={idx}>
                <h2 className="category-title">{categoryObj.category}</h2>
                <div className="plant-grid">
                  {categoryObj.plants.map((plant, plantIdx) => {
                    const added = isAlreadyInCart(plant.name);
                    return (
                      <div className="plant-card" key={plantIdx}>
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="clickable-img"
                          onClick={() => handleOpenCareModal(plant)}
                        />
                        <div className="plant-card-body">
                          <h3 className="plant-title">{plant.name}</h3>
                          <p className="plant-price">{plant.cost}</p>
                          <p className="plant-description">{plant.description}</p>

                          <div className="card-btn-group">
                            <button
                              className="care-details-btn"
                              onClick={() => handleOpenCareModal(plant)}
                            >
                              Care Details 🌿
                            </button>
                            <button
                              className="add-to-cart-btn"
                              onClick={() => handleAddToCart(plant)}
                              disabled={added}
                            >
                              {added ? "Added" : "Add to Cart"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />

      <PlantDetailModal
        plant={selectedPlant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
        isAdded={selectedPlant ? isAlreadyInCart(selectedPlant.name) : false}
      />
    </div>
  );
};

export default ProductList;
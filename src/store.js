import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './components/CartSlice';
import { loadCartState, saveCartState } from './localStorage';

// Hydrate initial cart state if saved data exists
const persistedCart = loadCartState();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: persistedCart ? { cart: persistedCart } : undefined,
});

// Listen for state changes and save the cart slice to localStorage
store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export default store;
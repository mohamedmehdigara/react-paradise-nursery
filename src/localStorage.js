const CART_STORAGE_KEY = 'paradise_nursery_cart';

// Load saved cart state from localStorage
export const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedState === null) {
      return undefined; // Let Redux use the slice's default initialState
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn('Could not load cart state from localStorage:', err);
    return undefined;
  }
};

// Save current cart state to localStorage
export const saveCartState = (cartState) => {
  try {
    const serializedState = JSON.stringify(cartState);
    localStorage.setItem(CART_STORAGE_KEY, serializedState);
  } catch (err) {
    console.warn('Could not save cart state to localStorage:', err);
  }
};
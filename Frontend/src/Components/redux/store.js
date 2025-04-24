import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Correct import

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Correct reducer assignment
  },
});

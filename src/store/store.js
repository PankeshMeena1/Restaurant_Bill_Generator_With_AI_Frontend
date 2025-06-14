// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './store/orderSlice'; // The order slice you will create

const store = configureStore({
  reducer: {
    order: orderReducer, // Adding the orderReducer to the Redux store
  },
});

export default store;

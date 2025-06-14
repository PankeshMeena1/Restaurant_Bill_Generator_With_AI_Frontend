// src/store/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload; // Setting the order from the payload
    },
    addItemToOrder: (state, action) => {
      state.order.push(action.payload); // Adding an item to the order
    },
    removeFromOrder: (state, action) => {
      state.order = state.order.filter(item => item._id !== action.payload); // Removing an item from the order
    },
  },
});

export const { setOrder, addItemToOrder, removeFromOrder } = orderSlice.actions;
export default orderSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartState: 'idle',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder.addCase('cart/fetchPrices/fulfilled', (state) => {
      state.cartState = 'idle';
    });
    builder.addCase('cart/fetchPrices/pending', (state) => {
      state.cartState = 'loading';
    });
    builder.addCase('cart/fetchPrices/rejected', (state, action) => {
      state.cartState = `error: ${action.payload}`;
    });
  },
});

export default cartSlice.reducer;

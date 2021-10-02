/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topsalesState: 'idle',
  topsalesList: [],
};

const topsalesSlice = createSlice({
  name: 'topsales',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase('topsales/fetchTopSales/fulfilled', (state, action) => {
      state.topsalesState = 'idle';
      state.topsalesList = action.payload;
    });
    builder.addCase('topsales/fetchTopSales/pending', (state) => {
      state.topsalesState = 'loading';
    });
    builder.addCase('topsales/fetchTopSales/rejected', (state, action) => {
      state.topsalesState = `error: ${action.payload}`;
    });
  },
});

export default topsalesSlice.reducer;

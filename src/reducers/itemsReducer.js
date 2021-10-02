import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemsState: 'loading',
  itemsList: [],
  lastFetched: false,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    resetItems: (state) => {
      state.itemsList = initialState.itemsList;
      state.lastFetched = initialState.lastFetched;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('items/getItems/fulfilled', (state, action) => {
      state.itemsState = 'idle';
      state.itemsList = [...state.itemsList, ...action.payload];
      state.lastFetched = (action.payload.length > 0);
    });
    builder.addCase('items/getItems/pending', (state) => {
      state.itemsState = 'loading';
    });
    builder.addCase('items/getItems/rejected', (state, action) => {
      state.itemsState = `error: ${action.payload}`;
    });
  },
});

export default itemsSlice.reducer;

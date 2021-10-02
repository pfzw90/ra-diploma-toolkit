import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemState: 'loading',
  itemData: [],
  selectedSize: null,
  selectedQuantity: 1,
};

const itemDetailsSlice = createSlice({
  name: 'itemdetails',
  initialState,
  reducers: {
    selectSize: (state, action) => { state.selectedSize = action.payload; },
    changeQuantity: (state, action) => {
      if (action.payload) state.selectedQuantity += action.payload;
      else state.selectedQuantity = initialState.selectedQuantity;
    },
    addCartTooltip: (state, action) => { state.itemState = action.payload; },
  },

  extraReducers: (builder) => {
    builder.addCase('itemdetails/getItemDetails/fulfilled', (state, action) => {
      state.itemState = 'idle';
      state.selectedSize = action.payload.avaliableSizes[0] || null;
      state.itemData = action.payload;
    });
    builder.addCase('itemdetails/getItemDetails/pending', (state) => {
      state.itemState = 'loading';
    });
    builder.addCase('itemdetails/getItemDetails/rejected', (state, action) => {
      state.itemState = `error: ${action.payload}`;
    });
  },
});

export default itemDetailsSlice.reducer;

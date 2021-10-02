import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  q: null,
  categoryId: null,
  offset: null,
};

const fliterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('filter/changeCategory', (state, action) => { state.categoryId = action.payload; })
    .addCase('filter/resetCategory', (state) => { state.categoryId = null; })
    .addCase('filter/setOffset', (state, action) => { state.offset += action.payload; })
    .addCase('filter/resetOffset', (state) => { state.offset = null; })
    .addCase('filter/initSearch', (state, action) => { state.q = action.payload; })
    .addCase('filter/resetQuery', (state) => { state.q = null; })
    .addCase('items/getItems/fulfilled', (state, action) => { state.offset += action.payload.length; });
});

export default fliterReducer;

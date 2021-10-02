import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoriesState: 'idle',
  categoriesList: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase('categories/getCategories/fulfilled', (state, action) => {
      state.categoriesState = 'idle';
      state.categoriesList = action.payload;
    });
    builder.addCase('categories/getCategories/pending', (state) => {
      state.categoriesState = 'loading';
    });
    builder.addCase('categories/getCategories/rejected', (state, action) => {
      state.categoriesState = `error: ${action.payload}`;
    });
  },
});

export default categoriesSlice.reducer;

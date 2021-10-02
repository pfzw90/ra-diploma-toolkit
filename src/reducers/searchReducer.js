import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  hidden: true,
};

const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('search/changeSearch', (state, action) => {
      state.value = action.payload;
    })
    .addCase('search/toggleSearchOpacity', (state) => { state.hidden = !state.hidden; });
});

export default searchReducer;

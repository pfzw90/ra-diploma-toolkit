import { nanoid, createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartItemsSlice = createSlice({
  name: 'cartitems',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let existing = false;
      let result = [];
      const a = action.payload;

      if (state.length > 0) {
        result = state.map((i) => {
          if (i.id === a.id && i.size === a.size) {
            existing = true;
            return {
              ...i,
              quantity: i.quantity + a.quantity,
              price: a.price,
            };
          }
          return i;
        });
      }

      if (!existing) {
        result.push({
          cartItemId: nanoid(),
          title: a.title,
          size: a.size,
          price: a.price,
          newPrice: a.price,
          quantity: a.quantity,
          id: a.id,
          delete: false,
        });
      }
      return result;
    },
    toggleDeleteCartItem: (state, action) => state.map((i) => {
      if (i.id === action.payload) {
        return { ...i, delete: !i.delete };
      }
      return i;
    }),
    removeDeleted: (state) => state.filter((i) => (i.delete === false)),
    clearCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase('cart/fetchPrices/fulfilled', (state, action) => state.map((i) => (
      { ...i, newPrice: action.payload.find((d) => d.id === i.id).price }
    )));
  },
});

export default cartItemsSlice.reducer;

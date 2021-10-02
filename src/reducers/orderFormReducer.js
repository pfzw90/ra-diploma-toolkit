import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  orderFormState: 'idle',
  address: { value: '', error: null },
  phone: { value: '', error: null },
  agreement: { value: false },
};

const orderFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('orderform/changeOrderForm', (state, action) => {
      state[action.payload.id].value = action.payload.value;
    })
    .addCase('orderform/checkAddress', (state, action) => { state.address.error = action.payload.length < 10; })
    .addCase('orderform/checkPhone', (state, action) => { state.phone.error = !(/^((\+7|7|8)+([0-9]){10})$/gm).test(action.payload); })
    .addCase('orderform/sendOrderRequest/pending', (state) => {
      state.orderFormState = 'loading';
    })
    .addCase('orderform/sendOrderRequest/rejected', (state, action) => {
      state.orderFormState = `error: ${action.payload}`;
    })
    .addCase('orderform/sendOrderRequest/fulfilled', (state) => {
      state.orderFormState = 'success';
    });
});

export default orderFormReducer;

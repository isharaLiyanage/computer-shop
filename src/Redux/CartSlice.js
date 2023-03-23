import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    AddCartProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload.products);
      state.total += action.payload.price;
    },

    Reset: (state, action) => {
      (state.products = []), (state.quantity = 0), (state.total = 0);
    },
    AddCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export default CartSlice.reducer;
export const { AddCartProduct, Reset, AddCartFailure } = CartSlice.actions;

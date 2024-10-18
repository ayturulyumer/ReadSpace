import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalSum: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.products.find(
        (product) => product.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.products.push(item);
      }
      // Recalculate total after adding
      state.totalSum = state.products.reduce(
        (accumulator, product) =>
          accumulator + product.price * product.quantity,
        0
      );
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.products = state.products.filter((item) => item.id !== itemId);
      // Recalculate total after removing
      state.totalSum = state.products.reduce(
        (accumulator, product) =>
          accumulator + product.price * product.quantity,
        0
      );
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.products.find(
        (product) => product.id === itemId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
      // Recalculate total after increasing quantity
      state.totalSum = state.products.reduce(
        (accumulator, product) =>
          accumulator + product.price * product.quantity,
        0
      );
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.products.find(
        (product) => product.id === itemId
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        state.products = state.products.filter((item) => item.id !== itemId);
      }
      // Recalculate total after decreasing quantity
      state.totalSum = state.products.reduce(
        (accumulator, product) =>
          accumulator + product.price * product.quantity,
        0
      );
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

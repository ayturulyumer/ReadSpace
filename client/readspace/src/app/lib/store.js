import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../components/Cart/cartSlice.js";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
};

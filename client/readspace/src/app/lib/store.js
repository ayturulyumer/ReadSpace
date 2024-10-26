import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage.js";
import cartReducer from "../components/Cart/cartSlice.js";

// Root reducer combining reducers if there are multiple
const rootReducer = combineReducers({
  cart: cartReducer,
  // other reducers can be added here
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // only persist the cart slice
};
// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Used to create a new store for each render
// export const makeStore = () => {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }),
//   });
// };

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

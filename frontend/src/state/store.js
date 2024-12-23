// state/store.js
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./index"; // Adjust the path if necessary
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api"; // Adjust the path if necessary

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;

// state/store.js
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./index"; 
//import chatReducer from "./chatSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api"; 
import { paymentApi } from "./paymentApi";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
   // chat: chatReducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware, paymentApi.middleware),
});

setupListeners(store.dispatch);

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e",
    auth: {
      isAuthenticated: false,
      token: null,
      user: null,
    },
  };

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
      setMode: (state) => {
        state.mode = state.mode === "light" ? "dark" : "light";
      },
      loginSuccess: (state, action) => {
        state.auth.isAuthenticated = true;
        state.auth.token = action.payload.token;  // Store the token
        state.auth.user = action.payload.user;    // Store the user information
      },
  
      logout: (state) => {
        state.auth.isAuthenticated = false;
        state.auth.token = null;
        state.auth.user = null;
      },
    },
  });
  
export const { setMode, loginSuccess, logout } = globalSlice.actions;
  
  export default globalSlice.reducer;
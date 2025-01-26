import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../slices/authSlice/authSlices.js";

const storeapp = configureStore({
  reducer: {
    register: registerReducer,
  },
});

export default storeapp;

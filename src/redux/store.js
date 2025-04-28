import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/authslice";

const store = configureStore({
  reducer: {
    authSlice: authSlice,
  },
});
export default store;

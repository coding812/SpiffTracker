import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";

const store = configureStore({
  reducer: {
    userState: userReducer,
  },
});

export default store;
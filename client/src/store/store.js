import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/user";

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  // devTools: process.env.NODE_ENV !== "production", // 추후 결과물 표시에서 devTool 제거를 위함
});

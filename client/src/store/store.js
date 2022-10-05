import { configureStore } from "@reduxjs/toolkit";
import CounterReduer from "./reduces/test";

export const store = configureStore({
  reducer: {
    counter: CounterReduer,
  },
  // devTools: process.env.NODE_ENV !== "production", // 추후 결과물 표시에서 devTool 제거를 위함
});

import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/user';
import OrderReduer from './features/order';

const store = configureStore({
  reducer: {
    user: UserReducer,
    order: OrderReduer,
  },
  // devTools: process.env.NODE_ENV !== "production", // 추후 결과물 표시에서 devTool 제거를 위함
});

export default store;

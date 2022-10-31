/* eslint-disable no-unused-vars */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserReducer from './features/user';
import OrderReduer from './features/order';

const persistConfig = {
  key: 'nado',
  storage,
};

const rootReducer = combineReducers({
  user: UserReducer,
  order: OrderReduer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // devTools: process.env.NODE_ENV !== "production", // 추후 결과물 표시에서 devTool 제거를 위함
});

export const persistor = persistStore(store);

export default store;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartStoreName: '',
  cartStoreSequence: 0,
  cartList: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    AddCart: (state, { payload }) => {
      const { storeSequence, storeName, menuInfo } = payload;
      const sumPrice = state.totalPrice + menuInfo.totalPrice;

      state.cartStoreSequence = storeSequence;
      state.cartStoreName = storeName;
      state.cartList = [...state.cartList, menuInfo];
      state.totalPrice = sumPrice;
    },
    UpdateCart: (state, { payload }) => {
      const { updatedCartList } = payload;
      let sumPrice = 0;

      updatedCartList.forEach((el) => {
        sumPrice += el.totalPrice;
      });

      state.cartList = [...updatedCartList];
      state.totalPrice = sumPrice;

      if (updatedCartList.length === 0) {
        state.cartStoreName = '';
        state.cartStoreSequence = 0;
      }
    },
  },
});

export const { AddCart, UpdateCart } = cartSlice.actions;
export default cartSlice.reducer;

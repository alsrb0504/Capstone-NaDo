import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartStoreName: '',
  cartList: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    AddCart: (state, { payload }) => {
      const { storeName, menuInfo } = payload;
      const sumPrice = state.totalPrice + menuInfo.totalPrice;

      state.storeName = storeName;
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
    },
  },
});

export const { AddCart, UpdateCart } = cartSlice.actions;
export default cartSlice.reducer;

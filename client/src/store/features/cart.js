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
    UpdateCart: (state, { payload }) => {
      const { coffeeId, cnt } = payload;

      const updated = state.cartList.map((el) => {
        if (el.menuSequence === coffeeId)
          return {
            ...el,
            cnt,
            totalPrice: el.menuPrice * cnt,
          };
        return el;
      });

      let sumPrice = 0;

      updated.forEach((el) => {
        sumPrice += el.totalPrice;
      });

      state.cartList = updated;
      state.totalPrice = sumPrice;
    },

    AddCart: (state, { payload }) => {
      const { storeSequence, storeName, menuInfo } = payload;
      const sumPrice = state.totalPrice + menuInfo.totalPrice;

      state.cartStoreSequence = storeSequence;
      state.cartStoreName = storeName;
      state.cartList = [...state.cartList, menuInfo];
      state.totalPrice = sumPrice;
    },
    RemoveItem: (state, { payload }) => {
      const { coffeeId } = payload;

      const filtered = state.cartList.filter(
        (el) => el.menuSequence !== coffeeId,
      );

      let sumPrice = 0;
      filtered.forEach((el) => {
        sumPrice += el.totalPrice;
      });

      state.totalPrice = sumPrice;

      state.cartList = filtered;

      if (state.cartList.length === 0) {
        state.cartStoreName = '';
        state.cartStoreSequence = 0;
      }
    },
    CleanCart: (state) => {
      state.cartStoreName = '';
      state.cartStoreSequence = 0;
      state.cartList = [];
      state.totalPrice = 0;
    },
  },
});

export const { AddCart, UpdateCart, RemoveItem, CleanCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import storeData from './crawling';

const initialState = {
  stores: storeData,
  selectedStore: {},
  // 디폴트 메뉴 추후 다른 곳으로 옮길 것.
  defaultMenuLists: {
    아메리카노: {
      coffeeName: '아메리카노',
      coffeePrice: '3800',
      coffeeImgUrl: '/images/coffeeImg/americano.png',
    },
    카페라떼: {
      coffeeName: '카페라떼',
      coffeePrice: '4300',
      coffeeImgUrl: '/images/coffeeImg/caffelatte.png',
    },
    카페모카: {
      coffeeName: '카페모카',
      coffeePrice: '4300',
      coffeeImgUrl: '/images/coffeeImg/caffemocha.png',
    },
    카푸치노: {
      coffeeName: '카푸치노',
      coffeePrice: '4500',
      coffeeImgUrl: '/images/coffeeImg/cappuchino.png',
    },
    카라멜마끼아또: {
      coffeeName: '카라멜 마끼아또',
      coffeePrice: '4500',
      coffeeImgUrl: '/images/coffeeImg/caramelmacchiato.png',
    },
    콜드브류: {
      coffeeName: '콜드브류',
      coffeePrice: '4300',
      coffeeImgUrl: '/images/coffeeImg/coldbrew.png',
    },
    복숭아아이스티: {
      coffeeName: '복숭아 아이스티',
      coffeePrice: '3800',
      coffeeImgUrl: '/images/coffeeImg/peachicedtae.png',
    },
    딸기라떼: {
      coffeeName: '딸기라떼',
      coffeePrice: '4700',
      coffeeImgUrl: '/images/coffeeImg/strawberrylatte.png',
    },
  },
  selectCoffee: {},

  cartLists: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    SelectCoffee: (state, actions) => {
      state.selectCoffee = actions.payload;
    },
    SelectStore: (state, actions) => {
      state.selectedStore = actions.payload;
    },
  },
});

export const { SelectStore, SelectCoffee } = orderSlice.actions;
export default orderSlice.reducer;

/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import storeData from './crawling';

const initialState = {
  stores: storeData,

  // 연결
  storeList: [],

  selectedStore: {},
  // 디폴트 메뉴 추후 다른 곳으로 옮길 것.
  defaultMenuList: [
    {
      menuName: '아메리카노',
      menuPrice: '3800',
      menuImg: '/images/coffeeImg/americano.png',
      sequence: 101,
    },
    {
      menuName: '카페라떼',
      menuPrice: '4300',
      menuImg: '/images/coffeeImg/caffelatte.png',
      sequence: 102,
    },
    {
      menuName: '카페모카',
      menuPrice: '4300',
      menuImg: '/images/coffeeImg/caffemocha.png',
      sequence: 103,
    },
    {
      menuName: '카푸치노',
      menuPrice: '4500',
      menuImg: '/images/coffeeImg/cappuchino.png',
      sequence: 104,
    },
    {
      menuName: '카라멜 마끼아또',
      menuPrice: '4500',
      menuImg: '/images/coffeeImg/caramelmacchiato.png',
      sequence: 105,
    },
    {
      menuName: '콜드브류',
      menuPrice: '4300',
      menuImg: '/images/coffeeImg/coldbrew.png',
      sequence: 106,
    },
    {
      menuName: '복숭아 아이스티',
      menuPrice: '3800',
      menuImg: '/images/coffeeImg/peachicedtae.png',
      sequence: 107,
    },
    {
      menuName: '딸기라떼',
      menuPrice: '4700',
      menuImg: '/images/coffeeImg/strawberrylatte.png',
      sequence: 108,
    },
  ],
  selectCoffee: {},

  cartLists: [],

  order_history: [
    {
      order_id: 321,
      orderAddress: '소프트웨어관 313호',
      orderPrice: 8900,
      orderTime: '13:35',
    },

    {
      order_id: 322,
      orderAddress: '소프트웨어관 313호',
      orderPrice: 8900,
      orderTime: '13:35',
    },

    {
      id: 323,
      orderAddress: '소프트웨어관 313호',
      orderPrice: 8900,
      orderTime: '13:35',
    },
  ],
};

// *
// GET : 가게 목록 받아오는 함수
// *
export const GetStoreList = createAsyncThunk(
  'order/getStore',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/store');

      if (response.status === 200) {
        return response.data;
      }

      return thunkAPI.rejectWithValue();
    } catch (e) {
      PrintError(e, '프로필 업데이트');
      return thunkAPI.rejectWithValue();
    }
  },
);

// *
// 가게 상세 정보 받아오는 함수
// *
export const GetStoreDetail = createAsyncThunk(
  'order/getStoreDetail',
  async (sequence, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/store/detail?sequence=${sequence}`,
      );

      console.log(response);

      if (response.status === 200) {
        return response.data;
      }

      return thunkAPI.rejectWithValue();
    } catch (e) {
      PrintError(e, '프로필 업데이트');
      return thunkAPI.rejectWithValue();
    }
  },
);

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
  extraReducers: (builder) => {
    builder.addCase(GetStoreList.fulfilled, (state, { payload }) => {
      state.storeList = payload;
    });
    builder.addCase(GetStoreDetail.fulfilled, (state, { payload }) => {
      state.selectedStore = payload;
    });
  },
});

function PrintError(e, src) {
  console.log(`${src} 에러 : ${e.message}`);
  console.error(e);
}

export const { SelectStore, SelectCoffee } = orderSlice.actions;
export default orderSlice.reducer;

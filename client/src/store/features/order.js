/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// import storeData from './crawling';

const initialState = {
  // stores: storeData,
  storeList: [],
  selectedStore: {},
  // 디폴트 메뉴 추후 다른 곳으로 옮길 것.
  defaultMenuList: [
    {
      menuName: '아메리카노',
      menuPrice: 3800,
      menuImg: '/images/coffeeImg/americano.png',
      sequence: 101,
    },
    {
      menuName: '카페라떼',
      menuPrice: 4300,
      menuImg: '/images/coffeeImg/caffelatte.png',
      sequence: 102,
    },
    {
      menuName: '카페모카',
      menuPrice: 4300,
      menuImg: '/images/coffeeImg/caffemocha.png',
      sequence: 103,
    },
    {
      menuName: '카푸치노',
      menuPrice: 4500,
      menuImg: '/images/coffeeImg/cappuchino.png',
      sequence: 104,
    },
    {
      menuName: '카라멜 마끼아또',
      menuPrice: 4500,
      menuImg: '/images/coffeeImg/caramelmacchiato.png',
      sequence: 105,
    },
    {
      menuName: '콜드브류',
      menuPrice: 4300,
      menuImg: '/images/coffeeImg/coldbrew.png',
      sequence: 106,
    },
    {
      menuName: '복숭아 아이스티',
      menuPrice: 3800,
      menuImg: '/images/coffeeImg/peachicedtae.png',
      sequence: 107,
    },
    {
      menuName: '딸기라떼',
      menuPrice: 4700,
      menuImg: '/images/coffeeImg/strawberrylatte.png',
      sequence: 108,
    },
  ],

  selectedMenu: {},

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

  myOrderList: [],

  currentOrder: {},
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
// GET : 가게 상세 정보 요청 함수
// *
export const GetStoreDetail = createAsyncThunk(
  'order/getStoreDetail',
  async (sequence, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/store/detail?sequence=${sequence}`,
      );

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
// 주문하기 요청 함수
// *
export const RequestPayment = createAsyncThunk(
  'order/RequestPayment',
  async (orderInfo, thunkAPI) => {
    const {
      address,
      order_detail,
      order_time,
      order_request,
      storeSequence,
      cartList,
      cartTotalPrice,
    } = orderInfo;

    // 주문 요청을 위한 메뉴 리스트 새로 만듦.
    const orderMenu = cartList.map((el) => {
      const { menuSequence, totalPrice, cnt, menuOptions } = el;
      return {
        menuId: menuSequence,
        menuOptions: {
          ...menuOptions,
          cnt,
        },
        menuPrice: totalPrice,
      };
    });

    const requestInfo = {
      orderAddress: {
        address,
        detail: order_detail,
      },
      orderRequest: {
        time: MakeDateFormat(order_time),
        detail: order_request,
      },
      orderPrice: {
        menuPrice: cartTotalPrice,
        deliveryFee: 1200,
        totalPrice: cartTotalPrice + 1200,
      },
      orderMenu,
      storeId: storeSequence,
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/order/pay',
        requestInfo,
      );

      if (response.status === 200) {
        alert('결제하기 요청 성공(추후 팝업으로 교체)');

        return {};
      }

      return thunkAPI.rejectWithValue(response.data);
    } catch (e) {
      // 400(시간 형식 에러), 500(쿼리 에러)는 catch에서 잡음.
      PrintError(e, '결제 요청');
      return thunkAPI.rejectWithValue();
    }
  },
);

// *
// 현재 주문 목록 요청 함수
// 주문 목록 빈 경우 : []를 받아오는지 확인 필요.
// *
export const GetOrderList = createAsyncThunk(
  'order/getOrderList',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3001/order/user`);

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
// 진행 중인 주문 정보 요청 함수
// *
export const GetOrderDetail = createAsyncThunk(
  'order/getOrderDetail',
  async (orderId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/order/detail?orderSequence=${orderId}`,
      );

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
      state.selectedMenu = actions.payload;
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
    builder.addCase(GetOrderList.fulfilled, (state, { payload }) => {
      state.myOrderList = payload;
    });
    builder.addCase(GetOrderDetail.fulfilled, (state, { payload }) => {
      state.currentOrder = payload;
    });
  },
});

function PrintError(e, src) {
  console.log(`${src} 에러 : ${e.message}`);
  console.error(e);
}

function MakeDateFormat(orderTime) {
  const dateInfo = new Date();

  const yy = dateInfo.getFullYear();
  let mm = dateInfo.getMonth() + 1; // +1 해줘야 함.
  let dd = dateInfo.getDate();

  if (mm < 10) mm = `0${mm}`;
  if (dd < 10) dd = `0${dd}`;

  return `${yy}-${mm}-${dd} ${orderTime}`;
}

export const { SelectStore, SelectCoffee } = orderSlice.actions;
export default orderSlice.reducer;

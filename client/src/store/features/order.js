/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import defaultMenus from '../constants/default_menu';

const initialState = {
  storeList: [
    {
      sequence: 0,
      name: '',
      image: '',
      businessTimes: [
        {
          dayOfWeek: '매',
          startTime: '10:00',
          endTime: '20:00',
        },
      ],
    },
  ],
  selectedStore: {},
  // 디폴트 메뉴 추후 다른 곳으로 옮길 것.
  defaultMenuList: defaultMenus,
  selectedMenu: {},
  myOrderList: [],
  currentOrder: {},
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

      const orderList = [];

      response.data.forEach((el) => {
        const { orderAddress, orderTimeout, totalPrice, orderSequence } = el;

        const pickingCardFormat = {
          timeout: orderTimeout,
          price: totalPrice,
          sequence: orderSequence,
          location: orderAddress,
        };

        orderList.push(pickingCardFormat);
      });

      if (response.status === 200) {
        return orderList;
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

// *
// POST : 주문 완료 요청 함수
// *
export const CompleteOrder = createAsyncThunk(
  'pickup/CompleteOrder',
  async (orderId, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/order/complete`,
        {
          orderSequence: orderId,
        },
      );

      console.log(response);

      if (response.status === 200) {
        return response.data;
      }

      return thunkAPI.rejectWithValue();
    } catch (e) {
      PrintError(e, '픽업 취소');
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
    builder.addCase(CompleteOrder.fulfilled, (state) => {
      // state.currentOrder = payload;
      // 이따가 주문 현황 변경.
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

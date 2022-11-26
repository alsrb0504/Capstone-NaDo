/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { MakeDateFormat } from '../../utils/time';
import defaultMenus from '../constants/default_menu';

const initialState = {
  isPayment: 'none', // 'none' | 'success' | 'error'
  storeList: [
    {
      sequence: 0,
      name: '',
      image: '',
      businesstimes: [
        {
          dayOfWeek: '매',
          startTime: '10:00',
          endTime: '20:00',
        },
      ],
    },
  ],
  selectedStore: {
    name: '',
    telephone: '',
    storeSequence: 0,
    storeImage: '',
    businesstimes: [
      {
        dayOfWeek: '매',
        startTime: '10:00',
        endTime: '20:00',
      },
    ],
    menus: [
      {
        sequence: 0,
        menuName: '',
        menuPrice: 0,
        menuImg: '',
      },
    ],
    locationLating: {
      lat: '37.3227651',
      long: '127.125166',
    },
  },
  // 디폴트 메뉴 추후 다른 곳으로 옮길 것.
  defaultMenuList: defaultMenus,
  selectedMenu: {},
  myOrderList: [],
  currentOrder: {
    address: '',
    addressDetail: '',
    orderTimeout: '2022-11-19T07:58:34.950Z',
    //  orderStatus : ordered | pickuped| delivered | accepted
    orderStatus: 'ordered',
    orderSequence: -1,
    message: '',
    store: {
      lat: '37.3227651',
      long: '127.125166',
      storeSequence: 0,
    },
    priceInfo: {
      deliveryFee: 0,
      menuPrice: 0,
      amountOfPayment: 0,
    },
    orderProducts: [
      {
        productQuantity: 0,
        menuPrice: 0,
        // iceOrHot : 'ice' | 'hot'
        iceOrHot: 'ice',
        shots: 0,
        orderdetailsSequence: 0,
        menu: {
          sequence: 0,
          menuName: '',
          menuPrice: 0,
        },
      },
    ],
  },
  order_history: [
    {
      totalPrice: 0,
      orderSequence: '',
      address: '',
      addressDetail: '',
      deliveredAt: '2022-11-20T04:57:41.466Z',
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
      const response = await axios.get('/store');

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
      const response = await axios.get(`/store/detail?sequence=${sequence}`);

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
      const response = await axios.post('/order/pay', requestInfo);

      if (response.status === 200) {
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
      const response = await axios.get(`/order/user`);

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
        `/order/detail?orderSequence=${orderId}`,
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
      const response = await axios.post(`/order/complete`, {
        orderSequence: orderId,
      });

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

// *
// 진행 중인 주문 정보 요청 함수
// *
export const GetOrderReport = createAsyncThunk(
  'order/getOrderReport',
  async ({ start, end }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/order/settle?startTime=${start}&endTime=${end}`,
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
    InitIsPayment: (state) => {
      state.isPayment = 'none';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetStoreList.fulfilled, (state, { payload }) => {
      state.storeList = [
        ...payload.sort(
          (a, b) => a.name[0].charCodeAt(0) - b.name[0].charCodeAt(0),
        ),
      ];
      // state.storeList = payload.sort((a, b) => b.sequence - a.sequence);
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
    builder.addCase(RequestPayment.fulfilled, (state) => {
      state.isPayment = 'success';
    });
    builder.addCase(RequestPayment.rejected, (state) => {
      state.isPayment = 'error';
    });
    // 완료되면 홈으로 이동
    builder.addCase(CompleteOrder.fulfilled, () => {});
    builder.addCase(GetOrderReport.fulfilled, (state, { payload }) => {
      state.order_history = payload;
    });
  },
});

function PrintError(e, src) {
  console.log(`${src} 에러 : ${e.message}`);
  console.error(e);
}

export const { SelectStore, SelectCoffee, InitIsPayment } = orderSlice.actions;
export default orderSlice.reducer;

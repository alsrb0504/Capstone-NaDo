/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  storeList: [],
  // 픽업 가게 상세 정보
  selectedStore: {
    businesstimes: [{ dayOfWeek: '매', startTime: '10:00', endTime: '22:00' }],
    locationLating: { lat: '37.3227651', long: '127.125166' },
    name: '',
    pickupList: [
      {
        orderSequence: 0,
        dest: '',
        price: 0,
        orderTimeout: '2022-11-19T16:55:00.000Z',
      },
    ],
    storeImage: '',
    storeSequence: 0,
    telephone: '',
  },
  // 픽업 주문 수락 전, 픽업 주문
  selectedOrder: {
    address: '',
    addressDetail: '',
    message: '',
    orderProducts: [
      {
        productQuantity: 0,
        orderdetailsSequence: 0,
        menuPrice: 0,
        iceOrHot: 'ice',
        shots: 0,
        menu: {
          sequence: 0,
          menuName: '',
          menuPrice: 0,
        },
      },
    ],
    orderSequence: 0,
    orderStatus: 'ordered',
    orderTimeout: '2022-11-19T19:01:00.000Z',
    priceInfo: { deliveryFee: 0, menuPrice: 0, amountOfPayment: 0 },
    store: { lat: '37.3229512', long: '127.1279079', storeSequence: 0 },
  },
  // 픽업 주문 수락 후, 현재 진행 중인 주문
  currentPickup: {
    address: '',
    addressDetail: '',
    message: '',
    orderProducts: [
      {
        iceOrHot: 'ice',
        menu: {
          sequence: 0,
          menuName: '',
          menuPrice: 0,
        },
        menuPrice: 0,
        orderdetailsSequence: 0,
        productQuantity: 0,
        shots: 0,
      },
    ],
    orderSequence: 0,
    orderStatus: 'pickuped',
    orderTimeout: '2022-11-19T19:01:00.000Z',
    pickupSequence: '0',
    priceInfo: { deliveryFee: 0, menuPrice: 0, amountOfPayment: 0 },
    store: { lat: '37.3229512', long: '127.1279079', storeSequence: 6 },
  },
  myPickupList: [
    {
      timeout: '2022-11-19T19:55:00.000Z',
      price: 0,
      sequence: -1,
      location: {
        address: '',
        detail: '',
      },
    },
  ],
  isCatch: false,
  isCancel: false,
  pickupHistory: {
    profitList: [
      {
        orderSequence: 'string',
        address: 'string',
        addressDetail: 'string',
        deliveredAt: '2022-11-20T05:54:33.450Z',
        deliveryFee: 0,
      },
    ],
    totalProfit: 0,
  },
};

// *
// GET : 픽업 가게 목록 받아오는 함수
// *
export const GetPickupStoreList = createAsyncThunk(
  'pickup/getPickupStoreList',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/store/picker');

      if (response.status === 200) {
        return response.data;
      }

      return thunkAPI.rejectWithValue();
    } catch (e) {
      PrintError(e, '픽업 가게 리스트');
      return thunkAPI.rejectWithValue();
    }
  },
);

// *
// GET : 가게 상세 정보 요청 함수
// *
export const GetPickupStoreDetail = createAsyncThunk(
  'pickup/getPickupStoreDetail',
  async (sequence, thunkAPI) => {
    try {
      const response = await axios.get(
        `/store/picker/detail?sequence=${sequence}`,
      );

      if (response.status === 200) {
        return response.data;
      }

      return thunkAPI.rejectWithValue();
    } catch (e) {
      PrintError(e, '픽업 가게 상세 정보');
      return thunkAPI.rejectWithValue();
    }
  },
);

// *
// GET : 픽업 상세 정보 요청 함수
// *
export const GetPickupDetail = createAsyncThunk(
  'pickup/getPickupDetail',
  async (sequence, thunkAPI) => {
    try {
      const response = await axios.get(
        `/order/detail?orderSequence=${sequence}`,
      );

      if (response.status === 200) {
        return response.data;
      }

      return thunkAPI.rejectWithValue();
    } catch (e) {
      PrintError(e, '픽업 가게 상세 정보');
      return thunkAPI.rejectWithValue();
    }
  },
);

// *
// GET : 현재 진행중인 픽업 상세 정보 요청 함수
// *
export const GetCurrentPickupDetail = createAsyncThunk(
  'pickup/getCurrentPickupDetail',
  async (pickupId, thunkAPI) => {
    try {
      const response = await axios.get(
        `/pickup/detail?pickupSequence=${pickupId}`,
      );

      console.log(response);

      if (response.status === 200) {
        return response.data;
      }

      return thunkAPI.rejectWithValue();
    } catch (e) {
      PrintError(e, '픽업 가게 상세 정보');
      return thunkAPI.rejectWithValue();
    }
  },
);

// *
// POST : 픽업 요청 (주문 수락) 함수
// *
export const CatchPickup = createAsyncThunk(
  'pickup/catchPickup',
  async (sequence, thunkAPI) => {
    try {
      const response = await axios.post(`/pickup`, {
        orderSequence: sequence,
      });

      console.log(response);

      if (response.status === 200) {
        return response.data;
      }

      return thunkAPI.rejectWithValue();
    } catch (e) {
      PrintError(e, '픽업 가게 상세 정보');
      return thunkAPI.rejectWithValue();
    }
  },
);

// *
// POST : 픽업 취소 요청 함수
// *
export const CancelPickup = createAsyncThunk(
  'pickup/cancelPickup',
  async (pickupId, thunkAPI) => {
    try {
      const response = await axios.post(`/pickup/cancel`, {
        pickupSequence: pickupId,
      });

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

// *
// POST : 픽업 완료 요청 함수
// *
export const CompletePickup = createAsyncThunk(
  'pickup/CompletePickup',
  async (pickupId, thunkAPI) => {
    try {
      const response = await axios.post(`/pickup/complete`, {
        pickupSequence: pickupId,
      });

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

// *
// GET : 나의 픽업 리스트 요청 함수
// *
export const GetMyPickList = createAsyncThunk(
  'pickup/GetMyPickList',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/pickup/list`);

      if (response.status === 200) {
        if (response.data.length === 0) return [];

        const { timeout, totalPrice, pickupSequence, location } =
          response.data[0];

        const pickingCardFormat = {
          timeout,
          price: totalPrice,
          sequence: pickupSequence,
          location,
        };

        return [pickingCardFormat];
      }

      return thunkAPI.rejectWithValue();
    } catch (e) {
      PrintError(e, '픽업 가게 상세 정보');
      return thunkAPI.rejectWithValue();
    }
  },
);

// *
// GET : 픽업 기록 요청 함수
// *
export const GetPickupReport = createAsyncThunk(
  'pickup/getPickupReport',
  async ({ start, end }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/pickup/profit?startTime=${start}&endTime=${end}`,
      );

      console.log(response);

      if (response.status === 200) {
        return response.data;
      }

      return thunkAPI.rejectWithValue();
    } catch (e) {
      PrintError(e, '픽업 기록 요청');
      return thunkAPI.rejectWithValue();
    }
  },
);

export const pickupSlice = createSlice({
  name: 'pickup',
  initialState,
  reducers: {
    InitCancel: (state) => {
      state.isCancel = false;
    },
    InitCurrentPickup: (state) => {
      state.currentPickup = initialState.currentPickup;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetPickupStoreList.fulfilled, (state, { payload }) => {
      state.storeList = payload.sort((a, b) => b.pickupCnt - a.pickupCnt);
    });
    builder.addCase(GetPickupStoreDetail.fulfilled, (state, { payload }) => {
      state.selectedStore = payload;
    });
    builder.addCase(GetPickupDetail.fulfilled, (state, { payload }) => {
      state.selectedOrder = payload;
    });
    builder.addCase(CatchPickup.fulfilled, (state) => {
      state.isCatch = true;
    });
    builder.addCase(GetMyPickList.fulfilled, (state, { payload }) => {
      // 주문 목록
      state.myPickupList = payload;

      if (payload.length > 0) state.isCatch = true;
      else state.isCatch = false;
    });
    // current Pickup Detail
    builder.addCase(GetCurrentPickupDetail.fulfilled, (state, { payload }) => {
      state.currentPickup = payload;
    });
    builder.addCase(CancelPickup.fulfilled, (state) => {
      state.isCatch = false;
      state.isCancel = true;
    });
    builder.addCase(CancelPickup.rejected, (state) => {
      state.isCancel = true;
    });
    builder.addCase(CompletePickup.fulfilled, (state) => {
      // 추후 따로 분리
      state.currentPickup.orderStatus = 'delivered';
    });
    builder.addCase(GetPickupReport.fulfilled, (state, { payload }) => {
      // 추후 따로 분리
      state.pickupHistory = payload;
    });
  },
});

function PrintError(e, src) {
  console.log(`${src} 에러 : ${e.message}`);
  console.error(e);
}

export const { InitCancel, InitCurrentPickup } = pickupSlice.actions;
export default pickupSlice.reducer;

/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  storeList: [],
  selectedStore: {},
  myPickupList: [],

  pickup_history: [
    {
      pickup_id: 321,
      pickupAddress: '소프트웨어관 313호',
      pickupFee: 1200,
      pickupTime: '21.09.08 13 : 35',
    },

    {
      pickup_id: 322,
      pickupAddress: '소프트웨어관 313호',
      pickupFee: 1200,
      pickupTime: '21.09.08 13 : 35',
    },

    {
      pickup_id: 323,
      pickupAddress: '소프트웨어관 313호',
      pickupFee: 1200,
      pickupTime: '21.09.08 13 : 35',
    },
  ],

  // 픽업 주문 수락 전, 픽업 주문
  selectedOrder: {},

  // 픽업 주문 수락 후, 현재 진행 중인 주문
  currentPickup: {},

  isCatch: false,
  isCancel: false,
};

// *
// GET : 픽업 가게 목록 받아오는 함수
// *
export const GetPickupStoreList = createAsyncThunk(
  'pickup/getPickupStoreList',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/store/picker');

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
        `http://localhost:3001/store/picker/detail?sequence=${sequence}`,
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
        `http://localhost:3001/order/detail?orderSequence=${sequence}`,
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
        `http://localhost:3001/pickup/detail?pickupSequence=${pickupId}`,
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
      const response = await axios.post(`http://localhost:3001/pickup`, {
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
      const response = await axios.post(`http://localhost:3001/pickup/cancel`, {
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
      const response = await axios.post(
        `http://localhost:3001/pickup/complete`,
        {
          pickupSequence: pickupId,
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

// *
// GET : 나의 픽업 리스트 요청 함수
// *
export const GetMyPickList = createAsyncThunk(
  'pickup/GetMyPickList',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3001/pickup/list`);

      if (response.status === 200) {
        if (response.data.length === 0) return [];

        const { timeout, totalPrice, pickupSequence, location } =
          response.data[0];

        const pickingCardFormat = {
          timeout,
          price: totalPrice,
          sequence: pickupSequence,

          location, // 이따 수정
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

export const pickupSlice = createSlice({
  name: 'pickup',
  initialState,
  reducers: {
    InitCancel: (state) => {
      state.isCancel = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetPickupStoreList.fulfilled, (state, { payload }) => {
      state.storeList = payload;
    });
    builder.addCase(GetPickupStoreDetail.fulfilled, (state, { payload }) => {
      state.selectedStore = payload;
    });
    builder.addCase(GetPickupDetail.fulfilled, (state, { payload }) => {
      state.selectedOrder = payload;
    });
    builder.addCase(CatchPickup.fulfilled, (state) => {
      state.isCatch = true;
      // 추후 확인
      state.currentPickup = state.myPickupList;
    });
    builder.addCase(GetMyPickList.fulfilled, (state, { payload }) => {
      state.myPickupList = payload;
    });
    // current Pickup Detail
    builder.addCase(GetCurrentPickupDetail.fulfilled, (state, { payload }) => {
      state.currentPickup = payload;
    });
    builder.addCase(CancelPickup.fulfilled, (state) => {
      state.isCatch = false;
      state.isCancel = true;
      state.currentPickup = [];
    });
    builder.addCase(CompletePickup.fulfilled, (state, payload) => {
      // 추후 따로 분리
      state.currentPickup.orderStatus = 'delivered';
    });
  },
});

function PrintError(e, src) {
  console.log(`${src} 에러 : ${e.message}`);
  console.error(e);
}

export const { InitCancel } = pickupSlice.actions;
export default pickupSlice.reducer;

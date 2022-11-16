import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  storeList: [],
  selectedStore: {},
  myPickupList: [
    {
      pickupId: 321,
      pickupAddress: '소프트웨어관 313호',
      pickupPrice: 8900,
      pickupTime: '13:35',
      orderer: '주문한 사람1',
    },
    {
      pickupId: 322,
      pickupAddress: '상경관 201호',
      pickupPrice: 18900,
      pickupTime: '15:00',
      orderer: '주문한 사람2',
    },
  ],
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
};

// *
// GET : 픽업 가게 목록 받아오는 함수
// *
export const GetPickupStoreList = createAsyncThunk(
  'order/getPickupStoreList',
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
  'order/getPickupStoreDetail',
  async (sequence, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/store/picker/detail?sequence=${sequence}`,
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

export const pickupSlice = createSlice({
  name: 'pickup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetPickupStoreList.fulfilled, (state, { payload }) => {
      state.storeList = payload;
    });
    builder.addCase(GetPickupStoreDetail.fulfilled, (state, { payload }) => {
      state.selectedStore = payload;
    });
  },
});

function PrintError(e, src) {
  console.log(`${src} 에러 : ${e.message}`);
  console.error(e);
}

export default pickupSlice.reducer;

// Reducer 하나라도 존재해야 경고가 뜨지 않기 때문에
// 더미 reducer 생성.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 10,
};

const AsyncIncrement = createAsyncThunk(
  "counter/asnyc/increment",
  async (num) => {
    // const res = await fetch("");
    return num;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncIncrement.fulfilled, (state, action) => {
      state.value += action.payload;
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export { AsyncIncrement };
export default counterSlice.reducer;

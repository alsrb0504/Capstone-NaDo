import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isSocail: false,
  userNickname: "",
  userEmail: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  isLogin: false,
  errorMessage: "",
};

// 로컬 회원가입 함수
export const LocalSignup = createAsyncThunk(
  "user/localSignup",
  async ({ id, password, nickname, email, navigate }, thunkAPI) => {
    try {
      const response = await axios.post(
        // 추후, url 주소 결정하면 교체
        "https://ec32e1ae-8b3c-4bfe-a72f-4528bdcc0972.mock.pstmn.io/localSignup/test",
        {
          userId: id,
          userPassword: password,
          userNickname: nickname,
          userEmail: email,
          userProvider: "local",
        }
      );

      console.log("response", response);
      let data = response.data;
      console.log("data", data);

      if (response.status === 200) {
        navigate("/login");
        return { ...data };
      } else if (response.status === 401) {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.error(e.message);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// 로컬 로그인 함수
export const LocalLogin = createAsyncThunk(
  "user/localLogin",
  async ({ id, password, navigate }, thunkAPI) => {
    try {
      console.log(id);
      const response = await axios.get(
        // 추후 서버 로그인 url 주소로 변경
        "https://ec32e1ae-8b3c-4bfe-a72f-4528bdcc0972.mock.pstmn.io/locallogin/test",
        {
          userId: id,
          userPassword: password,
        }
      );

      console.log(response);

      if (response.status === 200) {
        navigate("/home");
        return { ...response.data };
      }
      // 로그인 실패 status
      else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (e) {
      console.error(e.message);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // 로컬 회원가입 thunk
    builder
      .addCase(LocalSignup.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(LocalSignup.fulfilled, (state) => {
        state.isFetching = false;
        state.isSuccess = true;
      })
      .addCase(LocalSignup.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      });
    //
    // 로컬 로그인 thunk
    builder
      .addCase(LocalLogin.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(LocalLogin.fulfilled, (state, { payload }) => {
        const { userNickname, userEmail, userId } = payload;
        state.isFetching = false;
        state.isSuccess = true;
        state.isLogin = true;
        state.userNickname = userNickname;
        state.userEmail = userEmail;
        state.userId = userId;
      })
      .addCase(LocalLogin.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      });
  },
});

export default userSlice.reducer;

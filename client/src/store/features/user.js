import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userNickname: '',
  userEmail: '',
  userProvider: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  isLogin: false,
};

function PrintError(e, src) {
  console.log(`${src} 에러 : ${e.message}`);
  console.error(e);
}

export const GetUserWithSession = createAsyncThunk(
  'user/getUserWithSession',
  async (_, thunkAPI) => {
    //
    try {
      const response = await axios.get('http://localhost:3001/auth/local/');

      if (response.status === 200) {
        return response.data;
      }
      if (response.status === 401) {
        return null;
      }
      // return
      return thunkAPI.rejectWithValue(response.data);
    } catch (e) {
      PrintError(e, '로그인 유지');
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

// 로컬 회원가입 함수
export const LocalSignup = createAsyncThunk(
  'user/localSignup',
  async ({ identifier, password, nickname, email }, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/local/register',
        {
          identifier,
          password,
          nickname,
          email,
        },
      );

      // console.log('response', response);
      const { data } = response;
      // console.log('data', data);

      if (response.status === 201) {
        return { ...data };
      }
      if (response.status === 401) {
        alert('회원가입 실패');
        return thunkAPI.rejectWithValue(data);
      }
      // return
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      PrintError(e, '로컬 회원가입');
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

// 로컬 로그인 함수
export const LocalLogin = createAsyncThunk(
  'user/localLogin',
  async ({ identifier, password }, thunkAPI) => {

    console.log(identifier, password)

    try {
      const response = await axios.post(
        'http://localhost:3001/auth/local/login',
        {
          identifier,
          password,
        },
      );

      // console.log('response', response);

      const { data } = response;

      // console.log('data', data);

      if (response.status === 200) {
        return { ...data };
      }
      // 로그인 실패 status
      // else {
      return thunkAPI.rejectWithValue(response.data);
      // }
    } catch (e) {
      PrintError(e, '로컬 로그인');
      return thunkAPI.rejectWithValue();
    }
  },
);

// 로컬 로그아웃 함수
export const LocalLogout = createAsyncThunk(
  'user/localLogout',
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/local/logout',
        {},
        { withCredentials: true },
      );

      if (response.status === 200) {
        return {};
      }
      // 로그인 실패 status
      // else {
      return thunkAPI.rejectWithValue(response);
      // }
    } catch (e) {
      PrintError(e, '로컬 로그아웃');
      return thunkAPI.rejectWithValue();
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // 세션 유저정보 획득
    builder
      .addCase(GetUserWithSession.pending, (state) => {
        state.isFetching = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(GetUserWithSession.fulfilled, (state, { payload }) => {
        const { nickname, email, provider } = payload;
        state.isFetching = false;
        state.isSuccess = true;
        state.isLogin = true;
        state.userNickname = nickname;
        state.userEmail = email;
        state.userProvider = provider;
      })
      .addCase(GetUserWithSession.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
    //
    // 로컬 회원가입 thunk
    builder
      .addCase(LocalSignup.pending, (state) => {
        state.isFetching = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(LocalSignup.fulfilled, (state) => {
        state.isFetching = false;
        state.isSuccess = true;
      })
      .addCase(LocalSignup.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
    //
    // 로컬 로그인 thunk
    builder
      .addCase(LocalLogin.pending, (state) => {
        state.isFetching = true;
        state.isSuccess = false;
        state.isError = false;
        state.isLogin = false;
      })
      .addCase(LocalLogin.fulfilled, (state, { payload }) => {
        const { nickname, email, provider } = payload;
        state.isFetching = false;
        state.isSuccess = true;
        state.isLogin = true;
        state.userNickname = nickname;
        state.userEmail = email;
        state.userProvider = provider;
      })
      .addCase(LocalLogin.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
    //
    // 로컬 로그아웃 thunk
    builder
      .addCase(LocalLogout.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(LocalLogout.fulfilled, (state) => {
        state.isFetching = false;
        state.isLogin = false;
        state.userNickname = '';
        state.userEmail = '';
        state.userProvider = '';
      })
      .addCase(LocalLogout.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;

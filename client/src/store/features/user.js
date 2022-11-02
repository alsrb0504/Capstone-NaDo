import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userId: '',
  userNickname: '',
  userEmail: '',
  userProvider: '',
  // userProfile: '',   // 추후 상의 후 추가해야 할 듯
  isFetching: false,
  isSuccess: false,
  isError: false,
  isLogin: false,
};

// *
// 프로필 업데이트 함수
// 아직 reducer에 연결 X.
// nickname
// identifier
// *
export const UpdateProfile = createAsyncThunk(
  'user/UpdateProfile',
  async ({ nickname, image, identifier }, thunkAPI) => {
    //  *
    // 테스트용 프로필 변경 요청
    // 아이디, 닉네임, 이미지를 같이 보냄.
    // *
    try {
      const formData = new FormData();
      formData.append('image', image[0]);
      formData.append('identifier', identifier);
      formData.append('nickname', nickname);


      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/user/change_profile',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: {
          nickname: 'asdf',
        },
      });

      console.log(response);

      return thunkAPI.rejectWithValue(response.data);
    } catch (e) {
      PrintError(e, '프로필 업데이트');
      return thunkAPI.rejectWithValue(e.response.data);
    }

    // try {
    //   const formData = new FormData();
    //   formData.append('image', image[0]);

    //   console.log(`image = ${image}`);
    //   console.log(formData);

    //   const imgResponse = await axios({
    //     method: 'post',
    //     url: 'http://localhost:3001/user/profile_image',
    //     data: formData,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   console.log(imgResponse);
    // } catch (e) {
    //   return thunkAPI.rejectWithValue(e.response.data);
    // }

    // // 추후 api 주소 정하면 교체
    // try {
    //   const response = await axios.post(
    //     'http://localhost:3001/user/change_nickname',
    //     {
    //       identifier,
    //       nickname,
    //     },
    //   );

    //   // 업데이트 된, 닉네임, 프로필 이미지 정보 받아옴.
    //   if (response.status === 200) {
    //     return response.data;
    //   }
    //   return thunkAPI.rejectWithValue(response.data);
    // } catch (e) {
    //   PrintError(e, '프로필 업데이트');
    //   return thunkAPI.rejectWithValue(e.response.data);
    // }
  },
);

// *
// 비밀번호 변경 함수
// 아직 reducer에 연결 X.
// 기존 비밀번호: prevPasswd
// 새 비밀번호: newPasswd
// 아이디: identifier
// *
export const ChangePasswd = createAsyncThunk(
  'user/ChangePasswd',
  async ({ prevPasswd, newPasswd }, thunkAPI) => {
    console.log(prevPasswd, newPasswd);

    // 추후 api 주소 정하면 교체
    try {
      const response = await axios.post(
        'http://localhost:3001/user/change_password',
        {
          prevPasswd,
          newPasswd,
        },
      );

      // 비밀번호 변경 성공
      if (response.status === 200) {
        return response.data;
      }
      // 비밀번호 변경 실패 (원인 출력 X) 403?
      alert(response.data.message);
      return thunkAPI.rejectWithValue(response.data);
    } catch (e) {
      PrintError(e, '비밀번호 변경');
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

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
    console.log(identifier, password);

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
      .addCase(GetUserWithSession.pending, (state) => StartLoading(state))
      .addCase(GetUserWithSession.fulfilled, (state, { payload }) => {
        const { nickname, email, provider } = payload;
        state.isFetching = false;
        state.isSuccess = true;
        state.isLogin = true;
        state.userNickname = nickname;
        state.userEmail = email;
        state.userProvider = provider;
      })
      .addCase(GetUserWithSession.rejected, (state) => ReceiveError(state));
    //
    // 로컬 회원가입 thunk
    builder
      .addCase(LocalSignup.pending, (state) => StartLoading(state))
      .addCase(LocalSignup.fulfilled, (state) => {
        state.isFetching = false;
        state.isSuccess = true;
      })
      .addCase(LocalSignup.rejected, (state) => ReceiveError(state));
    //
    // 로컬 로그인 thunk
    builder
      .addCase(LocalLogin.pending, (state) => {
        StartLoading(state);
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
      .addCase(LocalLogin.rejected, (state) => ReceiveError(state));
    //
    // 로컬 로그아웃 thunk
    builder
      .addCase(LocalLogout.pending, (state) => StartLoading(state))
      .addCase(LocalLogout.fulfilled, (state) => {
        state.isFetching = false;
        state.isLogin = false;
        state.userNickname = '';
        state.userEmail = '';
        state.userProvider = '';
      })
      .addCase(LocalLogout.rejected, (state) => ReceiveError(state));
  },
});

function PrintError(e, src) {
  console.log(`${src} 에러 : ${e.message}`);
  console.error(e);
}

function StartLoading(state) {
  Object.assign(state, {
    isFetching: true,
    isSuccess: false,
    isError: false,
  });
}

function ReceiveError(state) {
  Object.assign(state, {
    isFetching: false,
    isError: true,
  });
}

export default userSlice.reducer;

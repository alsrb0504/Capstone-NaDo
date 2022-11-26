import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userId: '',
  userNickname: '',
  userEmail: '',
  userProvider: '',
  userProfile: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  isLogin: false,
};

export const UpdateProfile = createAsyncThunk(
  'user/UpdateProfile',
  async ({ nickname, image }, thunkAPI) => {
    try {
      let updatedImagePath = '';

      // 이미지가 변경되었을 경우에만 요청보냄.
      if (image[0]) {
        const formData = new FormData();
        formData.append('image', image[0]);

        const ImgResponse = await axios({
          method: 'post',
          url: '/user/change_image',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (ImgResponse.status === 200) {
          updatedImagePath = ImgResponse.data.data.imagePath;
        } else return thunkAPI.rejectWithValue();
      }

      const NicknameResponse = await axios.post('/user/change_nickname', {
        nickname,
      });

      if (NicknameResponse.status === 200) {
        return {
          nickname: NicknameResponse.data.body.nickname,
          imagePath: updatedImagePath,
        };
      }

      return thunkAPI.rejectWithValue();
    } catch (e) {
      PrintError(e, '프로필 업데이트');
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const ChangePasswd = createAsyncThunk(
  'user/ChangePasswd',
  async ({ identifider, prevPasswd, newPasswd }, thunkAPI) => {
    try {
      const response = await axios.post('/user/change_password', {
        identifider,
        prevPasswd,
        newPasswd,
      });

      // 비밀번호 변경 성공
      if (response.status === 200) {
        return response.data;
      }
      if (response.statusCode === 403) {
        alert('비밀번호 정보가 일치하지 않습니다');
        console.log(response.data.message);
      }
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
    try {
      const response = await axios.get('/auth/local/');

      if (response.status === 200) {
        return response.data;
      }

      // return
      return thunkAPI.rejectWithValue(response.data);
    } catch (e) {
      // PrintError(e, '로그인 유지');
      console.log('세션 로그인 실패.');
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

// 로컬 회원가입 함수
export const LocalSignup = createAsyncThunk(
  'user/localSignup',
  async ({ identifier, password, nickname, email }, thunkAPI) => {
    try {
      const response = await axios.post('/auth/local/register', {
        identifier,
        password,
        nickname,
        email,
      });

      const { data } = response;

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
    try {
      const response = await axios.post('/auth/local/login', {
        identifier,
        password,
      });

      const { data } = response;

      if (response.status === 200) {
        return { ...data };
      }
      // 로그인 실패 status === 403
      return thunkAPI.rejectWithValue(response.data);
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
        '/auth/local/logout',
        {},
        { withCredentials: true },
      );

      if (response.status === 200) {
        return {};
      }
      // 로그인 실패 status
      return thunkAPI.rejectWithValue(response);
    } catch (e) {
      PrintError(e, '로컬 로그아웃');
      return thunkAPI.rejectWithValue();
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    CleanUpSuccess(state) {
      state.isSuccess = false;
    },
  },

  extraReducers: (builder) => {
    // 세션 유저정보 획득
    builder
      .addCase(GetUserWithSession.pending, (state) => StartLoading(state))
      .addCase(GetUserWithSession.fulfilled, (state, { payload }) => {
        const { identifier, nickname, email, provider, imagePath } = payload;
        state.isFetching = false;
        state.isLogin = true;
        state.userId = identifier;
        state.userNickname = nickname;
        state.userEmail = email;
        state.userProvider = provider;
        state.userProfile = imagePath;
      })
      .addCase(GetUserWithSession.rejected, (state) => ReceiveError(state));
    //
    // 로컬 회원가입 thunk
    builder
      .addCase(LocalSignup.pending, (state) => StartLoading(state))
      .addCase(LocalSignup.fulfilled, (state) => SuccessFetching(state))
      .addCase(LocalSignup.rejected, (state) => ReceiveError(state));
    //
    // 로컬 로그인 thunk
    builder
      .addCase(LocalLogin.pending, (state) => {
        StartLoading(state);
        state.isLogin = false;
      })
      .addCase(LocalLogin.fulfilled, (state, { payload }) => {
        const { identifier, nickname, email, provider, imagePath } = payload;
        state.isFetching = false;
        state.isLogin = true;
        state.userId = identifier;
        state.userNickname = nickname;
        state.userEmail = email;
        state.userProvider = provider;
        state.userProfile = imagePath;
      })
      .addCase(LocalLogin.rejected, (state) => ReceiveError(state));
    //
    // 로컬 로그아웃 thunk
    builder
      .addCase(LocalLogout.pending, (state) => StartLoading(state))
      .addCase(LocalLogout.fulfilled, (state) => {
        state.isLogin = false;
      })
      .addCase(LocalLogout.rejected, (state) => ReceiveError(state));
    //
    // 프로필 업데이트
    builder
      .addCase(UpdateProfile.fulfilled, (state, { payload }) => {
        const { nickname, imagePath } = payload;

        state.userNickname = nickname;
        state.userProfile = imagePath || state.userProfile;
      })
      .addCase(UpdateProfile.rejected, (state) => ReceiveError(state));
    builder
      .addCase(ChangePasswd.pending, (state) => StartLoading(state))
      .addCase(ChangePasswd.fulfilled, (state) => SuccessFetching(state))
      .addCase(ChangePasswd.rejected, (state) => ReceiveError(state));
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

function SuccessFetching(state) {
  Object.assign(state, {
    isFetching: false,
    isSuccess: true,
  });
}

function ReceiveError(state) {
  Object.assign(state, {
    isFetching: false,
    isError: true,
  });
}

export const { CleanUpSuccess } = userSlice.actions;
export default userSlice.reducer;

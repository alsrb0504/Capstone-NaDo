import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LocalLogin } from '../../../store/features/user';
import LoginForm from '../../../components/molecules/loginForm/login_form';
import BtnBox from '../../../components/atoms/buttons/btnBox/btn_box';
import { baseURL } from '../../../utils/axios';
import useMove from '../../../hooks/useMove';

const Login = () => {
  const dispatch = useDispatch();
  const { HandleMove, MoveHome } = useMove();

  const { isLogin } = useSelector((state) => state.user);

  const LoginWithLocal = (info) => {
    dispatch(LocalLogin(info));
  };

  const MoveSignup = useCallback(() => {
    HandleMove('/register/local');
  }, [HandleMove]);

  const MoveSocial = () => {
    window.location.href = `${baseURL}/auth/social/login`;
  };

  useEffect(() => {
    if (isLogin) MoveHome();
  }, [MoveHome, isLogin]);

  return (
    <div className="col-sm-4 login">
      <div className="login-logo-container">
        <img className="login-logo" src="images/logo.svg" alt="logo" />
      </div>

      <LoginForm LoginWithLocal={LoginWithLocal} />

      <div className="login-btn-box">
        <BtnBox
          text="네이버"
          url="icon/naver_icon.svg"
          handleClick={MoveSocial}
        />

        <BtnBox
          text="회원가입"
          url="icon/signup_icon.svg"
          handleClick={MoveSignup}
        />
      </div>
    </div>
  );
};

export default Login;

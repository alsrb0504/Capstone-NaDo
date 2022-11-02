import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LocalLogin } from '../../../store/features/user';
import LoginForm from '../../../components/molecules/loginForm/login_form';
import BtnBox from '../../../components/atoms/buttons/btnBox/btn_box';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogin } = useSelector((state) => state.user);

  const LoginWithLocal = (info) => {
    dispatch(LocalLogin(info));
  };

  const MoveSignup = () => {
    navigate('/register/local');
  };

  const MoveSocial = () => {
    window.location.href = 'http://localhost:3001/auth/social/login';
  };

  useEffect(() => {
    if (isLogin) navigate('/');
  }, [navigate, isLogin]);

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

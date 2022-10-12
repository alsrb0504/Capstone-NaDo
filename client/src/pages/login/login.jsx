import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LocalLogin } from '../../store/features/user';
import LoginForm from '../../components/molecules/loginForm/login_form';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginWithLocal = (info) => {
    dispatch(LocalLogin(info));
  };

  const MoveSignup = () => {
    navigate('/register/local');
  };

  return (
    <div className="col-sm-4 login-background">
      <div className="login-logo-container">
        <img className="login-logo" src="images/logo.svg" alt="logo" />
      </div>

      <LoginForm LoginWithLocal={LoginWithLocal} />

      <div className="login-btn-box">
        <div className="login-btn-social">
          <div className="box">
            <img className="icon" src="images/naver_icon.svg" alt="social" />
          </div>
          <span className="text">네이버</span>
        </div>

        <button type="button" className="login-btn-local" onClick={MoveSignup}>
          <div className="box">
            <img className="icon" src="images/signup_icon.svg" alt="local" />
          </div>
          <span className="text">회원가입</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
